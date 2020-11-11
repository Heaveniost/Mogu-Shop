module.exports = {
  configureWebpack: {
    resolve: {
      //为目录取别名，使页面更简洁
      alias: {
        'views': '@/views',
        'components': '@/components',
        'network': '@/network',
        'common': '@/common',
        'assets': '@/assets',
      }
    }
  }
}