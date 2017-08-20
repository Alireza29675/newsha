'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _similarity = require('similarity');

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