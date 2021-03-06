'use strict'

var curry2 = require('./utils').curry2

// low level predicates

// most of the old methods same as check-types.js
function isFn (x) { return typeof x === 'function' }

function isString (x) { return typeof x === 'string' }

function unemptyString (x) {
  return isString(x) && Boolean(x)
}

/**
  Checks if given string is already in upper case
  @method upperCase
*/
function upperCase (x) {
  return isString(x) && x.toUpperCase() === x
}

/**
  Checks if given string is already in lower case
  @method lowerCase
*/
function lowerCase (str) {
  return isString(str) &&
  str.toLowerCase() === str
}

var isArray = Array.isArray

function isObject (x) {
  return typeof x === 'object' &&
  !isArray(x) &&
  !isNull(x) &&
  !isDate(x)
}
function isEmptyObject (x) {
  return isObject(x) &&
  Object.keys(x).length === 0
}
function isNumber (x) {
  return typeof x === 'number' &&
  !isNaN(x) &&
  x !== Infinity &&
  x !== -Infinity
}
function isInteger (x) {
  return isNumber(x) && x % 1 === 0
}
function isFloat (x) {
  return isNumber(x) && x % 1 !== 0
}
function isNull (x) { return x === null }
function positiveNumber (x) {
  return isNumber(x) && x > 0
}
function negativeNumber (x) {
  return isNumber(x) && x < 0
}
function isDate (x) {
  return x instanceof Date
}
function isRegExp (x) {
  return x instanceof RegExp
}
function isError (x) {
  return x instanceof Error
}
function instance (x, type) {
  return x instanceof type
}
function hasLength (x, k) {
  if (typeof x === 'number' && typeof k !== 'number') {
    // swap arguments
    return hasLength(k, x)
  }
  return (isArray(x) || isString(x)) && x.length === k
}

/**
  Checks if argument is defined or not

  This method now is part of the check-types.js
  @method defined
*/
function defined (value) {
  return typeof value !== 'undefined'
}

/**
  Checks if argument is a valid Date instance

  @method validDate
*/
function validDate (value) {
  return isDate(value) &&
  isNumber(Number(value))
}

/**
  Returns true if the argument is primitive JavaScript type

  @method primitive
*/
function primitive (value) {
  var type = typeof value
  return type === 'number' ||
  type === 'boolean' ||
  type === 'string' ||
  type === 'symbol'
}

/**
  Returns true if the value is a number 0

  @method zero
*/
function zero (x) {
  return typeof x === 'number' && x === 0
}

/**
  same as ===

  @method same
*/
function same (a, b) {
  return a === b
}

/**
  Checks if given value is 0 or 1

  @method bit
*/
function bit (value) {
  return value === 0 || value === 1
}

/**
  Checks if given value is true of false

  @method bool
*/
function bool (value) {
  return typeof value === 'boolean'
}

/**
  Checks if given object has a property
  @method has
*/
function has (o, property) {
  if (arguments.length !== 2) {
    throw new Error('Expected two arguments to check.has, got only ' + arguments.length)
  }
  return Boolean(o && property &&
    typeof property === 'string' &&
    typeof o[property] !== 'undefined')
}

/**
  Returns true if given value is ''
  @method emptyString
*/
function emptyString (a) {
  return a === ''
}

/**
  Returns true if given value is [], {} or ''
  @method empty
*/
function empty (a) {
  var hasLength = typeof a === 'string' ||
  Array.isArray(a)
  if (hasLength) {
    return !a.length
  }
  if (a instanceof Object) {
    return !Object.keys(a).length
  }
  return false
}

/**
  Returns true if given value has .length and it is not zero, or has properties
  @method unempty
*/
function unempty (a) {
  var hasLength = typeof a === 'string' ||
  Array.isArray(a)
  if (hasLength) {
    return a.length
  }
  if (a instanceof Object) {
    return Object.keys(a).length
  }
  return true
}

/**
  Shallow strict comparison
  @method equal
*/
function equal (a, b) {
  return a === b
}

module.exports = {
  bit: bit,
  bool: bool,
  date: isDate,
  defined: defined,
  empty: empty,
  emptyObject: isEmptyObject,
  emptyString: emptyString,
  equal: curry2(equal),
  error: isError,
  floatNumber: isFloat,
  fn: isFn,
  has: has,
  instance: instance,
  intNumber: isInteger,
  isArray: isArray,
  length: curry2(hasLength),
  negative: negativeNumber,
  negativeNumber: negativeNumber,
  nulled: isNull,
  number: isNumber,
  object: isObject,
  positive: positiveNumber,
  positiveNumber: positiveNumber,
  primitive: primitive,
  regexp: isRegExp,
  same: same,
  string: isString,
  unempty: unempty,
  unemptyString: unemptyString,
  upperCase: upperCase,
  lowerCase: lowerCase,
  validDate: validDate,
  zero: zero
}
