/**
 * Created by zzq on 2017/6/21.
 */
module.exports = function (req, res, next) {
    "use strict";
    if (req.session.user) {           // 这样表示登陆了，返回true
        console.log(req.session.user.name)
        return res.send(req.session.user.name);
    } else {
        return res.send('400');     // 这样表示未登录，前端接收到之后提示用户未登录，并处理跳转至登陆页面
    }
    next()
}