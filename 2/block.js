/* 2/block.js
 */

var fs = require('fs');
var fileName = 'input.txt';

var first_read = fs.readFileSync(fileName, 'utf8');

console.log("1st read >>" , first_read);

/* Create the test file (this is sync on purpose) */
fs.writeFileSync(fileName, 'updated text', 'utf8');

/* read the test file */
var last_read = fs.readFileSync(fileName, 'utf8');

console.log("last read >>", last_read);
