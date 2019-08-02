module.exports = {
    devServer: {
      proxy: {
        'v3': {
          target: 'https://s3.amazonaws.com/technical-challenge',
          changeOrigin: true
        },
      }
    }
  }