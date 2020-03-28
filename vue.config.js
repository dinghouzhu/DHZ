module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8083,     // 端口
    host: '192.168.101.29',
    proxy: {
      '/api': {
        changeOrigin: true,
        target: "http://localhost:8080",
        pathRewrite: {
          '^/api': ""
        }
      }
    }
  },
};
