/*
	Polyfills and also various utilities
*/


/* Mobile - Allow :active styles */
document.addEventListener('touchstart', function() {}, true);



/* HTMLElement */
HTMLElement.prototype.matches = HTMLElement.prototype.matches || HTMLElement.prototype.webkitMatchesSelector || function ElementMatches(selector) { var element = this, matches = (element.document || element.ownerDocument).querySelectorAll(selector); var i = 0; while (matches[i] && matches[i] !== element) i++; return matches[i]? true : false; };
HTMLElement.prototype.closest = HTMLElement.prototype.closest || function FindClosestMatch(selector) { var node = this; while(node && node.parentNode) { if(node.matches(selector)) return node; node = node.parentNode; } return undefined; };


/* Request Animation Frame */
window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;


/* Array Methods */
if(!Array.prototype.find) Array.prototype.find = function(predicate) { if (this == null) throw new TypeError('Array.prototype.find called on null or undefined'); if (typeof predicate !== 'function') throw new TypeError('predicate must be a function'); var list = Object(this); var length = list.length >>> 0; var thisArg = arguments[1]; for (var i = 0; i < length; i++) if (predicate.call(thisArg, list[i], i, list)) return list[i]; return undefined; };
if(!Array.prototype.findIndex) Array.prototype.findIndex = function(predicate) { if (this == null) throw new TypeError('Array.prototype.findIndex called on null or undefined'); if (typeof predicate !== 'function') throw new TypeError('predicate must be a function'); var list = Object(this), length = list.length >>> 0, thisArg = arguments[1], value; for (var i = 0; i < length; i++) { value = list[i]; if (predicate.call(thisArg, value, i, list)) return i; } return -1; };
if(!Array.prototype.forEach) Array.prototype.forEach = function(callback, thisArg) { var T, k; if(this == null) throw new TypeError(' this is null or not defined'); var O = Object(this); var len = O.length >>> 0; if(typeof callback !== "function") throw new TypeError(callback + ' is not a function'); if(arguments.length > 1) T = thisArg; k = 0; while (k < len) { if (k in O) callback.call(T, O[k], k, O); k++; } };
if(!Array.prototype.includes) Array.prototype.includes = function(searchElement /*, fromIndex*/) { 'use strict'; var O = Object(this), len = parseInt(O.length) || 0; if(len === 0) return false; var k, n = parseInt(arguments[1]) || 0; if(n >= 0) k = n; else { k = len + n; if(k < 0) k = 0; } var currentElement; while (k < len) { currentElement = O[k]; if(searchElement === currentElement || (searchElement !== searchElement && currentElement !== currentElement)) return true; k++; } return false; };
