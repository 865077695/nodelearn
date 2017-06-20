var express = require('express');
var Mongolass =require('mongolass');

var router = express.Router();
// var mongolass = new mongolass();
var checkLogin = require('../middlewares/check').checkLogin;

Mongolass.connect('mongodb://localhost:27107/myblog',function(err,db){
    "use strict";
    if(err){
        console.log(111111111+err)
    }else{
        console.log(22222222222222222)
    }
})
// const mongolass = new Mongolass('mongodb://localhost:27107/myblog')
// const User = mongolass.model('User');
// User.insertOne({name:'zhiq',age:18})
// GET /posts 所有用户或者特定用户的文章页
//   eg: GET /posts?author=xxx
router.get('/', function(req, res, next) {
    console.log(req.flash());

    // res.send(req.flash());
    res.send(false)
});

// POST /posts 发表一篇文章
router.post('/', checkLogin, function(req, res, next) {
    res.send(req.flash());
});

// GET /posts/create 发表文章页
router.get('/create', checkLogin, function(req, res, next) {
    res.send(req.flash());
});

// GET /posts/:postId 单独一篇的文章页
router.get('/:postId', function(req, res, next) {
    res.send(req.flash());
});

// GET /posts/:postId/edit 更新文章页
router.get('/:postId/edit', checkLogin, function(req, res, next) {
    res.send(req.flash());
});

// POST /posts/:postId/edit 更新一篇文章
router.post('/:postId/edit', checkLogin, function(req, res, next) {
    res.send(req.flash());
});

// GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove', checkLogin, function(req, res, next) {
    res.send(req.flash());
});

// POST /posts/:postId/comment 创建一条留言
router.post('/:postId/comment', checkLogin, function(req, res, next) {
    res.send(req.flash());
});

// GET /posts/:postId/comment/:commentId/remove 删除一条留言
router.get('/:postId/comment/:commentId/remove', checkLogin, function(req, res, next) {
    res.send(req.flash());
});

module.exports = router;