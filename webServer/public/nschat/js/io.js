/**
 * Created by zzq on 2017/7/10.
 */
$(function () {
    $('.ipt').focus();
    var socket = io.connect();  //连接服务器，触发connection事件
    var username;
    // 查询用户名
    $.ajax({
        url: '/user/userInfo',
        method: 'GET',
        success: function (userInfo) {
            if (userInfo == '400') {
                console.log('未登录')
            } else {
                username = userInfo;
                socket.emit('_ENTER', username)
            }
        }
    });
    $('.sendMsg').on('click', function () {
        var newMsg = $('.ipt').html();
        console.log(newMsg);
        socket.emit('_SENDMSG', {   // 将该用户的聊天信息发送至服务器
            name: username,
            newMsg: newMsg
        });
    });
    // 监听enter事件，有人进入聊天室时触发
    socket.on('enter', function (data) {
        console.log(data);
        $('.record').append('<p>欢迎 <span style="color:mediumvioletred;">' + data + '</span> !</p>')
    });
    // 监听用户退出事件
    socket.on('exit', function (data) {
        $('.record').append('<p><span style="color:mediumvioletred;">' + data + '</span> 离开了!</p>')
    })
    // 监听消息更新，当有用户发送消息时触发
    socket.on('updateLog', function (data) {
        var name = data.name;
        var msg = data.newMsg;
        if (name == username) {
            name = '我';
            $('.log').append('<li><span class="log-name" style="text-align: right">' + name + ' 说:</span><span class="log-detail log-self">' + msg + '</span></li>')
        }
        else {
            $('.log').append('<li><span class="log-name">' + name + ' 说:</span><span class="log-detail log-other">' + msg + '</span></li>')
        }
    });
})