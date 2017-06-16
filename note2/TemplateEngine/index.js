const path = require('path'),
    express = require('express'),
    app = express(),
    indexRouter = require('./routers/index'),
    usersRouter = require('./routers/users');

app.set('views',path.join(__dirname,'views'));  //设置存放模板文件的目录
app.set('view engine','ejs');   //设置模板引擎为ejs

app.use('/',indexRouter);
app.use('/users',usersRouter);

app.listen(3000);