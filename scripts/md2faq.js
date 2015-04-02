var FAQ = require('./mdfaq');

var args = process.argv;
if (args.length != 4) {
  console.log('ERROR: Invalid arguments');
  console.log('USAGE: ' +
      args[0] + ' ' +
      args[1] + ' <input.md> <output.json>');
  process.exit(1);
}
var inputFile = args[2];
var outputFile = args[3];

FAQ.convert(inputFile, outputFile);
