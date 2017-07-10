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
        console.log(data);
        io.sockets.emit('updateLog', data);     // 将用户名和消息内容发送给前端用户
    })
})

module.exports = io;