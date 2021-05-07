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
    port: 5000,
    https: false,
    proxy: {
      '/api': {
        target: 'http://172.20.10.3:8080', // http://172.20.10.4:8080后台服务器地址（仅限开发使用），正式上线后需要使用NGINX
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': ''// 请求的时候使用这个api就可以。http://XXXX/api会全部被替换为target的内容。
        }
      }
    }
  }
}
