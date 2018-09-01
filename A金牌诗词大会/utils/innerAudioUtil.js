/**
 * wx.createInnerAudioContext
 * 一个小程序内最多只能存在 5 个 innerAudio 实例
 */
let audioContext = {};

function createInnerAudioContext(opt) {
    let context = wx.createInnerAudioContext();
    context.src = opt.src;
    context.autoplay = opt.autoplay || true;
    context.loop = opt.loop || false;
    return context;
}

// 单击声音
audioContext.clickAudio = (function () {
    let audio;
    return function (opt) {
        if (!audio) {
            audio = createInnerAudioContext(opt);
            return;
        }
        audio.play();
    };
})();

// 答对
audioContext.correctAudio = (function () {
    let audio;
    return function (opt) {
        if (!audio) {
            audio = createInnerAudioContext(opt);
        }
        audio.play();
    };
})();

// 打错
audioContext.wrongAudio = (function () {
    let audio;
    return function (opt) {
        if (!audio) {
            audio = createInnerAudioContext(opt);
            return;
        }
        audio.play();
    };
})();

// 拔剑
audioContext.drewSwordAudio = (function () {
    let audio;
    return function (opt) {
        if (!audio) {
            audio = createInnerAudioContext(opt);
            return;
        }
        audio.play();
        // audio.onCanplay(() => {
        //     audio.play();
        // });
    };
})();

// wind
audioContext.windAudio = (function () {
    let audio;
    return function (opt) {
        if (!audio) {
            audio = createInnerAudioContext(opt);
            return;
        }
        audio.play();
        // audio.onCanplay(() => {
        //     audio.play();
        // });
    };
})();

export default audioContext;