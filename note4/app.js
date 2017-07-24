/**
 * Created by zzq on 2017/7/24.
 */
const
    eventproxy = require('eventproxy'),
    superagent = require('superagent'),
    cheerio = require('cheerio'),
    url = require('url');

const
    cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl)
    .end(function (err, res) {
        // console.log(res)
        if (err) {
            return console.error(err)
        }
        var topicUrls = [];
        var $ = cheerio.load(res.text);
        // 获取首页所有topic的连接
        $('#topic_list .topic_title').each(function (idx, element) {
            var $element = $(element);
            // topic_title的href本来是 /topic/1371264138asd8uda82
            // 我们用url.resolve来自动推断出完整的url，变成
            // https://cnodejs.org/topic/1238yd8hdjka的形式
            var href = url.resolve(cnodeUrl, $element.attr('href'));
            topicUrls.push(href);
        })
        console.log(topicUrls);

        var ep = new eventproxy();
        ep.after('topic_html', topicUrls.length, function (topics) {
            topics = topics.map(function (topicPair) {
                var topicUrl = topicPair[0],
                    topicHtml = topicPair[1];
                var $ = cheerio.load(topicHtml);
                return ({
                    title: $('.topic_full_title').text().trim(),
                    href: topicUrl,
                    comment1: $('.reply_content').eq(0).text().trim()
                })
            })
            console.log('final:');
            console.log(topics)
        })

        topicUrls.forEach(function (topicUrl) {
            superagent.get(topicUrl)
                .end(function (err, res) {
                    console.log('fetch' + topicUrl + 'successful');
                    ep.emit('topic_html', [topicUrl, res.text])
                })
        })
    })