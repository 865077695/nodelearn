/**
 * Created by zzq on 2017/6/21.
 */
module.exports = function (req, res, next) {
    "use strict";
    if (req.session.user) {           // 这样表示登陆了，返回true
        console.log(11111)
        next()
        // return res.redirect('301','/wz/signin.html');
    } else {
        console.log(222)
        return res.send('400');     // 这样表示未登录，返回状态码400
    }
}