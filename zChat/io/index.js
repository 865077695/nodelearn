/**
 * Created by zzq on 2017/7/7.
 */
module.exports = function (server) {
    const io = require('socket.io').listen(server)
    // 定义单例数组来保存当前在线的用户,包含用户名和该用户名所在客户端当前连接的socketId
    if (!list) {
        var list = [];
    }
    // [{user:'zhiq',id:'aaaaa'},{user:'aaa',id:'bbbbbb'}]
    io.on('connection', function (socket) {
        console.log('connection complte')
        // 公共聊天室发送消息
        socket.on('_BROADCAST', function (data) {
            io.sockets.emit('newMsg', data);     // 将用户名和消息内容发送给所有用户
        });
        // 私聊
        socket.on('_BROADCAST_PRIVATE', function (data) {
            socket.broadcast.to(getSocketId(data.reciever)).emit('PrivateMsg', {msg: data.msg, sender: data.sender});
        })

        socket.on('_ENTER', function (data) {       // 新用户登入
            // 检测socket.live_list内是否有这个user了，没有才加进去
            updateList(list, data.user, socket.id);
            socket.user = data.user;
            io.sockets.emit('enter', {live_list: list, user: data.user});
        });

        socket.on('disconnect', function (data) {     // 用户退出
            console.log(socket.user + '离开了');
            deleteUser(list, socket.user)
            console.log(list)
            // live_list.joi
            io.sockets.emit('exit', {live_list: list, user: socket.user});
        })
    })
    // 进入时添加
    function updateList (arr, user, id) {
        var flag = false
        // 如果user已存在，那就替换id
        for (var i in arr) {
            if (arr[i].user === user) {
                arr[i].id = id;
                flag = true;
            }
        }
        // 如果不存在
        if (!flag) {
            arr.push({user: user, id: id})
        }
    }

    // 离开时删除
    function deleteUser (arr, user) {
        for (var i in arr) {
            if (arr[i].user === user) {
                arr.splice(i, 1)
            }
        }
    }

    // 获取user对应的socketid
    function getSocketId (user) {
        for (var i in list) {
            if (list[i].user === user) {
                return list[i].id
            }
        }
        return ''
    }
}