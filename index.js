/**
 * @file edp-provider-rider
 */

var stylus = require('stylus');
var rider = require('rider');
var ap = require('autoprefixer');

/**
 * autoprefixer
 * 
 * @param  {Array}   args      autoprefixer options
 * @param  {Function} callback provider callback
 * @return {Function}          autoprefixer function
 */
function prefixer(args, callback) {

    return function (err, css) {

        if (err) {
            callback(err);
        }

        return ap.apply(
            this, 
            args || [ "android >= 2.3", "ios >= 5", "ie >= 10" ]
            ).process(css).css;
    };
    
}

/**
 * 编译
 * 
 * @param  {Object}     options  options
 * @param  {boolean=}   options.implicit  引入rider
 * @param  {Array|boolean=}     options.autoprefixer  autoprefixer支持
 * @param  {boolean=}   options.resolveUrl resolve url
 * @param  {Function=}  options.use  use
 * @param  {Function=}  callback provider callback
 */
function plugin(options, callback) { 
    options = options || {};

    return function (style) {

        style.set('resolve url', options.resolveUrl || true);

        style.use(
            rider({
                implicit: options.implicit
            })
        );

        if (options.autoprefixer !== false) {
            style.on('end', prefixer(options.autoprefixer, callback));
        }

        if (options.use) {
            style.use(options.use);
        }
    };
}

module.exports = exports = {
    stylus: stylus,
    rider: rider,
    autoprefixer: ap,
    plugin: plugin
};
