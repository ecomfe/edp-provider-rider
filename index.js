/**
 * @file edp-provider-rider
 */

var stylus = require('stylus');
var rider = require('rider');
var ap = require('autoprefixer');

/**
 * autoprefixer 
 * @param  {Array}   args      autoprefixer options
 * @param  {Function} callback provider callback
 * @return {Function}          autoprefixer function
 */
function prefixer(args, callback) {

    return function (err, css) {

        if (err) {
            callback(err);
        }

        return ap.apply(this, args).process(css).css;

    };
    
}

/**
 * 编译
 * @param  {Object}     options  options
 * @param  {boolean=}   options.implicit  引入rider
 * @param  {Array=}     options.autoprefixer  autoprefixer支持
 * @param  {Function=}  options.use  use
 * @param  {Function=}  callback provider callback
 */
function plugin(options, callback) { 

    return function (stylus) {

        stylus.use(
            rider({
                implicit: options.implicit
            })
        )
        .on('end', prefixer(options.autoprefixer, callback));

        if (options.use) {

            stylus.use(options.use);

        }

    };

}

module.exports = exports = {
    stylus: stylus,
    rider: rider,
    autoprefixer: ap,
    plugin: plugin
};
