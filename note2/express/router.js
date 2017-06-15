var express = require('express');
var router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// 定义网站主页的路由
router.get('/', function (req, res) {
    res.send({"name":"zhiq"});
});
// 定义 about 页面的路由
router.get('/about', function (req, res) {
    res.send({"name":"zhiqabout"});
});

exports.router = router;
exports.express = express;