/**
 * Created by zzq on 2017/6/21.
 */
module.exports = function (req, res, next) {
    "use strict";
    if (req.session.user) {           // 这样表示登陆了，返回true
        console.log('登录了')
        next()
        // return res.redirect('301','/wz/signin.html');
    } else {
        console.log('没登录')
        return res.send({code: '4000'});     // 这样表示未登录，返回状态码400
    }
}