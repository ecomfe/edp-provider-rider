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

    return function(err, css) {

        if (err) {
            callback(err);
        }

        return ap.apply(this, args).process(css).css;

    };
    
}

/**
 * 编译
 * @param  {string}   str      css str
 * @param  {Object}   options  options
 * @param  {Function} callback provider callback
 */
function compile(str, options, callback ) {

    stylus(str)
        .set('filename', options.filename)
        .set('compress', options.compress)
        .set('paths', options.paths)
        .use(rider({
            implicit: options.implicit
        }))
        .on('end', prefixer(options.autoprefixer, callback))
        .render(callback);

}

module.exports = exports = compile;