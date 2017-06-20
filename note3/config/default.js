module.exports = {
    port: 3000,                                     // 启动程序要监听的端口
    session: {
        secret: 'myblog',                           // express-session的配置信息
        key: 'myblog',
        maxAge: 2592000000
    },
    mongodb: 'mongodb://localhost:27017/myblog'     // mongodb的地址，myblog为db名
}