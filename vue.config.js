
module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        changeOrigin: true,
        target: "http://localhost:8080",
        pathRewrite: {
          '^/api': ""
        }
      },
    }
  },
};
