/**
 * Created by zzq on 2017/7/7.
 */
const
    express = require('express')
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

io.on('connection', function (socket) {
    socket.on('foo', function (data) {
        console.log(data)
        socket.emit('bar', {name: 'zhiq'})
    });
})

module.exports = io;