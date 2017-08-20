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
    constructor (config = {}, callback = ()=>{}) {
        if (typeof config === 'function') {
            callback = config;
            config = {}
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
    onResult (event) {
        let ret = "";
        for (let result of event.results) ret += result[0].transcript;
        this.checkResults(ret);
        this.callback(ret)
    }
    onEnd () {
        this.listen()
    }
    checkResults (result) {
        for (let command of this.commands) {
            let confidence = 0;
            for (let word of result.split(' ')) {
                confidence = Math.max(similarity(word.faOptimize(), command.command.faOptimize()), confidence)
            }
            if (confidence >= this.minimumConfidence) command.callback(command.command, confidence, result)
        }
    }
    command (cmd, func) {
        this.commands.push({
            command: cmd,
            callback: func
        })
    }
    listen (callback) {
        if (callback) this.callback = callback;
        if (this.config.onStart) this.config.onStart();
        this.recognition.start()
    }
    stop () {
        if (this.config.onStop) this.config.onStop();
        this.recognition.stop()
    }
}

module.exports = window.Newsha = Newsha;