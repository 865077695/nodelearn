/**
 * Created by zzq on 2017/6/21.
 */
var User = require('../lib/mongo').User;

module.exports = {
    //注册一个用户d
    create: function(user){
        "use strict";
        return User.create(user).exec();
    },

    //通过用户名获取用户信息
    getUserByName: function (name) {
        return User
            .findOne({name:name})
            // .addCreatedAt()
            .exec()
    }
}