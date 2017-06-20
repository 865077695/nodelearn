var express = require('express');
var router = express.Router();

var checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signin 登录页
router.get('/', checkNotLogin, function(req, res, next) {
    res.send(req.flash());
});

// POST /signin 用户登录
router.post('/', checkNotLogin, function(req, res, next) {
    console.log(req.body)   //获取到前端传来的用户名和密码，需要经过检测处理之后向前端返回true、false
    //...在这里处理前端传来的账号密码...//
    // res.send(req.flash());
    res.send(true);//假设密码正确返回true
});

module.exports = router;