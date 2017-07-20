/**
 * Created by zzq on 2017/7/7.
 */
module.exports = function (server) {
    const io = require('socket.io').listen(server)
    // 定义单例数组来保存当前在线的用户
    if (!live_list) {
        var live_list = [];
    }
    io.on('connection', function (socket) {
        console.log('connection complte')
        socket.on('_BROADCAST', function (data) {
            io.sockets.emit('newMsg', data);     // 将用户名和消息内容发送给前端用户
        });
        socket.on('_ENTER', function (data) {       // 新用户登入
            // 检测socket.live_list内是否有这个user，没有的话就添加进去
            console.log(data)
            if (live_list.indexOf(data.user) == -1) {
                live_list.push(data.user)
            }

            console.log(live_list)
            socket.user = data.user;
            console.log('socket.id:' + socket.id)
            io.sockets.emit('enter', {
                live_list: live_list,       // 在线列表
                user: socket.user           // 登入者
            });
        });

        socket.on('disconnect', function (data) {     // 用户退出
            "use strict";
            console.log(socket.user + '离开了');
            var idx = live_list.indexOf(socket.user);
            console.log(idx);
            if (idx != -1) {
                live_list.splice(idx, 1);
            }
            console.log(live_list)
            // live_list.joi
            io.sockets.emit('exit', {
                user: socket.user,          // 离开者
                live_list: live_list         // 新的在线列表
            });
        })
    })
}