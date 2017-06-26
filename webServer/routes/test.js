/**
 * Created by zzq on 2017/6/26.
 */
/*
 * markdown转html测试
 * */
const
    fs = require('fs'),
    express = require('express'),
    marked = require('marked'),
    heightLight = require('highlight.js'),
    router = express.Router();

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value;
    }
});
router.get('/', function (req, res) {
    "use strict";
    fs.readFile('./md/1.md', 'utf-8', function(err, data){
        "use strict";
        if(err){
            throw err
        }
        console.log(data)
        console.log(marked(data))
        res.send(marked(data))
    })
})

module.exports = router;