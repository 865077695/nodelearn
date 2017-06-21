/**
 * Created by zzq on 2017/6/21.
 */
const
    config = require('config-lite')(__dirname),
    Mongolass = require('mongolass');

const
    mongolass = new Mongolass();

mongolass.connect(config.mongodb)