module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8080,     // 端口
    proxy: {
      '/api': {
        changeOrigin: true,
        target: "http://127.0.0.1:8080",
        pathRewrite: {
          '^/api': ""
        }
      }
    }
  },
};
