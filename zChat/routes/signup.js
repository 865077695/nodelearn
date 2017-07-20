/**
 * Created by zzq on 2017/6/21.
 */
const
    express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    path = require('path'),
    sha1 = require('sha1');

const
    UserModel = require('../models/users'); // 操作数据库的方法集合
// checkNotLogin = require('../middlewares/check').checkNotLogin;


// POST /signup 用户注册，这里需要注意，'/'需要加上/signup这个路径也就是在前段请求的路径应该是'/signup'
router.post('/', function (req, res, next) {
    // 获取提交过来的数据
    var name = req.body.username,
        password = req.body.password,
        repassword = req.body.repassword,
        gender = req.body.gender;
    console.log(req.body);
    // 校验参数
    try {
        if (!(name.length >= 1 && name.length <= 11)) { // 验证用户名长度1-10
            throw new Error(100);
        }
        if (['m', 'f', 'x'].indexOf(gender) === -1) {   // 验证性别m、f、x
            throw new Error(101);
        }
        if (password.length < 6) {                      // 密码至少6个字符
            throw new Error(102);
        }
        if (password !== repassword) {                  // 两次密码必须一致
            throw new Error(103);
        }
    } catch (e) {
        // 注册失败，异步删除上传的头像
        // fs.unlink(req.files.avatar.path);
        // req.flash('error', e.message);
        return res.send(e.message);
    }

    // 明文密码加密
    password = sha1(password);

    // 待写入数据库的用户信息
    var user = {
        name: name,
        password: password  //这个password是加密过的
    };
    // 用户信息写入数据库
    UserModel.create(user)              // 这个方法定义在users.js内
        .then(function (result) {
            // 此 user 是插入 mongodb 后的值，包含 _id
            user = result.ops[0];
            // 将用户信息存入 session
            delete user.password;
            req.session.user = user.name;    // 将user存入session用于在某些操作前验证是否已登录

            console.log('ok')
            res.status(200).send({code: 200, user: req.session.user});        //返回200，前端接收到200时代表登录成功进行后续操作
        })
        .catch(function (e) {
            console.log(e.message)
            // 注册失败，异步删除上传的头像
            // fs.unlink(req.files.avatar.path);
            if (e.message.match('E11000 duplicate key')) {
                return res.send({code: 300});         // 如果用户名被占用返回300
            }
            next(e);
        });
});
/*
 * signup.html没什么好说的
 * 可以接着看signin登陆页面的后台文件
 * */

module.exports = router;