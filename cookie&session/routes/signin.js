/**
 * Created by zzq on 2017/6/21.
 */
const
    sha1 = require('sha1'),
    express = require('express'),
    router = express.Router();

const
    UserModel = require('../models/users');

// 注意一下路由路径均会自动添加前缀'/signin'
router.post('/', function (req, res, next) {  // 这个是提交用户名密码，来登录的
    "use strict";
    console.log(req.body);  // req.body就是前端传来的数据（用户名密码）
    let name = req.body.username,
        password = req.body.password;
    // 然后在这里将这个数据与数据库内的记录作比较
    UserModel.getUserByName(name)
        .then(function(user){
            if(!user){
                console.log(1111)
                return res.send('100')
            }
            // 检查密码是否正确
            if(sha1(password) !== user.password){
                return res.send('101')
            }
            delete user.password;
            // 将用户名存入session
            req.session.user = user;
            res.send('200')
        })
})

module.exports = router;