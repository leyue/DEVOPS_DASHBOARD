module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-write-svg': {
      utf8: false,
    },
    // 'postcss-px-to-viewport': {
    //   //视窗宽度，对应设计稿的宽度，一般750
    //   viewportWidth: 1920,
    //   //视窗宽度，对应设计稿的宽度，根据750设备的宽度来指定，一般是1334，也可以不配置
    //   // viewportHeight: 1000,
    //   //指定px转换位视窗单位值的小数位数
    //   unitPrecision: 3,
    //   // 能转化为vw的属性列表
    //   propList: ['*', 'style', 'top'],
    //   //指定需要转换成的视窗单位，建议使用vw
    //   viewportUnit: 'vw',
    //   //指定不转换为视窗单位的类，可以自定义们可以无限添加
    //   selectorBlackList: ['.ignore'],
    //   //小于等于npx不转换为视窗单位，
    //   minPixelValue: 1,
    //   //允许在媒体查询中转换px
    //   mediaQuery: false,
    //   //那些文件夹不参与转换
    //   exclude: /node_modules/,
    // },
    cssnano: {
      preset: 'advanced',
      // 和cssnext同样具有autoprefixer，保留一个
      autoprefixer: false,
      'postcss-zindex': false,
    },
  },
}
