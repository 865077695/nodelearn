/**
 * Created by zzq on 2017/7/4.
 */
// 启动文件
const
    path = require('path'),
    express = require('express'),
    bodyParse = require('body-parser'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    routers = require('./routers');

const
    app = express();

// 设置静态资源目录
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));

// 设置 Cookie
app.use(cookieParser('zhiq'));

// session 中间件
app.use(session({
    name: 'testsession',
    secret: 'test',
    saveUninitialized: false,
    resave: true,
    cookie: {
        maxAge: 3000
    }
}))

routers(app);

app.listen(3000,function(){
    "use strict";
    console.log(3000)
})
