/**
 * Created by zzq on 2017/6/20.
 */
module.exports = {
    checkLogin: function checkLogin(req, res, next) {
        console.log(req.session)
        if (!req.session.user) {
            // req.flash('error', '未登录');
            // res.send('未登录')
            return res.redirect('/signin');
        }
        next();
    },

    checkNotLogin: function checkNotLogin(req, res, next) {
        if (req.session.user) {
            req.flash('error', '已登录');
            return res.redirect('back');//返回之前的页面
        }
        next();
    }
};
