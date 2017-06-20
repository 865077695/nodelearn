/**
 * Created by zzq on 2017/6/16.
 */

const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send('Hello,express!')
});

app.get('/users/:name', function (req, res) {
    if (req.query){
        name = req.query.name || ''
    }
    res.send('Hello, '+req.params.name+name);
})
app.listen(3000)