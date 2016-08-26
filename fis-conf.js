
/*************************配置*****************************/
// 项目名

var app = 'demo';

fis
  .set('dist', '../release/' + app) // 发布目录
  .set('baseURL', '/' + app) // 发布目录
  .set('assets', '/assets'); // 静态目录

/*************************目录规范*****************************/

fis
  .match('**/*.styl', {
    // 编译之后后缀
    rExt  : '.css',
    // 开启编译
    parser: fis.plugin('stylus')
  })
  .match('*.png', {
    // 压缩图片
    optimizer: fis.plugin('png-compressor', {
      type: 'pngquant'
    })
  })
  .match('::package', {
    spriter     : fis.plugin('csssprites', {
      margin: 10, //图之间的边距
      layout: 'matrix' //使用矩阵排列方式，默认为线性`linear`
    })
  });
