// # Module FAQ

// Used for files io (`readline` allows to read files line by line).
var fs = require('fs');
var readline = require('readline');

// ## Module Definition

/* The `FAQ` module has two entry points:

   - `parse(inputfile, callback)` which parses `inputfile` and call the
      `callback function on the result.
   - `convert(inputfile, outputfile)` which converts the `inputfile` to
      `the outputfile`.
*/
FAQ = (function() {

  // ### Helpers: functions and "constants"

  // Regex for matching level 1 and level 2 titles as categories and questions
  var catRegex = /#\s+(.+)/;
  var qRegex = /##\s+(.+)/;

  // Attempt parsing a category line.
  function parseCategory(line) {
    var res = catRegex.exec(line);
    if (res && res.index == 0) {
            return res[1];
    }
    return undefined;
  }

  // Attempt parsing a question line.
  function parseQuestion(line) {
    var res = qRegex.exec(line);
    if (res && res.index == 0) {
            return res[1];
    }
    return undefined;
  }


  // ### Main parsing function

  // Input file parser. Calls the `andThen` callback when finished.
  function parseMarkdown(inputFile, andThen) {

    // Parsing state
    var state = {
            categories: [],
            curr: {
        cat: [],
        q: '',
        a: ''
            }
    };

    // Handle line parsing through a machine state behavior
    function parseLine(line) {
            if (q = parseQuestion(line)) {
        console.log('Q ' + line);
        if (state.curr.q === '') {
          state.curr.q = q;
        } else if (state.curr.a === '' &&
            ! state.categories.length === 0) {
          throw "Question '" + state.curr.q + "' has no answer";
        } else { // we already have one q and one a,
          // we push them and create a new one.
          state.curr.cat.push({ head: state.curr.q,
            body: state.curr.a });
          state.curr.q = q;
          state.curr.a = '';
        }
            } else if (c = parseCategory(line)) {
        console.log('C ' + line);
        if (state.curr.cat.length > 0) {
          state.curr.cat.push({ head: state.curr.q,
            body: state.curr.a });
          state.curr.q = '';
          state.curr.a = '';
          state.categories.push(state.curr.cat);
          state.curr.cat = [];
        }
        state.curr.cat.push({ title: c });
            } else if (!(line === '' && state.curr.a === '')) {
        console.log('A ' + line);
        state.curr.a += line + '\n';
            }
    }

    // Handle end of file and calls the callback function.
    function finish(close) {
            if (state.curr.a !== '') {
        state.curr.cat.push({ head: state.curr.q, body: state.curr.a });
            }
            if (state.curr.cat.length > 0) {
        state.categories.push(state.curr.cat);
            }
            console.log(state.categories);
            andThen(state.categories);
    }

    // Read a file line by line, calling both handlers defined above.
    readline.createInterface({
            input: fs.createReadStream(inputFile),
            terminal: false
    }).on('line', parseLine).on('close', finish);

  }

  // ### Convenience functions
  // Parse mark down and save the resulting json to a file.
  function parseAndWrite(inputFile, outputFile) {
    parseMarkdown(inputFile, function(content) {
            var str = JSON.stringify(content, null, 4);
            fs.writeFile(outputFile, str, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('JSON saved to ' + outputFile);
        }
            });
    });
  }

  // ### Public interface

  return {
    convert: parseAndWrite,
    parse: parseMarkdown
  };

}());

module.exports = FAQ;
