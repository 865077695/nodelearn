/**
 * Created by zzq on 2017/7/4.
 */
const
    express = require('express'),
    router = express.Router();

router.get('/', function (req, res, next) {
    console.log(req);
    "use strict";
    res.send('asdasd');
})

router.post('/', function(req,res,next){
    "use strict";
    console.log(req);
    res.send('djju');
})

module.exports = router;