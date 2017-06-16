/**
 * Created by zzq on 2017/6/16.
 */
const express = require('express'),
    app = express(),
    indexRouter = require('./routers/index'),
    userRouter = require('./routers/users');

// 将路由挂载至应用
app.use('/',indexRouter)
app.use('/users',userRouter)

app.listen(3000)