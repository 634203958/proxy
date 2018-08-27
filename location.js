let Address = {};

if (process.env.NODE_ENV === 'development') {
    Address.path = '//172.10.0.49:5000';
    Address.ajaxPath = '/mweb';
}

if (process.env.NODE_ENV === 'dev') {
    Address.path = '//dev.caibeike.net';
    Address.ajaxPath = '/mweb/';
}

if (process.env.NODE_ENV === 'pre') {
    Address.path = '//pre.caibeike.net';
    Address.ajaxPath = '/mweb';
}

if (process.env.NODE_ENV === 'production') {
    Address.path = '//m.caibeike.com';
    Address.ajaxPath = '/mweb';
}

Address.url = function (path) {
    return location.protocol + Address.path + path;
};

Address.ajaxUrl = function (path) {
    return Address.ajaxPath + path;
};

module.exports = Address;