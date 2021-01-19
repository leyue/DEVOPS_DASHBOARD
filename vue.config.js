module.exports = {
  outputDir: 'dist',
  assetsDir: 'assets',
  lintOnSave: true,
  publicPath: './',
  devServer: {
    open: true,
    host: '127.0.0.1',
    port: '8080',
    proxy: {
      '/verify': {
        target: 'http://review.source.unisoc.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/verify': '',
        },
      },
    },
  },
}
