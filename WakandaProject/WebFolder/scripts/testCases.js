"use strict";

({define: typeof define === 'function' ? define : function (A,F) {var I = F.apply(null, A.map(require)); Object.keys(I).forEach(function(k) {exports[k] = I[k];});}}).define(

['string'],

function (string) {
	var publicInterface = {};
	
	function arraysAreEqual (array1, array2) {
		var result;
		
		if (array1.length !== array2.length) {
			return false;
		}
		
		result = array1.every(
			function (value, index) {
				if (value !== array2[index]) {
					return false;
				}
				
				return true;
			});
			
		return result;
	}
		    		
	publicInterface.get = function getTestCases () {
		var S = string.make;
		
		var testCases = {
		    name: "string Tests",
		     
			//----------------------------------------------------------------------------------------------------
			// String constructor.
			//----------------------------------------------------------------------------------------------------
		    'test the string constructor': function() {
					Y.Assert.areSame(S('helo').s, 'helo', "initialize with a string value");
			        Y.Assert.areSame(S(5).s, '5', "initialize with a number value");
			        Y.Assert.isTrue(S(new Date(2012, 1, 1)).s.indexOf('2012') != -1, "initialize with a date value");
			        Y.Assert.isTrue(S(new RegExp()).s.substr(0,1) === '/', "initialize with a regex value");
			        Y.Assert.isTrue(S({}).s === '[object Object]', "initialize with an object value");
			        Y.Assert.isTrue(S(null).s === null, "initialize with a null value");
			        Y.Assert.isTrue(S(undefined).s === undefined, "initialize with an undefined value");
		        },

			//----------------------------------------------------------------------------------------------------
			// between()
			//----------------------------------------------------------------------------------------------------
		    'test between()': function() {
			        Y.Assert.isTrue(S('<a>foo</a>').between('<a>', '</a>').s === 'foo', "between tags");
			        Y.Assert.isTrue(S('<a>foo</a></a>').between('<a>', '</a>').s === 'foo', "between tags with double ending tags");
			        Y.Assert.isTrue(S('<a><a>foo</a></a>').between('<a>', '</a>').s === '<a>foo', "between tags with double starting tags");
			        Y.Assert.isTrue(S('<a>foo').between('<a>', '</a>').s === '', "between tags with no end tag");

			        Y.Assert.isTrue(S('<a>foo</a>').between('<A>', '</A>').s === 'foo', "between tags (default case insensitive)");
			        Y.Assert.isTrue(S('<a>foo</a></a>').between('<A>', '</A>').s === 'foo', "between tags with double ending tags (default case insensitive)");
			        Y.Assert.isTrue(S('<a><a>foo</a></a>').between('<A>', '</A>').s === '<a>foo', "between tags with double starting tags (default case insensitive)");
			        Y.Assert.isTrue(S('<a>foo').between('<A>', '</A>').s === '', "between tags with no end tag (default case insensitive)");

			        Y.Assert.isTrue(S('<a>foo</a>').between('<A>', '</A>', string.CASE.INSENSITIVE).s === 'foo', "between tags (case insensitive)");
			        Y.Assert.isTrue(S('<a>foo</a></a>').between('<A>', '</A>', string.CASE.INSENSITIVE).s === 'foo', "between tags with double ending tags (case insensitive)");
			        Y.Assert.isTrue(S('<a><a>foo</a></a>').between('<A>', '</A>', string.CASE.INSENSITIVE).s === '<a>foo', "between tags with double starting tags (case insensitive)");
			        Y.Assert.isTrue(S('<a>foo').between('<A>', '</A>', string.CASE.INSENSITIVE).s === '', "between tags with no end tag (case insensitive)");

			        Y.Assert.isTrue(S('<a>foo</a>').between('<a>', '</a>', string.CASE.SENSITIVE).s === 'foo', "between tags (case sensitive)");
			        Y.Assert.isTrue(S('<a>foo</a></a>').between('<a>', '</a>', string.CASE.SENSITIVE).s === 'foo', "between tags with double ending tags (case sensitive)");
			        Y.Assert.isTrue(S('<a><a>foo</a></a>').between('<a>', '</a>', string.CASE.SENSITIVE).s === '<a>foo', "between tags with double starting tags (case sensitive)");
			        Y.Assert.isTrue(S('<a>foo').between('<a>', '</a>', string.CASE.SENSITIVE).s === '', "between tags with no end tag (case sensitive)");

			        Y.Assert.isTrue(S('<a>foo</a>').between('<A>', '</A>', string.CASE.SENSITIVE).s === '', "between tags with no match (case insensitive)");
			        Y.Assert.isTrue(S('<a>foo</a></a>').between('<A>', '</A>', string.CASE.SENSITIVE).s === '', "between tags with double ending tags with no match (case insensitive)");
			        Y.Assert.isTrue(S('<a><a>foo</a></a>').between('<A>', '</A>', string.CASE.SENSITIVE).s === '', "between tags with double starting tags with no match (case insensitive)");
			        Y.Assert.isTrue(S('<a>foo').between('<A>', '</A>', string.CASE.SENSITIVE).s === '', "between tags with no end tag with no match (case insensitive)");
		        },

			//----------------------------------------------------------------------------------------------------
			// capitalize()
			//----------------------------------------------------------------------------------------------------
		    'test capitalize()': function() {
					Y.Assert.isTrue(S('jon').capitalize().s === 'Jon', "all lowercase to start");
			        Y.Assert.isTrue(S('JP').capitalize().s === 'Jp', "all uppercase to start");
		        },

			//----------------------------------------------------------------------------------------------------
			// chompLeft()
			//----------------------------------------------------------------------------------------------------
		    'test chompLeft()': function() {
			        Y.Assert.isTrue(S('foobar').chompLeft('foo').s === 'bar', "prefix exists");
			        Y.Assert.isTrue(S('foobar').chompLeft('bar').s === 'foobar', "prefix does not exist");
			        Y.Assert.isTrue(S('').chompLeft('foo').s === '', "empty string");
			        Y.Assert.isTrue(S('').chompLeft('').s === '', "empty string with empty prefix");

			        Y.Assert.isTrue(S('foobar').chompLeft('FOO').s === 'bar', "prefix exists (default case insensitive)");
			        Y.Assert.isTrue(S('foobar').chompLeft('BAR').s === 'foobar', "prefix does not exist (default case insensitive)");
			        Y.Assert.isTrue(S('').chompLeft('FOO').s === '', "empty string (default case insensitive)");
			        Y.Assert.isTrue(S('').chompLeft('').s === '', "empty string with empty prefix (default case insensitive)");

			        Y.Assert.isTrue(S('foobar').chompLeft('FOO', string.CASE.INSENSITIVE).s === 'bar', "prefix exists (case insensitive)");
			        Y.Assert.isTrue(S('foobar').chompLeft('BAR', string.CASE.INSENSITIVE).s === 'foobar', "prefix does not exist (case insensitive)");
			        Y.Assert.isTrue(S('').chompLeft('FOO', string.CASE.INSENSITIVE).s === '', "empty string (case insensitive)");
			        Y.Assert.isTrue(S('').chompLeft('', string.CASE.INSENSITIVE).s === '', "empty string with empty prefix (case insensitive)");

			        Y.Assert.isTrue(S('foobar').chompLeft('FOO', string.CASE.SENSITIVE).s === 'foobar', "prefix exists (case sensitive)");
			        Y.Assert.isTrue(S('foobar').chompLeft('BAR', string.CASE.SENSITIVE).s === 'foobar', "prefix does not exist (case sensitive)");
			        Y.Assert.isTrue(S('').chompLeft('FOO', string.CASE.SENSITIVE).s === '', "empty string (case sensitive)");
			        Y.Assert.isTrue(S('').chompLeft('', string.CASE.SENSITIVE).s === '', "empty string with empty prefix (case sensitive)");
		        },

			//----------------------------------------------------------------------------------------------------
			// chompRight()
			//----------------------------------------------------------------------------------------------------
		    'test chompRight()': function() {
			        Y.Assert.isTrue(S('foobar').chompRight('foo').s === 'foobar', "prefix exists");
			        Y.Assert.isTrue(S('foobar').chompRight('bar').s === 'foo', "prefix does not exist");
			        Y.Assert.isTrue(S('').chompRight('foo').s === '', "empty string");
			        Y.Assert.isTrue(S('').chompRight('').s === '', "empty string with empty prefix");

			        Y.Assert.isTrue(S('foobar').chompRight('FOO').s === 'foobar', "prefix exists (default case insensitive)");
			        Y.Assert.isTrue(S('foobar').chompRight('BAR').s === 'foo', "prefix does not exist (default case insensitive)");
			        Y.Assert.isTrue(S('').chompRight('FOO').s === '', "empty string (default case insensitive)");
			        Y.Assert.isTrue(S('').chompRight('').s === '', "empty string with empty prefix (default case insensitive)");

			        Y.Assert.isTrue(S('foobar').chompRight('FOO', string.CASE.INSENSITIVE).s === 'foobar', "prefix exists (case insensitive)");
			        Y.Assert.isTrue(S('foobar').chompRight('BAR', string.CASE.INSENSITIVE).s === 'foo', "prefix does not exist (case insensitive)");
			        Y.Assert.isTrue(S('').chompRight('FOO', string.CASE.INSENSITIVE).s === '', "empty string (case insensitive)");
			        Y.Assert.isTrue(S('').chompRight('', string.CASE.INSENSITIVE).s === '', "empty string with empty prefix (case insensitive)");

			        Y.Assert.isTrue(S('foobar').chompRight('FOO', string.CASE.SENSITIVE).s === 'foobar', "prefix exists (case sensitive)");
			        Y.Assert.isTrue(S('foobar').chompRight('BAR', string.CASE.SENSITIVE).s === 'foobar', "prefix does not exist (case sensitive)");
			        Y.Assert.isTrue(S('').chompRight('FOO', string.CASE.SENSITIVE).s === '', "empty string (case sensitive)");
			        Y.Assert.isTrue(S('').chompRight('', string.CASE.SENSITIVE).s === '', "empty string with empty prefix (case sensitive)");
		        },

			//----------------------------------------------------------------------------------------------------
			// collapseWhitespace()
			//----------------------------------------------------------------------------------------------------
		    'test collapseWhitespace()': function() {
			        Y.Assert.isTrue(S('  Strings   \t are   \n\n\t fun\n!  ').collapseWhitespace().s === 'Strings are fun !', "change all whitespace to single spaces");
		        },

			//----------------------------------------------------------------------------------------------------
			// compareTo()
			//----------------------------------------------------------------------------------------------------
		    'test compareTo()': function() {
					Y.Assert.areSame (S('Hello').compareTo('hello'), 0, "case insensitive equals");
					Y.Assert.areSame (S('Hello').compareTo('also'), 1, "case insensitive greater than");
					Y.Assert.areSame (S('Hello').compareTo('zebra'), -1, "case insensitive less than");
					Y.Assert.areSame (S('Hello').compareTo('hello', string.CASE.SENSITIVE), -1, "case sensitive less than");
					Y.Assert.areSame (S('hello').compareTo('Hello', string.CASE.SENSITIVE), 1, "case sensitive greater than");
					Y.Assert.areSame (S('Hello').compareTo('Hello', string.CASE.SENSITIVE), 0, "case sensitive equals");
		        },

			//----------------------------------------------------------------------------------------------------
			// contains()
			//----------------------------------------------------------------------------------------------------
		    'test contains()': function() {
			        Y.Assert.isTrue(S('JavaScript is one of the best languages!').contains('one'), "search string exists");
			        Y.Assert.isFalse(S('What do you think?').contains('YES!'), "search string does not exist");

			        Y.Assert.isTrue(S('JavaScript is one of the best languages!').contains('ONE'), "search string exists (default case insensitive)");

			        Y.Assert.isTrue(S('JavaScript is one of the best languages!').contains('ONE', string.CASE.INSENSITIVE), "search string exists (case insensitive)");

			        Y.Assert.isTrue(S('JavaScript is ONE of the best languages!').contains('ONE', string.CASE.SENSITIVE), "search string exists (case sensitive)");
			        Y.Assert.isFalse(S('JavaScript is one of the best languages!').contains('ONE', string.CASE.SENSITIVE), "search string does not exist (case sensitive)");
		        },

			//----------------------------------------------------------------------------------------------------
			// count()
			//----------------------------------------------------------------------------------------------------
		    'test count()': function() {
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').count("JP"), 2, "search string exists");
			        Y.Assert.areSame (S('Does not exist.').count("Flying Spaghetti Monster"), 0, "search string does not exist");
			        Y.Assert.areSame (S('funfunfun').count("fun"), 3, "search string is repeated");

			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').count("jp"), 2, "search string exists (default case insensitive)");
			        Y.Assert.areSame (S('funfunfun').count("FUN"), 3, "search string is repeated (default case insensitive)");

			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').count("jp", string.CASE.INSENSITIVE), 2, "search string exists (case insensitive)");
			        Y.Assert.areSame (S('funfunfun').count("FUN", string.CASE.INSENSITIVE), 3, "search string is repeated (case insensitive)");

			        Y.Assert.areSame (S('JP likes to program. jp does not play in the NBA.').count("jp", string.CASE.SENSITIVE), 1, "search string exists (case sensitive)");
			        Y.Assert.areSame (S('FUNfunFUN').count("FUN", string.CASE.SENSITIVE), 2, "search string is repeated (case sensitive)");
		        },

			//----------------------------------------------------------------------------------------------------
			// dasherize()
			//----------------------------------------------------------------------------------------------------
		    'test dasherize()': function() {
			        Y.Assert.isTrue (S('backgroundColor').dasherize().s === 'background-color', "camel-case");
			        Y.Assert.isTrue (S('CarSpeed').dasherize().s === '-car-speed', "capitalize camel-case");
			        Y.Assert.isTrue (S('yesWeCan').dasherize().s === 'yes-we-can', "long camel-case");
		        },

			//----------------------------------------------------------------------------------------------------
			// endsWith()
			//----------------------------------------------------------------------------------------------------
		    'test endsWith()': function() {
			        Y.Assert.isTrue (S("hello jon").endsWith('jon'), "search string exists");
			        Y.Assert.isFalse (S('ffffaaa').endsWith('jon'), "search string does not exist");
			        Y.Assert.isTrue (S("").endsWith(''), "blank search string and value");
			        Y.Assert.isTrue (S("hi").endsWith(''), "blank search string");
			        Y.Assert.isTrue (S("hi").endsWith('hi'), "search string and value are the same");

			        Y.Assert.isTrue (S("hello jon").endsWith('JON'), "search string exists (default case insensitive)");
			        Y.Assert.isFalse (S('ffffaaa').endsWith('JON'), "search string does not exist (default case insensitive)");
			        Y.Assert.isTrue (S("").endsWith(''), "blank search string and value (default case insensitive)");
			        Y.Assert.isTrue (S("hi").endsWith(''), "blank search string (default case insensitive)");
			        Y.Assert.isTrue (S("hi").endsWith('HI'), "search string and value are the same (default case insensitive)");

			        Y.Assert.isTrue (S("hello jon").endsWith('JON', string.CASE.INSENSITIVE), "search string exists (case insensitive)");
			        Y.Assert.isFalse (S('ffffaaa').endsWith('JON', string.CASE.INSENSITIVE), "search string does not exist (case insensitive)");
			        Y.Assert.isTrue (S("").endsWith('', string.CASE.INSENSITIVE), "blank search string and value (case insensitive)");
			        Y.Assert.isTrue (S("hi").endsWith('', string.CASE.INSENSITIVE), "blank search string (case insensitive)");
			        Y.Assert.isTrue (S("hi").endsWith('HI', string.CASE.INSENSITIVE), "search string and value are the same (case insensitive)");

			        Y.Assert.isFalse (S("hello jon").endsWith('JON', string.CASE.SENSITIVE), "search string exists (case sensitive)");
			        Y.Assert.isFalse (S('ffffaaa').endsWith('JON', string.CASE.SENSITIVE), "search string does not exist (case sensitive)");
			        Y.Assert.isTrue (S("").endsWith('', string.CASE.SENSITIVE), "blank search string and value (case sensitive)");
			        Y.Assert.isTrue (S("hi").endsWith('', string.CASE.SENSITIVE), "blank search string (case sensitive)");
			        Y.Assert.isFalse (S("hi").endsWith('HI', string.CASE.SENSITIVE), "search string and value are the same (case sensitive)");
		        },

			//----------------------------------------------------------------------------------------------------
			// ensureLeft()
			//----------------------------------------------------------------------------------------------------
		    'test ensureLeft()': function() {
			        Y.Assert.isTrue (S('foobar').ensureLeft('foo').s === 'foobar', "prefix already exists")
			        Y.Assert.isTrue (S('bar').ensureLeft('foo').s === 'foobar', "prefix does not already exist")
			        Y.Assert.isTrue (S('').ensureLeft('foo').s === 'foo', "initial string is blank")
			        Y.Assert.isTrue (S('').ensureLeft('').s === '', "initial string and prefix are blank")

			        Y.Assert.isTrue (S('foobar').ensureLeft('FOO').s === 'foobar', "prefix already exists (default case insensitive)")

			        Y.Assert.isTrue (S('foobar').ensureLeft('FOO', string.CASE.INSENSITIVE).s === 'foobar', "prefix already exists (case insensitive)")

			        Y.Assert.isTrue (S('foobar').ensureLeft('foo', string.CASE.SENSITIVE).s === 'foobar', "prefix already exists (case sensitive)")
			        Y.Assert.isTrue (S('bar').ensureLeft('foo', string.CASE.SENSITIVE).s === 'foobar', "prefix does not already exist (case sensitive)")
			        Y.Assert.isTrue (S('').ensureLeft('foo', string.CASE.SENSITIVE).s === 'foo', "initial string is blank (case sensitive)")
			        Y.Assert.isTrue (S('').ensureLeft('', string.CASE.SENSITIVE).s === '', "initial string and prefix are blank (case sensitive)")
			        Y.Assert.isTrue (S('foobar').ensureLeft('FOO', string.CASE.SENSITIVE).s === 'FOOfoobar', "prefix already exists but not in same case (case sensitive)")
		        },

			//----------------------------------------------------------------------------------------------------
			// ensureRight()
			//----------------------------------------------------------------------------------------------------
		    'test ensureRight()': function() {
			        Y.Assert.isTrue (S('foobar').ensureRight('bar').s === 'foobar', "suffix already exists")
			        Y.Assert.isTrue (S('bar').ensureRight('foo').s === 'barfoo', "suffix does not already exist")
			        Y.Assert.isTrue (S('').ensureRight('foo').s === 'foo', "initial string is blank")
			        Y.Assert.isTrue (S('').ensureRight('').s === '', "initial string and suffix are blank")

			        Y.Assert.isTrue (S('foobar').ensureRight('BAR').s === 'foobar', "suffix already exists (default case insensitive)")

			        Y.Assert.isTrue (S('foobar').ensureRight('BAR', string.CASE.INSENSITIVE).s === 'foobar', "suffix already exists (case insensitive)")

			        Y.Assert.isTrue (S('foobar').ensureRight('bar', string.CASE.SENSITIVE).s === 'foobar', "suffix already exists (case sensitive)")
			        Y.Assert.isTrue (S('foo').ensureRight('bar', string.CASE.SENSITIVE).s === 'foobar', "suffix does not already exist (case sensitive)")
			        Y.Assert.isTrue (S('').ensureRight('foo', string.CASE.SENSITIVE).s === 'foo', "initial string is blank (case sensitive)")
			        Y.Assert.isTrue (S('').ensureRight('', string.CASE.SENSITIVE).s === '', "initial string and suffix are blank (case sensitive)")
			        Y.Assert.isTrue (S('foobar').ensureRight('BAR', string.CASE.SENSITIVE).s === 'foobarBAR', "suffix already exists but not in same case (case sensitive)")
		        },

			//----------------------------------------------------------------------------------------------------
			// indexOf()
			//----------------------------------------------------------------------------------------------------
		    'test indexOf()': function() {
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').indexOf("JP"), 0, "search string exists at beginning");
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').indexOf("does"), 24, "search string exists in middle");
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').indexOf("NBA."), 45, "search string exists at ending");
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').indexOf("golf"), -1, "search string does not exist");

			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').indexOf("jp"), 0, "search string exists at beginning (default case insensitive)");
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').indexOf("DOES"), 24, "search string exists in middle (default case insensitive)");
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').indexOf("nba."), 45, "search string exists at ending (default case insensitive)");

			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').indexOf("jp", string.CASE.INSENSITIVE), 0, "search string exists at beginning (case insensitive)");
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').indexOf("DOES", string.CASE.INSENSITIVE), 24, "search string exists in middle (case insensitive)");
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').indexOf("nba.", string.CASE.INSENSITIVE), 45, "search string exists at ending (case insensitive)");
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').indexOf("golf", string.CASE.INSENSITIVE), -1, "search string does not exist (case insensitive)");

			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').indexOf("jp", string.CASE.SENSITIVE), -1, "search string does not exist at beginning (case sensitive)");
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').indexOf("DOES", string.CASE.SENSITIVE), -1, "search string does not exist in middle (case sensitive)");
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').indexOf("nba.", string.CASE.SENSITIVE), -1, "search string does not exist at ending (case sensitive)");
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').indexOf("golf", string.CASE.SENSITIVE), -1, "search string does not exist (case sensitive)");

			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').indexOf("JP", string.CASE.SENSITIVE), 0, "search string exists at beginning (case sensitive)");
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').indexOf("does", string.CASE.SENSITIVE), 24, "search string exists in middle (case sensitive)");
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').indexOf("NBA.", string.CASE.SENSITIVE), 45, "search string exists at ending (case sensitive)");
			        
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').indexOf("jp", string.CASE.INSENSITIVE, 1), 21, "search string exists before and after start position (case insensitive)");
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').indexOf("LiKeS", string.CASE.INSENSITIVE, 4), -1, "search string does not exist after start position (case insensitive)");
			        
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').indexOf("JP", string.CASE.SENSITIVE, 1), 21, "search string exists before and after start position (case sensitive)");
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').indexOf("likes", string.CASE.SENSITIVE, 4), -1, "search string does not exist after start position (case sensitive)");
		        },

			//----------------------------------------------------------------------------------------------------
			// isAlpha()
			//----------------------------------------------------------------------------------------------------
		    'test isAlpha()': function() {
			        Y.Assert.isTrue (S("afaf").isAlpha(), "lowercase letters");
			        Y.Assert.isTrue (S("FJslfjkasfs").isAlpha(), "mixed-case");
			        Y.Assert.isFalse (S("adflj43faljsdf").isAlpha(), "containing digits");
			        Y.Assert.isFalse (S("33").isAlpha(), "all digits");
			        Y.Assert.isFalse (S("TT....TTTafafetstYY").isAlpha(), "containing periods");
		        },

			//----------------------------------------------------------------------------------------------------
			// isAlphaNumeric()
			//----------------------------------------------------------------------------------------------------
		    'test isAlphaNumeric()': function() {
			        Y.Assert.isTrue (S("afaf35353afaf").isAlphaNumeric(), "mixed letters and digits");
			        Y.Assert.isTrue (S("FFFF99fff").isAlphaNumeric(), "uppercase and lowercase letters and digits");
			        Y.Assert.isTrue (S("99").isAlphaNumeric(), "all digits");
			        Y.Assert.isTrue (S("afff").isAlphaNumeric(), "all letters");
			        Y.Assert.isTrue (S("Infinity").isAlphaNumeric(), "Infinity");
			        Y.Assert.isFalse (S("-Infinity").isAlphaNumeric(), "-Infinity");
			        Y.Assert.isFalse (S("-33").isAlphaNumeric(), "a negative number");
			        Y.Assert.isFalse (S("aaff..").isAlphaNumeric(), "contains periods");
		        },

			//----------------------------------------------------------------------------------------------------
			// isEmpty()
			//----------------------------------------------------------------------------------------------------
		    'test isEmpty()': function() {
			        Y.Assert.isTrue (S(' ').isEmpty(), "single space");
			        Y.Assert.isTrue (S('\t\t\t    ').isEmpty(), "tabs and spaces");
			        Y.Assert.isTrue (S('\n\n ').isEmpty(), "newlines and a space");
			        Y.Assert.isFalse (S('hey').isEmpty(), "a word");
			        Y.Assert.isTrue (S(null).isEmpty(), "null");
			        Y.Assert.isTrue (S().isEmpty(), "undefined");
		        },

			//----------------------------------------------------------------------------------------------------
			// isEqualTo()
			//----------------------------------------------------------------------------------------------------
		    'test isEqualTo()': function() {
			        Y.Assert.isTrue (S('').isEqualTo(''), "empty strings");
			        Y.Assert.isTrue (S(' ').isEqualTo(' '), "single space");
			        Y.Assert.isTrue (S('\t\t\t    ').isEqualTo('\t\t\t    '), "tabs and spaces");
			        Y.Assert.isTrue (S('hey').isEqualTo('hey'), "a word");
			        Y.Assert.isTrue (S(null).isEqualTo(null), "null");
			        Y.Assert.isTrue (S().isEqualTo(), "undefined");
			        Y.Assert.isFalse (S('').isEqualTo(' '), "empty string and space");
			        Y.Assert.isFalse (S('hey').isEqualTo('you'), "unequal words");
			        Y.Assert.isFalse (S(null).isEqualTo("yes"), "null and a word");
			        Y.Assert.isFalse (S("yes").isEqualTo(null), "a word and null");
			        Y.Assert.isFalse (S().isEqualTo("no"), "undefined and a word");
			        Y.Assert.isFalse (S("no").isEqualTo(), "a word and undefined");

			        Y.Assert.isTrue (S('hey').isEqualTo('HEY'), "a lowercase word and an uppercase word (default case insensitive)");
			        Y.Assert.isTrue (S('HEY').isEqualTo('hey'), "an uppercase word and a lowercase word (default case insensitive)");
			        Y.Assert.isFalse (S('hey').isEqualTo('YOU'), "unequal words (default case insensitive)");

			        Y.Assert.isTrue (S('').isEqualTo('', string.CASE.INSENSITIVE), "empty strings (case insensitive)");
			        Y.Assert.isTrue (S(' ').isEqualTo(' ', string.CASE.INSENSITIVE), "single space (case insensitive)");
			        Y.Assert.isTrue (S('\t\t\t    ').isEqualTo('\t\t\t    ', string.CASE.INSENSITIVE), "tabs and spaces (case insensitive)");
			        Y.Assert.isTrue (S('hey').isEqualTo('HEY', string.CASE.INSENSITIVE), "a lowercase word and an uppercase word (case insensitive)");
			        Y.Assert.isTrue (S('HEY').isEqualTo('hey', string.CASE.INSENSITIVE), "an uppercase word and a lowercase word (case insensitive)");
			        Y.Assert.isTrue (S(null).isEqualTo(null, string.CASE.INSENSITIVE), "null (case insensitive)");
			        Y.Assert.isFalse (S('').isEqualTo(' ', string.CASE.INSENSITIVE), "empty string and space (case insensitive)");
			        Y.Assert.isFalse (S('hey').isEqualTo('you', string.CASE.INSENSITIVE), "unequal words (case insensitive)");
			        Y.Assert.isFalse (S(null).isEqualTo("yes", string.CASE.INSENSITIVE), "null and a word (case insensitive)");
			        Y.Assert.isFalse (S("yes").isEqualTo(null, string.CASE.INSENSITIVE), "a word and null (case insensitive)");
			        Y.Assert.isFalse (S().isEqualTo("no", string.CASE.INSENSITIVE), "undefined and a word (case insensitive)");

			        Y.Assert.isTrue (S('').isEqualTo('', string.CASE.SENSITIVE), "empty strings (case sensitive)");
			        Y.Assert.isTrue (S(' ').isEqualTo(' ', string.CASE.SENSITIVE), "single space (case sensitive)");
			        Y.Assert.isTrue (S('\t\t\t    ').isEqualTo('\t\t\t    ', string.CASE.SENSITIVE), "tabs and spaces (case sensitive)");
			        Y.Assert.isFalse (S('hey').isEqualTo('HEY', string.CASE.SENSITIVE), "a lowercase word and an uppercase word (case sensitive)");
			        Y.Assert.isFalse (S('HEY').isEqualTo('hey', string.CASE.SENSITIVE), "an uppercase word and a lowercase word (case sensitive)");
			        Y.Assert.isTrue (S(null).isEqualTo(null, string.CASE.SENSITIVE), "null (case sensitive)");
			        Y.Assert.isFalse (S('').isEqualTo(' ', string.CASE.SENSITIVE), "empty string and space (case sensitive)");
			        Y.Assert.isFalse (S('hey').isEqualTo('you', string.CASE.SENSITIVE), "unequal words (case sensitive)");
			        Y.Assert.isFalse (S(null).isEqualTo("yes", string.CASE.SENSITIVE), "null and a word (case sensitive)");
			        Y.Assert.isFalse (S("yes").isEqualTo(null, string.CASE.SENSITIVE), "a word and null (case sensitive)");
			        Y.Assert.isFalse (S().isEqualTo("no", string.CASE.SENSITIVE), "undefined and a word (case sensitive)");
		        },

			//----------------------------------------------------------------------------------------------------
			// isLower()
			//----------------------------------------------------------------------------------------------------
		    'test isLower()': function() {
			        Y.Assert.isTrue (S('a').isLower(), "single lowercase letter a");
			        Y.Assert.isTrue (S('m').isLower(), "single lowercase letter m");
			        Y.Assert.isTrue (S('z').isLower(), "single lowercase letter z");
			        Y.Assert.isFalse (S('A').isLower(), "single uppercase letter A");
			        Y.Assert.isFalse (S('M').isLower(), "single uppercase letter M");
			        Y.Assert.isFalse (S('Z').isLower(), "single uppercase letter Z");
			        Y.Assert.isTrue (S('hijp').isLower(), "lowercase word");
			        Y.Assert.isFalse (S('hi jp').isLower(), "lowercase word with a space");
			        Y.Assert.isFalse (S('HelLO').isLower(), "mixed uppercase and lowercase letters");
		        },

			//----------------------------------------------------------------------------------------------------
			// isNumeric()
			//----------------------------------------------------------------------------------------------------
		    'test isNumeric()': function() {
			        Y.Assert.isTrue (S("3").isNumeric(), "single digit");
			        Y.Assert.isFalse (S("34.22").isNumeric(), "decimal point");
			        Y.Assert.isFalse (S("-22.33").isNumeric(), "negative sign and decimal point");
			        Y.Assert.isFalse (S("NaN").isNumeric(), "NaN");
			        Y.Assert.isFalse (S("Infinity").isNumeric(), "Infinity");
			        Y.Assert.isFalse (S("-Infinity").isNumeric(), "-Infinity");
			        Y.Assert.isFalse (S("JP").isNumeric(), "letters only");
			        Y.Assert.isFalse (S("-5").isNumeric(), "negative number");
			        Y.Assert.isTrue (S("000992424242").isNumeric(), "digits beginning with 0s");
		        },

			//----------------------------------------------------------------------------------------------------
			// isUpper()
			//----------------------------------------------------------------------------------------------------
		    'test isUpper()': function() {
			        Y.Assert.isFalse (S('a').isUpper(), "single lowercase letter a");
			        Y.Assert.isFalse (S('m').isUpper(), "single lowercase letter m");
			        Y.Assert.isFalse (S('z').isUpper(), "single lowercase letter z");
			        Y.Assert.isTrue (S('A').isUpper(), "single uppercase letter A");
			        Y.Assert.isTrue (S('M').isUpper(), "single uppercase letter M");
			        Y.Assert.isTrue (S('Z').isUpper(), "single uppercase letter Z");
			        Y.Assert.isTrue (S('HIJP').isUpper(), "all uppercase letters");
			        Y.Assert.isFalse (S('HI JP').isUpper(), "letters with a space");
			        Y.Assert.isFalse (S('HelLO').isUpper(), "mixed case letters");
		        },

			//----------------------------------------------------------------------------------------------------
			// lastIndexOf()
			//----------------------------------------------------------------------------------------------------
		    'test lastIndexOf()': function() {
			        Y.Assert.areSame (S('The fox ran into the hen house.').lastIndexOf("The fox"), 0, "search string exists at the beginning");
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').lastIndexOf("JP"), 21, "search string exists in the middle");
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').lastIndexOf("NBA."), 45, "search string exists at ending");
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').lastIndexOf("golf"), -1, "search string does not exist");

			        Y.Assert.areSame (S('The fox ran into the hen house.').lastIndexOf("THE FOX"), 0, "search string exists at the beginning (default case insensitive)");
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').lastIndexOf("jp"), 21, "search string exists in the middle (default case insensitive)");
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').lastIndexOf("nba."), 45, "search string exists at ending (default case insensitive)");

			        Y.Assert.areSame (S('The fox ran into the hen house.').lastIndexOf("THE FOX", string.CASE.INSENSITIVE), 0, "search string exists at the beginning (case insensitive)");
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').lastIndexOf("jp", string.CASE.INSENSITIVE), 21, "search string exists in the middle (case insensitive)");
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').lastIndexOf("nba.", string.CASE.INSENSITIVE), 45, "search string exists at ending (case insensitive)");
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').lastIndexOf("golf", string.CASE.INSENSITIVE), -1, "search string does not exist (case insensitive)");

			        Y.Assert.areSame (S('The fox ran into the hen house.').lastIndexOf("THE FOX", string.CASE.SENSITIVE), -1, "search string does not exist at the beginning (case sensitive)");
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').lastIndexOf("jp", string.CASE.SENSITIVE), -1, "search string does not exist in the middle (case sensitive)");
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').lastIndexOf("nba.", string.CASE.SENSITIVE), -1, "search string does not exist at ending (case sensitive)");
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').lastIndexOf("golf", string.CASE.SENSITIVE), -1, "search string does not exist (case sensitive)");
			        Y.Assert.areSame (S('The fox ran into the hen house.').lastIndexOf("The", string.CASE.SENSITIVE), 0, "search string exists at the beginning (case sensitive)");
			        Y.Assert.areSame (S('The fox ran into the hen house.').lastIndexOf("the", string.CASE.SENSITIVE), 17, "search string exists in the middle (case sensitive)");
			        Y.Assert.areSame (S('The fox ran into the hen house.').lastIndexOf("house.", string.CASE.SENSITIVE), 25, "search string exists at the end (case sensitive)");

			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').lastIndexOf("jp", string.CASE.INSENSITIVE, 20), 0, "search string exists before and after start position (case insensitive)");
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').lastIndexOf("LiKeS", string.CASE.INSENSITIVE, 2), -1, "search string does not exist before start position (case insensitive)");
			        
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').lastIndexOf("JP", string.CASE.SENSITIVE, 20), 0, "search string exists before and after start position (case sensitive)");
			        Y.Assert.areSame (S('JP likes to program. JP does not play in the NBA.').lastIndexOf("likes", string.CASE.SENSITIVE, 2), -1, "search string does not exist before start position (case sensitive)");
		        },

			//----------------------------------------------------------------------------------------------------
			// length
			//----------------------------------------------------------------------------------------------------
		    'test length': function() {
			        Y.Assert.isTrue (S('hello').length === 5, "word");
			        Y.Assert.isTrue (S('').length === 0, "empty string");
			        Y.Assert.isTrue (S(null).length === -1, "null");
			        Y.Assert.isTrue (S(undefined).length === -1, "undefined");
		        },

			//----------------------------------------------------------------------------------------------------
			// left()
			//----------------------------------------------------------------------------------------------------
		    'test left()': function() {
			        Y.Assert.isTrue (S('My name is JP').left(2).s === 'My', "more than 1 character");
			        Y.Assert.isTrue (S('Hi').left(0).s === '', "no characters");
			        Y.Assert.isTrue (S('Hello').left(1).s === 'H', "1 character");
			        Y.Assert.isTrue (S('Hello').left(10).s === 'Hello', "longer than string length");
			        Y.Assert.isTrue (S('My name is JP').left(-2).s === 'JP', "negative number of characters");
		        },

			//----------------------------------------------------------------------------------------------------
			// lines()
			//----------------------------------------------------------------------------------------------------
		    'test lines()': function() {
		    		var lines;
		    		
					lines = string.make("My name is JP\nJavaScript is my fav language\r\nWhat is your fav language?").lines();
					Y.Assert.isTrue (arraysAreEqual(lines, ["My name is JP", "JavaScript is my fav language", "What is your fav language?"]), "multiple lines");
		    		
					lines = string.make("My name is JP").lines();
					Y.Assert.isTrue (arraysAreEqual(lines, ["My name is JP"]), "1 line");
		    		
					lines = string.make("").lines();
					Y.Assert.isTrue (arraysAreEqual(lines, [""]), "no lines");
		        },

			//----------------------------------------------------------------------------------------------------
			// newlinesToUnix()
			//----------------------------------------------------------------------------------------------------
		    'test newlinesToUnix()': function() {
			        Y.Assert.areSame (S("My\rcat is\r\nwhere?\n").newlinesToUnix().s, 'My\ncat is\nwhere?\n', "newlines changed");
		        },

			//----------------------------------------------------------------------------------------------------
			// orPlural()
			//----------------------------------------------------------------------------------------------------
		    'test orPlural()': function() {
			        Y.Assert.areSame (S('horse').orPlural(1).s, "horse", "singular form (1) just number");
			        Y.Assert.areSame (S('horse').orPlural(2).s, "horses", "plural form (2) just number");
			        Y.Assert.areSame (S('horse').orPlural(0).s, "horses", "plural form (0) just number");

			        Y.Assert.areSame (S('fox').orPlural(1, "es").s, "fox", "singular form (1) with plural suffix");
			        Y.Assert.areSame (S('fox').orPlural(2, "es").s, "foxes", "plural form (2) with plural suffix");
			        Y.Assert.areSame (S('fox').orPlural(0, "es").s, "foxes", "plural form (0) with plural suffix");

			        Y.Assert.areSame (S('goose').orPlural(1, "", "geese").s, "goose", "singular form (1) with plural form");
			        Y.Assert.areSame (S('goose').orPlural(2, "", "geese").s, "geese", "plural form (2) with plural form");
			        Y.Assert.areSame (S('goose').orPlural(0, "", "geese").s, "geese", "plural form (0) with plural form");
		        },

			//----------------------------------------------------------------------------------------------------
			// pad()
			//----------------------------------------------------------------------------------------------------
		    'test pad()': function() {
			        Y.Assert.isTrue (S('hello').pad(2).s === 'hello', "pad length less than string length");
			        Y.Assert.isTrue (S('hello').pad(5).s === 'hello', "pad length same as string length");
			        Y.Assert.isTrue (S('hello').pad(10).s === '   hello  ', "pad length 10/string length 5");
			        Y.Assert.isTrue (S('hey').pad(7).s === '  hey  ', "pad length 7/string length 3");
			        Y.Assert.isTrue (S('hey').pad(5).s === ' hey ', "pad length 5/string length 3");
			        Y.Assert.isTrue (S('hey').pad(4).s === ' hey', "pad length 4/string length 3");
			        Y.Assert.isTrue (S('hey').pad(7, '-').s === '--hey--', "pad length 7/string length 3 with dash pad character");
		        },

			//----------------------------------------------------------------------------------------------------
			// padLeft()
			//----------------------------------------------------------------------------------------------------
		    'test padLeft()': function() {
			        Y.Assert.isTrue (S('hello').padLeft(2).s === 'hello', "pad length less than string length");
			        Y.Assert.isTrue (S('hello').padLeft(5).s === 'hello', "pad length same as string length");
			        Y.Assert.isTrue (S('hello').padLeft(10).s === '     hello', "pad length 10/string length 5");
			        Y.Assert.isTrue (S('hello').padLeft(7).s === '  hello', "pad length 7/string length 5");
			        Y.Assert.isTrue (S('hello').padLeft(6).s === ' hello', "pad length 6/string length 5");
			        Y.Assert.isTrue (S('hello').padLeft(10, '.').s === '.....hello', "pad length 10/string length 5 with period pad character");
		        },

			//----------------------------------------------------------------------------------------------------
			// padRight()
			//----------------------------------------------------------------------------------------------------
		    'test padRight()': function() {
			        Y.Assert.isTrue (S('hello').padRight(2).s === 'hello', "pad length less than string length");
			        Y.Assert.isTrue (S('hello').padRight(5).s === 'hello', "pad length same as string length");
			        Y.Assert.isTrue (S('hello').padRight(10).s === 'hello     ', "pad length 10/string length 5");
			        Y.Assert.isTrue (S('hello').padRight(7).s === 'hello  ', "pad length 7/string length 5");
			        Y.Assert.isTrue (S('hello').padRight(6).s === 'hello ', "pad length 6/string length 5");
			        Y.Assert.isTrue (S('hello').padRight(10, '.').s === 'hello.....', "pad length 10/string length 5 with period pad character");
		        },

			//----------------------------------------------------------------------------------------------------
			// parenthesize()
			//----------------------------------------------------------------------------------------------------
		    'test parenthesize()': function() {
					Y.Assert.areSame (S('test').parenthesize().s, '(test)', "non-blank string");
					Y.Assert.areSame (S('').parenthesize().s, '()', "blank string");
		        },

			//----------------------------------------------------------------------------------------------------
			// quote()
			//----------------------------------------------------------------------------------------------------
		    'test quote()': function() {
					Y.Assert.areSame (S('test').quote().s, '"test"', "non-blank string");
					Y.Assert.areSame (S('').quote().s, '""', "blank string");
		        },

			//----------------------------------------------------------------------------------------------------
			// repeat()
			//----------------------------------------------------------------------------------------------------
		    'test repeat()': function() {
			        Y.Assert.isTrue (S(' ').repeat(5).s === '     ', "5 spaces");
			        Y.Assert.isTrue (S('*').repeat(3).s === '***', "3 asterisks");
			        Y.Assert.isTrue (S('abcd').repeat(3).s === 'abcdabcdabcd', "3 abcd's");
		        },

			//----------------------------------------------------------------------------------------------------
			// replace()
			//----------------------------------------------------------------------------------------------------
		    'test replace()': function() {
			        Y.Assert.areSame (S('The fox is the enemy.').replace('the', 'That').s, 'That fox is the enemy.', "search string exists");
			        Y.Assert.areSame (S('The fox is the enemy.').replace('junk', 'That').s, 'The fox is the enemy.', "search string does not exist");
			        Y.Assert.areSame (S('').replace('junk', 'That').s, '', "string is empty");
			        Y.Assert.areSame (S('The fox is the enemy.').replace('', 'That').s, 'ThatThe fox is the enemy.', "search string is empty");

			        Y.Assert.areSame (S('The fox is the enemy.').replace('THE', 'That').s, 'That fox is the enemy.', "search string exists (default case insensitive)");

			        Y.Assert.areSame (S('The fox is the enemy.').replace('THE', 'That', string.CASE.INSENSITIVE).s, 'That fox is the enemy.', "search string exists (case insensitive)");
			        Y.Assert.areSame (S('The fox is the enemy.').replace('junk', 'That', string.CASE.INSENSITIVE).s, 'The fox is the enemy.', "search string does not exist (case insensitive)");
			        Y.Assert.areSame (S('').replace('junk', 'That', string.CASE.INSENSITIVE).s, '', "string is empty (case insensitive)");
			        Y.Assert.areSame (S('The fox is the enemy.').replace('', 'That', string.CASE.INSENSITIVE).s, 'ThatThe fox is the enemy.', "search string is empty (case insensitive)");

			        Y.Assert.areSame (S('The fox is the enemy.').replace('the', 'that', string.CASE.SENSITIVE).s, 'The fox is that enemy.', "search string exists (case sensitive)");
			        Y.Assert.areSame (S('The fox is the enemy.').replace('junk', 'That', string.CASE.SENSITIVE).s, 'The fox is the enemy.', "search string does not exist (case sensitive)");
			        Y.Assert.areSame (S('').replace('junk', 'That', string.CASE.SENSITIVE).s, '', "string is empty (case sensitive)");
			        Y.Assert.areSame (S('The fox is the enemy.').replace('', 'That', string.CASE.SENSITIVE).s, 'ThatThe fox is the enemy.', "search string is empty (case sensitive)");
		        },

			//----------------------------------------------------------------------------------------------------
			// replaceAll()
			//----------------------------------------------------------------------------------------------------
		    'test replaceAll()': function() {
			        var e = '\\', q = '"';
			        var r = e + q;

			        Y.Assert.areSame (S(' does IT work? ').replaceAll(' ', '_').s, '_does_IT_work?_', "replace spaces with underscores");
			        Y.Assert.areSame (S('Yes it does!').replaceAll(' ', '').s, 'Yesitdoes!', "remove spaces");
			        Y.Assert.areSame (S('lalala.blabla').replaceAll('.', '_').s, 'lalala_blabla', "change periods to underscores");
			        Y.Assert.areSame (S('a').replaceAll(q, r).s, 'a', '" ==> \\"');
			        
			        Y.Assert.areSame (S('Most dogs like other dogs.').replaceAll('dog', 'cat').s, 'Most cats like other cats.', "replace words");
			        Y.Assert.areSame (S('Most dogs like other dogs.').replaceAll('DOG', 'cat').s, 'Most cats like other cats.', "replace words (default case insensitive)");
			        Y.Assert.areSame (S('Most dogs like other dogs.').replaceAll('DOG', 'cat', string.CASE.INSENSITIVE).s, 'Most cats like other cats.', "replace words (case insensitive)");
			        Y.Assert.areSame (S('Most dogs like other dogs.').replaceAll('DOG', 'cat', string.CASE.SENSITIVE).s, 'Most dogs like other dogs.', "search string does not exist (case sensitive)");
			        Y.Assert.areSame (S('Most dogs like other dogs.').replaceAll('dog', 'cat', string.CASE.SENSITIVE).s, 'Most cats like other cats.', "replace words (case sensitive)");
		        },

			//----------------------------------------------------------------------------------------------------
			// right()
			//----------------------------------------------------------------------------------------------------
		    'test right()': function() {
			        Y.Assert.areSame (S('I AM CRAZY').right(2).s, 'ZY', "last 2 characters");
			        Y.Assert.areSame (S('Does it work?  ').right(4).s, 'k?  ', "last 4 characters with spaces");
			        Y.Assert.areSame (S('Hi').right(0).s, '', "N = 0");
			        Y.Assert.areSame (S('My name is JP').right(-2).s, 'My', "N < 0");
			        Y.Assert.areSame (S('My name is JP').right(-20).s, 'My name is JP', "N < 0 && abs(N) > string length");
			        Y.Assert.areSame (S('I AM CRAZY').right(20).s, 'I AM CRAZY', "N > string length");
		        },

			//----------------------------------------------------------------------------------------------------
			// s
			//----------------------------------------------------------------------------------------------------
		    'test s': function() {
			        Y.Assert.areSame (S('hi').s, 'hi', "s contains the string value");
			        Y.Assert.areSame (S('hi').toString(), S('hi').s, "s is equivalent to toString()");
		        },

			//----------------------------------------------------------------------------------------------------
			// setValue()
			//----------------------------------------------------------------------------------------------------
		    'test setValue()': function() {
			        Y.Assert.areSame (S('hi').setValue('goodbye').s, 'goodbye', "setValue changes the original string value");
		        },

			//----------------------------------------------------------------------------------------------------
			// slugify()
			//----------------------------------------------------------------------------------------------------
		    'test slugify()': function() {
			        Y.Assert.areSame (S('Fast JSON Parsing').slugify().s, 'fast-json-parsing', "mixed-case string");
			        Y.Assert.areSame (S('FAST JSON PARSING').slugify().s, 'fast-json-parsing', "uppercase string");
			        Y.Assert.areSame (S('fast json parsing').slugify().s, 'fast-json-parsing', "lowercase string");
			        Y.Assert.areSame (S('FASTJSONPARSING').slugify().s, 'fastjsonparsing', "no spaces");
			        Y.Assert.areSame (S('fast-json-parsing').slugify().s, 'fast-json-parsing', "dashes");
			        Y.Assert.areSame (S('').slugify().s, '', "empty string");
			        Y.Assert.areSame (S('\n\t ').slugify().s, '', "newline/tab/space");
		        },

			//----------------------------------------------------------------------------------------------------
			// startsWith()
			//----------------------------------------------------------------------------------------------------
		    'test startsWith()': function() {
			        Y.Assert.isTrue (S("JP is a software engineer").startsWith("JP"), "search string exists at beginning");
			        Y.Assert.isFalse (S("JP is a software engineer").startsWith("software"), "search string exists but not at beginning");
			        Y.Assert.isFalse (S('wants to change the world').startsWith("politicians"), "search string does not exist");
			        Y.Assert.isTrue (S("").startsWith(""), "string and search value are empty");
			        Y.Assert.isFalse (S("").startsWith("test"), "string is empty");
			        Y.Assert.isTrue (S("Hi").startsWith(""), "search string is empty");
			        Y.Assert.isTrue (S("JP").startsWith("JP"), "string and search value are the same");

			        Y.Assert.isTrue (S("JP is a software engineer").startsWith("jp"), "search string exists at beginning (default case insensitive)");
			        Y.Assert.isFalse (S("JP is a software engineer").startsWith("SOFTWARE"), "search string exists but not at beginning (default case insensitive)");
			        Y.Assert.isFalse (S('wants to change the world').startsWith("POLITICIANS"), "search string does not exist (default case insensitive)");
			        Y.Assert.isTrue (S("JP").startsWith("jp"), "string and search value are the same (default case insensitive)");

			        Y.Assert.isTrue (S("JP is a software engineer").startsWith("jp", string.CASE.INSENSITIVE), "search string exists at beginning (case insensitive)");
			        Y.Assert.isFalse (S("JP is a software engineer").startsWith("software", string.CASE.INSENSITIVE), "search string exists but not at beginning (case insensitive)");
			        Y.Assert.isFalse (S('wants to change the world').startsWith("politicians", string.CASE.INSENSITIVE), "search string does not exist (case insensitive)");
			        Y.Assert.isTrue (S("").startsWith("", string.CASE.INSENSITIVE), "string and search value are empty (case insensitive)");
			        Y.Assert.isFalse (S("").startsWith("test", string.CASE.INSENSITIVE), "string is empty (case insensitive)");
			        Y.Assert.isTrue (S("Hi").startsWith("", string.CASE.INSENSITIVE), "search string is empty (case insensitive)");
			        Y.Assert.isTrue (S("JP").startsWith("jp", string.CASE.INSENSITIVE), "string and search value are the same (case insensitive)");

			        Y.Assert.isTrue (S("JP is a software engineer").startsWith("JP", string.CASE.SENSITIVE), "search string exists at beginning (case sensitive)");
			        Y.Assert.isFalse (S("JP is a software engineer").startsWith("jp", string.CASE.SENSITIVE), "search string exists at beginning but different cases (case sensitive)");
			        Y.Assert.isFalse (S("JP is a software engineer").startsWith("software", string.CASE.SENSITIVE), "search string exists but not at beginning (case sensitive)");
			        Y.Assert.isFalse (S('wants to change the world').startsWith("politicians", string.CASE.SENSITIVE), "search string does not exist (case sensitive)");
			        Y.Assert.isTrue (S("").startsWith("", string.CASE.SENSITIVE), "string and search value are empty (case sensitive)");
			        Y.Assert.isFalse (S("").startsWith("test", string.CASE.SENSITIVE), "string is empty (case sensitive)");
			        Y.Assert.isTrue (S("Hi").startsWith("", string.CASE.SENSITIVE), "search string is empty (case sensitive)");
			        Y.Assert.isTrue (S("JP").startsWith("JP", string.CASE.SENSITIVE), "string and search value are the same (case sensitive)");
			        Y.Assert.isFalse (S("JP").startsWith("jp", string.CASE.SENSITIVE), "string and search value are the same but different cases (case sensitive)");
		        },

			//----------------------------------------------------------------------------------------------------
			// stripPunctuation()
			//----------------------------------------------------------------------------------------------------
		    'test stripPunctuation()': function() {
			        Y.Assert.areSame (S('My, st[ring] *full* of %punct)').stripPunctuation().s, 'My string full of punct', "string with punctuation");
			        Y.Assert.areSame (S('No punctuation').stripPunctuation().s, 'No punctuation', "no punctuation");
			        Y.Assert.areSame (S('').stripPunctuation().s, '', "empty string");
		        },

			//----------------------------------------------------------------------------------------------------
			// surround()
			//----------------------------------------------------------------------------------------------------
		    'test surround()': function() {
					Y.Assert.areSame (S('emphasize this').surround('**').s, '**emphasize this**', "2 asterisks");
					Y.Assert.areSame (S('do not emphasize this').surround('').s, 'do not emphasize this', "empty surround string");
		        },

			//----------------------------------------------------------------------------------------------------
			// toBoolean()
			//----------------------------------------------------------------------------------------------------
		    'test toBoolean()': function() {
			        Y.Assert.isTrue (S('true').toBoolean(), "'true'");
			        Y.Assert.isFalse (S('false').toBoolean(), "'false'");
			        Y.Assert.isFalse (S('hello').toBoolean(), "'hello'");
			        Y.Assert.isTrue (S(true).toBoolean(), "true");
			        Y.Assert.isTrue (S('on').toBoolean(), "'on'");
			        Y.Assert.isTrue (S('yes').toBoolean(), "'yes'");
			        Y.Assert.isTrue (S('TRUE').toBoolean(), "'TRUE'");
			        Y.Assert.isTrue (S('TrUe').toBoolean(), "'TrUe'");
			        Y.Assert.isTrue (S('YES').toBoolean(), "'YES'");
			        Y.Assert.isTrue (S('ON').toBoolean(), "'ON'");
			        Y.Assert.isFalse (S('').toBoolean(), "''");
			        Y.Assert.isFalse (S(undefined).toBoolean(), "undefined")
			        Y.Assert.isFalse (S('undefined').toBoolean(), "'undefined'")
			        Y.Assert.isFalse (S(null).toBoolean(), "null")
			        Y.Assert.isFalse (S(false).toBoolean(), "false")
			        Y.Assert.isFalse (S({}).toBoolean(), "{}")
			        Y.Assert.isTrue (S(1).toBoolean(), "1")
			        Y.Assert.isFalse (S(-1).toBoolean(), "-1")
			        Y.Assert.isFalse (S(0).toBoolean(), "0")
		        },

			//----------------------------------------------------------------------------------------------------
			// toFloat()
			//----------------------------------------------------------------------------------------------------
		    'test toFloat()': function() {
			        Y.Assert.areSame (S('5').toFloat(), 5, "integer string");
			        Y.Assert.areSame (S('5.3').toFloat(), 5.3, "real string");
			        Y.Assert.areSame (S(5.3).toFloat(), 5.3, "real number");
			        Y.Assert.areSame (S('-10').toFloat(), -10, "negative integer string");
			        Y.Assert.areSame (S('55.3 adfafaf').toFloat(), 55.3, "real with letters string")
			        Y.Assert.areSame (S('afff 44').toFloat().toString(), 'NaN', "letters with digits string")
			        Y.Assert.areSame (S(3.45522222333232).toFloat(2), 3.46, "real number with precision")
		        },

			//----------------------------------------------------------------------------------------------------
			// toInt()
			//----------------------------------------------------------------------------------------------------
		    'test toInt()': function() {
			        Y.Assert.areSame (S('5').toInt(), 5, "integer string");
			        Y.Assert.areSame (S('5.3').toInt(), 5, "real string");
			        Y.Assert.areSame (S(5.3).toInt(), 5, "real number");
			        Y.Assert.areSame (S('-10').toInt(), -10, "negative integer string");
			        Y.Assert.areSame (S('55 adfafaf').toInt(), 55, "integer with letters string")
			        Y.Assert.areSame (S('afff 44').toInt().toString(), 'NaN', "letters with digits string")
			        Y.Assert.areSame (S('0xff').toInt(), 255, "hex string")
		        },

			//----------------------------------------------------------------------------------------------------
			// toString()
			//----------------------------------------------------------------------------------------------------
		    'test toString()': function() {
			        Y.Assert.areSame (S('hi').toString(), 'hi', "string value");
			        Y.Assert.areSame (S('hi').toString(), S('hi').s, "toString() === s");
		        },

			//----------------------------------------------------------------------------------------------------
			// trim()
			//----------------------------------------------------------------------------------------------------
		    'test trim() (String object method)': function() {
			        Y.Assert.areSame (S('   hello').trim().s, 'hello', "spaces at beginning");
			        Y.Assert.areSame (S('hello   ').trim().s, 'hello', "spaces at end");
			        Y.Assert.areSame (S(' hello ').trim().s, 'hello', "spaces before and after");
			        Y.Assert.areSame (S('\nhello').trim().s, 'hello', "newline at beginning");
			        Y.Assert.areSame (S('\nhello\r\n').trim().s, 'hello', "newlines at beginning and carriage return/linefeed at end");
			        Y.Assert.areSame (S('\thello\t').trim().s, 'hello', "tabs before and after");
		        },

			//----------------------------------------------------------------------------------------------------
			// trimLeft()
			//----------------------------------------------------------------------------------------------------
		    'test trimLeft()': function() {
			        Y.Assert.areSame (S('How are you?').trimLeft().s, 'How are you?', "no whitespace");
			        Y.Assert.areSame (S(' \r\n How are you?').trimLeft().s, 'How are you?', "whitespace at beginning");
			        Y.Assert.areSame (S('How are you?    ').trimLeft().s, 'How are you?    ', "spaces at end");
			        Y.Assert.areSame (S(' JP ').trimLeft().s, 'JP ', "spaces before and after");
		        },

			//----------------------------------------------------------------------------------------------------
			// trimRight()
			//----------------------------------------------------------------------------------------------------
		    'test trimRight()': function() {
			        Y.Assert.areSame (S('How are you?').trimRight().s, 'How are you?', "no whitespace");
			        Y.Assert.areSame (S('How are you? \r\n ').trimRight().s, 'How are you?', "whitespace at end");
			        Y.Assert.areSame (S('    How are you?').trimRight().s, '    How are you?', "spaces at front");
			        Y.Assert.areSame (S(' JP ').trimRight().s, ' JP', "spaces before and after");
		        },

			//----------------------------------------------------------------------------------------------------
			// truncate()
			//----------------------------------------------------------------------------------------------------
		    'test truncate()': function() {
			        Y.Assert.areSame (S('this is some long text').truncate(3).s, '...', "length = 3")
			        Y.Assert.areSame (S('this is some long text').truncate(7).s, 'this is...', "length = 7")
			        Y.Assert.areSame (S('this is some long text').truncate(11).s, 'this is...', "length = 11")
			        Y.Assert.areSame (S('this is some long text').truncate(12).s, 'this is some...', "length = 12")
			        Y.Assert.areSame (S('this is some long text').truncate(14, ' read more').s, 'this is some read more', "length = 14, prune string = read more")
			        Y.Assert.areSame (S('some string').truncate(200).s, 'some string', "length > string length")
		        },

			//----------------------------------------------------------------------------------------------------
			// valueOf()
			//----------------------------------------------------------------------------------------------------
		    'test valueOf()': function() {
			        Y.Assert.areSame (S('hi').valueOf(), 'hi', "return the primitive value of the string")
		        },
		        
			//----------------------------------------------------------------------------------------------------
			// words()
			//----------------------------------------------------------------------------------------------------
		    'test words()': function() {
					Y.Assert.isTrue (arraysAreEqual(S('   I   love   you   ').words(), ["I","love","you"]), "default delimiter");
					Y.Assert.isTrue (arraysAreEqual(S('I_love_you').words('_'), ["I","love","you"]), "underscore delimiter");
					Y.Assert.isTrue (arraysAreEqual(S('I-love-you').words(/-/), ["I","love","you"]), "regex delimiter");
					Y.Assert.isTrue (arraysAreEqual(S('    ').words(), []), "no words");
		        },
		        
			//----------------------------------------------------------------------------------------------------
			// wrap()
			//----------------------------------------------------------------------------------------------------
		    'test wrap()': function() {
					Y.Assert.areSame (S('this is an aside').wrap('(', ')').s, '(this is an aside)', "parentheses");
					Y.Assert.areSame (S('STREET').wrap('{{', '}}').s, '{{STREET}}', "mustashe");
					Y.Assert.areSame (S('').wrap('--', '++').s, '--++', "blank string");
		        }
	    };
	    
	    return testCases;
	};
	
	return publicInterface;
});

