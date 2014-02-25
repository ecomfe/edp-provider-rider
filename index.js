/**
 * @file edp-provider-rider
 */

var stylus = require('stylus');
var rider = require('rider');
var ap = require('autoprefixer');

/**
 * autoprefixer 
 * @param  {array}   args      autoprefixer options
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
 * @param  {Object}   options  options
 * @param  {Function} callback provider callback
 */
function plugin(options) { 

    return function (stylus) {

        stylus.use(rider({
            implicit: options.implicit
        }))
        .on('end', prefixer(options.autoprefixer, callback));

        if (options.plugin) {

            stylus.use(plugin);

        }

    };

}

module.exports = exports = {
    stylus: stylus,
    rider: rider,
    autoprefixer: ap,
    provider: plugin
};
