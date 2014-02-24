/**
 * test
 */

var fs = require('fs');
var complie = require('../index');

var fname = 'layout';
var input = fname + '.styl';
var output = fname + '.css';

complie(
	fs.readFileSync(input), 
	{
		pathname: __dirname,
		importRider: true,
		autoprefixer: ["android >= 2.3", "ios >= 5"],
	}, 
	function (err, css) {
	if (err) {

	}
	else {
		fs.writeFileSync(output, css);
	}
});