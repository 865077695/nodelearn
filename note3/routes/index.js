/**
 * Created by zzq on 2017/6/16.
 */
module.exports = function (app) {
    "use strict";
    app.get('/', function (req, res) {  // /重定向至/posts
        res.redirect('/posts');
    });
    app.use('/signup', require('./signup'));
    app.use('/signin', require('./signin'));
    app.use('/signout', require('./signout'));
    app.use('/posts', require('./posts'));
}