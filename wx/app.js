/**
 * Created by zzq on 2017/6/23.
 */
//启动文件

const
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    sha1 = require('sha1'),
    config = require('config-lite')(__dirname);

const
    app = express();

// 服务器配置，token验证
app.get('/', function (req, res) {
    res.send('hello')
    let arr = ['zhiq', req.query.timestamp, req.query.nonce].sort();
    if (sha1(arr[0]+arr[1]+arr[2]) == req.query.signature) {
        res.send(req.query.echostr)
    }
})
app.listen(config.port);


