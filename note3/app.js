/**
 * Created by zzq on 2017/7/24.
 */
const
    express = require('express'),
    cheerio = require('cheerio'),       // jquery库
    superagent = require('superagent'); // 抓取网页

const
    app = express();

app.get('/', function (req, res, next) {
    superagent.get('https://cnodejs.org')
        .end(function (err, sres) {
            if(err){
                return next(err)
            }
            var $ = cheerio.load(sres.text);
            var items = [];
            $('#topic_list .topic_title').each(function (idx, element) {
                var $element = $(element);
                items.push({
                    title: $element.attr('title'),
                    href: $element.attr('href')
                })
            })

            res.send(items);
        })
})

app.listen(3000, function () {
    console.log('app is listening at port 3000')
})