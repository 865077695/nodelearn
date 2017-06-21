/**
 * Created by zzq on 2017/6/21.
 */
const
    express = require('express'),
    router = express.Router();


// 注意一下路由路径均会自动添加前缀'/signin'
router.post('/', function(req, res, next){  // 这个是提交用户名密码，来登录的
    "use strict";
    console.log(req.body);  // req.body就是前端传来的数据（用户名密码）了，然后在这里将这个数据与数据库内的记录作比较,假设登陆成功
    req.session.user = 'zhiq'   // 设置user = 'zhiq'
    res.send('ok')
})

module.exports = router;