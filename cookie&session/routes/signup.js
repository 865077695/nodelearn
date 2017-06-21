/**
 * Created by zzq on 2017/6/21.
 */
const
    express = require('express'),
    router = express.Router();


// 注意一下路由路径均会自动添加前缀'/posts'
router.get('/', function(req, res, next){
    "use strict";
    res.send('这个请求不需要验证是否登陆，直接给前端返回数据了')
})

module.exports = router;