/**
 * Created by zzq on 2017/7/7.
 */
const
    express = require('express')
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

io.on('connection', function (socket) {
    console.log('connection complte')
    socket.on('_SENDMSG', function (data) {
        io.sockets.emit('updateLog', data);     // 将用户名和消息内容发送给前端用户
    });
    socket.on('_ENTER', function (data) {       // 新用户登入
        socket.name = data;
        console.log(socket);
        io.sockets.emit('enter',data);
    });

    socket.on('disconnect', function(data){     // 用户退出
        "use strict";
        console.log(socket.name+'离开了');
        io.sockets.emit('exit', socket.name);
    })
})

module.exports = io;