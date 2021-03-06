/**
 * Created by zzq on 2017/7/7.
 */
const
    express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

if(!live_list){
    var live_list = []
}
io.on('connection', function (socket) {
    console.log('connection complte')
    socket.on('_SENDMSG', function (data) {
        io.sockets.emit('updateLog', data);     // 将用户名和消息内容发送给前端用户
    });
    socket.on('_ENTER', function (data) {       // 新用户登入
        // 检测socket.live_list内是否有这个name，没有的话就添加进去
        if(live_list.indexOf(data) == -1){
            live_list.push(data)
        }

        console.log(live_list)
        socket.name = data;
        console.log(socket.id)
        io.sockets.emit('enter', {
            live_list: live_list,       // 在线列表
            name: socket.name           // 登入者
        });
    });

    socket.on('disconnect', function (data) {     // 用户退出
        "use strict";
        console.log(socket.name + '离开了');
        var idx = live_list.indexOf(socket.name);
        console.log(idx);
        if(idx != -1){
            live_list.splice(idx,1);
        }
        console.log(live_list)
        // live_list.joi
        io.sockets.emit('exit', {
            name: socket.name,          // 离开者
            live_list:live_list         // 新的在线列表
        });
    })
})

module.exports = io;