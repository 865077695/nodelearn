/**
 * Created by zzq on 2017/6/16.
 */
const express = require('express'),
    router = express.Router();

// 在index里配置了users的前置路径为/users，所以当通过浏览器请求localhost:3000/users/aaa时会返回Hello aaa
router.get('/:name',function(req,res){
    "use strict";
    res.send('Hello '+ req.params.name)
})

module.exports = router;