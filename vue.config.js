module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        changeOrigin: true,
        target: "http://127.0.0.1:8080",
        pathRewrite: {
          '^/api': ""
        }
      }
    }
  }
};
