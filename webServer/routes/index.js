/**
 * Created by zzq on 2017/6/21.
 */
// 路由配置
module.exports = function (app) {
    "use strict";
    // app.use()，第一个参数是要自动追加在路由前面的路径
    app.use('/signin', require('./signin'))             // 登陆页相关路由
    app.use('/signout', require('./signout'))           // 退出相关
    app.use('/signup', require('./signup'))             // 注册相关
    app.use('/posts', require('./posts'))               // 其他

    // 可以选择从注册页开始，打开signup.html和signup.js
}