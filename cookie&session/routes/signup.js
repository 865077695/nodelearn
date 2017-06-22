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
// router.get('/', function (req, res, next) {
//     res.render('signup');
// });

// POST /signup 用户注册
router.post('/',  function (req, res, next) {
    // 获取提交过来的数据
    var name = req.body.username,
    password = req.body.password,
    repassword = req.body.repassword,
    gender = req.body.gender;
    console.log(req.body);
    // 校验参数
    try {
        if (!(name.length >= 1 && name.length <= 10)) { // 验证用户名长度1-10
            throw new Error('100');
        }
        if (['m', 'f', 'x'].indexOf(gender) === -1) {   // 验证性别m、f、x
            throw new Error('101');
        }
        if (password.length < 6) {                      // 密码至少6个字符
            throw new Error('102');
        }
        if (password !== repassword) {                  // 两次密码必须一致
            throw new Error('103');
        }
    } catch (e) {
        console.log('aaaa')
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
            res.status(200).send('200');        //返回1，代表登录成功
        })
        .catch(function (e) {
            // 注册失败，异步删除上传的头像
            // fs.unlink(req.files.avatar.path);
            // 用户名被占用则跳回注册页，而不是错误页
            if (e.message.match('E11000 duplicate key')) {
                // req.flash('error', '用户名已被占用');
                // return res.redirect('/signup');
                return res.send('300')
            }
            next(e);
        });
});

module.exports = router;