const url = require('url'),
    fs = require('fs'),
    path = require('path'),
    http = require('http'),
    config = require('./config'),
    mine = require('./mine').types,
    httpStatusCode = require('./http-status-code'),
    zlib = require('zlib')      // 文件解压缩


/*
* @param realpath:资源路径(assets\index.html,assets\b.html)
* @param request: 客户端请求细节
* @param response: 响应内容设置
* */
const
    routerHandle = function (realpath, request, response) {
        response.setHeader('Accept-Ranges', 'bytes');//由于使用steam来传递数据，需要加上这个http头部

        fs.stat(realpath, (err, stats) => {
            if (err) {
                switch (err.code) {
                    case 'EACCES':
                        response.writeHead(httpStatusCode.NO_PERMISSION, {
                            'Content-Type': mine.txt
                        })
                        response.write('You have no permission to access ' + realpath)
                        break
                    case 'ENOENT':
                        response.writeHead(httpStatusCode.NOT_FOUND, {
                            'Content-Type': mine.txt
                        })
                        response.write('Not found ' + realpath)
                        break
                    case 'EISDIR':
                        routerHandle(path.join(realpath, config.defaultFile))
                        break
                    case 'EPERM':
                        response.writeHead(httpStatusCode.NOT_FOUND, {
                            'Content-Type': mine.txt
                        })
                        response.write('You have no permission to access ' + realpath)
                        break
                }
                response.end()

            }
            else {
                let extension = path.extname(realpath)
                extension = extension ? extension.slice(1) : 'unknown'
                const contentType = mine[extension] || mine['txt']
                response.setHeader('Content-Type', contentType)
                // response.setHeader('Content-Length',stats.size)

                // 如果是图片或者css资源，设置缓存
                if (extension.match(config.expires.fileMatch)) {
                    let expires = new Date()
                    expires.setTime(expires.getTime() + config.expires.maxAge * 1000)
                    response.setHeader('Expires', expires.toUTCString())
                    response.setHeader('Cache-Control', 'max-age=' + config.expires.maxAge)
                }
                // 文件最后被修改的时间
                var lastModified = stats.mtime.toUTCString()
                if (request.headers['ifModifiedSince'] && request.headers['ifModifiedSince'] === lastModified) {
                    response.write(httpStatusCode.NO_MODIFY, 'Not Modified')
                    response.end()
                } else {
                    // 定义compressHandle函数，判断请求头信息所允许的编码方式（encoding、deflate）来确定响应头和响应信息
                    const compressHandle = (raw, statusCode, description) => {
                            const stream = raw,
                                acceptEncoding = request.headers['accept-encoding'] || '',
                                // 如果是html、css、js
                                matched = extension.match(config.compress.match)
                            if (matched && acceptEncoding.match(/\bgzip\b/)) {
                                response.writeHead(httpStatusCode.OK, {'Content-Encoding': 'gzip'})
                                stream.pipe(zlib.createGzip()).pipe(response)
                            }
                            else if (matched && acceptEncoding.match(/\bdeflate\b/)) {
                                response.writeHead(httpStatusCode.OK, {'Content-Encoding': 'deflate'})
                                stream.pipe(zlib.createDeflate()).pipe(response)
                            } else {
                                response.writeHead(httpStatusCode.OK, 'OK')
                                stream.pipe(response);
                            }
                        },
                        parseRange = function (str, size) {
                            if (str.indexOf(",") != -1) {
                                return
                            }

                            var range = str.split("-"),
                                start = parseInt(range[0], 10),
                                end = parseInt(range[1], 10);

                            if (isNaN(start)) {
                                start = size - end;
                                end = size - 1
                            } else if (isNaN(end)) {
                                end = size - 1
                            }

                            if (isNaN(start) || isNaN(end) || start > end || end > size) {
                                return
                            }

                            return {start: start, end: end}
                        }


                    if (request.headers['range']) {
                        const range = parseRange(request.headers['range'], stats.size)
                        if (range) {
                            response.setHeader("Content-Range", "bytes " + range.start + "-" + range.end + "/" + stats.size);
                            response.setHeader("Content-Length", (range.end - range.start + 1));
                            // fs.createReadStream 返回一个新建的ReadStream对象
                            const raw = fs.createReadStream(realPath, {"start": range.start, "end": range.end});
                            compressHandle(raw, 206, "Partial Content");
                        } else {
                            response.writeHead(416, "Request Range Not Satisfiable");
                            response.end();
                        }
                    }
                    else {
                        const raw = fs.createReadStream(realpath)
                        compressHandle(raw, 200, "Ok");
                    }

                }

            }
        })
    }

const server = http.createServer(function (request, response) {
    let pathname = url.parse(request.url).pathname
    // console.log(url.parse(request.url))
    if (pathname.slice(-1) === '/') { // 检测是否为根路径，如果是根路径，将路径指向默认文件
        pathname = path.join(pathname, config.defaultFile)
    }
    let realpath = path.join(config.defaultStaticeFileDir, path.normalize(pathname.replace(/\.\./g, ''))) // 在路径前面加上静态资源文件位置，补充完整
    routerHandle(realpath, request, response)

}).listen(config.port)