const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    wd: './lib/es6_global/src/core/Index.js',
  },
  mode: isProd ? 'production' : 'development',
  output: {
    path: path.join(__dirname, "dist"),
    // TODO use index.min.js whe prod
    filename: 'index.js',
  },
};
