if (process.env.NODE_ENV === 'development') {
    module.exports = require('./packconfig/dev');
} else {
    module.exports = require('./packconfig/build');
}


