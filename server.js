const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const rf = require('fs');
const app = express();
const proxy = require('http-proxy-middleware');

// 本地测试启动webpack打包
if (process.env.NODE_ENV === 'development') {
    const webpack = require('webpack');
    const config = require('./webpack.config');
    const compiler = webpack(config);
    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }));
}

// 访问静态资源
app.use('/ms/activity/res', express.static('dist'));

// 路由
app.get(/ms\/activity/, function (req, res) {
    handleSend('dist/activity.html', req, res);
});

// 为了设置界面的header信息，动态向界面输出window._headers
// 通过rf获取location地址的文件,找到</head>下标，截断在向文件中添加全局window._headers对象
function handleSend(location, request, response) {
    let html;
    // 设置会话cookie
    if (process.env.NODE_ENV === 'development') {
        app.use(cookieParser());
        response.cookie('test', '测试');
    }
    rf.readFile(path.resolve(__dirname, location), 'utf-8', function (err, data) {
        if (err) {
            console.error(err);
        } else {
            let he = JSON.stringify(request.headers);
            html = data.replace('</head>', '<script>window._headers = ' + he + ' </script></head>');
            response.send(html);
            response.end();
        }
    });
}

// 使用代理并启动服务
if (process.env.NODE_ENV === 'development') {
    let proxyHost = 'http://dev.caibeike.net';
    let proxyName = '/mweb/';
    app.use(proxyName, proxy({
        target: proxyHost,  // 目标服务器 host
        changeOrigin: true,         // 默认false，是否需要改变原始主机头为目标URL
    }));
}

// 启动
app.listen(5000, function () {
    console.log('端口号:5000');
});