/**
 * Created by zzq on 2017/7/10.
 */
const
    express = require('express'),
    router = express.Router(),
    checkLogin = require('../midWares/checkLogin');

// 返回用户名
router.get('/userInfo', checkLogin, function (req, res, next) {
    "use strict";
    console.log('user.js---req.session.user:'+req.session.user)
    res.send({user: req.session.user})
})


module.exports = router;