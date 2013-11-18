
string v1.0.1
=============

string is a unified Javascript RequireJS/CommonJS module for the browser and/or Wakanda Server 
(SSJS) which provides string methods not available in plain-vanilla javascript. It also offers
case-insensitive or case-sensitive string operations. Operations are case insensitive by default.

This module does not modify the native Javascript String object prototype. Instead, it defines its
own string object and "imports" the native Javascript String Object methods and properties.
Therefore, the native String object methods are directly available to be used with this module's
string object. Case-sensitive native String object methods (such as [indexOf()](#INDEXOF)) are
replaced by this module and default to case-insensitive mode. 

This module is based heavily on [string.js](http://stringjs.com) by JP Richardson
<jprichardson@gmail.com>.

<a id="WHY?"></a>
Why?
----
Here's what JP Richardson says about his [string.js](http://stringjs.com) module:

> Here's a list of alternative frameworks:
>
> * [Prototype Framework's String library](http://prototypejs.org/api/string)
> * [Uize.String](http://www.uize.com/reference/Uize.String.html)
> * [Google Closure's String](http://closure-library.googlecode.com/svn/docs/namespace_goog_string.html)
> * [Underscore.string](http://epeli.github.com/underscore.string/)
> * [Sugar.js](http://sugarjs.com)
> * [php.js](http://phpjs.org/pages/home)

> Why wasn't I happy with any of them? They are all static methods that don't seem to support
> chaining in a clean way 'OR' they have an odd dependency. Sugar is the notable exception.

In large measure, I agree with JP. So why not just use his [string.js](http://stringjs.com) module?
Well, I started out using it. I even extended it to default to case-insensitivity and allow for
case sensitive operations. Ultimately, I decided to create my own module based on JP's. Here's why:

1. [string.js](http://stringjs.com) exports a function. This can be problematic. See Alexandre
Morgaut's [Wakanda Forum post](http://tinyurl.com/lseesj8). At this point, I don't see string.js
being modified to take this into account. 

2. I wanted to break out JP's module into pure string operations, moving methods like 
**parseCSV()** that are only for special needs into their own module. JP is planning to do
something similar, but I didn't want to wait. 

3. Creating my own module allowed me to directly add methods from other libraries (like
[words()](#WORDS) or my own methods that I have found useful over the years (like
[orPlural()](#ORPLURAL)). 

Contents
--------
* [Why?](#WHY?)
* [Dependencies](#DEPENDENCIES)
* [Script Files](#SCRIPT_FILES)
* [Example](#EXAMPLE)
* [Constants](#CONSTANTS)
    * [CASE](#CASE)
* [Module Functions](#MODULE_FUNCTIONS)
    * [make (value)](#MAKE)
* [string Object Methods](#STRING_OBJECT_METHODS)
    * [Native String Object Methods](#NATIVE_STRING_OBJECT_METHODS)
    * [between (left, right, caseOption)](#BETWEEN)
    * [capitalize ()](#CAPITALIZE)
    * [chompLeft (prefix, caseOption)](#CHOMPLEFT)
    * [chompRight (suffix, caseOption)](#CHOMPRIGHT)
    * [collapseWhitespace ()](#COLLAPSEWHITESPACE)
    * [compareTo (value, caseOption)](#COMPARETO)
    * [contains (value, caseOption)](#CONTAINS)
    * [count (value, caseOption)](#COUNT)
    * [dasherize ()](#DASHERIZE)
    * [endsWith (suffix, caseOption)](#ENDSWITH)
    * [ensureLeft (prefix, caseOption)](#ENSURELEFT)
    * [ensureRight (suffix, caseOption)](#ENSURERIGHT)
    * [indexOf (value, caseOption, start)](#INDEXOF)
    * [isAlpha ()](#ISALPHA)
    * [isAlphaNumeric ()](#ISALPHANUMERIC)
    * [isEmpty ()](#ISEMPTY)
    * [isEqualTo (value, caseOption)](#ISEQUALTO)
    * [isLower ()](#ISLOWER)
    * [isNumeric ()](#ISNUMERIC)
    * [isUpper ()](#ISUPPER)
    * [lastIndexOf (value, caseOption, start)](#LASTINDEXOF)
    * [left (N)](#LEFT)
    * [lines ()](#LINES)
    * [newlinesToUnix ()](#NEWLINESTOUNIX)
    * [orPlural (number, pluralSuffix, plural)](#ORPLURAL)
    * [pad (length, character)](#PAD)
    * [padLeft (length, character)](#PADLEFT)
    * [padRight (length, character)](#PADRIGHT)
    * [parenthesize ()](#PARENTHESIZE)
    * [quote ()](#QUOTE)
    * [repeat (n)](#REPEAT)
    * [replace (oldString, newString, caseOption)](#REPLACE)
    * [replaceAll (oldString, newString, caseOption)](#REPLACEALL)
    * [right (N)](#RIGHT)
    * [setValue (value)](#SETVALUE)
    * [slugify ()](#SLUGIFY)
    * [startsWith (prefix, caseOption)](#STARTSWITH)
    * [stripPunctuation ()](#STRIPPUNCTUATION)
    * [surround (value)](#SURROUND)
    * [toBoolean ()](#TOBOOLEAN)
    * [toFloat (precision)](#TOFLOAT)
    * [toInt ()](#TOINT)
    * [toString ()](#TOSTRING)
    * [trimLeft ()](#TRIMLEFT)
    * [trimRight ()](#TRIMRIGHT)
    * [truncate (length, pruneStr)](#TRUNCATE)
    * [words (delimiter)](#WORDS)
    * [wrap (front, back)](#WRAP)
* [Extending This Module](#EXTENDING_THIS_MODULE)
* [Testing](#TESTING)
* [Credits](#CREDITS)
* [Contributions](#CONTRIBUTIONS)
* [License](#LICENSE)


<a id="DEPENDENCIES"></a>
Dependencies
------------

* [RequireJS](http://requirejs.org) on the client (browser) side.
* [Wakanda](http://www.wakanda.org) v6+.

<a id="SCRIPT_FILES"></a>
Script Files
------------

* string.js - Fully commented script. Update to contribute.
* string.min.js - Minimized script. For normal use.
* string.no-md.js - Commented script without markdown comments. Use for debugging.

<a id="EXAMPLE"></a>
Example
-------

```javascript
var string = require('string');

var doesIt = string.make('my cool string').left(3).trim().endsWith('y'); // true
```

<a id="CONSTANTS"></a>
Constants
---------
<a id="CASE"></a>
### CASE
* INSENSITIVE *Default* - Do not take case into account when performing an operation.
* SENSITIVE - Take case into account when performing an operation.

Examples:

```javascript
string.make('Hello').isEqualTo('hello', string.CASE.SENSITIVE); // false
```


<a id="MODULE_FUNCTIONS"></a>
Module Functions
----------------
<a id="MAKE"></a>
### make (value)

To create a string object, simply call the **make()** function with an initial `value`.

Examples:

```javascript
string.make('Hello').s; // 'Hello'
```

<a id="STRING_OBJECT_METHODS"></a>
string Object Methods
----------------------
<a id="NATIVE_STRING_OBJECT_METHODS"></a>
### Native String Object Methods

This module does not modify the native Javascript String object prototype. Instead, it defines its
own string object and "imports" the native Javascript String Object methods and properties.
Therefore, the native String object methods are directly available to be used with this module's
string object. Case-sensitive native String object methods (such as indexOf) are replaced by this
module and default to case-insensitive mode. 
<a id="BETWEEN"></a>
### between (left, right, caseOption)

Extracts a string between `left` and `right` strings. `caseOption` is optional and defaults to
CASE.INSENSITIVE. See the [CASE](#CASE) constants. 

Examples:

```javascript
string.make('<a>foobar</a>').between('<a>', '</a>').s; // 'foobar'
```
<a id="CAPITALIZE"></a>
### capitalize ()

Capitalizes the first character of a string.

Examples:

```javascript
string.make('jon').capitalize().s; // 'Jon'
string.make('JP').capitalize().s; // 'Jp'
```
<a id="CHOMPLEFT"></a>
### chompLeft (prefix, caseOption)

Removes `prefix` from start of string. `caseOption` is optional and defaults to CASE.INSENSITIVE.
See the [CASE](#CASE) constants. 

Examples:

```javascript
string.make('foobar').chompLeft('foo').s; // 'bar'
string.make('foobar').chompLeft('bar').s; // 'foobar'
```
<a id="CHOMPRIGHT"></a>
### chompRight (suffix, caseOption)

Removes `suffix` from end of string. `caseOption` is optional and defaults to CASE.INSENSITIVE.
See the [CASE](#CASE) constants. 

Examples:

```javascript
string.make('foobar').chompRight('bar').s; // 'foo'
string.make('foobar').chompRight('foo').s; // 'foobar'
```
<a id="COLLAPSEWHITESPACE"></a>
### collapseWhitespace ()

Converts all adjacent whitespace characters to a single space.

Examples:

```javascript
var str = string.make('  String   \t libraries are   \n\n\t fun\n!  ')
                 .collapseWhitespace().s; // 'String libraries are fun !'
```
<a id="COMPARETO"></a>
### compareTo (value, caseOption)

Returns 0 if the string is equal to `value`, 1 if the string is greater than `value` and -1 if the
string is less than `value`. `caseOption` is optional and defaults to CASE.INSENSITIVE. See the
[CASE](#CASE) constants. 

Examples:

```javascript
string.make('Hello').compareTo('hello'); // 0
string.make('Hello').compareTo('also'); // 1
string.make('Hello').compareTo('zebra'); // -1
string.make('Hello').compareTo('hello', string.CASE.SENSITIVE); // 1
string.make('Hello').compareTo('Hello', string.CASE.SENSITIVE); // 0
```
<a id="CONTAINS"></a>
### contains (value, caseOption)

Returns *true* if the string contains `value`. `caseOption` is optional and defaults to
CASE.INSENSITIVE. See the [CASE](#CASE) constants. 

Examples:

```javascript
string.make('JavaScript is one of the best languages!').contains('one'); // true
```
<a id="COUNT"></a>
### count (value, caseOption)

Returns the count of the number of occurrences of the `value`. `caseOption` is optional and
defaults to CASE.INSENSITIVE. See the [CASE](#CASE) constants. 

Examples:

```javascript
string.make('JP likes to program. JP does not play in the NBA.').count("JP"); // 2
string.make('Does not exist.').count("Flying Spaghetti Monster"); // 0
string.make('Does not exist.').count("Bigfoot"); // 0
string.make('JavaScript is fun, therefore Wakanda is fun').count("fun"); // 2
string.make('funfunfun').count("fun"); // 3
```
<a id="DASHERIZE"></a>
### dasherize ()

Returns a converted camel-cased string into a string delimited by dashes.

Examples:

```javascript
string.make('dataRate').dasherize().s; // 'data-rate'
string.make('CarSpeed').dasherize().s; // '-car-speed'
string.make('yesWeCan').dasherize().s; // 'yes-we-can'
string.make('backgroundColor').dasherize().s; // 'background-color'
```
<a id="ENDSWITH"></a>
### endsWith (suffix, caseOption)

Returns *true* if the string ends with `suffix`. `caseOption` is optional and defaults to
CASE.INSENSITIVE. See the [CASE](#CASE) constants. 

Examples:

```javascript
string.make("hello jon").endsWith('jon'); // true
```
<a id="ENSURELEFT"></a>
### ensureLeft (prefix, caseOption)

Ensures string starts with `prefix`. `caseOption` is optional and defaults to CASE.INSENSITIVE.
See the [CASE](#CASE) constants. 

Examples:

```javascript
string.make('subdir').ensureLeft('/').s; // '/subdir'
string.make('/subdir').ensureLeft('/').s; // '/subdir'
```
<a id="ENSURERIGHT"></a>
### ensureRight (suffix, caseOption)

Ensures string ends with `suffix`. `caseOption` is optional and defaults to CASE.INSENSITIVE.
See the [CASE](#CASE) constants.

Examples:

```javascript
string.make('dir').ensureRight('/').s; // 'dir/'
string.make('dir/').ensureRight('/').s; // 'dir/'
```
<a id="INDEXOF"></a>
### indexOf (value, caseOption, start)

Returns the position of the first occurrence of `value` in the string. The optional `start`
specifies the position at which to start the search. The default is 0. `caseOption` is optional
and defaults to CASE.INSENSITIVE. See the [CASE](#CASE) constants. 

Examples:

```javascript
string.make("The dog chased the cat.").indexOf('the'); // 0
```
<a id="ISALPHA"></a>
### isAlpha ()

Returns *true* if the string contains only letters.

Examples:

```javascript
string.make("afaf").isAlpha(); // true
string.make('fdafaf3').isAlpha(); // false
string.make('dfdf--dfd').isAlpha(); // false
```
<a id="ISALPHANUMERIC"></a>
### isAlphaNumeric ()

Returns *true* if the string contains only letters and numbers.

Examples:

```javascript
string.make("afaf35353afaf").isAlphaNumeric(); // true
string.make("FFFF99fff").isAlphaNumeric(); // true
string.make("99").isAlphaNumeric(); // true
string.make("afff").isAlphaNumeric(); // true
string.make("Infinity").isAlphaNumeric(); // true
string.make("-Infinity").isAlphaNumeric(); // false
string.make("-33").isAlphaNumeric(); // false
string.make("aaff..").isAlphaNumeric(); // false
```
<a id="ISEMPTY"></a>
### isEmpty ()

Returns *true* if the string is solely composed of whitespace or is `null` or `undefined`.

Examples:

```javascript
string.make(' ').isEmpty(); // true
string.make('\t\t\t    ').isEmpty(); // true
string.make('\n\n ').isEmpty(); // true
string.make('helo').isEmpty(); // false
string.make(null).isEmpty(); // true
string.make(undefined).isEmpty(); // true
```
<a id="ISEQUALTO"></a>
### isEqualTo (value, caseOption)

Returns *true* if the string is equal to the `value`. `caseOption` is optional and defaults to
CASE.INSENSITIVE. See the [CASE](#CASE) constants. 

Examples:

```javascript
string.make('Hello').isEqualTo('hello'); // true
```
<a id="ISLOWER"></a>
### isLower ()

Returns *true* if the character or string is lowercase.

Examples:

```javascript
string.make('a').isLower(); // true
string.make('z').isLower(); // true
string.makeS('B').isLower(); // false
string.make('hijp').isLower(); // true
string.make('hi jp').isLower(); // false
string.make('HelLO').isLower(); // false
```
<a id="ISNUMERIC"></a>
### isNumeric ()

Returns *true* if the string only contains digits.

Examples:

```javascript
string.make("3").isNumeric(); // true
string.make("34.22").isNumeric(); // false
string.make("-22.33").isNumeric(); // false
string.make("NaN").isNumeric(); // false
string.make("Infinity").isNumeric(); // false
string.make("-Infinity").isNumeric(); // false
string.make("JP").isNumeric(); // false
string.make("-5").isNumeric(); // false
string.make("000992424242").isNumeric(); // true
```
<a id="ISUPPER"></a>
### isUpper ()

Returns *true* if the character or string is uppercase.

Examples:

```javascript
string.make('a').isUpper() // false
string.make('z').isUpper()  // false
string.make('B').isUpper() // true
string.make('HIJP').isUpper() // true
string.make('HI JP').isUpper() // false
string.make('HelLO').isUpper() // true
```
<a id="LASTINDEXOF"></a>
### lastIndexOf (value, caseOption, start)

Returns the position of the last occurrence of `value` in the string. The optional `start` 
specifies the position at which to start the search (searching backwards). The default is the
length of the string. `caseOption` is optional and defaults to CASE.INSENSITIVE. See the
[CASE](#CASE) constants. 

Examples:

```javascript
string.make("The dog chased the cat.").lastIndexOf('the'); // 15
```
<a id="LEFT"></a>
### left (N)

Returns the substring denoted by `N` positive left-most characters.

Examples:

```javascript
string.make('My name is JP').left(2).s; // 'My'
string.make('Hi').left(0).s; // ''
string.make('My name is JP').left(-2).s; // 'JP', same as right(2)
```
<a id="LINES"></a>
### lines ()

Returns an array with the string's lines. Cross-platform compatible.

Examples:

```javascript
var stuff = "My name is JP\nJavaScript is my fav language\r\nWhat is your fav language?";
var lines = string.make(stuff).lines();

/*
[ 'My name is JP',
  'JavaScript is my fav language',
  'What is your fav language?' ]
*/
```
<a id="NEWLINESTOUNIX"></a>
### newlinesToUnix ()

Replaces Windows and Mac new lines with unix style: \r or \r\n with \n.

Examples:

```javascript
string.make("My\rcat is\r\nwhere?\n").newlinesToUnix(); // 'My\ncat is\nwhere?\n'
```
<a id="ORPLURAL"></a>
### orPlural (number, pluralSuffix, plural)

This method returns a singular or plural word or phrase based on a variable number of items. If the
number of items is 1, the singular form is returned. Otherwise the plural form is returned. 

If `number` is 1, returns the string "as is" (which must be the singular form of the word or
phrase). Otherwise returns the optional `plural` string. If `plural` is not specified, returns
the string with the optional `pluralSuffix` appended. If `pluralSuffix` is not given, `'s'` is
its default. 


Examples:

```javascript
N = 1;
N.toString() + ' ' +  string.make('horse').orPlural(N).; // '1 horse'

N.toString() + ' ' +  string.make('fox').orPlural(N, 'es') + ' ' +
	string.make('is').orPlural(N, '', 'are') + ' in the hen house.';

    // '1 fox is in the hen house.'

N = 5;
N.toString() + ' ' +  string.make('horse').orPlural(N); // '5 horses'
N.toString() + ' ' +  string.make('fox').orPlural(N, 'es'); // '5 foxes'
N.toString() + ' ' +  string.make('goose').orPlural(N, '', 'geese'); // '5 geese'

N.toString() + ' ' + string.make('fox').orPlural(N, 'es') + ' ' +
	string.make('is').orPlural(N, '', 'are') + ' in the hen house.';

    // '5 foxes are in the hen house.'
```
<a id="PAD"></a>
### pad (length, character)

Pads the string in the center with the specified `character` to make the string `length` long. If
the optional `character` is not specified, space is used (' '). 

Examples:

```javascript
string.make('hello').pad(5).s; // 'hello'
string.make('hello').pad(10).s; // '   hello  '
string.make('hey').pad(7).s; // '  hey  '
string.make('hey').pad(5).s; // ' hey '
string.make('hey').pad(4).s; // ' hey'
string.make('hey').pad(7, '-').s; // '--hey--'
```
<a id="PADLEFT"></a>
### padLeft (length, character)

Left pads the string with `character` to make the string `length` long. If the optional `character`
is not specified, space is used (' '). 

Examples:

```javascript
string.make('hello').padLeft(5).s; // 'hello'
string.make('hello').padLeft(10).s; // '     hello'
string.make('hello').padLeft(7).s; // '  hello'
string.make('hello').padLeft(6).s; // ' hello'
string.make('hello').padLeft(10, '.').s; // '.....hello'
```
<a id="PADRIGHT"></a>
### padRight (length, character)

Right pads the string with `character` to make the string `length` long. If the optional `character`
is not specified, space is used (' '). 

Examples:

```javascript
string.make('hello').padRight(5).s; // 'hello'
string.make('hello').padRight(10).s; // 'hello     '
string.make('hello').padRight(7).s; // 'hello  '
string.make('hello').padRight(6).s; // 'hello '
string.make('hello').padRight(10, '.').s; // 'hello.....'
```
<a id="PARENTHESIZE"></a>
### parenthesize ()

Returns a string surrounded by parentheses.

Examples:

```javascript
string.make('test').parenthesize().s; // '(test)'
```
<a id="QUOTE"></a>
### quote ()

Returns a string surrounded by quotes.

Examples:

```javascript
string.make('test').quote(5).s; // '"test"'
```
<a id="REPEAT"></a>
### repeat (n)

Returns a string repeated `n` times.

Examples:

```javascript
string.make(' ').repeat(5).s; // '     '
string.make('*').repeat(3).s; // '***'
```
<a id="REPLACE"></a>
### replace (oldString, newString, caseOption)

Returns a string with the first occurrence of `oldString` replaced with `newString`. Same as the
native Javascript replace method except this method can be case insensitive. `caseOption` is
optional and defaults to CASE.INSENSITIVE. See the [CASE](#CASE) constants. 

Examples:

```javascript
string.make(' does IT work? ').replace(' ', '_').s; // '_does IT work? '
string.make('Yes it does!').replace(' ', '').s; // 'Yesit does!'
```
<a id="REPLACEALL"></a>
### replaceAll (oldString, newString, caseOption)

Returns a string with all occurrences of `oldString` replaced with `newString`. `caseOption` is
optional and defaults to CASE.INSENSITIVE. See the [CASE](#CASE) constants. 

Examples:

```javascript
string.make(' does IT work? ').replaceAll(' ', '_').s; // '_does_IT_work?_'
string.make('Yes it does!').replaceAll(' ', '').s; // 'Yesitdoes!'
```
<a id="RIGHT"></a>
### right (N)

Returns the substring denoted by `N` positive right-most characters.

Examples:

```javascript
string.make('I AM CRAZY').right(2).s; // 'ZY'
string.make('Does it work?  ').right(4).s; // 'k?  '
string.make('Hi').right(0).s; // ''
string.make('My name is JP').right(-2).s; // 'My', same as left(2)
```
<a id="SETVALUE"></a>
### setValue (value)

Sets the string to the `value`.

Examples:

```javascript
var myString = string.make('War');
myString.setValue('Peace').s; // 'Peace'
```
<a id="SLUGIFY"></a>
### slugify ()

Converts the string into a valid url slug.

Examples:

```javascript
string.make('Global Thermonuclear Warfare').slugify().s; // 'global-thermonuclear-warfare'
```
<a id="STARTSWITH"></a>
### startsWith (prefix, caseOption)

Returns *true* if the string starts with `prefix`. `caseOption` is optional and defaults to
CASE.INSENSITIVE. See the [CASE](#CASE) constants. 

Examples:

```javascript
string.make("JP is a software engineer").startsWith("JP"); // true
string.make('wants to change the world').startsWith("politicians"); // false
```
<a id="STRIPPUNCTUATION"></a>
### stripPunctuation ()

Removes all of the punctuation characters from the string.

Examples:

```javascript
string.make('My, st[ring] *full* of %punct)').stripPunctuation().s; // 'My string full of punct'
```
<a id="SURROUND"></a>
### surround (value)

Returns the string with `value` in front and behind.

Examples:

```javascript
string.make('emphasize this').surround('**').s; // '**emphasize this**'
```
<a id="TOBOOLEAN"></a>
### toBoolean ()

Converts a a logical truth string to boolean. That is: `'1'`, `'true'`, `'on'`, or `'yes'`
return *true*. All other values return *false*. 

JavaScript Note: You can easily convert truthy values to `booleans` by prefixing them with `!!`. e.g.
`!!'hi' === true` or `!!'' === false` or `!!{} === true`.

Examples:

```javascript
string.make('true').toBoolean(); // true
string.make('false').toBoolean(); // false
string.make('hello').toBoolean(); // false
string.make(true).toBoolean(); // true
string.make('on').toBoolean(); // true
string.make('yes').toBoolean(); // true
string.make('TRUE').toBoolean(); // true
string.make('TrUe').toBoolean(); // true
string.make('YES').toBoolean(); // true
string.make('ON').toBoolean(); // true
string.make('').toBoolean(); // false
string.make(undefined).toBoolean(); // false
string.make('undefined').toBoolean(); // false
string.make(null).toBoolean(); // false
string.make(false).toBoolean(); // false
string.make({}).toBoolean(); // false
string.make(1).toBoolean(); // true
string.make(-1).toBoolean(); // false
string.make(0).toBoolean(); // false
```
<a id="TOFLOAT"></a>
### toFloat (precision)

Returns the float value with an optional precision. Wraps parseFloat.

Examples:

```javascript
string.make('5').toFloat(); // 5
string.make('5.3').toFloat();  // 5.3
string.make(5.3).toFloat();  // 5.3
string.make('-10').toFloat();  // -10
string.make('55.3 adfafaf').toFloat(); // 55.3
string.make('afff 44').toFloat();  // NaN
string.make(3.45522222333232).toFloat(2); // 3.46
```
<a id="TOINT"></a>
### toInt ()

Returns the number value in integer form. Wrapper for `parseInt()`. Can also parse hex values.

Examples:

```javascript
string.make('5').toInt(); // 5
string.make('5.3').toInt(); // 5;
string.make(5.3).toInt(); // 5;
string.make('-10').toInt(); // -10
string.make('55 adfafaf').toInt(); // 55
string.make('afff 44').toInt(); // NaN
string.make('0xff').toInt() // 255
```
<a id="TOSTRING"></a>
### toString ()

Alias: `s`

Returns the native Javascript String object representation of the string. Not really necessary to 
use since `s` is available. However, Javascript engines will look at an object and display its
`toString()` result. 

Examples:

```javascript
string.make('my name is JP.').capitalize().toString(); // 'My name is JP.'
var a = "Hello " + string.make('joe!'); // a = "Hello joe!"
string.make("Hello").toString() === string.make("Hello").s; // true
```
<a id="TRIMLEFT"></a>
### trimLeft ()

Returns the string with leading whitespace removed.

Examples:

```javascript
string.make('  How are you?').trimLeft().s; // 'How are you?';
```
<a id="TRIMRIGHT"></a>
### trimRight ()

Returns the string with trailing whitespace removed.

Examples:

```javascript
string.make('How are you?   ').trimRight().s; // 'How are you?'
```
<a id="TRUNCATE"></a>
### truncate (length, pruneStr)

Truncates the string to `length`, accounting for word placement and character count. If the string
is actually truncated, uses the optional `pruneStr` to indicate missing content. The default is
`'...'`. 

Examples:

```javascript
string.make('this is some long text').truncate(3).s; // '...'
string.make('this is some long text').truncate(7).s; // 'this is...'
string.make('this is some long text').truncate(11).s; // 'this is...'
string.make('this is some long text').truncate(12).s; // 'this is some...'
string.make('this is some long text').truncate(11).s; // 'this is...'
string.make('this is some long text').truncate(50).s; // 'this is some long text'
string.make('this is some long text').truncate(14, ' READ MORE').s; // 'this is some READ MORE'
```
<a id="WORDS"></a>
### words (delimiter)

Split string by delimiter (String or RegExp), /\s+/ by default.

Examples:

```javascript
string.make('   I   love   you   ').words(); // ["I","love","you"]
string.make('I_love_you').words('_'); // ["I","love","you"]
string.make('I-love-you').words(/-/); // ["I","love","you"]
string.make('    ').words(); // []
```
<a id="WRAP"></a>
### wrap (front, back)

Returns the string with `front`, the string and `back` concatenated.

Examples:

```javascript
string.make('this is an aside').wrap('(', ')').s; // '(this is an aside)'
```

<a id="EXTENDING_THIS_MODULE"></a>
Extending This Module
---------------------
Extending this module's string object is easy by doing the following:

1. Call `this.setValue(value)` in your object's constructor function (named `Str` for this
example). 

2. Create an object from this module. `stringObject = string.make('')`

3. Set your constructor function's prototype to the created object. `Str.prototype = stringObject` 

4. Make sure your constructor function is set properly. `Str.prototype.constructor = Str`

5. If necessary, get the prototpye of the object created in step 2. `parentPrototype = 
Object.getPrototypeOf(stringObject)`

    This value can then be used to call methods of this module that have been overridden in your
    module. `parentPrototype.contains.call(this, value);`

6. When returning a new object representing your string object, use `new this.constructor()`
instead of `new Str()`. Doing so will allow your module to be easily extended.

Example:

```javascript
({define: typeof define === 'function' ? define : function (A,F) {var I = F.apply(null, A.map(require)); Object.keys(I).forEach(function(k) {exports[k] = I[k];});}}).define(

['string'],

function (string) {
	function Str (value) { // Constructor
		this.setValue(value);
	}

	stringObject = string.make('');
	Str.prototype = stringObject;
	Str.prototype.constructor = Str; // Make sure the constructor function is set properly.
	parentPrototype = Object.getPrototypeOf(stringObject);
	
	Str.prototype.myNewMethod = function () {
		....
	    return new this.constructor(result);
	};

	Str.prototype.extendedMethod = function (value) { // Extending a method.
		....
	    parentPrototype.extendedMethod.call(this, value); // Use the parent prototype.
	};
});
```

<a id="TESTING"></a>
Testing
-------
string uses Wakanda's implementation of [YUI Test](http://yuilibrary.com/yui/docs/test/). 

##### To test the client side:

1. In Wakanda Studio, open WebFolder/index/index.html.
2. Click Run. The results should appear in your browser.

##### To test the server side:

1. In Wakanda Studio, open scripts/test.js.
2. Click Run File. The results should appear in your browser.

<a id="CREDITS"></a>
Credits
-------
This module is based heavily (probably 95%) on [string.js](http://stringjs.com) by JP Richardson
<jprichardson@gmail.com>. Thanks JP!

The **words()** method comes from underscore.string by Esa-Matti Suuronen <esa-matti@suuronen.org>.

<a id="CONTRIBUTIONS"></a>
Contributions
-------------
If you contribute to this library, just modify `WebFolder/scripts/string.js` and 
`WebFolder/scripts/testCases.js` or `Modules/string.js` and `Modules/string.js` and send a
pull request. Please remember to update the markdown if the public interface changes. 

<a id="LICENSE"></a>
License
-------
Licensed under MIT.

Copyright (C) 2013 [Jeff Grann](https://github.com/jeffgrann) <jeff@successware.net>.

Major portions copyright (C) 2012-2013 JP Richardson <jprichardson@gmail.com>.

Portions copyright (c) 2011 Esa-Matti Suuronen <esa-matti@suuronen.org>.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions: 

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software. 

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
