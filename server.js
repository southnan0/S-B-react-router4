require('babel-register')({
    'plugins': [
        [
            'babel-plugin-transform-require-ignore',
            {
                extensions: ['.scss','.less']
            }
        ]
    ]
});

module.exports = require('./servers/index.js');