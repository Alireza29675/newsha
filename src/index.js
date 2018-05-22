import similarity from 'similarity'

String.prototype.faOptimize = function () {
    return this.replace(/ص/g, 'س')
               .replace(/ث/g, 'س')
               .replace(/ظ/g, 'ز')
               .replace(/ذ/g, 'ز')
               .replace(/ض/g, 'ز')
               .replace(/ط/g, 'ت')
               .replace(/ح/g, 'ه')
               .replace(/غ/g, 'ق')
};

class Newsha {
    constructor (config = {}) {
        this.commands = [];
        this.collections = {}
        this.minimumConfidence = 0.4;
        this.config = config;
        this.anyListeners = []
        this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
        this.recognition.lang = config.lang || 'fa';
        this.recognition.continuous = config.continuous || false;
        this.recognition.onresult = this.onResult.bind(this);
        this.recognition.onend = this.onEnd.bind(this);
    }
    onResult (event) {
        let ret = "";
        for (let result of event.results) ret += result[0].transcript;
        for (let listener of this.anyListeners) listener(ret)
        this.checkResults(ret);
    }
    onEnd () {
        this.listen()
    }
    checkSingleCommand (command, text) {
        command = command.trim();
        let confidence = 0;
        let openningCollection = command.indexOf('{');
        if (openningCollection !== -1) {
            let closingCollection = command.indexOf('}');
            let collectionName = command.substr(openningCollection+1, closingCollection - openningCollection - 1);
            let choosedItem = null;
            let highestConfidence = 0;
            for (let item of this.collections[collectionName]) {
                confidence = 0;
                for (let word of text.split(' ')) {
                    confidence = Math.max(similarity(word.faOptimize(), item.name.faOptimize()), confidence)
                }
                if (highestConfidence < confidence) {
                    highestConfidence = confidence;
                    choosedItem = item;
                }
            }
            return {
                collectionName: collectionName,
                data: choosedItem,
                confidence: highestConfidence,
                isTrue: highestConfidence >= this.minimumConfidence
            }
        }
        for (let word of text.split(' ')) {
            confidence = Math.max(similarity(word.faOptimize(), command.faOptimize()), confidence)
        }
        return {
            confidence: confidence,
            isTrue: confidence >= this.minimumConfidence
        }
    }
    checkResults (text) {
        for (let command of this.commands) {
            let resultObject = {
                command: command.command,
                transcript: text,
                collections: {}
            };
            let shouldRun = true;
            let confidence = 0;
            let andCommands = command.command.split('&&');
            for (let cmd of andCommands) {
                let result = this.checkSingleCommand(cmd, text);
                shouldRun = shouldRun && result.isTrue;
                confidence += result.confidence;
                if (result.data) {
                    resultObject.collections[result.collectionName] = result.data.value
                }
            }
            confidence /= andCommands.length;
            resultObject.confidence = confidence;

            if (shouldRun) {
                command.callback(resultObject)
            }
        }
    }
    command (cmd, func) {
        this.commands.push({
            command: cmd,
            callback: func
        })
    }
    collection (name, list, middleware = (item) => { return item }) {
        this.collections[name] = [];
        for (let item of list) this.collections[name].push({
            name: item,
            value: middleware(item)
        })
        return this.collections[name]
    }
    any (func) {
        this.anyListeners.push(func)
    }
    listen () {
        this.recognition.lang = this.config.lang;
        this.recognition.start()
    }
    stop () {
        this.recognition.stop()
    }
}

module.exports = window.Newsha = Newsha;