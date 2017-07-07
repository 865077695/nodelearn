/**
 * Created by zzq on 2017/6/21.
 */
// 启动文件
const
    path = require('path'),
    express = require('express'),
    sha1 = require('sha1'),
    bodyParser = require('body-parser'),            // 解析ajax数据，在后台获取到之后可以通过req.body获取
    config = require('config-lite')(__dirname),     // 加载配置文件(自动查找config目录下default.js)
    session = require('express-session'),           // session中间件
    MongoStore = require('connect-mongo')(session), // 将session存入mongodb
    routes = require('./routes');                   // 路由配置文件


const
    app = express(),
    server = require('http').createServer(app),
    io = require('./io').listen(server);


// 以下为微信token验证部分代码，和登陆注册无关
/*
 * 微信token，会向提供的url发送get请求、如果req.query.timestamp不存在则表示并不是要请求/而是要打开静态资源，执行next()
 * */
app.get('/', function (req, res, next) {
    if (req.query.timestamp) {
        let arr = ['zhiq', req.query.timestamp, req.query.nonce].sort();
        if (sha1(arr[0] + arr[1] + arr[2]) == req.query.signature) {
            res.send(req.query.echostr)
        }
    } else {
        res.redirect('/个人简历');    //指向网站页面
        next()
    }
})
// 微信验证结束

// 写在route之前的app.use都相当于全局中间件，就是所有的路由都要执行这些中间件
// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// session中间件
app.use(session({
    name: 'zzz',   // 设置cookie中保存session id的字段名称
    secret: config.session.secret,// 通过设置secret，来计算hash值并放在cookie中，使产生的signedcookie防篡改
    saveUninitialized: false,   // 设置为false，强制创建一个session，即使用户未登录
    resave: false,               // 强制更新session
    cookie: {
        path: '/',
        maxAge: config.session.maxAge// 过期时间，过期后cookie中的sessionId自动删除
    },
    store: new MongoStore({          // 将sessionId存储到mongodb
        url: config.mongodb
    })
}))

// 路由
routes(app);    // 到这里切换到routes/index.js继续吧

// 监听端口，启动路由
server.listen(config.port) // 监听3000端口