/**
 * Created by zzq on 2017/6/21.
 */
module.exports = function (app) {
    "use strict";
    app.get('/', function (req, res, next) {
        res.redirect('/posts')
    });

    app.use('/signin', require('./signin'))             // 登陆页相关
    app.use('/signout', require('./signout'))           // 退出相关
    app.use('/signup', require('./signup'))             // 注册相关
    app.use('/posts', require('./posts'))               //
}