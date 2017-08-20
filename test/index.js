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
        value: function onEnd(event) {
            this.listen();
        }
    }, {
        key: 'checkResults',
        value: function checkResults(result) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.commands[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var command = _step2.value;

                    var confidence = 0;
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = result.split(' ')[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var word = _step3.value;

                            confidence = Math.max((0, _similarity2.default)(word.faOptimize(), command.command.faOptimize()), confidence);
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

                    if (confidence >= this.minimumConfidence) command.callback(command.command, confidence, result);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2M2ZDA1NzEwZWViODU2NmExZGEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zaW1pbGFyaXR5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sZXZlbi9pbmRleC5qcyJdLCJuYW1lcyI6WyJTdHJpbmciLCJwcm90b3R5cGUiLCJmYU9wdGltaXplIiwicmVwbGFjZSIsIk5ld3NoYSIsImNvbmZpZyIsImNhbGxiYWNrIiwiY29tbWFuZHMiLCJtaW5pbXVtQ29uZmlkZW5jZSIsInJlY29nbml0aW9uIiwid2luZG93IiwiU3BlZWNoUmVjb2duaXRpb24iLCJ3ZWJraXRTcGVlY2hSZWNvZ25pdGlvbiIsIm1velNwZWVjaFJlY29nbml0aW9uIiwibXNTcGVlY2hSZWNvZ25pdGlvbiIsImxhbmciLCJjb250aW51b3VzIiwib25yZXN1bHQiLCJvblJlc3VsdCIsImJpbmQiLCJvbmVuZCIsIm9uRW5kIiwiZXZlbnQiLCJyZXQiLCJyZXN1bHRzIiwicmVzdWx0IiwidHJhbnNjcmlwdCIsImNoZWNrUmVzdWx0cyIsImxpc3RlbiIsImNvbW1hbmQiLCJjb25maWRlbmNlIiwic3BsaXQiLCJ3b3JkIiwiTWF0aCIsIm1heCIsImNtZCIsImZ1bmMiLCJwdXNoIiwib25TdGFydCIsInN0YXJ0Iiwib25TdG9wIiwic3RvcCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwiZmlsZSI6Ii4vdGVzdC9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGNjNmQwNTcxMGVlYjg1NjZhMWRhIiwiaW1wb3J0IHNpbWlsYXJpdHkgZnJvbSAnc2ltaWxhcml0eSdcclxuXHJcblN0cmluZy5wcm90b3R5cGUuZmFPcHRpbWl6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLnJlcGxhY2UoL9i1L2csICfYsycpXHJcbiAgICAgICAgICAgICAgIC5yZXBsYWNlKC/Yqy9nLCAn2LMnKVxyXG4gICAgICAgICAgICAgICAucmVwbGFjZSgv2LgvZywgJ9iyJylcclxuICAgICAgICAgICAgICAgLnJlcGxhY2UoL9iwL2csICfYsicpXHJcbiAgICAgICAgICAgICAgIC5yZXBsYWNlKC/Yti9nLCAn2LInKVxyXG4gICAgICAgICAgICAgICAucmVwbGFjZSgv2LcvZywgJ9iqJylcclxuICAgICAgICAgICAgICAgLnJlcGxhY2UoL9itL2csICfZhycpXHJcbiAgICAgICAgICAgICAgIC5yZXBsYWNlKC/Yui9nLCAn2YInKVxyXG59XHJcblxyXG5jbGFzcyBOZXdzaGEge1xyXG4gICAgY29uc3RydWN0b3IgKGNvbmZpZyA9IHt9LCBjYWxsYmFjayA9ICgpPT57fSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrID0gY29uZmlnO1xyXG4gICAgICAgICAgICBjb25maWcgPSB7fVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbW1hbmRzID0gW11cclxuICAgICAgICB0aGlzLm1pbmltdW1Db25maWRlbmNlID0gMC40XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMucmVjb2duaXRpb24gPSBuZXcgKHdpbmRvdy5TcGVlY2hSZWNvZ25pdGlvbiB8fCB3aW5kb3cud2Via2l0U3BlZWNoUmVjb2duaXRpb24gfHwgd2luZG93Lm1velNwZWVjaFJlY29nbml0aW9uIHx8IHdpbmRvdy5tc1NwZWVjaFJlY29nbml0aW9uKSgpO1xyXG4gICAgICAgIHRoaXMucmVjb2duaXRpb24ubGFuZyA9IGNvbmZpZy5sYW5nIHx8ICdmYSc7XHJcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5jb250aW51b3VzID0gY29uZmlnLmNvbnRpbnVvdXMgfHwgZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5vbnJlc3VsdCA9IHRoaXMub25SZXN1bHQuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnJlY29nbml0aW9uLm9uZW5kID0gdGhpcy5vbkVuZC5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgb25SZXN1bHQgKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHJldCA9IFwiXCI7XHJcbiAgICAgICAgZm9yIChsZXQgcmVzdWx0IG9mIGV2ZW50LnJlc3VsdHMpIHJldCArPSByZXN1bHRbMF0udHJhbnNjcmlwdDtcclxuICAgICAgICB0aGlzLmNoZWNrUmVzdWx0cyhyZXQpXHJcbiAgICAgICAgdGhpcy5jYWxsYmFjayhyZXQpXHJcbiAgICB9XHJcbiAgICBvbkVuZCAoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmxpc3RlbigpXHJcbiAgICB9XHJcbiAgICBjaGVja1Jlc3VsdHMgKHJlc3VsdCkge1xyXG4gICAgICAgIGZvciAobGV0IGNvbW1hbmQgb2YgdGhpcy5jb21tYW5kcykge1xyXG4gICAgICAgICAgICB2YXIgY29uZmlkZW5jZSA9IDBcclxuICAgICAgICAgICAgZm9yIChsZXQgd29yZCBvZiByZXN1bHQuc3BsaXQoJyAnKSkge1xyXG4gICAgICAgICAgICAgICAgY29uZmlkZW5jZSA9IE1hdGgubWF4KHNpbWlsYXJpdHkod29yZC5mYU9wdGltaXplKCksIGNvbW1hbmQuY29tbWFuZC5mYU9wdGltaXplKCkpLCBjb25maWRlbmNlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb25maWRlbmNlID49IHRoaXMubWluaW11bUNvbmZpZGVuY2UpIGNvbW1hbmQuY2FsbGJhY2soY29tbWFuZC5jb21tYW5kLCBjb25maWRlbmNlLCByZXN1bHQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29tbWFuZCAoY21kLCBmdW5jKSB7XHJcbiAgICAgICAgdGhpcy5jb21tYW5kcy5wdXNoKHtcclxuICAgICAgICAgICAgY29tbWFuZDogY21kLFxyXG4gICAgICAgICAgICBjYWxsYmFjazogZnVuY1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBsaXN0ZW4gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2tcclxuICAgICAgICBpZiAodGhpcy5jb25maWcub25TdGFydCkgdGhpcy5jb25maWcub25TdGFydCgpO1xyXG4gICAgICAgIHRoaXMucmVjb2duaXRpb24uc3RhcnQoKVxyXG4gICAgfVxyXG4gICAgc3RvcCAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLm9uU3RvcCkgdGhpcy5jb25maWcub25TdG9wKCk7XHJcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5zdG9wKClcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB3aW5kb3cuTmV3c2hhID0gTmV3c2hhO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsInZhciBkaXN0YW5jZSA9IHJlcXVpcmUoXCJsZXZlblwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGEsYikge1xuICBpZiAoIWEgfHwgIWIgfHwgIWEubGVuZ3RoIHx8ICFiLmxlbmd0aCkgcmV0dXJuIDBcbiAgaWYgKGEgPT09IGIpIHJldHVybiAxXG4gIHZhciBkID0gZGlzdGFuY2UoYS50b0xvd2VyQ2FzZSgpLGIudG9Mb3dlckNhc2UoKSlcbiAgdmFyIGxvbmdlc3QgPSBNYXRoLm1heChhLmxlbmd0aCwgYi5sZW5ndGgpXG4gIHJldHVybiAobG9uZ2VzdC1kKS9sb25nZXN0XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zaW1pbGFyaXR5L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIGVzbGludC1kaXNhYmxlIG5vLW5lc3RlZC10ZXJuYXJ5ICovXG4ndXNlIHN0cmljdCc7XG52YXIgYXJyID0gW107XG52YXIgY2hhckNvZGVDYWNoZSA9IFtdO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhLCBiKSB7XG5cdGlmIChhID09PSBiKSB7XG5cdFx0cmV0dXJuIDA7XG5cdH1cblxuXHR2YXIgc3dhcCA9IGE7XG5cblx0Ly8gU3dhcHBpbmcgdGhlIHN0cmluZ3MgaWYgYGFgIGlzIGxvbmdlciB0aGFuIGBiYCBzbyB3ZSBrbm93IHdoaWNoIG9uZSBpcyB0aGVcblx0Ly8gc2hvcnRlc3QgJiB3aGljaCBvbmUgaXMgdGhlIGxvbmdlc3Rcblx0aWYgKGEubGVuZ3RoID4gYi5sZW5ndGgpIHtcblx0XHRhID0gYjtcblx0XHRiID0gc3dhcDtcblx0fVxuXG5cdHZhciBhTGVuID0gYS5sZW5ndGg7XG5cdHZhciBiTGVuID0gYi5sZW5ndGg7XG5cblx0aWYgKGFMZW4gPT09IDApIHtcblx0XHRyZXR1cm4gYkxlbjtcblx0fVxuXG5cdGlmIChiTGVuID09PSAwKSB7XG5cdFx0cmV0dXJuIGFMZW47XG5cdH1cblxuXHQvLyBQZXJmb3JtaW5nIHN1ZmZpeCB0cmltbWluZzpcblx0Ly8gV2UgY2FuIGxpbmVhcmx5IGRyb3Agc3VmZml4IGNvbW1vbiB0byBib3RoIHN0cmluZ3Mgc2luY2UgdGhleVxuXHQvLyBkb24ndCBpbmNyZWFzZSBkaXN0YW5jZSBhdCBhbGxcblx0Ly8gTm90ZTogYH4tYCBpcyB0aGUgYml0d2lzZSB3YXkgdG8gcGVyZm9ybSBhIGAtIDFgIG9wZXJhdGlvblxuXHR3aGlsZSAoYUxlbiA+IDAgJiYgKGEuY2hhckNvZGVBdCh+LWFMZW4pID09PSBiLmNoYXJDb2RlQXQofi1iTGVuKSkpIHtcblx0XHRhTGVuLS07XG5cdFx0Ykxlbi0tO1xuXHR9XG5cblx0aWYgKGFMZW4gPT09IDApIHtcblx0XHRyZXR1cm4gYkxlbjtcblx0fVxuXG5cdC8vIFBlcmZvcm1pbmcgcHJlZml4IHRyaW1taW5nXG5cdC8vIFdlIGNhbiBsaW5lYXJseSBkcm9wIHByZWZpeCBjb21tb24gdG8gYm90aCBzdHJpbmdzIHNpbmNlIHRoZXlcblx0Ly8gZG9uJ3QgaW5jcmVhc2UgZGlzdGFuY2UgYXQgYWxsXG5cdHZhciBzdGFydCA9IDA7XG5cblx0d2hpbGUgKHN0YXJ0IDwgYUxlbiAmJiAoYS5jaGFyQ29kZUF0KHN0YXJ0KSA9PT0gYi5jaGFyQ29kZUF0KHN0YXJ0KSkpIHtcblx0XHRzdGFydCsrO1xuXHR9XG5cblx0YUxlbiAtPSBzdGFydDtcblx0YkxlbiAtPSBzdGFydDtcblxuXHRpZiAoYUxlbiA9PT0gMCkge1xuXHRcdHJldHVybiBiTGVuO1xuXHR9XG5cblx0dmFyIGJDaGFyQ29kZTtcblx0dmFyIHJldDtcblx0dmFyIHRtcDtcblx0dmFyIHRtcDI7XG5cdHZhciBpID0gMDtcblx0dmFyIGogPSAwO1xuXG5cdHdoaWxlIChpIDwgYUxlbikge1xuXHRcdGNoYXJDb2RlQ2FjaGVbc3RhcnQgKyBpXSA9IGEuY2hhckNvZGVBdChzdGFydCArIGkpO1xuXHRcdGFycltpXSA9ICsraTtcblx0fVxuXG5cdHdoaWxlIChqIDwgYkxlbikge1xuXHRcdGJDaGFyQ29kZSA9IGIuY2hhckNvZGVBdChzdGFydCArIGopO1xuXHRcdHRtcCA9IGorKztcblx0XHRyZXQgPSBqO1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8IGFMZW47IGkrKykge1xuXHRcdFx0dG1wMiA9IGJDaGFyQ29kZSA9PT0gY2hhckNvZGVDYWNoZVtzdGFydCArIGldID8gdG1wIDogdG1wICsgMTtcblx0XHRcdHRtcCA9IGFycltpXTtcblx0XHRcdHJldCA9IGFycltpXSA9IHRtcCA+IHJldCA/IHRtcDIgPiByZXQgPyByZXQgKyAxIDogdG1wMiA6IHRtcDIgPiB0bXAgPyB0bXAgKyAxIDogdG1wMjtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcmV0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xldmVuL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=