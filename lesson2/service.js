/**
 * Created by zzq on 2017/6/15.
 */

const express = require('express')

const app = express()

// app.get('/', function (req, res) {
//     "use strict";
//     res.send('Hello World!')
// })
//
// app.get('/b', function (req, res) {
//     "use strict";
//     res.send('路由b')
// })
//
// app.get('/download', function (req, res) {
//     "use strict";
//     res.download('service.js')
//     res.send('下载页面')
// })
// // 这个需要写在最后，因为这个是匹配所有路径的，如果放前面会优先匹配这个
// app.get('*', function (req, res) {
//     "use strict";
//     res.send('无效路径跳转至此页面')
// })
// sss是一个不存在的虚拟路径，这样映射之后我们在访问静态资源时，需要在文件名前面加上这个目录
app.use('/sss',express.static('assets'))

const server = app.listen(3000, function () {
    "use strict";
    let host = server.address().address
    let port = server.address().port
    console.log(host)
    console.log('app listening at http://%s:%s', host, port);
})