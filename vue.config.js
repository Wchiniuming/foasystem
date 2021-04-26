const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    proxy: {
      '/api': {
        target: 'http://192.168.43.164:8080',//这里后台的地址
        ws: true,
        changOrigin: true,//允许跨域
        pathRewrite: {
            '^/api': ''//请求的时候使用这个api就可以
        }
      }
    }
  }
}
