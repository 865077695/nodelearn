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
    UserModel = require('../models/users');
// checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signup 注册页
router.get('/', function (req, res, next) {
    res.render('signup');
});

// POST /signup 用户注册
router.post('/',  function (req, res, next) {
    var name = req.body.user,
    password = req.body.password;
    console.log(req.body)
    // 校验参数
    // try {
    //     if (!(name.length >= 1 && name.length <= 10)) {
    //         throw new Error('名字请限制在 1-10 个字符');
    //     }
    //     if (['m', 'f', 'x'].indexOf(gender) === -1) {
    //         throw new Error('性别只能是 m、f 或 x');
    //     }
    //     if (!(bio.length >= 1 && bio.length <= 30)) {
    //         throw new Error('个人简介请限制在 1-30 个字符');
    //     }
    //     if (!req.files.avatar.name) {
    //         throw new Error('缺少头像');
    //     }
    //     if (password.length < 6) {
    //         throw new Error('密码至少 6 个字符');
    //     }
    //     if (password !== repassword) {
    //         throw new Error('两次输入密码不一致');
    //     }
    // } catch (e) {
    //     // 注册失败，异步删除上传的头像
    //     fs.unlink(req.files.avatar.path);
    //     req.flash('error', e.message);
    //     return res.redirect('/signup');
    // }

    // 明文密码加密
    password = sha1(password);

    // 待写入数据库的用户信息
    var user = {
        name: name,
        password: password
    };
    // 用户信息写入数据库
    UserModel.create(user)
        .then(function (result) {
            // 此 user 是插入 mongodb 后的值，包含 _id
            user = result.ops[0];
            // 将用户信息存入 session
            delete user.password;
            req.session.user = user;
            // 跳转到首页
            // res.redirect('/posts');
            console.log('ok')
            res.sendStatus(200).send('what');        //返回1，代表登录成功
        })
        .catch(function (e) {
            // 注册失败，异步删除上传的头像
            // fs.unlink(req.files.avatar.path);
            // 用户名被占用则跳回注册页，而不是错误页
            if (e.message.match('E11000 duplicate key')) {
                // req.flash('error', '用户名已被占用');
                // return res.redirect('/signup');
                console.log(e)
            }
            next(e);
        });
});

module.exports = router;