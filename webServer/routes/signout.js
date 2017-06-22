/**
 * Created by zzq on 2017/6/21.
 */
const
    express = require('express'),
    router = express.Router();


// 注意一下路由路径均会自动添加前缀'/signout'
router.get('/', function(req, res, next){
    "use strict";
    req.session.user = null;
    res.send('ok')
})

module.exports = router;