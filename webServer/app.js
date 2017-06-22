/**
 * Created by zzq on 2017/6/21.
 */
// 启动文件
const
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),            // 解析ajax数据，在后台获取到之后可以通过req.body获取
    config = require('config-lite')(__dirname),     // 加载配置文件(自动查找config目录下default.js)
    session = require('express-session'),           // session中间件
    MongoStore  = require('connect-mongo')(session),// 将session存入mongodb
    routes = require('./routes');                   // 路由配置文件


const app = express();

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
    resave: true,               // 强制更新session
    cookie: {
        maxAge: config.session.maxAge// 过期时间，过期后cookie中的sessionId自动删除
    },
    store: new MongoStore({          // 将sessionId存储到mongodb
        url: config.mongodb
    })
}))
// 路由
routes(app);    // 到这里切换到routes/index.js继续吧

// 监听端口，启动路由
app.listen(config.port) // 监听3000端口