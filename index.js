/**
 * @file edp-provider-rider
 * @author junmer[junmer@foxmail.com],
 *         Firede[firede@firede.us]
 */

var stylus = require('stylus');
var rider = require('rider');
var ap = require('autoprefixer-core');
var husl = require('husl');

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
                {
                    browsers: args || ['Android >= 2.3', 'iOS >= 5', 'ExplorerMobile >= 10']
                }
            ).process(css).css;
    };
}

/**
 * 编译
 * 
 * @param  {Object}     options  options
 * @param  {boolean=}   options.implicit  引入rider
 * @param  {Array|boolean=}     options.autoprefixer  autoprefixer支持
 * @param  {boolean=}   options.husl husl支持
 * @param  {boolean=}   options.resolveUrl resolve url
 * @param  {Function=}  options.use  use
 * @param  {Function=}  callback provider callback
 */
function plugin(options, callback) { 
    options = options || {};

    return function (style) {

        if (options.resolveUrl !== false) {
            style.define('url', stylus.resolver());
        }

        style.use(
            rider({
                implicit: options.implicit
            })
        );

        if (options.autoprefixer !== false) {
            style.on('end', prefixer(options.autoprefixer, callback));
        }

        if (options.husl) {
            // define husl & huslp
            style.define('husl', function (H, S, L, A) {
                var rgb = husl._rgbPrepare(husl._conv.husl.rgb([H.val, S.val, L.val]));
                var a = (A !== undefined ? A.val : 1);
                return new stylus.nodes.RGBA(rgb[0], rgb[1], rgb[2], a);
            });
            style.define('huslp', function (H, S, L, A) {
                var rgb = husl._rgbPrepare(husl._conv.huslp.rgb([H.val, S.val, L.val]));
                var a = (A !== undefined ? A.val : 1);
                return new stylus.nodes.RGBA(rgb[0], rgb[1], rgb[2], a);
            });
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
    husl: husl,
    plugin: plugin
};
