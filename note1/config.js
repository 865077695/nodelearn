module.exports={
    defaultFile:'index.html',
    port:'80',
    defaultStaticeFileDir:'assets',//默认静态资源目录
    expires:{
        fileMatch:/^(png|jpg|gif|js|css)$/g,
        maxAge:60*60*24*365*1000
    },
    compress:{
        match:/css|html|js/ig
    }
}