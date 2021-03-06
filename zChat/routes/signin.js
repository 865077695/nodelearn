/**
 * Created by zzq on 2017/6/21.
 */
const
    sha1 = require('sha1'),
    express = require('express'),
    router = express.Router();

const
    UserModel = require('../models/users');

const
    users = [];
// 注意一下路由路径均会自动添加前缀'/signin'
router.post('/', function (req, res, next) {  // 这个是提交用户名密码，来登录的
    "use strict";
    let name = req.body.username,
        password = req.body.password;
    // 然后在这里将这个数据与数据库内的记录作比较
    UserModel.getUserByName(name)
        .then(function (user) {
            if (!user) {
                return res.send(100)      // 前端获取到100状态码，进行相关操作
            }
            // 检查密码是否正确
            if (sha1(password) !== user.password) {
                return res.send(101)
            }
            delete user.password;
            // 将用户名存入session，在进行需要验证用户是否登陆的操作时使用
            req.session.user = user.name;
            users.push(req.session.user);
            console.log(users);
            res.send({code: 200, user: req.session.user})     // 信息正确返回200,前端根据状态码进行后续操作
        })
})

module.exports = router;