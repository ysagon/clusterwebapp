
FAQ = (function(){

    var fs = require('fs');
    var readline = require('readline');
    
    var catRegex = /#\s+(.+)/;
    var qRegex = /##\s+(.+)/;
    
    function parseCategory( line ) {
	var res = catRegex.exec( line );
	if( res && res.index == 0 ) {
	    return res[1];
	}
	return undefined;
    }
    
    function parseQuestion( line ) {
	var res = qRegex.exec( line );
	if( res && res.index == 0 ) {
	    return res[1];
	}
    return undefined;
    }
    
    function md2json( inputFile, outputFile ) {
	var state = {
	    categories: [],
	    curr: {
		cat: [],
		q: [],
		a: ""
	    }
	};
 
	readline.createInterface({
	    input: fs.createReadStream(inputFile),
	    terminal: false
	}).on('line', function(line){
	    if( q = parseQuestion( line ) ) {
		if( state.curr.Q == "" ) {
		    state.curr.Q = q;
		} else if( state.curr.A == "" ){
		    throw "Question '"+ state.curr.Q +"' has no answer";
		} else {
		    state.curr.cat.push( { head: state.curr.Q, body: state.curr.A } )
		    state.curr.Q = q;
		    state.curr.A = ""
		}
	    } else if( c = parseCategory( line ) ) {
		if( state.curr.cat.length > 0 ) {
		    state.categories.push( state.curr.cat );
		    state.curr.cat = [];
		}
		state.curr.cat.push( { title: c } );
	    } else if( !(line == "" && state.curr.A == "") ) {
		state.curr.A += line + "\n";
	    }	
	}).on('close', function(close){
	    if( state.curr.cat.length > 0 ) {
		state.categories.push( state.curr.cat );
	    }
	    var str = JSON.stringify(state.categories, null, 4);
	    fs.writeFile(outputFile, str, function(err) {
		if(err) {
		    console.log(err);
		} else {
		    console.log("JSON saved to " + outputFile );
		}
	    }); 
	});
    }

    return {
	convert: md2json
    };
}());


var args = process.argv;
if( args.length != 4 ) {
    console.log("ERROR: Invalid arguments")
    console.log("USAGE: " + args[0] + " " + args[1] + " <input.md> <output.json>" );
    process.exit(1);
}
var inputFile = args[2];
var outputFile = args[3];

FAQ.convert( inputFile, outputFile );