/**
 * Created by zzq on 2017/6/21.
 */
const
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    config = require('config-lite')(__dirname),
    session = require('express-session'),
    connectMongo = require('connect-mongo'),
    routes = require('./routes');


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
    // store: new MongoStore({                   // 将sessionId存储到mongodb
    //     url: config.mongodb
    // })
}))
// 路由
routes(app);

// 监听端口，启动路由
app.listen(config.port)