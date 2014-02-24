/**
 * @file edp-provider-rider
 */

var stylus = require('stylus');
var rider = require('rider');
var ap = require('autoprefixer');

function prefixer(args, css) {
    return ap.apply(this, args).process(css).css;
}

function compileAsync(str, options, callback ) {

    stylus(str)
        .set('filename', options.pathname)
        .set('compress', !!options.compress)
        .set('paths', options.paths)
        .use(function( style ) {

            if (!!options.importRider) {
                rider();
            }

            if ('function' === typeof options.use) {
                options.use( style );
            }

        })
        on('end', function (err, css) {

            return options.autoprefixer ? prefixer(options.autoprefixer) : css;

        })
        .render(function (err, css) {

            if ( err ) {
                callback( err );
            }
            else {
                callback( null, css );
            }

        });

}

module.exports = exports = compileAsync;