edp-provider-rider [![NPM version](https://badge.fury.io/js/edp-provider-rider.png)](https://npmjs.org/package/edp-provider-rider) [![Dependencies Status](https://david-dm.org/ecomfe/edp-provider-rider.png)](https://david-dm.org/ecomfe/edp-provider-rider)
===

[`edp`](https://github.com/ecomfe/edp) 的 [`rider`](https://github.com/ecomfe/rider) 支持模块，为 `webserver` 和 `build` 命令提供了预定配置，并保证项目依赖的 `stylus`、`rider`、`autoprefixer` 版本正确。

## 安装

```bash
npm install edp-provider-rider --save
```

## 配置

在 `edp-webserver-config.js` 与 `edp-build-config.js` 顶部引入：

```javascript
var epr = require('edp-provider-rider');
exports.stylus = epr.stylus;

// 默认配置
var stylusPlugin = epr.plugin();
```

配置也可以根据需要扩展：

```javascript
// 扩展配置，参数都是可选的
var stylusPlugin = epr.plugin({

    // 隐式引入 rider，默认为 true
    implicit: true,

    // 是否解析 url 中的路径，默认为 true
    resolveUrl: true,

    // autoprefixer 配置，以下为默认值，可设置 false 禁用
    autoprefixer: [ 'Android >= 2.3', 'iOS >= 5', 'ExplorerMobile >= 10' ],

    // husl 配置，默认为 false
    // 参考：http://www.boronine.com/husl/
    husl: true,

    // 手动追加 stylus 配置，可在此处引入 stylus 插件
    // 参考：http://learnboost.github.io/stylus/docs/js.html#usefn
    use: funcion(style) {}
});
```

在 `edp-webserver-config.js` 对应部分添加：

```javascript
autocss({
    stylus: {
        stylus: epr.stylus,
        use: stylusPlugin
    }
})
```

在 `edp-build-config.js` 对应部分添加：

```javascript
new StylusCompiler({
    stylus: epr.stylus,
    compileOptions: {
        use: stylusPlugin
    }
})
```
