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
        key: 'collection',
        value: function collection(name, list) {
            var middleware = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (item) {
                return item;
            };

            this.collections[name] = [];
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = list[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var item = _step4.value;
                    this.collections[name].push({
                        name: item,
                        value: middleware(item)
                    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODU3OWUwMDg3YzBhZTQ0YTgwNDIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zaW1pbGFyaXR5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sZXZlbi9pbmRleC5qcyJdLCJuYW1lcyI6WyJTdHJpbmciLCJwcm90b3R5cGUiLCJmYU9wdGltaXplIiwicmVwbGFjZSIsIk5ld3NoYSIsImNvbmZpZyIsImNhbGxiYWNrIiwiY29tbWFuZHMiLCJjb2xsZWN0aW9ucyIsIm1pbmltdW1Db25maWRlbmNlIiwicmVjb2duaXRpb24iLCJ3aW5kb3ciLCJTcGVlY2hSZWNvZ25pdGlvbiIsIndlYmtpdFNwZWVjaFJlY29nbml0aW9uIiwibW96U3BlZWNoUmVjb2duaXRpb24iLCJtc1NwZWVjaFJlY29nbml0aW9uIiwibGFuZyIsImNvbnRpbnVvdXMiLCJvbnJlc3VsdCIsIm9uUmVzdWx0IiwiYmluZCIsIm9uZW5kIiwib25FbmQiLCJldmVudCIsInJldCIsInJlc3VsdHMiLCJyZXN1bHQiLCJ0cmFuc2NyaXB0IiwiY2hlY2tSZXN1bHRzIiwibGlzdGVuIiwiY29tbWFuZCIsImNvbmZpZGVuY2UiLCJzcGxpdCIsIndvcmQiLCJNYXRoIiwibWF4IiwiY21kIiwiZnVuYyIsInB1c2giLCJuYW1lIiwibGlzdCIsIm1pZGRsZXdhcmUiLCJpdGVtIiwidmFsdWUiLCJvblN0YXJ0Iiwic3RhcnQiLCJvblN0b3AiLCJzdG9wIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM3REE7Ozs7Ozs7O0FBRUFBLE9BQU9DLFNBQVAsQ0FBaUJDLFVBQWpCLEdBQThCLFlBQVk7QUFDdEMsV0FBTyxLQUFLQyxPQUFMLENBQWEsSUFBYixFQUFtQixHQUFuQixFQUNLQSxPQURMLENBQ2EsSUFEYixFQUNtQixHQURuQixFQUVLQSxPQUZMLENBRWEsSUFGYixFQUVtQixHQUZuQixFQUdLQSxPQUhMLENBR2EsSUFIYixFQUdtQixHQUhuQixFQUlLQSxPQUpMLENBSWEsSUFKYixFQUltQixHQUpuQixFQUtLQSxPQUxMLENBS2EsSUFMYixFQUttQixHQUxuQixFQU1LQSxPQU5MLENBTWEsSUFOYixFQU1tQixHQU5uQixFQU9LQSxPQVBMLENBT2EsSUFQYixFQU9tQixHQVBuQixDQUFQO0FBUUgsQ0FURDs7SUFXTUMsTTtBQUNGLHNCQUE2QztBQUFBLFlBQWhDQyxNQUFnQyx1RUFBdkIsRUFBdUI7QUFBQSxZQUFuQkMsUUFBbUIsdUVBQVIsWUFBSSxDQUFFLENBQUU7O0FBQUE7O0FBQ3pDLFlBQUksT0FBT0QsTUFBUCxLQUFrQixVQUF0QixFQUFrQztBQUM5QkMsdUJBQVdELE1BQVg7QUFDQUEscUJBQVMsRUFBVDtBQUNIO0FBQ0QsYUFBS0UsUUFBTCxHQUFnQixFQUFoQjtBQUNBLGFBQUtDLFdBQUwsR0FBbUIsRUFBbkI7QUFDQSxhQUFLQyxpQkFBTCxHQUF5QixHQUF6QjtBQUNBLGFBQUtKLE1BQUwsR0FBY0EsTUFBZDtBQUNBLGFBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsYUFBS0ksV0FBTCxHQUFtQixLQUFLQyxPQUFPQyxpQkFBUCxJQUE0QkQsT0FBT0UsdUJBQW5DLElBQThERixPQUFPRyxvQkFBckUsSUFBNkZILE9BQU9JLG1CQUF6RyxHQUFuQjtBQUNBLGFBQUtMLFdBQUwsQ0FBaUJNLElBQWpCLEdBQXdCWCxPQUFPVyxJQUFQLElBQWUsSUFBdkM7QUFDQSxhQUFLTixXQUFMLENBQWlCTyxVQUFqQixHQUE4QlosT0FBT1ksVUFBUCxJQUFxQixLQUFuRDtBQUNBLGFBQUtQLFdBQUwsQ0FBaUJRLFFBQWpCLEdBQTRCLEtBQUtDLFFBQUwsQ0FBY0MsSUFBZCxDQUFtQixJQUFuQixDQUE1QjtBQUNBLGFBQUtWLFdBQUwsQ0FBaUJXLEtBQWpCLEdBQXlCLEtBQUtDLEtBQUwsQ0FBV0YsSUFBWCxDQUFnQixJQUFoQixDQUF6QjtBQUNIOzs7O2lDQUNTRyxLLEVBQU87QUFDYixnQkFBSUMsTUFBTSxFQUFWO0FBRGE7QUFBQTtBQUFBOztBQUFBO0FBRWIscUNBQW1CRCxNQUFNRSxPQUF6QjtBQUFBLHdCQUFTQyxNQUFUO0FBQWtDRiwyQkFBT0UsT0FBTyxDQUFQLEVBQVVDLFVBQWpCO0FBQWxDO0FBRmE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFHYixpQkFBS0MsWUFBTCxDQUFrQkosR0FBbEI7QUFDQSxpQkFBS2xCLFFBQUwsQ0FBY2tCLEdBQWQ7QUFDSDs7O2dDQUNRO0FBQ0wsaUJBQUtLLE1BQUw7QUFDSDs7O3FDQUNhSCxNLEVBQVE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDbEIsc0NBQW9CLEtBQUtuQixRQUF6QixtSUFBbUM7QUFBQSx3QkFBMUJ1QixPQUEwQjs7QUFDL0Isd0JBQUlDLGFBQWEsQ0FBakI7QUFEK0I7QUFBQTtBQUFBOztBQUFBO0FBRS9CLDhDQUFpQkwsT0FBT00sS0FBUCxDQUFhLEdBQWIsQ0FBakIsbUlBQW9DO0FBQUEsZ0NBQTNCQyxJQUEyQjs7QUFDaENGLHlDQUFhRyxLQUFLQyxHQUFMLENBQVMsMEJBQVdGLEtBQUsvQixVQUFMLEVBQVgsRUFBOEI0QixRQUFRQSxPQUFSLENBQWdCNUIsVUFBaEIsRUFBOUIsQ0FBVCxFQUFzRTZCLFVBQXRFLENBQWI7QUFDSDtBQUo4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUsvQix3QkFBSUEsY0FBYyxLQUFLdEIsaUJBQXZCLEVBQTBDcUIsUUFBUXhCLFFBQVIsQ0FBaUJ3QixRQUFRQSxPQUF6QixFQUFrQ0MsVUFBbEMsRUFBOENMLE1BQTlDO0FBQzdDO0FBUGlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFRckI7OztnQ0FDUVUsRyxFQUFLQyxJLEVBQU07QUFDaEIsaUJBQUs5QixRQUFMLENBQWMrQixJQUFkLENBQW1CO0FBQ2ZSLHlCQUFTTSxHQURNO0FBRWY5QiwwQkFBVStCO0FBRkssYUFBbkI7QUFJSDs7O21DQUNXRSxJLEVBQU1DLEksRUFBOEM7QUFBQSxnQkFBeENDLFVBQXdDLHVFQUEzQixVQUFDQyxJQUFELEVBQVU7QUFBRSx1QkFBT0EsSUFBUDtBQUFhLGFBQUU7O0FBQzVELGlCQUFLbEMsV0FBTCxDQUFpQitCLElBQWpCLElBQXlCLEVBQXpCO0FBRDREO0FBQUE7QUFBQTs7QUFBQTtBQUU1RCxzQ0FBaUJDLElBQWpCO0FBQUEsd0JBQVNFLElBQVQ7QUFBdUIseUJBQUtsQyxXQUFMLENBQWlCK0IsSUFBakIsRUFBdUJELElBQXZCLENBQTRCO0FBQy9DQyw4QkFBTUcsSUFEeUM7QUFFL0NDLCtCQUFPRixXQUFXQyxJQUFYO0FBRndDLHFCQUE1QjtBQUF2QjtBQUY0RDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQU01RCxtQkFBTyxLQUFLbEMsV0FBTCxDQUFpQitCLElBQWpCLENBQVA7QUFDSDs7OytCQUNPakMsUSxFQUFVO0FBQ2QsZ0JBQUlBLFFBQUosRUFBYyxLQUFLQSxRQUFMLEdBQWdCQSxRQUFoQjtBQUNkLGdCQUFJLEtBQUtELE1BQUwsQ0FBWXVDLE9BQWhCLEVBQXlCLEtBQUt2QyxNQUFMLENBQVl1QyxPQUFaO0FBQ3pCLGlCQUFLbEMsV0FBTCxDQUFpQm1DLEtBQWpCO0FBQ0g7OzsrQkFDTztBQUNKLGdCQUFJLEtBQUt4QyxNQUFMLENBQVl5QyxNQUFoQixFQUF3QixLQUFLekMsTUFBTCxDQUFZeUMsTUFBWjtBQUN4QixpQkFBS3BDLFdBQUwsQ0FBaUJxQyxJQUFqQjtBQUNIOzs7Ozs7QUFHTEMsT0FBT0MsT0FBUCxHQUFpQnRDLE9BQU9QLE1BQVAsR0FBZ0JBLE1BQWpDLEM7Ozs7OztBQ3pFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsImZpbGUiOiIuL3Rlc3QvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA4NTc5ZTAwODdjMGFlNDRhODA0MiIsImltcG9ydCBzaW1pbGFyaXR5IGZyb20gJ3NpbWlsYXJpdHknXHJcblxyXG5TdHJpbmcucHJvdG90eXBlLmZhT3B0aW1pemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC/YtS9nLCAn2LMnKVxyXG4gICAgICAgICAgICAgICAucmVwbGFjZSgv2KsvZywgJ9izJylcclxuICAgICAgICAgICAgICAgLnJlcGxhY2UoL9i4L2csICfYsicpXHJcbiAgICAgICAgICAgICAgIC5yZXBsYWNlKC/YsC9nLCAn2LInKVxyXG4gICAgICAgICAgICAgICAucmVwbGFjZSgv2LYvZywgJ9iyJylcclxuICAgICAgICAgICAgICAgLnJlcGxhY2UoL9i3L2csICfYqicpXHJcbiAgICAgICAgICAgICAgIC5yZXBsYWNlKC/YrS9nLCAn2YcnKVxyXG4gICAgICAgICAgICAgICAucmVwbGFjZSgv2LovZywgJ9mCJylcclxufTtcclxuXHJcbmNsYXNzIE5ld3NoYSB7XHJcbiAgICBjb25zdHJ1Y3RvciAoY29uZmlnID0ge30sIGNhbGxiYWNrID0gKCk9Pnt9KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2sgPSBjb25maWc7XHJcbiAgICAgICAgICAgIGNvbmZpZyA9IHt9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29tbWFuZHMgPSBbXTtcclxuICAgICAgICB0aGlzLmNvbGxlY3Rpb25zID0ge31cclxuICAgICAgICB0aGlzLm1pbmltdW1Db25maWRlbmNlID0gMC40O1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICB0aGlzLnJlY29nbml0aW9uID0gbmV3ICh3aW5kb3cuU3BlZWNoUmVjb2duaXRpb24gfHwgd2luZG93LndlYmtpdFNwZWVjaFJlY29nbml0aW9uIHx8IHdpbmRvdy5tb3pTcGVlY2hSZWNvZ25pdGlvbiB8fCB3aW5kb3cubXNTcGVlY2hSZWNvZ25pdGlvbikoKTtcclxuICAgICAgICB0aGlzLnJlY29nbml0aW9uLmxhbmcgPSBjb25maWcubGFuZyB8fCAnZmEnO1xyXG4gICAgICAgIHRoaXMucmVjb2duaXRpb24uY29udGludW91cyA9IGNvbmZpZy5jb250aW51b3VzIHx8IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVjb2duaXRpb24ub25yZXN1bHQgPSB0aGlzLm9uUmVzdWx0LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5vbmVuZCA9IHRoaXMub25FbmQuYmluZCh0aGlzKTtcclxuICAgIH1cclxuICAgIG9uUmVzdWx0IChldmVudCkge1xyXG4gICAgICAgIGxldCByZXQgPSBcIlwiO1xyXG4gICAgICAgIGZvciAobGV0IHJlc3VsdCBvZiBldmVudC5yZXN1bHRzKSByZXQgKz0gcmVzdWx0WzBdLnRyYW5zY3JpcHQ7XHJcbiAgICAgICAgdGhpcy5jaGVja1Jlc3VsdHMocmV0KTtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrKHJldClcclxuICAgIH1cclxuICAgIG9uRW5kICgpIHtcclxuICAgICAgICB0aGlzLmxpc3RlbigpXHJcbiAgICB9XHJcbiAgICBjaGVja1Jlc3VsdHMgKHJlc3VsdCkge1xyXG4gICAgICAgIGZvciAobGV0IGNvbW1hbmQgb2YgdGhpcy5jb21tYW5kcykge1xyXG4gICAgICAgICAgICBsZXQgY29uZmlkZW5jZSA9IDA7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHdvcmQgb2YgcmVzdWx0LnNwbGl0KCcgJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZGVuY2UgPSBNYXRoLm1heChzaW1pbGFyaXR5KHdvcmQuZmFPcHRpbWl6ZSgpLCBjb21tYW5kLmNvbW1hbmQuZmFPcHRpbWl6ZSgpKSwgY29uZmlkZW5jZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29uZmlkZW5jZSA+PSB0aGlzLm1pbmltdW1Db25maWRlbmNlKSBjb21tYW5kLmNhbGxiYWNrKGNvbW1hbmQuY29tbWFuZCwgY29uZmlkZW5jZSwgcmVzdWx0KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbW1hbmQgKGNtZCwgZnVuYykge1xyXG4gICAgICAgIHRoaXMuY29tbWFuZHMucHVzaCh7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IGNtZCxcclxuICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmNcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgY29sbGVjdGlvbiAobmFtZSwgbGlzdCwgbWlkZGxld2FyZSA9IChpdGVtKSA9PiB7IHJldHVybiBpdGVtIH0pIHtcclxuICAgICAgICB0aGlzLmNvbGxlY3Rpb25zW25hbWVdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBsaXN0KSB0aGlzLmNvbGxlY3Rpb25zW25hbWVdLnB1c2goe1xyXG4gICAgICAgICAgICBuYW1lOiBpdGVtLFxyXG4gICAgICAgICAgICB2YWx1ZTogbWlkZGxld2FyZShpdGVtKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sbGVjdGlvbnNbbmFtZV1cclxuICAgIH1cclxuICAgIGxpc3RlbiAoY2FsbGJhY2spIHtcclxuICAgICAgICBpZiAoY2FsbGJhY2spIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICBpZiAodGhpcy5jb25maWcub25TdGFydCkgdGhpcy5jb25maWcub25TdGFydCgpO1xyXG4gICAgICAgIHRoaXMucmVjb2duaXRpb24uc3RhcnQoKVxyXG4gICAgfVxyXG4gICAgc3RvcCAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLm9uU3RvcCkgdGhpcy5jb25maWcub25TdG9wKCk7XHJcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5zdG9wKClcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB3aW5kb3cuTmV3c2hhID0gTmV3c2hhO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsInZhciBkaXN0YW5jZSA9IHJlcXVpcmUoXCJsZXZlblwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGEsYikge1xuICBpZiAoIWEgfHwgIWIgfHwgIWEubGVuZ3RoIHx8ICFiLmxlbmd0aCkgcmV0dXJuIDBcbiAgaWYgKGEgPT09IGIpIHJldHVybiAxXG4gIHZhciBkID0gZGlzdGFuY2UoYS50b0xvd2VyQ2FzZSgpLGIudG9Mb3dlckNhc2UoKSlcbiAgdmFyIGxvbmdlc3QgPSBNYXRoLm1heChhLmxlbmd0aCwgYi5sZW5ndGgpXG4gIHJldHVybiAobG9uZ2VzdC1kKS9sb25nZXN0XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zaW1pbGFyaXR5L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIGVzbGludC1kaXNhYmxlIG5vLW5lc3RlZC10ZXJuYXJ5ICovXG4ndXNlIHN0cmljdCc7XG52YXIgYXJyID0gW107XG52YXIgY2hhckNvZGVDYWNoZSA9IFtdO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhLCBiKSB7XG5cdGlmIChhID09PSBiKSB7XG5cdFx0cmV0dXJuIDA7XG5cdH1cblxuXHR2YXIgc3dhcCA9IGE7XG5cblx0Ly8gU3dhcHBpbmcgdGhlIHN0cmluZ3MgaWYgYGFgIGlzIGxvbmdlciB0aGFuIGBiYCBzbyB3ZSBrbm93IHdoaWNoIG9uZSBpcyB0aGVcblx0Ly8gc2hvcnRlc3QgJiB3aGljaCBvbmUgaXMgdGhlIGxvbmdlc3Rcblx0aWYgKGEubGVuZ3RoID4gYi5sZW5ndGgpIHtcblx0XHRhID0gYjtcblx0XHRiID0gc3dhcDtcblx0fVxuXG5cdHZhciBhTGVuID0gYS5sZW5ndGg7XG5cdHZhciBiTGVuID0gYi5sZW5ndGg7XG5cblx0aWYgKGFMZW4gPT09IDApIHtcblx0XHRyZXR1cm4gYkxlbjtcblx0fVxuXG5cdGlmIChiTGVuID09PSAwKSB7XG5cdFx0cmV0dXJuIGFMZW47XG5cdH1cblxuXHQvLyBQZXJmb3JtaW5nIHN1ZmZpeCB0cmltbWluZzpcblx0Ly8gV2UgY2FuIGxpbmVhcmx5IGRyb3Agc3VmZml4IGNvbW1vbiB0byBib3RoIHN0cmluZ3Mgc2luY2UgdGhleVxuXHQvLyBkb24ndCBpbmNyZWFzZSBkaXN0YW5jZSBhdCBhbGxcblx0Ly8gTm90ZTogYH4tYCBpcyB0aGUgYml0d2lzZSB3YXkgdG8gcGVyZm9ybSBhIGAtIDFgIG9wZXJhdGlvblxuXHR3aGlsZSAoYUxlbiA+IDAgJiYgKGEuY2hhckNvZGVBdCh+LWFMZW4pID09PSBiLmNoYXJDb2RlQXQofi1iTGVuKSkpIHtcblx0XHRhTGVuLS07XG5cdFx0Ykxlbi0tO1xuXHR9XG5cblx0aWYgKGFMZW4gPT09IDApIHtcblx0XHRyZXR1cm4gYkxlbjtcblx0fVxuXG5cdC8vIFBlcmZvcm1pbmcgcHJlZml4IHRyaW1taW5nXG5cdC8vIFdlIGNhbiBsaW5lYXJseSBkcm9wIHByZWZpeCBjb21tb24gdG8gYm90aCBzdHJpbmdzIHNpbmNlIHRoZXlcblx0Ly8gZG9uJ3QgaW5jcmVhc2UgZGlzdGFuY2UgYXQgYWxsXG5cdHZhciBzdGFydCA9IDA7XG5cblx0d2hpbGUgKHN0YXJ0IDwgYUxlbiAmJiAoYS5jaGFyQ29kZUF0KHN0YXJ0KSA9PT0gYi5jaGFyQ29kZUF0KHN0YXJ0KSkpIHtcblx0XHRzdGFydCsrO1xuXHR9XG5cblx0YUxlbiAtPSBzdGFydDtcblx0YkxlbiAtPSBzdGFydDtcblxuXHRpZiAoYUxlbiA9PT0gMCkge1xuXHRcdHJldHVybiBiTGVuO1xuXHR9XG5cblx0dmFyIGJDaGFyQ29kZTtcblx0dmFyIHJldDtcblx0dmFyIHRtcDtcblx0dmFyIHRtcDI7XG5cdHZhciBpID0gMDtcblx0dmFyIGogPSAwO1xuXG5cdHdoaWxlIChpIDwgYUxlbikge1xuXHRcdGNoYXJDb2RlQ2FjaGVbc3RhcnQgKyBpXSA9IGEuY2hhckNvZGVBdChzdGFydCArIGkpO1xuXHRcdGFycltpXSA9ICsraTtcblx0fVxuXG5cdHdoaWxlIChqIDwgYkxlbikge1xuXHRcdGJDaGFyQ29kZSA9IGIuY2hhckNvZGVBdChzdGFydCArIGopO1xuXHRcdHRtcCA9IGorKztcblx0XHRyZXQgPSBqO1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8IGFMZW47IGkrKykge1xuXHRcdFx0dG1wMiA9IGJDaGFyQ29kZSA9PT0gY2hhckNvZGVDYWNoZVtzdGFydCArIGldID8gdG1wIDogdG1wICsgMTtcblx0XHRcdHRtcCA9IGFycltpXTtcblx0XHRcdHJldCA9IGFycltpXSA9IHRtcCA+IHJldCA/IHRtcDIgPiByZXQgPyByZXQgKyAxIDogdG1wMiA6IHRtcDIgPiB0bXAgPyB0bXAgKyAxIDogdG1wMjtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcmV0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xldmVuL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=