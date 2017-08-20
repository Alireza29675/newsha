class Newsha {
    constructor (config = {}, callback = ()=>{}) {
        if (typeof config === 'function') {
            callback = config;
            config = {}
        }
        this.config = config;
        this.callback = callback;
        this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
        this.recognition.lang = config.lang || 'fa';
        this.recognition.continuous = config.continuous || false;
        this.recognition.onresult = this.onResult.bind(this);
        this.recognition.onend = this.onEnd.bind(this);
    }
    onResult (event) {
        let text = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            text += event.results[i][0].transcript;
        }
        this.callback(text)
    }
    onEnd (event) {
        console.log(event)
        this.listen()
    }
    listen (callback) {
        if (callback) this.callback = callback
        if (this.config.onStart) this.config.onStart();
        this.recognition.start()
    }
    stop () {
        if (this.config.onStop) this.config.onStop();
        this.recognition.stop()
    }
}

module.exports = Newsha;