/**
 * test
 */

var fs = require('fs');
var path = require('path');
var complie = require('../index');

var fname = 'index';
var input = path.resolve(__dirname, fname + '.styl');
var output = path.resolve(__dirname, fname + '.css');
var content = fs.readFileSync(input).toString('utf-8');

console.log('[complie]', input);

complie(
    content, 
    {
        filename: input,
        paths: [ __dirname ],
        implicit: true,
        autoprefixer: ['android >= 2.3', 'ios >= 5'],
        compress: true
    }, 
    function (err, css) {
        if (err) {
            console.log('[err]', err);
        }
        else {
            console.log('[ok]', output);
            fs.writeFileSync(output, css);
        }
    }
);