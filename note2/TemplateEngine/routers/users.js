/**
 * Created by zzq on 2017/6/16.
 */
const express = require('express'),
    router = express.Router();

router.get('/:name',function(req,res){
    "use strict";
    res.render('users',{        // users是模板的名字，users会匹配views/users.ejs，第二个参数是返回给模板的数据
        name:req.params.name
    })
})

module.exports = router;