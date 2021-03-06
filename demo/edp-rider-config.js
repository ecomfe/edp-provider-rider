/**
 * @file rider/stylus 配置
 * @author edpx-mobile
 */

// 引入 rider 支持
var epr = require('../index');

// 初始化 stylus 插件
epr.stylusPlugin = epr.plugin({

    // 隐式引入 rider
    implicit: true,

    // 是否解析 url 中的路径
    resolveUrl: true,

    // 追加 stylus 配置，可在此处引入 stylus 插件
    // @see: http://learnboost.github.io/stylus/docs/js.html#usefn
    // use: funcion(style) {},

    // husl 插件，需要时启用
    // @see: http://www.boronine.com/husl/
    husl: true,

    // mqpacker，默认启用
    // @see: https://github.com/hail2u/node-css-mqpacker
    // mqpacker: false,

    // autoprefixer 配置
    // @see: https://github.com/postcss/autoprefixer-core#usage
    autoprefixer: [
        'Android >= 2.3',
        'iOS >= 5',
        'ExplorerMobile >= 10'
    ]
});

module.exports = epr;
