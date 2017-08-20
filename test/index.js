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
        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

        _classCallCheck(this, Newsha);

        if (typeof config === 'function') {
            callback = config;
            config = {};
        }
        this.commands = [];
        this.collections = {};
        this.minimumConfidence = 0.4;
        this.config = config;
        this.callback = callback;
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

            this.checkResults(ret);
            this.callback(ret);
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
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = this.collections[collectionName][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var item = _step2.value;

                        confidence = 0;
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;

                        try {
                            for (var _iterator3 = text.split(' ')[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var word = _step3.value;

                                confidence = Math.max((0, _similarity2.default)(word.faOptimize(), item.name.faOptimize()), confidence);
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

                        if (highestConfidence < confidence) {
                            highestConfidence = confidence;
                            choosedItem = item;
                        }
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

                return {
                    collectionName: collectionName,
                    data: choosedItem,
                    confidence: highestConfidence,
                    isTrue: highestConfidence >= this.minimumConfidence
                };
            }
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = text.split(' ')[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var _word = _step4.value;

                    confidence = Math.max((0, _similarity2.default)(_word.faOptimize(), command.faOptimize()), confidence);
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

            return {
                confidence: confidence,
                isTrue: confidence >= this.minimumConfidence
            };
        }
    }, {
        key: 'checkResults',
        value: function checkResults(text) {
            console.log(" ====> ", text);
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = this.commands[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var command = _step5.value;

                    var resultObject = {
                        command: command.command,
                        transcript: text,
                        collections: {}
                    };
                    var shouldRun = true;
                    var confidence = 0;
                    var andCommands = command.command.split('&&');
                    var _iteratorNormalCompletion6 = true;
                    var _didIteratorError6 = false;
                    var _iteratorError6 = undefined;

                    try {
                        for (var _iterator6 = andCommands[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                            var cmd = _step6.value;

                            var result = this.checkSingleCommand(cmd, text);
                            shouldRun = shouldRun && result.isTrue;
                            confidence += result.confidence;
                            if (result.data) {
                                resultObject.collections[result.collectionName] = result.data.value;
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

                    confidence /= andCommands.length;
                    resultObject.confidence = confidence;

                    if (shouldRun) {
                        command.callback(resultObject);
                    }
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
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                for (var _iterator7 = list[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var item = _step7.value;
                    this.collections[name].push({
                        name: item,
                        value: middleware(item)
                    });
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

            return this.collections[name];
        }
    }, {
        key: 'listen',
        value: function listen(callback) {
            if (callback) this.callback = callback;
            if (this.config.onStart) this.config.onStart();
            this.recognition.start();
        }
    }, {
        key: 'stop',
        value: function stop() {
            if (this.config.onStop) this.config.onStop();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjYwMmY1OGYwZjFmZGJkYTg5OWIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zaW1pbGFyaXR5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sZXZlbi9pbmRleC5qcyJdLCJuYW1lcyI6WyJTdHJpbmciLCJwcm90b3R5cGUiLCJmYU9wdGltaXplIiwicmVwbGFjZSIsIk5ld3NoYSIsImNvbmZpZyIsImNhbGxiYWNrIiwiY29tbWFuZHMiLCJjb2xsZWN0aW9ucyIsIm1pbmltdW1Db25maWRlbmNlIiwicmVjb2duaXRpb24iLCJ3aW5kb3ciLCJTcGVlY2hSZWNvZ25pdGlvbiIsIndlYmtpdFNwZWVjaFJlY29nbml0aW9uIiwibW96U3BlZWNoUmVjb2duaXRpb24iLCJtc1NwZWVjaFJlY29nbml0aW9uIiwibGFuZyIsImNvbnRpbnVvdXMiLCJvbnJlc3VsdCIsIm9uUmVzdWx0IiwiYmluZCIsIm9uZW5kIiwib25FbmQiLCJldmVudCIsInJldCIsInJlc3VsdHMiLCJyZXN1bHQiLCJ0cmFuc2NyaXB0IiwiY2hlY2tSZXN1bHRzIiwibGlzdGVuIiwiY29tbWFuZCIsInRleHQiLCJ0cmltIiwiY29uZmlkZW5jZSIsIm9wZW5uaW5nQ29sbGVjdGlvbiIsImluZGV4T2YiLCJjbG9zaW5nQ29sbGVjdGlvbiIsImNvbGxlY3Rpb25OYW1lIiwic3Vic3RyIiwiY2hvb3NlZEl0ZW0iLCJoaWdoZXN0Q29uZmlkZW5jZSIsIml0ZW0iLCJzcGxpdCIsIndvcmQiLCJNYXRoIiwibWF4IiwibmFtZSIsImRhdGEiLCJpc1RydWUiLCJjb25zb2xlIiwibG9nIiwicmVzdWx0T2JqZWN0Iiwic2hvdWxkUnVuIiwiYW5kQ29tbWFuZHMiLCJjbWQiLCJjaGVja1NpbmdsZUNvbW1hbmQiLCJ2YWx1ZSIsImxlbmd0aCIsImZ1bmMiLCJwdXNoIiwibGlzdCIsIm1pZGRsZXdhcmUiLCJvblN0YXJ0Iiwic3RhcnQiLCJvblN0b3AiLCJzdG9wIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM3REE7Ozs7Ozs7O0FBRUFBLE9BQU9DLFNBQVAsQ0FBaUJDLFVBQWpCLEdBQThCLFlBQVk7QUFDdEMsV0FBTyxLQUFLQyxPQUFMLENBQWEsSUFBYixFQUFtQixHQUFuQixFQUNLQSxPQURMLENBQ2EsSUFEYixFQUNtQixHQURuQixFQUVLQSxPQUZMLENBRWEsSUFGYixFQUVtQixHQUZuQixFQUdLQSxPQUhMLENBR2EsSUFIYixFQUdtQixHQUhuQixFQUlLQSxPQUpMLENBSWEsSUFKYixFQUltQixHQUpuQixFQUtLQSxPQUxMLENBS2EsSUFMYixFQUttQixHQUxuQixFQU1LQSxPQU5MLENBTWEsSUFOYixFQU1tQixHQU5uQixFQU9LQSxPQVBMLENBT2EsSUFQYixFQU9tQixHQVBuQixDQUFQO0FBUUgsQ0FURDs7SUFXTUMsTTtBQUNGLHNCQUE2QztBQUFBLFlBQWhDQyxNQUFnQyx1RUFBdkIsRUFBdUI7QUFBQSxZQUFuQkMsUUFBbUIsdUVBQVIsWUFBSSxDQUFFLENBQUU7O0FBQUE7O0FBQ3pDLFlBQUksT0FBT0QsTUFBUCxLQUFrQixVQUF0QixFQUFrQztBQUM5QkMsdUJBQVdELE1B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QUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFNNUQsbUJBQU8sS0FBS2pDLFdBQUwsQ0FBaUJzQyxJQUFqQixDQUFQO0FBQ0g7OzsrQkFDT3hDLFEsRUFBVTtBQUNkLGdCQUFJQSxRQUFKLEVBQWMsS0FBS0EsUUFBTCxHQUFnQkEsUUFBaEI7QUFDZCxnQkFBSSxLQUFLRCxNQUFMLENBQVl5RCxPQUFoQixFQUF5QixLQUFLekQsTUFBTCxDQUFZeUQsT0FBWjtBQUN6QixpQkFBS3BELFdBQUwsQ0FBaUJxRCxLQUFqQjtBQUNIOzs7K0JBQ087QUFDSixnQkFBSSxLQUFLMUQsTUFBTCxDQUFZMkQsTUFBaEIsRUFBd0IsS0FBSzNELE1BQUwsQ0FBWTJELE1BQVo7QUFDeEIsaUJBQUt0RCxXQUFMLENBQWlCdUQsSUFBakI7QUFDSDs7Ozs7O0FBR0xDLE9BQU9DLE9BQVAsR0FBaUJ4RCxPQUFPUCxNQUFQLEdBQWdCQSxNQUFqQyxDOzs7Ozs7QUM3SEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EiLCJmaWxlIjoiLi90ZXN0L2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYjYwMmY1OGYwZjFmZGJkYTg5OWIiLCJpbXBvcnQgc2ltaWxhcml0eSBmcm9tICdzaW1pbGFyaXR5J1xyXG5cclxuU3RyaW5nLnByb3RvdHlwZS5mYU9wdGltaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucmVwbGFjZSgv2LUvZywgJ9izJylcclxuICAgICAgICAgICAgICAgLnJlcGxhY2UoL9irL2csICfYsycpXHJcbiAgICAgICAgICAgICAgIC5yZXBsYWNlKC/YuC9nLCAn2LInKVxyXG4gICAgICAgICAgICAgICAucmVwbGFjZSgv2LAvZywgJ9iyJylcclxuICAgICAgICAgICAgICAgLnJlcGxhY2UoL9i2L2csICfYsicpXHJcbiAgICAgICAgICAgICAgIC5yZXBsYWNlKC/Yty9nLCAn2KonKVxyXG4gICAgICAgICAgICAgICAucmVwbGFjZSgv2K0vZywgJ9mHJylcclxuICAgICAgICAgICAgICAgLnJlcGxhY2UoL9i6L2csICfZgicpXHJcbn07XHJcblxyXG5jbGFzcyBOZXdzaGEge1xyXG4gICAgY29uc3RydWN0b3IgKGNvbmZpZyA9IHt9LCBjYWxsYmFjayA9ICgpPT57fSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrID0gY29uZmlnO1xyXG4gICAgICAgICAgICBjb25maWcgPSB7fVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbW1hbmRzID0gW107XHJcbiAgICAgICAgdGhpcy5jb2xsZWN0aW9ucyA9IHt9XHJcbiAgICAgICAgdGhpcy5taW5pbXVtQ29uZmlkZW5jZSA9IDAuNDtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbiA9IG5ldyAod2luZG93LlNwZWVjaFJlY29nbml0aW9uIHx8IHdpbmRvdy53ZWJraXRTcGVlY2hSZWNvZ25pdGlvbiB8fCB3aW5kb3cubW96U3BlZWNoUmVjb2duaXRpb24gfHwgd2luZG93Lm1zU3BlZWNoUmVjb2duaXRpb24pKCk7XHJcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5sYW5nID0gY29uZmlnLmxhbmcgfHwgJ2ZhJztcclxuICAgICAgICB0aGlzLnJlY29nbml0aW9uLmNvbnRpbnVvdXMgPSBjb25maWcuY29udGludW91cyB8fCBmYWxzZTtcclxuICAgICAgICB0aGlzLnJlY29nbml0aW9uLm9ucmVzdWx0ID0gdGhpcy5vblJlc3VsdC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMucmVjb2duaXRpb24ub25lbmQgPSB0aGlzLm9uRW5kLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcbiAgICBvblJlc3VsdCAoZXZlbnQpIHtcclxuICAgICAgICBsZXQgcmV0ID0gXCJcIjtcclxuICAgICAgICBmb3IgKGxldCByZXN1bHQgb2YgZXZlbnQucmVzdWx0cykgcmV0ICs9IHJlc3VsdFswXS50cmFuc2NyaXB0O1xyXG4gICAgICAgIHRoaXMuY2hlY2tSZXN1bHRzKHJldCk7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFjayhyZXQpXHJcbiAgICB9XHJcbiAgICBvbkVuZCAoKSB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW4oKVxyXG4gICAgfVxyXG4gICAgY2hlY2tTaW5nbGVDb21tYW5kIChjb21tYW5kLCB0ZXh0KSB7XHJcbiAgICAgICAgY29tbWFuZCA9IGNvbW1hbmQudHJpbSgpO1xyXG4gICAgICAgIGxldCBjb25maWRlbmNlID0gMDtcclxuICAgICAgICBsZXQgb3Blbm5pbmdDb2xsZWN0aW9uID0gY29tbWFuZC5pbmRleE9mKCd7Jyk7XHJcbiAgICAgICAgaWYgKG9wZW5uaW5nQ29sbGVjdGlvbiAhPT0gLTEpIHtcclxuICAgICAgICAgICAgbGV0IGNsb3NpbmdDb2xsZWN0aW9uID0gY29tbWFuZC5pbmRleE9mKCd9Jyk7XHJcbiAgICAgICAgICAgIGxldCBjb2xsZWN0aW9uTmFtZSA9IGNvbW1hbmQuc3Vic3RyKG9wZW5uaW5nQ29sbGVjdGlvbisxLCBjbG9zaW5nQ29sbGVjdGlvbiAtIG9wZW5uaW5nQ29sbGVjdGlvbiAtIDEpO1xyXG4gICAgICAgICAgICBsZXQgY2hvb3NlZEl0ZW0gPSBudWxsO1xyXG4gICAgICAgICAgICBsZXQgaGlnaGVzdENvbmZpZGVuY2UgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHRoaXMuY29sbGVjdGlvbnNbY29sbGVjdGlvbk5hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICBjb25maWRlbmNlID0gMDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHdvcmQgb2YgdGV4dC5zcGxpdCgnICcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlkZW5jZSA9IE1hdGgubWF4KHNpbWlsYXJpdHkod29yZC5mYU9wdGltaXplKCksIGl0ZW0ubmFtZS5mYU9wdGltaXplKCkpLCBjb25maWRlbmNlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGhpZ2hlc3RDb25maWRlbmNlIDwgY29uZmlkZW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hlc3RDb25maWRlbmNlID0gY29uZmlkZW5jZTtcclxuICAgICAgICAgICAgICAgICAgICBjaG9vc2VkSXRlbSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGNvbGxlY3Rpb25OYW1lOiBjb2xsZWN0aW9uTmFtZSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IGNob29zZWRJdGVtLFxyXG4gICAgICAgICAgICAgICAgY29uZmlkZW5jZTogaGlnaGVzdENvbmZpZGVuY2UsXHJcbiAgICAgICAgICAgICAgICBpc1RydWU6IGhpZ2hlc3RDb25maWRlbmNlID49IHRoaXMubWluaW11bUNvbmZpZGVuY2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCB3b3JkIG9mIHRleHQuc3BsaXQoJyAnKSkge1xyXG4gICAgICAgICAgICBjb25maWRlbmNlID0gTWF0aC5tYXgoc2ltaWxhcml0eSh3b3JkLmZhT3B0aW1pemUoKSwgY29tbWFuZC5mYU9wdGltaXplKCkpLCBjb25maWRlbmNlKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb25maWRlbmNlOiBjb25maWRlbmNlLFxyXG4gICAgICAgICAgICBpc1RydWU6IGNvbmZpZGVuY2UgPj0gdGhpcy5taW5pbXVtQ29uZmlkZW5jZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNoZWNrUmVzdWx0cyAodGV4dCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiID09PT0+IFwiLCB0ZXh0KVxyXG4gICAgICAgIGZvciAobGV0IGNvbW1hbmQgb2YgdGhpcy5jb21tYW5kcykge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0T2JqZWN0ID0ge1xyXG4gICAgICAgICAgICAgICAgY29tbWFuZDogY29tbWFuZC5jb21tYW5kLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNjcmlwdDogdGV4dCxcclxuICAgICAgICAgICAgICAgIGNvbGxlY3Rpb25zOiB7fVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBsZXQgc2hvdWxkUnVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IGNvbmZpZGVuY2UgPSAwO1xyXG4gICAgICAgICAgICBsZXQgYW5kQ29tbWFuZHMgPSBjb21tYW5kLmNvbW1hbmQuc3BsaXQoJyYmJyk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNtZCBvZiBhbmRDb21tYW5kcykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY2hlY2tTaW5nbGVDb21tYW5kKGNtZCwgdGV4dCk7XHJcbiAgICAgICAgICAgICAgICBzaG91bGRSdW4gPSBzaG91bGRSdW4gJiYgcmVzdWx0LmlzVHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNvbmZpZGVuY2UgKz0gcmVzdWx0LmNvbmZpZGVuY2U7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRPYmplY3QuY29sbGVjdGlvbnNbcmVzdWx0LmNvbGxlY3Rpb25OYW1lXSA9IHJlc3VsdC5kYXRhLnZhbHVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uZmlkZW5jZSAvPSBhbmRDb21tYW5kcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHJlc3VsdE9iamVjdC5jb25maWRlbmNlID0gY29uZmlkZW5jZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzaG91bGRSdW4pIHtcclxuICAgICAgICAgICAgICAgIGNvbW1hbmQuY2FsbGJhY2socmVzdWx0T2JqZWN0KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29tbWFuZCAoY21kLCBmdW5jKSB7XHJcbiAgICAgICAgdGhpcy5jb21tYW5kcy5wdXNoKHtcclxuICAgICAgICAgICAgY29tbWFuZDogY21kLFxyXG4gICAgICAgICAgICBjYWxsYmFjazogZnVuY1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBjb2xsZWN0aW9uIChuYW1lLCBsaXN0LCBtaWRkbGV3YXJlID0gKGl0ZW0pID0+IHsgcmV0dXJuIGl0ZW0gfSkge1xyXG4gICAgICAgIHRoaXMuY29sbGVjdGlvbnNbbmFtZV0gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGxpc3QpIHRoaXMuY29sbGVjdGlvbnNbbmFtZV0ucHVzaCh7XHJcbiAgICAgICAgICAgIG5hbWU6IGl0ZW0sXHJcbiAgICAgICAgICAgIHZhbHVlOiBtaWRkbGV3YXJlKGl0ZW0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gdGhpcy5jb2xsZWN0aW9uc1tuYW1lXVxyXG4gICAgfVxyXG4gICAgbGlzdGVuIChjYWxsYmFjaykge1xyXG4gICAgICAgIGlmIChjYWxsYmFjaykgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5vblN0YXJ0KSB0aGlzLmNvbmZpZy5vblN0YXJ0KCk7XHJcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5zdGFydCgpXHJcbiAgICB9XHJcbiAgICBzdG9wICgpIHtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcub25TdG9wKSB0aGlzLmNvbmZpZy5vblN0b3AoKTtcclxuICAgICAgICB0aGlzLnJlY29nbml0aW9uLnN0b3AoKVxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHdpbmRvdy5OZXdzaGEgPSBOZXdzaGE7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwidmFyIGRpc3RhbmNlID0gcmVxdWlyZShcImxldmVuXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYSxiKSB7XG4gIGlmICghYSB8fCAhYiB8fCAhYS5sZW5ndGggfHwgIWIubGVuZ3RoKSByZXR1cm4gMFxuICBpZiAoYSA9PT0gYikgcmV0dXJuIDFcbiAgdmFyIGQgPSBkaXN0YW5jZShhLnRvTG93ZXJDYXNlKCksYi50b0xvd2VyQ2FzZSgpKVxuICB2YXIgbG9uZ2VzdCA9IE1hdGgubWF4KGEubGVuZ3RoLCBiLmxlbmd0aClcbiAgcmV0dXJuIChsb25nZXN0LWQpL2xvbmdlc3Rcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NpbWlsYXJpdHkvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyogZXNsaW50LWRpc2FibGUgbm8tbmVzdGVkLXRlcm5hcnkgKi9cbid1c2Ugc3RyaWN0JztcbnZhciBhcnIgPSBbXTtcbnZhciBjaGFyQ29kZUNhY2hlID0gW107XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGEsIGIpIHtcblx0aWYgKGEgPT09IGIpIHtcblx0XHRyZXR1cm4gMDtcblx0fVxuXG5cdHZhciBzd2FwID0gYTtcblxuXHQvLyBTd2FwcGluZyB0aGUgc3RyaW5ncyBpZiBgYWAgaXMgbG9uZ2VyIHRoYW4gYGJgIHNvIHdlIGtub3cgd2hpY2ggb25lIGlzIHRoZVxuXHQvLyBzaG9ydGVzdCAmIHdoaWNoIG9uZSBpcyB0aGUgbG9uZ2VzdFxuXHRpZiAoYS5sZW5ndGggPiBiLmxlbmd0aCkge1xuXHRcdGEgPSBiO1xuXHRcdGIgPSBzd2FwO1xuXHR9XG5cblx0dmFyIGFMZW4gPSBhLmxlbmd0aDtcblx0dmFyIGJMZW4gPSBiLmxlbmd0aDtcblxuXHRpZiAoYUxlbiA9PT0gMCkge1xuXHRcdHJldHVybiBiTGVuO1xuXHR9XG5cblx0aWYgKGJMZW4gPT09IDApIHtcblx0XHRyZXR1cm4gYUxlbjtcblx0fVxuXG5cdC8vIFBlcmZvcm1pbmcgc3VmZml4IHRyaW1taW5nOlxuXHQvLyBXZSBjYW4gbGluZWFybHkgZHJvcCBzdWZmaXggY29tbW9uIHRvIGJvdGggc3RyaW5ncyBzaW5jZSB0aGV5XG5cdC8vIGRvbid0IGluY3JlYXNlIGRpc3RhbmNlIGF0IGFsbFxuXHQvLyBOb3RlOiBgfi1gIGlzIHRoZSBiaXR3aXNlIHdheSB0byBwZXJmb3JtIGEgYC0gMWAgb3BlcmF0aW9uXG5cdHdoaWxlIChhTGVuID4gMCAmJiAoYS5jaGFyQ29kZUF0KH4tYUxlbikgPT09IGIuY2hhckNvZGVBdCh+LWJMZW4pKSkge1xuXHRcdGFMZW4tLTtcblx0XHRiTGVuLS07XG5cdH1cblxuXHRpZiAoYUxlbiA9PT0gMCkge1xuXHRcdHJldHVybiBiTGVuO1xuXHR9XG5cblx0Ly8gUGVyZm9ybWluZyBwcmVmaXggdHJpbW1pbmdcblx0Ly8gV2UgY2FuIGxpbmVhcmx5IGRyb3AgcHJlZml4IGNvbW1vbiB0byBib3RoIHN0cmluZ3Mgc2luY2UgdGhleVxuXHQvLyBkb24ndCBpbmNyZWFzZSBkaXN0YW5jZSBhdCBhbGxcblx0dmFyIHN0YXJ0ID0gMDtcblxuXHR3aGlsZSAoc3RhcnQgPCBhTGVuICYmIChhLmNoYXJDb2RlQXQoc3RhcnQpID09PSBiLmNoYXJDb2RlQXQoc3RhcnQpKSkge1xuXHRcdHN0YXJ0Kys7XG5cdH1cblxuXHRhTGVuIC09IHN0YXJ0O1xuXHRiTGVuIC09IHN0YXJ0O1xuXG5cdGlmIChhTGVuID09PSAwKSB7XG5cdFx0cmV0dXJuIGJMZW47XG5cdH1cblxuXHR2YXIgYkNoYXJDb2RlO1xuXHR2YXIgcmV0O1xuXHR2YXIgdG1wO1xuXHR2YXIgdG1wMjtcblx0dmFyIGkgPSAwO1xuXHR2YXIgaiA9IDA7XG5cblx0d2hpbGUgKGkgPCBhTGVuKSB7XG5cdFx0Y2hhckNvZGVDYWNoZVtzdGFydCArIGldID0gYS5jaGFyQ29kZUF0KHN0YXJ0ICsgaSk7XG5cdFx0YXJyW2ldID0gKytpO1xuXHR9XG5cblx0d2hpbGUgKGogPCBiTGVuKSB7XG5cdFx0YkNoYXJDb2RlID0gYi5jaGFyQ29kZUF0KHN0YXJ0ICsgaik7XG5cdFx0dG1wID0gaisrO1xuXHRcdHJldCA9IGo7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgYUxlbjsgaSsrKSB7XG5cdFx0XHR0bXAyID0gYkNoYXJDb2RlID09PSBjaGFyQ29kZUNhY2hlW3N0YXJ0ICsgaV0gPyB0bXAgOiB0bXAgKyAxO1xuXHRcdFx0dG1wID0gYXJyW2ldO1xuXHRcdFx0cmV0ID0gYXJyW2ldID0gdG1wID4gcmV0ID8gdG1wMiA+IHJldCA/IHJldCArIDEgOiB0bXAyIDogdG1wMiA+IHRtcCA/IHRtcCArIDEgOiB0bXAyO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiByZXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbGV2ZW4vaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==