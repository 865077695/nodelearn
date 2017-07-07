/**
 * Created by zzq on 2017/6/21.
 */
const
    express = require('express'),
    router = express.Router(),
    checkLogin = require('../midWares/checkLogin');

// 注意一下路由路径均会自动添加前缀'/posts'
router.get('/', function (req, res, next) {
    "use strict";
    res.send('get,/posts,这个请求不需要验证是否登陆，直接就给前端返回数据了')
})

router.post('/commit', function (req, res, next) {
    "use strict";
    res.send('400')
})

// 如果需要对用户信息进行验证，则添加一个做验证的回调函数
router.get('/list', checkLogin, function (req, res, next) {
    res.send(req.session.user)
})
module.exports = router;