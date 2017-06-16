/**
 * Created by zzq on 2017/6/16.
 */
const express = require('express'),
    router = express.Router();

router.get('/',function(req,res){
    "use strict";
    res.send('hello index router')
})

module.exports = router;