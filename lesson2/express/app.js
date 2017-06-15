/**
 *
 * Created by zzq on 2017/6/15.
 */
const router = require('./router'),
    route = router.router,
    express = router.express,
    app = express();

// 配置http请求
//第一个参数为映射虚拟路径，加了之后get请求时需要加上他
// app.use('/data',route)
app.use('/data',route);

// 配置静态资源
app.use(express.static('assets'))

app.listen(3000, function () {
    "use strict";

})