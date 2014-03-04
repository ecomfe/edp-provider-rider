# edp-provider-rider

[saber/issues#11](https://github.com/ecomfe/saber/issues/11)

保证项目依赖的 `stylus`、`rider`、`autoprefixer` 版本正确

## Start

安装
```
npm install edp-provider-rider --save
```

配置

`edp-webserver-config.js`, `edp-build-config.js`

```javascript
var epr = require( 'edp-provider-rider' );
exports.stylus = epr.stylus;

// 默认配置
var stylusPlugin = epr.plugin();

// 扩展配置 
var stylusPlugin = epr.plugin({
    implicit: true,                                             //引入rider
    autoprefixer: [ "android >= 2.3", "ios >= 5", "ie >= 10" ], //autoprefixer支持
    use: funcion(){}                                            //stylus use扩展
});

// build
new StylusCompiler({
    compileOptions: {
        use: stylusPlugin
    }
})

// webserver
autocss({
    stylus: {
        stylus: epr.stylus,
        use: stylusPlugin
    }
})
```




