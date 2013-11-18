//****************************************************************************************************
// MODULE: string
//****************************************************************************************************
//|
//| string v1.0
//| ===========
//|
//| string is a unified Javascript RequireJS/CommonJS module for the browser and/or Wakanda Server 
//| (SSJS) which provides string methods not available in plain-vanilla javascript. It also offers
//| case-insensitive or case-sensitive string operations. Operations are case insensitive by default.
//|
//| This module does not modify the native Javascript String object prototype. Instead, it defines its
//| own string object and "imports" the native Javascript String Object methods and properties.
//| Therefore, the native String object methods are directly available to be used with this module's
//| string object. Case-sensitive native String object methods (such as [indexOf()](#INDEXOF)) are
//| replaced by this module and default to case-insensitive mode. 
//|
//| This module is based heavily on [string.js](http://stringjs.com) by JP Richardson
//| <jprichardson@gmail.com>.
//|
//| Why?
//| ----
//| Here's what JP Richardson says about his [string.js](http://stringjs.com) module:
//|
//| > Here's a list of alternative frameworks:
//| >
//| > * [Prototype Framework's String library](http://prototypejs.org/api/string)
//| > * [Uize.String](http://www.uize.com/reference/Uize.String.html)
//| > * [Google Closure's String](http://closure-library.googlecode.com/svn/docs/namespace_goog_string.html)
//| > * [Underscore.string](http://epeli.github.com/underscore.string/)
//| > * [Sugar.js](http://sugarjs.com)
//| > * [php.js](http://phpjs.org/pages/home)
//|
//| > Why wasn't I happy with any of them? They are all static methods that don't seem to support
//| > chaining in a clean way 'OR' they have an odd dependency. Sugar is the notable exception.
//|
//| In large measure, I agree with JP. So why not just use his [string.js](http://stringjs.com) module?
//| Well, I started out using it. I even extended it to default to case-insensitivity and allow for
//| case sensitive operations. Ultimately, I decided to create my own module based on JP's. Here's why:
//|
//| 1. [string.js](http://stringjs.com) exports a function. This can be problematic. See Alexandre
//| Morgaut's [Wakanda Forum post](http://tinyurl.com/lseesj8). At this point, I don't see string.js
//| being modified to take this into account. 
//|
//| 2. I wanted to break out JP's module into pure string operations, moving methods like 
//| **parseCSV()** that are only for special needs into their own module. JP is planning to do
//| something similar, but I didn't want to wait. 
//|
//| 3. Creating my own module allowed me to directly add methods from other libraries (like
//| [words()](#WORDS) or my own methods that I have found useful over the years (like
//| [orPlural()](#ORPLURAL)). 
//|
//| TOC
//|
//| Dependencies
//| ------------
//|
//| * [RequireJS](http://requirejs.org) on the client (browser) side.
//| * [Wakanda](http://www.wakanda.org) v6+.
//|
//| Script Files
//| ------------
//|
//| * string.js - Fully commented script. Update to contribute.
//| * string.min.js - Minimized script. For normal use.
//| * string.no-md.js - Commented script without markdown comments. Use for debugging.
//|
//| Example
//| -------
//|
//| ```javascript
//| var string = require('string');
//|
//| var doesIt = string.make('my cool string').left(3).trim().endsWith('y'); // true
//|```
//----------------------------------------------------------------------------------------------------
({define: typeof define === 'function' ? define : function (A,F) {var I = F.apply(null, A.map(require)); Object.keys(I).forEach(function(k) {exports[k] = I[k];});}}).define(

[], // No module dependencies.


function () {
	"use strict";
	
	var CASE;
	var make;
	var nativeStringPrototype = String.prototype;
	var publicInterface;
	
	//****************************************************************************************************
	// Constants
	//****************************************************************************************************
	//|
	//| Constants
	//| ---------
	//----------------------------------------------------------------------------------------------------
		
	//| ### CASE
	//| * INSENSITIVE *Default* - Do not take case into account when performing an operation.
	//| * SENSITIVE - Take case into account when performing an operation.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('Hello').isEqualTo('hello', CASE.SENSITIVE); // false
	//| ```
	//|

	CASE = {
			INSENSITIVE : 'INSENSITIVE',
			SENSITIVE 	: 'SENSITIVE'
		};

	Object.freeze(CASE);
	
	//****************************************************************************************************
	//****************************************************************************************************
	// Private Module Functions
	//****************************************************************************************************
	//****************************************************************************************************
	
	//****************************************************************************************************
	// attachNativeStringProperties
	//****************************************************************************************************
	function attachNativeStringProperties () {
		var name;
		var nativeProperties = getNativeStringProperties();

		for (name in nativeProperties) {
		    (function (name) {
		        var stringProp = nativeStringPrototype[name];
		        
		        if (typeof stringProp == 'function') {
		            //console.log(stringProp)
		            if (!Str.prototype[name]) {
		                if (nativeProperties[name] === 'string') {
		                    Str.prototype[name] = function() {
		                        //console.log(name)
		                        return new this.constructor(stringProp.apply(this.s, arguments));
		                    }
		                }
		                else {
		                    Str.prototype[name] = stringProp;
		                }
		            }
		        }
		    })(name);
		}
	}
	
	//****************************************************************************************************
	// getCaseOption
	//****************************************************************************************************
	function getCaseOption (caseOption) {
		return typeof caseOption === 'string' && CASE.hasOwnProperty(caseOption) ? caseOption : CASE.INSENSITIVE;
	}
	
	//****************************************************************************************************
	// getNativeStringProperties
	//****************************************************************************************************
	function getNativeStringProperties () {
		var func;
		var i;
		var name;
	    var names = getNativeStringPropertyNames();
	    var retObj = {};
		var type;
		
	    for (i = 0; i < names.length; ++i) {
	        name = names[i];
	        func = nativeStringPrototype[name];
	        
	        try {
	            type = typeof func.apply('teststring', []);
	            retObj[name] = type;
	        }
	        catch (e) {}
	    }
	    
	    return retObj;
	}

	//****************************************************************************************************
	// getNativeStringPropertyNames
	//****************************************************************************************************
	function getNativeStringPropertyNames () {
		var name;
		var objectNames;
	    var results = [];
	    var stringNames;
	    
	    if (Object.getOwnPropertyNames) {
	        results = Object.getOwnPropertyNames(nativeStringPrototype);
	        results.splice(results.indexOf('valueOf'), 1);
	        results.splice(results.indexOf('toString'), 1);
	        return results;
	    }
	    else { //meant for legacy cruft, this could probably be made more efficient
	        stringNames = {};
	        objectNames = [];
	        
	        for (name in String.prototype)
	        stringNames[name] = name;

	        for (name in Object.prototype) {
	        	delete stringNames[name];
	        }

	        //stringNames['toString'] = 'toString'; //this was deleted with the rest of the object names
	        for (name in stringNames) {
	            results.push(name);
	        }
	        return results;
	    }
	}

	//****************************************************************************************************
	// initialize
	//****************************************************************************************************
	// Initialize a string object with a given value. 
	//----------------------------------------------------------------------------------------------------
	function initialize (object, value) {
	    if (value !== null && value !== undefined) {
	        if (typeof value === 'string') {
	        	object.s = value;
	    	}
	        else {
	        	object.s = value.toString();
	    	}
	    }
	    else {
	        object.s = value; //null or undefined
	    }

	    if (value !== null && value !== undefined) {
	        if (object.__defineGetter__) {
	            object.__defineGetter__('length', function() {
	                return object.s.length;
	            })
	        }
	        else {
	            object.length = value.length;
	        }
	    }
	    else {
	        object.length = -1;
	    }
	}
	
	//****************************************************************************************************
	// Str
	//****************************************************************************************************
	// The constructor for string objects.
	//----------------------------------------------------------------------------------------------------
	function Str (value) {
	    initialize(this, value);
	}
	
	//****************************************************************************************************
	//****************************************************************************************************
	//|
	//| Module Functions
	//| ----------------
	//****************************************************************************************************
	//****************************************************************************************************

	//****************************************************************************************************
	// make
	//****************************************************************************************************
	//| ### make (value)
	//|
	//| To create a string object, simply call the **make()** function with an initial `value`.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('Hello').s; // 'Hello'
	//| ```
	//----------------------------------------------------------------------------------------------------
	make = function make (value) {
	    return new Str(value);
	};
	
	//****************************************************************************************************
	//****************************************************************************************************
	//|
	//| string Object Methods
	//| ----------------------
	//| ### Native String Object Methods
	//|
	//| This module does not modify the native Javascript String object prototype. Instead, it defines its
	//| own string object and "imports" the native Javascript String Object methods and properties.
	//| Therefore, the native String object methods are directly available to be used with this module's
	//| string object. Case-sensitive native String object methods (such as indexOf) are replaced by this
	//| module and default to case-insensitive mode. 
	//****************************************************************************************************
	//****************************************************************************************************

	//****************************************************************************************************
	// between
	//****************************************************************************************************
	//| ### between (left, right, caseOption)
	//|
	//| Extracts a string between `left` and `right` strings. `caseOption` is optional and defaults to
	//| CASE.INSENSITIVE. See the [CASE](#CASE) constants. 
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('<a>foobar</a>').between('<a>', '</a>').s; // 'foobar'
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.between = function between (left, right, caseOption) {
		caseOption = getCaseOption(caseOption);
		var s = this.s;
		
		if (caseOption === CASE.INSENSITIVE) {
			s = s.toUpperCase();
			left = left.toUpperCase();
			right = right.toUpperCase();
		}
		
		var startPos = s.indexOf(left);
		var endPos = s.indexOf(right);
		var start = startPos + left.length;
		return new this.constructor(endPos > startPos ?  this.s.slice(start, endPos) : "");
	};

	//****************************************************************************************************
	// capitalize
	//****************************************************************************************************
	//| ### capitalize ()
	//|
	//| Capitalizes the first character of a string.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('jon').capitalize().s; // 'Jon'
	//| string.make('JP').capitalize().s; // 'Jp'
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.capitalize = function capitalize () {
	    return new this.constructor(this.s.substr(0, 1).toUpperCase() + this.s.substring(1).toLowerCase());
	};
	
	//****************************************************************************************************
	// chompLeft
	//****************************************************************************************************
	//| ### chompLeft (prefix, caseOption)
	//|
	//| Removes `prefix` from start of string. `caseOption` is optional and defaults to CASE.INSENSITIVE.
	//| See the [CASE](#CASE) constants. 
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('foobar').chompLeft('foo').s; // 'bar'
	//| string.make('foobar').chompLeft('bar').s; // 'foobar'
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.chompLeft = function chompLeft (prefix, caseOption) {
		caseOption = getCaseOption(caseOption);
	    var s = this.s;
	    
		if (caseOption === CASE.INSENSITIVE) {
			s = s.toUpperCase();
			prefix = prefix.toUpperCase();
		}
		
	    if (s.indexOf(prefix) === 0) {
	        s = this.s.slice(prefix.length);
	        return new this.constructor(s);
	    }
	    else {
	        return this;
	    }
	};
	
	//****************************************************************************************************
	// chompRight
	//****************************************************************************************************
	//| ### chompRight (suffix, caseOption)
	//|
	//| Removes `suffix` from end of string. `caseOption` is optional and defaults to CASE.INSENSITIVE.
	//| See the [CASE](#CASE) constants. 
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('foobar').chompRight('bar').s; // 'foo'
	//| string.make('foobar').chompRight('foo').s; // 'foobar'
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.chompRight = function chompRight (suffix, caseOption) {
	    if (this.endsWith(suffix, caseOption)) {
	        var s = this.s;
	        s = s.slice(0, s.length - suffix.length);
	        return new this.constructor(s);
	    }
	    else {
	        return this;
	    }
	};

	//****************************************************************************************************
	// collapseWhitespace
	//****************************************************************************************************
	//| ### collapseWhitespace ()
	//|
	//| Converts all adjacent whitespace characters to a single space.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| var str = string.make('  String   \t libraries are   \n\n\t fun\n!  ')
	//|                  .collapseWhitespace().s; // 'String libraries are fun !'
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.collapseWhitespace = function collapseWhitespace () {
	    var s = this.s.replace(/[\s\xa0]+/g, ' ').replace(/^\s+|\s+$/g, '');
	    return new this.constructor(s);
	};

	//****************************************************************************************************
	// compareTo
	//****************************************************************************************************
	//| ### compareTo (value, caseOption)
	//|
	//| Returns 0 if the string is equal to `value`, 1 if the string is greater than `value` and -1 if the
	//| string is less than `value`. `caseOption` is optional and defaults to CASE.INSENSITIVE. See the
	//| [CASE](#CASE) constants. 
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('Hello').compareTo('hello'); // 0
	//| string.make('Hello').compareTo('also'); // 1
	//| string.make('Hello').compareTo('zebra'); // -1
	//| string.make('Hello').compareTo('hello', CASE.SENSITIVE); // 1
	//| string.make('Hello').compareTo('Hello', CASE.SENSITIVE); // 0
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.compareTo = function compareTo (value, caseOption) {
		var s1;
		var s2;
		
		caseOption = getCaseOption(caseOption);

		if (this.s === null) {
			if (value === null) return 0; else throw new Error("Cannot compare null to non-null value.");
		}
		
		if (typeof this.s === 'undefined' || typeof value === 'undefined') {
			throw new Error("Cannot compare undefined values.");
		}
		
		s1 = this.toString();
		s2 = value.toString();
		
	    if (caseOption === CASE.INSENSITIVE) {
			s1 = s1.toUpperCase();
			s2 = s2.toUpperCase();
	    }
		
    	if (s1 === s2) {
    		return 0;
    	}
    	else if (s1 > s2) {
    		return 1;
    	}
    	else {
    		return -1;
    	}
	};		

	//****************************************************************************************************
	// contains
	//****************************************************************************************************
	//| ### contains (value, caseOption)
	//|
	//| Returns *true* if the string contains `value`. `caseOption` is optional and defaults to
	//| CASE.INSENSITIVE. See the [CASE](#CASE) constants. 
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('JavaScript is one of the best languages!').contains('one'); // true
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.contains = function contains (value, caseOption) {
		var s = this.s;
		caseOption = getCaseOption(caseOption);
		
		if (caseOption === CASE.INSENSITIVE) {
			s = s.toUpperCase();
			value = value.toUpperCase();
		}
		
	    return s.indexOf(value) >= 0;
	};
	
	//****************************************************************************************************
	// count
	//****************************************************************************************************
	//| ### count (value, caseOption)
	//|
	//| Returns the count of the number of occurrences of the `value`. `caseOption` is optional and
	//| defaults to CASE.INSENSITIVE. See the [CASE](#CASE) constants. 
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('JP likes to program. JP does not play in the NBA.').count("JP"); // 2
	//| string.make('Does not exist.').count("Flying Spaghetti Monster"); // 0
	//| string.make('Does not exist.').count("Bigfoot"); // 0
	//| string.make('JavaScript is fun, therefore Wakanda is fun').count("fun"); // 2
	//| string.make('funfunfun').count("fun"); // 3
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.count = function count (value, caseOption) {
	    caseOption = getCaseOption(caseOption);
		var s = this.s;
	    var count = 0;
	    
		if (caseOption === CASE.INSENSITIVE) {
			s = s.toUpperCase();
			value = value.toUpperCase();
		}
		
	    var pos = s.indexOf(value);

	    while (pos >= 0) {
	        count += 1;
	        pos = s.indexOf(value, pos + 1);
	    }

	    return count;
	};

	//****************************************************************************************************
	// dasherize
	//****************************************************************************************************
	//| ### dasherize ()
	//|
	//| Returns a converted camel-cased string into a string delimited by dashes.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('dataRate').dasherize().s; // 'data-rate'
	//| string.make('CarSpeed').dasherize().s; // '-car-speed'
	//| string.make('yesWeCan').dasherize().s; // 'yes-we-can'
	//| string.make('backgroundColor').dasherize().s; // 'background-color'
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.dasherize = function dasherize () {
	    var s = this.trim().s.replace(/[_\s]+/g, '-').replace(/([A-Z])/g, '-$1').replace(/-+/g, '-').toLowerCase();
	    return new this.constructor(s);
	};

	//****************************************************************************************************
	// endsWith
	//****************************************************************************************************
	//| ### endsWith (suffix, caseOption)
	//|
	//| Returns *true* if the string ends with `suffix`. `caseOption` is optional and defaults to
	//| CASE.INSENSITIVE. See the [CASE](#CASE) constants. 
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make("hello jon").endsWith('jon'); // true
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.endsWith = function endsWith (suffix, caseOption) {
		caseOption = getCaseOption(caseOption);
		var s = this.s;
		
		if (caseOption === CASE.INSENSITIVE) {
			s = s.toUpperCase();
			suffix = suffix.toUpperCase();
		}
		
	    var l = s.length - suffix.length;
	    return l >= 0 && s.indexOf(suffix, l) === l;
	};

	//****************************************************************************************************
	// ensureLeft
	//****************************************************************************************************
	//| ### ensureLeft (prefix, caseOption)
	//|
	//| Ensures string starts with `prefix`. `caseOption` is optional and defaults to CASE.INSENSITIVE.
	//| See the [CASE](#CASE) constants. 
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('subdir').ensureLeft('/').s; // '/subdir'
	//| string.make('/subdir').ensureLeft('/').s; // '/subdir'
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.ensureLeft = function ensureLeft (prefix, caseOption) {
	    var s = this.s;
	    
	    if (this.startsWith(prefix, caseOption)) {
	        return this;
	    }
	    else {
	        return new this.constructor(prefix + s);
	    }
	};

	//****************************************************************************************************
	// ensureRight
	//****************************************************************************************************
	//| ### ensureRight (suffix, caseOption)
	//|
	//| Ensures string ends with `suffix`. `caseOption` is optional and defaults to CASE.INSENSITIVE.
	//| See the [CASE](#CASE) constants.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('dir').ensureRight('/').s; // 'dir/'
	//| string.make('dir/').ensureRight('/').s; // 'dir/'
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.ensureRight = function ensureRight (suffix, caseOption) {
	    var s = this.s;
	    
	    if (this.endsWith(suffix, caseOption)) {
	        return this;
	    }
	    else {
	        return new this.constructor(s + suffix);
	    }
	};

	//****************************************************************************************************
	// indexOf
	//****************************************************************************************************
	//| ### indexOf (value, caseOption, start)
	//|
	//| Returns the position of the first occurrence of `value` in the string. The optional `start`
	//| specifies the position at which to start the search. The default is 0. `caseOption` is optional
	//| and defaults to CASE.INSENSITIVE. See the [CASE](#CASE) constants. 
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make("The dog chased the cat.").indexOf('the'); // 0
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.indexOf = function indexOf (value, caseOption, start) {
		caseOption = getCaseOption(caseOption);
		var s = this.s;
		
	    if (caseOption === CASE.SENSITIVE) {
	        return s.indexOf(value, start);
	    }
	    else {
	        return s.toUpperCase().indexOf(value.toUpperCase(), start);
	    }
	};
	
	//****************************************************************************************************
	// isAlpha
	//****************************************************************************************************
	//| ### isAlpha ()
	//|
	//| Returns *true* if the string contains only letters.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make("afaf").isAlpha(); // true
	//| string.make('fdafaf3').isAlpha(); // false
	//| string.make('dfdf--dfd').isAlpha(); // false
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.isAlpha = function isAlpha () {
	    return !/[^a-z\xC0-\xFF]/.test(this.s.toLowerCase());
	};

	//****************************************************************************************************
	// isAlphaNumeric
	//****************************************************************************************************
	//| ### isAlphaNumeric ()
	//|
	//| Returns *true* if the string contains only letters and numbers.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make("afaf35353afaf").isAlphaNumeric(); // true
	//| string.make("FFFF99fff").isAlphaNumeric(); // true
	//| string.make("99").isAlphaNumeric(); // true
	//| string.make("afff").isAlphaNumeric(); // true
	//| string.make("Infinity").isAlphaNumeric(); // true
	//| string.make("-Infinity").isAlphaNumeric(); // false
	//| string.make("-33").isAlphaNumeric(); // false
	//| string.make("aaff..").isAlphaNumeric(); // false
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.isAlphaNumeric = function isAlphaNumeric () {
	    return !/[^0-9a-z\xC0-\xFF]/.test(this.s.toLowerCase());
	};

	//****************************************************************************************************
	// isEmpty
	//****************************************************************************************************
	//| ### isEmpty ()
	//|
	//| Returns *true* if the string is solely composed of whitespace or is `null` or `undefined`.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make(' ').isEmpty(); // true
	//| string.make('\t\t\t    ').isEmpty(); // true
	//| string.make('\n\n ').isEmpty(); // true
	//| string.make('helo').isEmpty(); // false
	//| string.make(null).isEmpty(); // true
	//| string.make(undefined).isEmpty(); // true
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.isEmpty = function isEmpty () {
	    return this.s === null || this.s === undefined ? true : /^[\s\xa0]*$/.test(this.s);
	};

	//****************************************************************************************************
	// isEqualTo
	//****************************************************************************************************
	//| ### isEqualTo (value, caseOption)
	//|
	//| Returns *true* if the string is equal to the `value`. `caseOption` is optional and defaults to
	//| CASE.INSENSITIVE. See the [CASE](#CASE) constants. 
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('Hello').isEqualTo('hello'); // true
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.isEqualTo = function isEqualTo (value, caseOption) {
		caseOption = getCaseOption(caseOption);

		if (this.s === null) {
			return value === null;
		}
		
		if (typeof this.s === 'undefined') {
			return typeof value === 'undefined';
		}
		
		if (value === null || typeof value === 'undefined') {
			return false;
		}
		
	    if (caseOption === CASE.SENSITIVE) {
	        return this.toString() === value.toString();
	    }

	    return this.toString().toUpperCase() === value.toString().toUpperCase();
	};		

	//****************************************************************************************************
	// isLower
	//****************************************************************************************************
	//| ### isLower ()
	//|
	//| Returns *true* if the character or string is lowercase.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('a').isLower(); // true
	//| string.make('z').isLower(); // true
	//| string.makeS('B').isLower(); // false
	//| string.make('hijp').isLower(); // true
	//| string.make('hi jp').isLower(); // false
	//| string.make('HelLO').isLower(); // false
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.isLower = function isLower () {
	    return this.isAlpha() && this.s.toLowerCase() === this.s;
	};

	//****************************************************************************************************
	// isNumeric
	//****************************************************************************************************
	//| ### isNumeric ()
	//|
	//| Returns *true* if the string only contains digits.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make("3").isNumeric(); // true
	//| string.make("34.22").isNumeric(); // false
	//| string.make("-22.33").isNumeric(); // false
	//| string.make("NaN").isNumeric(); // false
	//| string.make("Infinity").isNumeric(); // false
	//| string.make("-Infinity").isNumeric(); // false
	//| string.make("JP").isNumeric(); // false
	//| string.make("-5").isNumeric(); // false
	//| string.make("000992424242").isNumeric(); // true
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.isNumeric = function isNumeric () {
	    return !/[^0-9]/.test(this.s);
	};

	//****************************************************************************************************
	// isUpper
	//****************************************************************************************************
	//| ### isUpper ()
	//|
	//| Returns *true* if the character or string is uppercase.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('a').isUpper() // false
	//| string.make('z').isUpper()  // false
	//| string.make('B').isUpper() // true
	//| string.make('HIJP').isUpper() // true
	//| string.make('HI JP').isUpper() // false
	//| string.make('HelLO').isUpper() // true
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.isUpper = function isUpper () {
	    return this.isAlpha() && this.s.toUpperCase() === this.s;
	};

	//****************************************************************************************************
	// lastIndexOf
	//****************************************************************************************************
	//| ### lastIndexOf (value, caseOption, start)
	//|
	//| Returns the position of the last occurrence of `value` in the string. The optional `start` 
	//| specifies the position at which to start the search (searching backwards). The default is the
	//| length of the string. `caseOption` is optional and defaults to CASE.INSENSITIVE. See the
	//| [CASE](#CASE) constants. 
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make("The dog chased the cat.").lastIndexOf('the'); // 15
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.lastIndexOf = function lastIndexOf (value, caseOption, start) {
		caseOption = getCaseOption(caseOption);
		var s = this.s;
		
	    if (caseOption === CASE.SENSITIVE) {
	        return s.lastIndexOf(value, start);
	    }
	    else {
	        return s.toUpperCase().lastIndexOf(value.toUpperCase(), start);
	    }
	};
	
	//****************************************************************************************************
	// left
	//****************************************************************************************************
	//| ### left (N)
	//|
	//| Returns the substring denoted by `N` positive left-most characters.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('My name is JP').left(2).s; // 'My'
	//| string.make('Hi').left(0).s; // ''
	//| string.make('My name is JP').left(-2).s; // 'JP', same as right(2)
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.left = function left (N) {
	    if (N >= 0) {
	        var s = this.s.substr(0, N);
	        return new this.constructor(s);
	    }
	    else {
	        return this.right(-N);
	    }
	};    
    
	//****************************************************************************************************
	// lines
	//****************************************************************************************************
	//| ### lines ()
	//|
	//| Returns an array with the string's lines. Cross-platform compatible.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| var stuff = "My name is JP\nJavaScript is my fav language\r\nWhat is your fav language?";
	//| var lines = string.make(stuff).lines();
	//|
	//| /*
	//| [ 'My name is JP',
	//|   'JavaScript is my fav language',
	//|   'What is your fav language?' ]
	//| */
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.lines = function lines () {
	    return this.newlinesToUnix().s.split('\n');
	};

	//****************************************************************************************************
	// newlinesToUnix
	//****************************************************************************************************
	//| ### newlinesToUnix ()
	//|
	//| Replaces Windows and Mac new lines with unix style: \r or \r\n with \n.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make("My\rcat is\r\nwhere?\n").newlinesToUnix(); // 'My\ncat is\nwhere?\n'
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.newlinesToUnix = function newlinesToUnix () {
		return this.replace(/(\r\n|\r|\n)/g, '\n', CASE.SENSITIVE);
	};

	//****************************************************************************************************
	// orPlural
	//****************************************************************************************************
	//| ### orPlural (number, pluralSuffix, plural)
	//|
	//| This method returns a singular or plural word or phrase based on a variable number of items. If the
	//| number of items is 1, the singular form is returned. Otherwise the plural form is returned. 
	//|
	//| If `number` is 1, returns the string "as is" (which must be the singular form of the word or
	//| phrase). Otherwise returns the optional `plural` string. If `plural` is not specified, returns
	//| the string with the optional `pluralSuffix` appended. If `pluralSuffix` is not given, `'s'` is
	//| its default. 
	//| 
	//|
	//| Examples:
	//|
	//| ```javascript
	//| N = 1;
	//| N.toString() + ' ' +  string.make('horse').orPlural(N).; // '1 horse'
	//|
	//| N.toString() + ' ' +  string.make('fox').orPlural(N, 'es') + ' ' +
	//| 	string.make('is').orPlural(N, '', 'are') + ' in the hen house.';
	//|
	//|     // '1 fox is in the hen house.'
	//|
	//| N = 5;
	//| N.toString() + ' ' +  string.make('horse').orPlural(N); // '5 horses'
	//| N.toString() + ' ' +  string.make('fox').orPlural(N, 'es'); // '5 foxes'
	//| N.toString() + ' ' +  string.make('goose').orPlural(N, '', 'geese'); // '5 geese'
	//|
	//| N.toString() + ' ' + string.make('fox').orPlural(N, 'es') + ' ' +
	//| 	string.make('is').orPlural(N, '', 'are') + ' in the hen house.';
	//|
	//|     // '5 foxes are in the hen house.'
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.orPlural = function orPlural (number, pluralSuffix, plural) {
	    pluralSuffix = pluralSuffix || 's';

	    return number === 1 ? this : plural ? new this.constructor(plural.toString()) : new this.constructor(this.toString() + pluralSuffix.toString());
	};

	//****************************************************************************************************
	// pad
	//****************************************************************************************************
	//| ### pad (length, character)
	//|
	//| Pads the string in the center with the specified `character` to make the string `length` long. If
	//| the optional `character` is not specified, space is used (' '). 
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('hello').pad(5).s; // 'hello'
	//| string.make('hello').pad(10).s; // '   hello  '
	//| string.make('hey').pad(7).s; // '  hey  '
	//| string.make('hey').pad(5).s; // ' hey '
	//| string.make('hey').pad(4).s; // ' hey'
	//| string.make('hey').pad(7, '-').s; // '--hey--'
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.pad = function pad (length, character) {
	    character = character || ' ';
	    if (this.s.length >= length) return new this.constructor(this.s);
	    length = length - this.s.length;
	    var left = Array(Math.ceil(length / 2) + 1).join(character);
	    var right = Array(Math.floor(length / 2) + 1).join(character);
	    return new this.constructor(left + this.s + right);
	};

	//****************************************************************************************************
	// padLeft
	//****************************************************************************************************
	//| ### padLeft (length, character)
	//|
	//| Left pads the string with `character` to make the string `length` long. If the optional `character`
	//| is not specified, space is used (' '). 
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('hello').padLeft(5).s; // 'hello'
	//| string.make('hello').padLeft(10).s; // '     hello'
	//| string.make('hello').padLeft(7).s; // '  hello'
	//| string.make('hello').padLeft(6).s; // ' hello'
	//| string.make('hello').padLeft(10, '.').s; // '.....hello'
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.padLeft = function padLeft (length, character) {
	    character = character || ' ';
	    if (this.s.length >= length) return new this.constructor(this.s);
	    return new this.constructor(Array(length - this.s.length + 1).join(character) + this.s);
	};

	//****************************************************************************************************
	// padRight
	//****************************************************************************************************
	//| ### padRight (length, character)
	//|
	//| Right pads the string with `character` to make the string `length` long. If the optional `character`
	//| is not specified, space is used (' '). 
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('hello').padRight(5).s; // 'hello'
	//| string.make('hello').padRight(10).s; // 'hello     '
	//| string.make('hello').padRight(7).s; // 'hello  '
	//| string.make('hello').padRight(6).s; // 'hello '
	//| string.make('hello').padRight(10, '.').s; // 'hello.....'
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.padRight = function padRight (length, character) {
	    character = character || ' ';
	    if (this.s.length >= length) return new this.constructor(this.s);
	    return new this.constructor(this.s + Array(length - this.s.length + 1).join(character));
	};

	//****************************************************************************************************
	// parenthesize
	//****************************************************************************************************
	//| ### parenthesize ()
	//|
	//| Returns a string surrounded by parentheses.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('test').parenthesize().s; // '(test)'
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.parenthesize = function parenthesize () {
	    return this.wrap('(', ')');
	};

	//****************************************************************************************************
	// quote
	//****************************************************************************************************
	//| ### quote ()
	//|
	//| Returns a string surrounded by quotes.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('test').quote(5).s; // '"test"'
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.quote = function quote () {
	    return this.surround('"');
	};

	//****************************************************************************************************
	// repeat
	//****************************************************************************************************
	//| ### repeat (n)
	//|
	//| Returns a string repeated `n` times.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make(' ').repeat(5).s; // '     '
	//| string.make('*').repeat(3).s; // '***'
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.repeat = function repeat (n) {
	    return new this.constructor(new Array(n + 1).join(this.s));
	};

	//****************************************************************************************************
	// replace
	//****************************************************************************************************
	//| ### replace (oldString, newString, caseOption)
	//|
	//| Returns a string with the first occurrence of `oldString` replaced with `newString`. Same as the
	//| native Javascript replace method except this method can be case insensitive. `caseOption` is
	//| optional and defaults to CASE.INSENSITIVE. See the [CASE](#CASE) constants. 
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make(' does IT work? ').replace(' ', '_').s; // '_does IT work? '
	//| string.make('Yes it does!').replace(' ', '').s; // 'Yesit does!'
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.replace = function replace (oldString, newString, caseOption) {
		caseOption = getCaseOption(caseOption);
	    var s = this.s;

		if (caseOption === CASE.SENSITIVE) {
			return new this.constructor(this.s.replace(oldString, newString));
		}
		else {
			s = s.replace(new RegExp(oldString.toString().replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), "i"), newString.toString().replace(/\$/g, "$$$$"));
			return new this.constructor(s);
		}
	};
		
	//****************************************************************************************************
	// replaceAll
	//****************************************************************************************************
	//| ### replaceAll (oldString, newString, caseOption)
	//|
	//| Returns a string with all occurrences of `oldString` replaced with `newString`. `caseOption` is
	//| optional and defaults to CASE.INSENSITIVE. See the [CASE](#CASE) constants. 
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make(' does IT work? ').replaceAll(' ', '_').s; // '_does_IT_work?_'
	//| string.make('Yes it does!').replaceAll(' ', '').s; // 'Yesitdoes!'
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.replaceAll = function replaceAll (oldString, newString, caseOption) {
		caseOption = getCaseOption(caseOption);
	    var s = this.s;

		if (caseOption === CASE.SENSITIVE) {
		    return new this.constructor(s.split(oldString).join(newString));
		}
		else {
			s = s.replace(new RegExp(oldString.toString().replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), "gi"), newString.toString().replace(/\$/g, "$$$$"));
			return new this.constructor(s);
		}
	};

	//****************************************************************************************************
	// right
	//****************************************************************************************************
	//| ### right (N)
	//|
	//| Returns the substring denoted by `N` positive right-most characters.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('I AM CRAZY').right(2).s; // 'ZY'
	//| string.make('Does it work?  ').right(4).s; // 'k?  '
	//| string.make('Hi').right(0).s; // ''
	//| string.make('My name is JP').right(-2).s; // 'My', same as left(2)
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.right = function right (N) {
	    if (N >= 0) {
	        var s = this.s.substr(this.s.length - N, N);
	        return new this.constructor(s);
	    }
	    else {
	        return this.left(-N);
	    }
	};

	//****************************************************************************************************
	// setValue
	//****************************************************************************************************
	//| ### setValue (value)
	//|
	//| Sets the string to the `value`.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| var myString = string.make('War');
	//| myString.setValue('Peace').s; // 'Peace'
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.setValue = function setValue (value) {
	    initialize(this, value);
	    return this;
	};

	//****************************************************************************************************
	// slugify
	//****************************************************************************************************
	//| ### slugify ()
	//|
	//| Converts the string into a valid url slug.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('Global Thermonuclear Warfare').slugify().s; // 'global-thermonuclear-warfare'
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.slugify = function slugify () {
	    var sl = (new this.constructor(this.s.replace(/[^\w\s-]/g, '').toLowerCase())).dasherize().s;
	    if (sl.charAt(0) === '-') sl = sl.substr(1);
	    return new this.constructor(sl);
	};

	//****************************************************************************************************
	// startsWith
	//****************************************************************************************************
	//| ### startsWith (prefix, caseOption)
	//|
	//| Returns *true* if the string starts with `prefix`. `caseOption` is optional and defaults to
	//| CASE.INSENSITIVE. See the [CASE](#CASE) constants. 
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make("JP is a software engineer").startsWith("JP"); // true
	//| string.make('wants to change the world').startsWith("politicians"); // false
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.startsWith = function startsWith (prefix, caseOption) {
		var s = this.s;
		caseOption = getCaseOption(caseOption);

		if (caseOption === CASE.INSENSITIVE) {
			s = s.toUpperCase();
			prefix = prefix.toUpperCase();
		}
		
	    return s.lastIndexOf(prefix, 0) === 0;
	};    

	//****************************************************************************************************
	// stripPunctuation
	//****************************************************************************************************
	//| ### stripPunctuation ()
	//|
	//| Removes all of the punctuation characters from the string.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('My, st[ring] *full* of %punct)').stripPunctuation().s; // 'My string full of punct'
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.stripPunctuation = function stripPunctuation () {
	    return new this.constructor(this.s.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " "));
	};    

	//****************************************************************************************************
	// surround
	//****************************************************************************************************
	//| ### surround (value)
	//|
	//| Returns the string with `value` in front and behind.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('emphasize this').surround('**').s; // '**emphasize this**'
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.surround = function surround (value) {
	    return new this.constructor([value, this.s, value].join(''));
	};
	
	//****************************************************************************************************
	// toBoolean
	//****************************************************************************************************
	//| ### toBoolean ()
	//|
	//| Converts a a logical truth string to boolean. That is: `'1'`, `'true'`, `'on'`, or `'yes'`
	//| return *true*. All other values return *false*. 
	//|
	//| JavaScript Note: You can easily convert truthy values to `booleans` by prefixing them with `!!`. e.g.
	//| `!!'hi' === true` or `!!'' === false` or `!!{} === true`.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('true').toBoolean(); // true
	//| string.make('false').toBoolean(); // false
	//| string.make('hello').toBoolean(); // false
	//| string.make(true).toBoolean(); // true
	//| string.make('on').toBoolean(); // true
	//| string.make('yes').toBoolean(); // true
	//| string.make('TRUE').toBoolean(); // true
	//| string.make('TrUe').toBoolean(); // true
	//| string.make('YES').toBoolean(); // true
	//| string.make('ON').toBoolean(); // true
	//| string.make('').toBoolean(); // false
	//| string.make(undefined).toBoolean(); // false
	//| string.make('undefined').toBoolean(); // false
	//| string.make(null).toBoolean(); // false
	//| string.make(false).toBoolean(); // false
	//| string.make({}).toBoolean(); // false
	//| string.make(1).toBoolean(); // true
	//| string.make(-1).toBoolean(); // false
	//| string.make(0).toBoolean(); // false
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.toBoolean = function toBoolean () {
	    if (typeof this.s === 'string') {
	        var s = this.s.toLowerCase();
	        return s === 'true' || s === 'yes' || s === 'on' || s === '1';
	    }
	    else {
	    	return false;
	    }
	};

	//****************************************************************************************************
	// toFloat
	//****************************************************************************************************
	//| ### toFloat (precision)
	//|
	//| Returns the float value with an optional precision. Wraps parseFloat.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('5').toFloat(); // 5
	//| string.make('5.3').toFloat();  // 5.3
	//| string.make(5.3).toFloat();  // 5.3
	//| string.make('-10').toFloat();  // -10
	//| string.make('55.3 adfafaf').toFloat(); // 55.3
	//| string.make('afff 44').toFloat();  // NaN
	//| string.make(3.45522222333232).toFloat(2); // 3.46
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.toFloat = function toFloat (precision) {
	    var num = parseFloat(this.s);
	    if (precision) return parseFloat(num.toFixed(precision))
	    else return num
	};

	//****************************************************************************************************
	// toInt
	//****************************************************************************************************
	//| ### toInt ()
	//|
	//| Returns the number value in integer form. Wrapper for `parseInt()`. Can also parse hex values.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('5').toInt(); // 5
	//| string.make('5.3').toInt(); // 5;
	//| string.make(5.3).toInt(); // 5;
	//| string.make('-10').toInt(); // -10
	//| string.make('55 adfafaf').toInt(); // 55
	//| string.make('afff 44').toInt(); // NaN
	//| string.make('0xff').toInt() // 255
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.toInt = function toInt () { //thanks Google
	    // If the string starts with '0x' or '-0x', parse as hex.
	    return /^\s*-?0x/i.test(this.s) ? parseInt(this.s, 16) : parseInt(this.s, 10)
	};

	//****************************************************************************************************
	// toString
	//****************************************************************************************************
	//| ### toString ()
	//|
	//| Alias: `s`
	//|
	//| Returns the native Javascript String object representation of the string. Not really necessary to 
	//| use since `s` is available. However, Javascript engines will look at an object and display its
	//| `toString()` result. 
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('my name is JP.').capitalize().toString(); // 'My name is JP.'
	//| var a = "Hello " + string.make('joe!'); // a = "Hello joe!"
	//| string.make("Hello").toString() === string.make("Hello").s; // true
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.toString = function toString () {
	    return this.s;
	};

	//****************************************************************************************************
	// trimLeft
	//****************************************************************************************************
	//| ### trimLeft ()
	//|
	//| Returns the string with leading whitespace removed.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('  How are you?').trimLeft().s; // 'How are you?';
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.trimLeft = function trimLeft () {
	    var s;
	    if (nativeStringPrototype.trimLeft) s = this.s.trimLeft();
	    else s = this.s.replace(/(^\s*)/g, '');
	    return new this.constructor(s);
	};

	//****************************************************************************************************
	// trimRight
	//****************************************************************************************************
	//| ### trimRight ()
	//|
	//| Returns the string with trailing whitespace removed.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('How are you?   ').trimRight().s; // 'How are you?'
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.trimRight = function trimRight () {
	    var s;
	    if (nativeStringPrototype.trimRight) s = this.s.trimRight();
	    else s = this.s.replace(/\s+$/, '');
	    return new this.constructor(s);
	};

	//****************************************************************************************************
	// truncate
	//****************************************************************************************************
	//| ### truncate (length, pruneStr)
	//|
	//| Truncates the string to `length`, accounting for word placement and character count. If the string
	//| is actually truncated, uses the optional `pruneStr` to indicate missing content. The default is
	//| `'...'`. 
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('this is some long text').truncate(3).s; // '...'
	//| string.make('this is some long text').truncate(7).s; // 'this is...'
	//| string.make('this is some long text').truncate(11).s; // 'this is...'
	//| string.make('this is some long text').truncate(12).s; // 'this is some...'
	//| string.make('this is some long text').truncate(11).s; // 'this is...'
	//| string.make('this is some long text').truncate(50).s; // 'this is some long text'
	//| string.make('this is some long text').truncate(14, ' READ MORE').s; // 'this is some READ MORE'
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.truncate = function truncate (length, pruneStr) { //from underscore.string, author: github.com/rwz
	    var str = this.s;

	    length = ~~length;
	    pruneStr = typeof pruneStr === 'string' || pruneStr instanceof Str ? pruneStr : '...';

	    if (str.length <= length) return new this.constructor(str);

	    var tmpl = function(c) {
	            return c.toUpperCase() !== c.toLowerCase() ? 'A' : ' ';
	        },
	        template = str.slice(0, length + 1).replace(/.(?=\W*\w*$)/g, tmpl); // 'Hello, world' -> 'HellAA AAAAA'
	    if (template.slice(template.length - 2).match(/\w\w/)) template = template.replace(/\s*\S+$/, '');
	    else template = new this.constructor(template.slice(0, template.length - 1)).trimRight().s;

	    return (template + pruneStr).length > str.length ? new this.constructor(str) : new this.constructor(str.slice(0, template.length) + pruneStr);
	};

	//****************************************************************************************************
	// valueOf
	//****************************************************************************************************
	Str.prototype.valueOf = function valueOf () {
	    return this.s.valueOf();
	};

	//****************************************************************************************************
	// words
	//****************************************************************************************************
	//| ### words (delimiter)
	//|
	//| Split string by delimiter (String or RegExp), /\s+/ by default.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('   I   love   you   ').words(); // ["I","love","you"]
	//| string.make('I_love_you').words('_'); // ["I","love","you"]
	//| string.make('I-love-you').words(/-/); // ["I","love","you"]
	//| string.make('    ').words(); // []
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.words = function words (delimiter) {
	    if (this.isEmpty()) return [];
	    return this.trim().split(delimiter || /\s+/);
	};

	//****************************************************************************************************
	// wrap
	//****************************************************************************************************
	//| ### wrap (front, back)
	//|
	//| Returns the string with `front`, the string and `back` concatenated.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| string.make('this is an aside').wrap('(', ')').s; // '(this is an aside)'
	//| ```
	//----------------------------------------------------------------------------------------------------
	Str.prototype.wrap = function wrap (front, back) {
	    return new this.constructor([front, this.s, back].join(''));
	};
	
	//****************************************************************************************************
	//****************************************************************************************************
	// Module Initialization
	//****************************************************************************************************
	//****************************************************************************************************

	//----------------------------------------------------------------------------------------------------
	// Give our string object the properties of native Javascript String objects.
	//----------------------------------------------------------------------------------------------------
	attachNativeStringProperties();

	//----------------------------------------------------------------------------------------------------
	// Set the constructor. Without this, string objects are instances of Object instead of Str. 
	//----------------------------------------------------------------------------------------------------
	Str.prototype.constructor = Str;


	//****************************************************************************************************
	//****************************************************************************************************
	// Set this module's public interface.
	//****************************************************************************************************
	//****************************************************************************************************
	publicInterface = {};

	publicInterface.CASE = CASE;
	publicInterface.make = make;
	
	return publicInterface;
});

//****************************************************************************************************
//|
//| Extending This Module
//| ---------------------
//****************************************************************************************************
//| Extending this module's string object is easy by doing the following:
//|
//| 1. Call `this.setValue(value)` in your object's constructor function (named `Str` for this
//| example). 
//|
//| 2. Create an object from this module. `stringObject = string.make('')`
//|
//| 3. Set your constructor function's prototype to the created object. `Str.prototype = stringObject` 
//|
//| 4. Make sure your constructor function is set properly. `Str.prototype.constructor = Str`
//|
//| 5. If necessary, get the prototpye of the object created in step 2. `parentPrototype = 
//| Object.getPrototypeOf(stringObject)`
//|
//|     This value can then be used to call methods of this module that have been overridden in your
//|     module. `parentPrototype.contains.call(this, value);`
//|
//| 6. When returning a new object representing your string object, use `new this.constructor()`
//| instead of `new Str()`. Doing so will allow your module to be easily extended.
//|
//| Example:
//|
//| ```javascript
//| ({define: typeof define === 'function' ? define : function (A,F) {var I = F.apply(null, A.map(require)); Object.keys(I).forEach(function(k) {exports[k] = I[k];});}}).define(
//|
//| ['string'],
//|
//| function (string) {
//| 	function Str (value) { // Constructor
//| 		this.setValue(value);
//| 	}
//|
//| 	stringObject = string.make('');
//| 	Str.prototype = stringObject;
//| 	Str.prototype.constructor = Str; // Make sure the constructor function is set properly.
//| 	parentPrototype = Object.getPrototypeOf(stringObject);
//| 	
//| 	Str.prototype.myNewMethod = function () {
//| 		....
//| 	    return new this.constructor(result);
//| 	};
//|
//| 	Str.prototype.extendedMethod = function (value) { // Extending a method.
//| 		....
//| 	    parentPrototype.extendedMethod.call(this, value); // Use the parent prototype.
//| 	};
//| });
//| ```
//****************************************************************************************************
//|
//| Testing
//| -------
//****************************************************************************************************
//| string uses Wakanda's implementation of [YUI Test](http://yuilibrary.com/yui/docs/test/). 
//|
//| ##### To test the client side:
//|
//| 1. In Wakanda Studio, open WebFolder/index/index.html.
//| 2. Click Run. The results should appear in your browser.
//|
//| ##### To test the server side:
//|
//| 1. In Wakanda Studio, open scripts/test.js.
//| 2. Click Run File. The results should appear in your browser.
//****************************************************************************************************
//|
//| Credits
//| -------
//****************************************************************************************************
//| This module is based heavily (probably 95%) on [string.js](http://stringjs.com) by JP Richardson
//| <jprichardson@gmail.com>. Thanks JP!
//|
//| The **words()** method comes from underscore.string by Esa-Matti Suuronen <esa-matti@suuronen.org>.
//----------------------------------------------------------------------------------------------------
//****************************************************************************************************
//|
//| Contributions
//| -------------
//****************************************************************************************************
//| If you contribute to this library, just modify `WebFolder/scripts/string.js` and 
//| `WebFolder/scripts/testCases.js` or `Modules/string.js` and `Modules/string.js` and send a
//| pull request. Please remember to update the markdown if the public interface changes. 
//----------------------------------------------------------------------------------------------------

//****************************************************************************************************
//|
//| License
//| -------
//****************************************************************************************************
//| Licensed under MIT.
//| 
//| Copyright (C) 2013 [Jeff Grann](https://github.com/jeffgrann) <jeff@successware.net>.
//|
//| Major portions copyright (C) 2012-2013 JP Richardson <jprichardson@gmail.com>.
//|
//| Portions copyright (c) 2011 Esa-Matti Suuronen <esa-matti@suuronen.org>.
//|
//| Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
//| associated documentation files (the "Software"), to deal in the Software without restriction,
//| including without limitation the rights to use, copy, modify, merge, publish, distribute,
//| sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
//| furnished to do so, subject to the following conditions: 
//|
//| The above copyright notice and this permission notice shall be included in all copies or substantial
//| portions of the Software. 
//|
//| THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
//| NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//| NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//| DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
//| OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
