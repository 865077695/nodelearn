/**
 * Created by zzq on 2017/6/21.
 */
const
    config = require('config-lite')(__dirname),
    Mongolass = require('mongolass'),
    monment = require('moment');

const
    mongolass = new Mongolass();

mongolass.connect(config.mongodb);

let objectIdToTimeStamp = require('objectid-to-timestamp');

// 根据id生成创建时间
// mongolass.plugin('addCreatedAt', {
//     afterFind: function(results) {
//         "use strict";
//         results.forEach(function(item){
//             item.create_at = moment(objectIdToTimeStamp(item._id))
//         })
//     }
// })

exports.User = mongolass.model('User', {
    name: {type:'string'},
    password:{type:'string'},
    gender: { type: 'string', enum: ['m', 'f', 'x'] }
})

exports.User.index({name:1},{unique:true}).exec();//根据用户名找到用户，用户名全局唯一

// exports.Post = mongolass.model('Post', {
//     author: {type: Mongolass.Types.ObjectId},
//     title: {type:'string'},
//     content: {type:'string'},
//     pv: {type:Number}
// })
//
// exports.Post.index({author:1,id:-1}).exec();// 按照创建时间降序查看用户文章列表
//
// exports.Comment = mongolass.model('Comment', {
//     author: { type: Mongolass.Types.ObjectId },
//     content: { type: 'string' },
//     postId: { type: Mongolass.Types.ObjectId }
// });
// exports.Comment.index({ postId: 1, _id: 1 }).exec();// 通过文章 id 获取该文章下所有留言，按留言创建时间升序
// exports.Comment.index({ author: 1, _id: 1 }).exec();// 通过用户 id 和留言 id 删除一个留言