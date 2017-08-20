/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _similarity = __webpack_require__(1);

var _similarity2 = _interopRequireDefault(_similarity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

String.prototype.faOptimize = function () {
    return this.replace(/ص/g, 'س').replace(/ث/g, 'س').replace(/ظ/g, 'ز').replace(/ذ/g, 'ز').replace(/ض/g, 'ز').replace(/ط/g, 'ت').replace(/ح/g, 'ه').replace(/غ/g, 'ق');
};

var Newsha = function () {
    function Newsha() {
        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Newsha);

        this.commands = [];
        this.collections = {};
        this.minimumConfidence = 0.4;
        this.config = config;
        this.anyListeners = [];
        this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
        this.recognition.lang = config.lang || 'fa';
        this.recognition.continuous = config.continuous || false;
        this.recognition.onresult = this.onResult.bind(this);
        this.recognition.onend = this.onEnd.bind(this);
    }

    _createClass(Newsha, [{
        key: 'onResult',
        value: function onResult(event) {
            var ret = "";
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = event.results[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var result = _step.value;
                    ret += result[0].transcript;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.anyListeners[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var listener = _step2.value;
                    listener(ret);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            this.checkResults(ret);
        }
    }, {
        key: 'onEnd',
        value: function onEnd() {
            this.listen();
        }
    }, {
        key: 'checkSingleCommand',
        value: function checkSingleCommand(command, text) {
            command = command.trim();
            var confidence = 0;
            var openningCollection = command.indexOf('{');
            if (openningCollection !== -1) {
                var closingCollection = command.indexOf('}');
                var collectionName = command.substr(openningCollection + 1, closingCollection - openningCollection - 1);
                var choosedItem = null;
                var highestConfidence = 0;
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = this.collections[collectionName][Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var item = _step3.value;

                        confidence = 0;
                        var _iteratorNormalCompletion4 = true;
                        var _didIteratorError4 = false;
                        var _iteratorError4 = undefined;

                        try {
                            for (var _iterator4 = text.split(' ')[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                var word = _step4.value;

                                confidence = Math.max((0, _similarity2.default)(word.faOptimize(), item.name.faOptimize()), confidence);
                            }
                        } catch (err) {
                            _didIteratorError4 = true;
                            _iteratorError4 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                    _iterator4.return();
                                }
                            } finally {
                                if (_didIteratorError4) {
                                    throw _iteratorError4;
                                }
                            }
                        }

                        if (highestConfidence < confidence) {
                            highestConfidence = confidence;
                            choosedItem = item;
                        }
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                return {
                    collectionName: collectionName,
                    data: choosedItem,
                    confidence: highestConfidence,
                    isTrue: highestConfidence >= this.minimumConfidence
                };
            }
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = text.split(' ')[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var _word = _step5.value;

                    confidence = Math.max((0, _similarity2.default)(_word.faOptimize(), command.faOptimize()), confidence);
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            return {
                confidence: confidence,
                isTrue: confidence >= this.minimumConfidence
            };
        }
    }, {
        key: 'checkResults',
        value: function checkResults(text) {
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = this.commands[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var command = _step6.value;

                    var resultObject = {
                        command: command.command,
                        transcript: text,
                        collections: {}
                    };
                    var shouldRun = true;
                    var confidence = 0;
                    var andCommands = command.command.split('&&');
                    var _iteratorNormalCompletion7 = true;
                    var _didIteratorError7 = false;
                    var _iteratorError7 = undefined;

                    try {
                        for (var _iterator7 = andCommands[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                            var cmd = _step7.value;

                            var result = this.checkSingleCommand(cmd, text);
                            shouldRun = shouldRun && result.isTrue;
                            confidence += result.confidence;
                            if (result.data) {
                                resultObject.collections[result.collectionName] = result.data.value;
                            }
                        }
                    } catch (err) {
                        _didIteratorError7 = true;
                        _iteratorError7 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion7 && _iterator7.return) {
                                _iterator7.return();
                            }
                        } finally {
                            if (_didIteratorError7) {
                                throw _iteratorError7;
                            }
                        }
                    }

                    confidence /= andCommands.length;
                    resultObject.confidence = confidence;

                    if (shouldRun) {
                        command.callback(resultObject);
                    }
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }
        }
    }, {
        key: 'command',
        value: function command(cmd, func) {
            this.commands.push({
                command: cmd,
                callback: func
            });
        }
    }, {
        key: 'collection',
        value: function collection(name, list) {
            var middleware = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (item) {
                return item;
            };

            this.collections[name] = [];
            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
                for (var _iterator8 = list[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                    var item = _step8.value;
                    this.collections[name].push({
                        name: item,
                        value: middleware(item)
                    });
                }
            } catch (err) {
                _didIteratorError8 = true;
                _iteratorError8 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion8 && _iterator8.return) {
                        _iterator8.return();
                    }
                } finally {
                    if (_didIteratorError8) {
                        throw _iteratorError8;
                    }
                }
            }

            return this.collections[name];
        }
    }, {
        key: 'any',
        value: function any(func) {
            this.anyListeners.push(func);
        }
    }, {
        key: 'listen',
        value: function listen() {
            this.recognition.start();
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.recognition.stop();
        }
    }]);

    return Newsha;
}();

module.exports = window.Newsha = Newsha;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var distance = __webpack_require__(2)

module.exports = function(a,b) {
  if (!a || !b || !a.length || !b.length) return 0
  if (a === b) return 1
  var d = distance(a.toLowerCase(),b.toLowerCase())
  var longest = Math.max(a.length, b.length)
  return (longest-d)/longest
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable no-nested-ternary */

var arr = [];
var charCodeCache = [];

module.exports = function (a, b) {
	if (a === b) {
		return 0;
	}

	var swap = a;

	// Swapping the strings if `a` is longer than `b` so we know which one is the
	// shortest & which one is the longest
	if (a.length > b.length) {
		a = b;
		b = swap;
	}

	var aLen = a.length;
	var bLen = b.length;

	if (aLen === 0) {
		return bLen;
	}

	if (bLen === 0) {
		return aLen;
	}

	// Performing suffix trimming:
	// We can linearly drop suffix common to both strings since they
	// don't increase distance at all
	// Note: `~-` is the bitwise way to perform a `- 1` operation
	while (aLen > 0 && (a.charCodeAt(~-aLen) === b.charCodeAt(~-bLen))) {
		aLen--;
		bLen--;
	}

	if (aLen === 0) {
		return bLen;
	}

	// Performing prefix trimming
	// We can linearly drop prefix common to both strings since they
	// don't increase distance at all
	var start = 0;

	while (start < aLen && (a.charCodeAt(start) === b.charCodeAt(start))) {
		start++;
	}

	aLen -= start;
	bLen -= start;

	if (aLen === 0) {
		return bLen;
	}

	var bCharCode;
	var ret;
	var tmp;
	var tmp2;
	var i = 0;
	var j = 0;

	while (i < aLen) {
		charCodeCache[start + i] = a.charCodeAt(start + i);
		arr[i] = ++i;
	}

	while (j < bLen) {
		bCharCode = b.charCodeAt(start + j);
		tmp = j++;
		ret = j;

		for (i = 0; i < aLen; i++) {
			tmp2 = bCharCode === charCodeCache[start + i] ? tmp : tmp + 1;
			tmp = arr[i];
			ret = arr[i] = tmp > ret ? tmp2 > ret ? ret + 1 : tmp2 : tmp2 > tmp ? tmp + 1 : tmp2;
		}
	}

	return ret;
};


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDkwNWZhOTZlMTlmNzcyMmFjM2EiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zaW1pbGFyaXR5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sZXZlbi9pbmRleC5qcyJdLCJuYW1lcyI6WyJTdHJpbmciLCJwcm90b3R5cGUiLCJmYU9wdGltaXplIiwicmVwbGFjZSIsIk5ld3NoYSIsImNvbmZpZyIsImNvbW1hbmRzIiwiY29sbGVjdGlvbnMiLCJtaW5pbXVtQ29uZmlkZW5jZSIsImFueUxpc3RlbmVycyIsInJlY29nbml0aW9uIiwid2luZG93IiwiU3BlZWNoUmVjb2duaXRpb24iLCJ3ZWJraXRTcGVlY2hSZWNvZ25pdGlvbiIsIm1velNwZWVjaFJlY29nbml0aW9uIiwibXNTcGVlY2hSZWNvZ25pdGlvbiIsImxhbmciLCJjb250aW51b3VzIiwib25yZXN1bHQiLCJvblJlc3VsdCIsImJpbmQiLCJvbmVuZCIsIm9uRW5kIiwiZXZlbnQiLCJyZXQiLCJyZXN1bHRzIiwicmVzdWx0IiwidHJhbnNjcmlwdCIsImxpc3RlbmVyIiwiY2hlY2tSZXN1bHRzIiwibGlzdGVuIiwiY29tbWFuZCIsInRleHQiLCJ0cmltIiwiY29uZmlkZW5jZSIsIm9wZW5uaW5nQ29sbGVjdGlvbiIsImluZGV4T2YiLCJjbG9zaW5nQ29sbGVjdGlvbiIsImNvbGxlY3Rpb25OYW1lIiwic3Vic3RyIiwiY2hvb3NlZEl0ZW0iLCJoaWdoZXN0Q29uZmlkZW5jZSIsIml0ZW0iLCJzcGxpdCIsIndvcmQiLCJNYXRoIiwibWF4IiwibmFtZSIsImRhdGEiLCJpc1RydWUiLCJyZXN1bHRPYmplY3QiLCJzaG91bGRSdW4iLCJhbmRDb21tYW5kcyIsImNtZCIsImNoZWNrU2luZ2xlQ29tbWFuZCIsInZhbHVlIiwibGVuZ3RoIiwiY2FsbGJhY2siLCJmdW5jIiwicHVz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QUwsQ0FBaUJ3QyxJQUFqQixDQUFQO0FBQ0g7Ozs0QkFDSVcsSSxFQUFNO0FBQ1AsaUJBQUtqRCxZQUFMLENBQWtCa0QsSUFBbEIsQ0FBdUJELElBQXZCO0FBQ0g7OztpQ0FDUztBQUNOLGlCQUFLaEQsV0FBTCxDQUFpQm9ELEtBQWpCO0FBQ0g7OzsrQkFDTztBQUNKLGlCQUFLcEQsV0FBTCxDQUFpQnFELElBQWpCO0FBQ0g7Ozs7OztBQUdMQyxPQUFPQyxPQUFQLEdBQWlCdEQsT0FBT1AsTUFBUCxHQUFnQkEsTUFBakMsQzs7Ozs7O0FDeEhBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwiZmlsZSI6Ii4vdGVzdC9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDA5MDVmYTk2ZTE5Zjc3MjJhYzNhIiwiaW1wb3J0IHNpbWlsYXJpdHkgZnJvbSAnc2ltaWxhcml0eSdcclxuXHJcblN0cmluZy5wcm90b3R5cGUuZmFPcHRpbWl6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLnJlcGxhY2UoL9i1L2csICfYsycpXHJcbiAgICAgICAgICAgICAgIC5yZXBsYWNlKC/Yqy9nLCAn2LMnKVxyXG4gICAgICAgICAgICAgICAucmVwbGFjZSgv2LgvZywgJ9iyJylcclxuICAgICAgICAgICAgICAgLnJlcGxhY2UoL9iwL2csICfYsicpXHJcbiAgICAgICAgICAgICAgIC5yZXBsYWNlKC/Yti9nLCAn2LInKVxyXG4gICAgICAgICAgICAgICAucmVwbGFjZSgv2LcvZywgJ9iqJylcclxuICAgICAgICAgICAgICAgLnJlcGxhY2UoL9itL2csICfZhycpXHJcbiAgICAgICAgICAgICAgIC5yZXBsYWNlKC/Yui9nLCAn2YInKVxyXG59O1xyXG5cclxuY2xhc3MgTmV3c2hhIHtcclxuICAgIGNvbnN0cnVjdG9yIChjb25maWcgPSB7fSkge1xyXG4gICAgICAgIHRoaXMuY29tbWFuZHMgPSBbXTtcclxuICAgICAgICB0aGlzLmNvbGxlY3Rpb25zID0ge31cclxuICAgICAgICB0aGlzLm1pbmltdW1Db25maWRlbmNlID0gMC40O1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuYW55TGlzdGVuZXJzID0gW11cclxuICAgICAgICB0aGlzLnJlY29nbml0aW9uID0gbmV3ICh3aW5kb3cuU3BlZWNoUmVjb2duaXRpb24gfHwgd2luZG93LndlYmtpdFNwZWVjaFJlY29nbml0aW9uIHx8IHdpbmRvdy5tb3pTcGVlY2hSZWNvZ25pdGlvbiB8fCB3aW5kb3cubXNTcGVlY2hSZWNvZ25pdGlvbikoKTtcclxuICAgICAgICB0aGlzLnJlY29nbml0aW9uLmxhbmcgPSBjb25maWcubGFuZyB8fCAnZmEnO1xyXG4gICAgICAgIHRoaXMucmVjb2duaXRpb24uY29udGludW91cyA9IGNvbmZpZy5jb250aW51b3VzIHx8IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVjb2duaXRpb24ub25yZXN1bHQgPSB0aGlzLm9uUmVzdWx0LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5vbmVuZCA9IHRoaXMub25FbmQuYmluZCh0aGlzKTtcclxuICAgIH1cclxuICAgIG9uUmVzdWx0IChldmVudCkge1xyXG4gICAgICAgIGxldCByZXQgPSBcIlwiO1xyXG4gICAgICAgIGZvciAobGV0IHJlc3VsdCBvZiBldmVudC5yZXN1bHRzKSByZXQgKz0gcmVzdWx0WzBdLnRyYW5zY3JpcHQ7XHJcbiAgICAgICAgZm9yIChsZXQgbGlzdGVuZXIgb2YgdGhpcy5hbnlMaXN0ZW5lcnMpIGxpc3RlbmVyKHJldClcclxuICAgICAgICB0aGlzLmNoZWNrUmVzdWx0cyhyZXQpO1xyXG4gICAgfVxyXG4gICAgb25FbmQgKCkge1xyXG4gICAgICAgIHRoaXMubGlzdGVuKClcclxuICAgIH1cclxuICAgIGNoZWNrU2luZ2xlQ29tbWFuZCAoY29tbWFuZCwgdGV4dCkge1xyXG4gICAgICAgIGNvbW1hbmQgPSBjb21tYW5kLnRyaW0oKTtcclxuICAgICAgICBsZXQgY29uZmlkZW5jZSA9IDA7XHJcbiAgICAgICAgbGV0IG9wZW5uaW5nQ29sbGVjdGlvbiA9IGNvbW1hbmQuaW5kZXhPZigneycpO1xyXG4gICAgICAgIGlmIChvcGVubmluZ0NvbGxlY3Rpb24gIT09IC0xKSB7XHJcbiAgICAgICAgICAgIGxldCBjbG9zaW5nQ29sbGVjdGlvbiA9IGNvbW1hbmQuaW5kZXhPZignfScpO1xyXG4gICAgICAgICAgICBsZXQgY29sbGVjdGlvbk5hbWUgPSBjb21tYW5kLnN1YnN0cihvcGVubmluZ0NvbGxlY3Rpb24rMSwgY2xvc2luZ0NvbGxlY3Rpb24gLSBvcGVubmluZ0NvbGxlY3Rpb24gLSAxKTtcclxuICAgICAgICAgICAgbGV0IGNob29zZWRJdGVtID0gbnVsbDtcclxuICAgICAgICAgICAgbGV0IGhpZ2hlc3RDb25maWRlbmNlID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aGlzLmNvbGxlY3Rpb25zW2NvbGxlY3Rpb25OYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgY29uZmlkZW5jZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB3b3JkIG9mIHRleHQuc3BsaXQoJyAnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZGVuY2UgPSBNYXRoLm1heChzaW1pbGFyaXR5KHdvcmQuZmFPcHRpbWl6ZSgpLCBpdGVtLm5hbWUuZmFPcHRpbWl6ZSgpKSwgY29uZmlkZW5jZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChoaWdoZXN0Q29uZmlkZW5jZSA8IGNvbmZpZGVuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBoaWdoZXN0Q29uZmlkZW5jZSA9IGNvbmZpZGVuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hvb3NlZEl0ZW0gPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBjb2xsZWN0aW9uTmFtZTogY29sbGVjdGlvbk5hbWUsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBjaG9vc2VkSXRlbSxcclxuICAgICAgICAgICAgICAgIGNvbmZpZGVuY2U6IGhpZ2hlc3RDb25maWRlbmNlLFxyXG4gICAgICAgICAgICAgICAgaXNUcnVlOiBoaWdoZXN0Q29uZmlkZW5jZSA+PSB0aGlzLm1pbmltdW1Db25maWRlbmNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgd29yZCBvZiB0ZXh0LnNwbGl0KCcgJykpIHtcclxuICAgICAgICAgICAgY29uZmlkZW5jZSA9IE1hdGgubWF4KHNpbWlsYXJpdHkod29yZC5mYU9wdGltaXplKCksIGNvbW1hbmQuZmFPcHRpbWl6ZSgpKSwgY29uZmlkZW5jZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29uZmlkZW5jZTogY29uZmlkZW5jZSxcclxuICAgICAgICAgICAgaXNUcnVlOiBjb25maWRlbmNlID49IHRoaXMubWluaW11bUNvbmZpZGVuY2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjaGVja1Jlc3VsdHMgKHRleHQpIHtcclxuICAgICAgICBmb3IgKGxldCBjb21tYW5kIG9mIHRoaXMuY29tbWFuZHMpIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdE9iamVjdCA9IHtcclxuICAgICAgICAgICAgICAgIGNvbW1hbmQ6IGNvbW1hbmQuY29tbWFuZCxcclxuICAgICAgICAgICAgICAgIHRyYW5zY3JpcHQ6IHRleHQsXHJcbiAgICAgICAgICAgICAgICBjb2xsZWN0aW9uczoge31cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgbGV0IHNob3VsZFJ1biA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBjb25maWRlbmNlID0gMDtcclxuICAgICAgICAgICAgbGV0IGFuZENvbW1hbmRzID0gY29tbWFuZC5jb21tYW5kLnNwbGl0KCcmJicpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjbWQgb2YgYW5kQ29tbWFuZHMpIHtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNoZWNrU2luZ2xlQ29tbWFuZChjbWQsIHRleHQpO1xyXG4gICAgICAgICAgICAgICAgc2hvdWxkUnVuID0gc2hvdWxkUnVuICYmIHJlc3VsdC5pc1RydWU7XHJcbiAgICAgICAgICAgICAgICBjb25maWRlbmNlICs9IHJlc3VsdC5jb25maWRlbmNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0T2JqZWN0LmNvbGxlY3Rpb25zW3Jlc3VsdC5jb2xsZWN0aW9uTmFtZV0gPSByZXN1bHQuZGF0YS52YWx1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbmZpZGVuY2UgLz0gYW5kQ29tbWFuZHMubGVuZ3RoO1xyXG4gICAgICAgICAgICByZXN1bHRPYmplY3QuY29uZmlkZW5jZSA9IGNvbmZpZGVuY2U7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2hvdWxkUnVuKSB7XHJcbiAgICAgICAgICAgICAgICBjb21tYW5kLmNhbGxiYWNrKHJlc3VsdE9iamVjdClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbW1hbmQgKGNtZCwgZnVuYykge1xyXG4gICAgICAgIHRoaXMuY29tbWFuZHMucHVzaCh7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IGNtZCxcclxuICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmNcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgY29sbGVjdGlvbiAobmFtZSwgbGlzdCwgbWlkZGxld2FyZSA9IChpdGVtKSA9PiB7IHJldHVybiBpdGVtIH0pIHtcclxuICAgICAgICB0aGlzLmNvbGxlY3Rpb25zW25hbWVdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBsaXN0KSB0aGlzLmNvbGxlY3Rpb25zW25hbWVdLnB1c2goe1xyXG4gICAgICAgICAgICBuYW1lOiBpdGVtLFxyXG4gICAgICAgICAgICB2YWx1ZTogbWlkZGxld2FyZShpdGVtKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sbGVjdGlvbnNbbmFtZV1cclxuICAgIH1cclxuICAgIGFueSAoZnVuYykge1xyXG4gICAgICAgIHRoaXMuYW55TGlzdGVuZXJzLnB1c2goZnVuYylcclxuICAgIH1cclxuICAgIGxpc3RlbiAoKSB7XHJcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5zdGFydCgpXHJcbiAgICB9XHJcbiAgICBzdG9wICgpIHtcclxuICAgICAgICB0aGlzLnJlY29nbml0aW9uLnN0b3AoKVxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHdpbmRvdy5OZXdzaGEgPSBOZXdzaGE7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwidmFyIGRpc3RhbmNlID0gcmVxdWlyZShcImxldmVuXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYSxiKSB7XG4gIGlmICghYSB8fCAhYiB8fCAhYS5sZW5ndGggfHwgIWIubGVuZ3RoKSByZXR1cm4gMFxuICBpZiAoYSA9PT0gYikgcmV0dXJuIDFcbiAgdmFyIGQgPSBkaXN0YW5jZShhLnRvTG93ZXJDYXNlKCksYi50b0xvd2VyQ2FzZSgpKVxuICB2YXIgbG9uZ2VzdCA9IE1hdGgubWF4KGEubGVuZ3RoLCBiLmxlbmd0aClcbiAgcmV0dXJuIChsb25nZXN0LWQpL2xvbmdlc3Rcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NpbWlsYXJpdHkvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyogZXNsaW50LWRpc2FibGUgbm8tbmVzdGVkLXRlcm5hcnkgKi9cbid1c2Ugc3RyaWN0JztcbnZhciBhcnIgPSBbXTtcbnZhciBjaGFyQ29kZUNhY2hlID0gW107XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGEsIGIpIHtcblx0aWYgKGEgPT09IGIpIHtcblx0XHRyZXR1cm4gMDtcblx0fVxuXG5cdHZhciBzd2FwID0gYTtcblxuXHQvLyBTd2FwcGluZyB0aGUgc3RyaW5ncyBpZiBgYWAgaXMgbG9uZ2VyIHRoYW4gYGJgIHNvIHdlIGtub3cgd2hpY2ggb25lIGlzIHRoZVxuXHQvLyBzaG9ydGVzdCAmIHdoaWNoIG9uZSBpcyB0aGUgbG9uZ2VzdFxuXHRpZiAoYS5sZW5ndGggPiBiLmxlbmd0aCkge1xuXHRcdGEgPSBiO1xuXHRcdGIgPSBzd2FwO1xuXHR9XG5cblx0dmFyIGFMZW4gPSBhLmxlbmd0aDtcblx0dmFyIGJMZW4gPSBiLmxlbmd0aDtcblxuXHRpZiAoYUxlbiA9PT0gMCkge1xuXHRcdHJldHVybiBiTGVuO1xuXHR9XG5cblx0aWYgKGJMZW4gPT09IDApIHtcblx0XHRyZXR1cm4gYUxlbjtcblx0fVxuXG5cdC8vIFBlcmZvcm1pbmcgc3VmZml4IHRyaW1taW5nOlxuXHQvLyBXZSBjYW4gbGluZWFybHkgZHJvcCBzdWZmaXggY29tbW9uIHRvIGJvdGggc3RyaW5ncyBzaW5jZSB0aGV5XG5cdC8vIGRvbid0IGluY3JlYXNlIGRpc3RhbmNlIGF0IGFsbFxuXHQvLyBOb3RlOiBgfi1gIGlzIHRoZSBiaXR3aXNlIHdheSB0byBwZXJmb3JtIGEgYC0gMWAgb3BlcmF0aW9uXG5cdHdoaWxlIChhTGVuID4gMCAmJiAoYS5jaGFyQ29kZUF0KH4tYUxlbikgPT09IGIuY2hhckNvZGVBdCh+LWJMZW4pKSkge1xuXHRcdGFMZW4tLTtcblx0XHRiTGVuLS07XG5cdH1cblxuXHRpZiAoYUxlbiA9PT0gMCkge1xuXHRcdHJldHVybiBiTGVuO1xuXHR9XG5cblx0Ly8gUGVyZm9ybWluZyBwcmVmaXggdHJpbW1pbmdcblx0Ly8gV2UgY2FuIGxpbmVhcmx5IGRyb3AgcHJlZml4IGNvbW1vbiB0byBib3RoIHN0cmluZ3Mgc2luY2UgdGhleVxuXHQvLyBkb24ndCBpbmNyZWFzZSBkaXN0YW5jZSBhdCBhbGxcblx0dmFyIHN0YXJ0ID0gMDtcblxuXHR3aGlsZSAoc3RhcnQgPCBhTGVuICYmIChhLmNoYXJDb2RlQXQoc3RhcnQpID09PSBiLmNoYXJDb2RlQXQoc3RhcnQpKSkge1xuXHRcdHN0YXJ0Kys7XG5cdH1cblxuXHRhTGVuIC09IHN0YXJ0O1xuXHRiTGVuIC09IHN0YXJ0O1xuXG5cdGlmIChhTGVuID09PSAwKSB7XG5cdFx0cmV0dXJuIGJMZW47XG5cdH1cblxuXHR2YXIgYkNoYXJDb2RlO1xuXHR2YXIgcmV0O1xuXHR2YXIgdG1wO1xuXHR2YXIgdG1wMjtcblx0dmFyIGkgPSAwO1xuXHR2YXIgaiA9IDA7XG5cblx0d2hpbGUgKGkgPCBhTGVuKSB7XG5cdFx0Y2hhckNvZGVDYWNoZVtzdGFydCArIGldID0gYS5jaGFyQ29kZUF0KHN0YXJ0ICsgaSk7XG5cdFx0YXJyW2ldID0gKytpO1xuXHR9XG5cblx0d2hpbGUgKGogPCBiTGVuKSB7XG5cdFx0YkNoYXJDb2RlID0gYi5jaGFyQ29kZUF0KHN0YXJ0ICsgaik7XG5cdFx0dG1wID0gaisrO1xuXHRcdHJldCA9IGo7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgYUxlbjsgaSsrKSB7XG5cdFx0XHR0bXAyID0gYkNoYXJDb2RlID09PSBjaGFyQ29kZUNhY2hlW3N0YXJ0ICsgaV0gPyB0bXAgOiB0bXAgKyAxO1xuXHRcdFx0dG1wID0gYXJyW2ldO1xuXHRcdFx0cmV0ID0gYXJyW2ldID0gdG1wID4gcmV0ID8gdG1wMiA+IHJldCA/IHJldCArIDEgOiB0bXAyIDogdG1wMiA+IHRtcCA/IHRtcCArIDEgOiB0bXAyO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiByZXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbGV2ZW4vaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==