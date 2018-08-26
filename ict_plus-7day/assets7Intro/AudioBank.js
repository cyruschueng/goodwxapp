/**
 * 音频仓库
 * Created by lip on 2016/6/7.
 */
var Util = require('./Util');

//每个工程的文件夹名不同
var assetDir = 'assets' + Util.getMinicId()+'/';
var Audios = [
    assetDir + 'audio/1.mp3',
    assetDir + 'audio/2.mp3',
    assetDir + 'audio/3.mp3',
    assetDir + 'audio/4.mp3',
    assetDir + 'audio/5.mp3',
    assetDir + 'audio/6.mp3'
];
var message = [];

class AudioBank{

    //获取某个 音频
    static getAudio( index ){
        return Audios[index];
    }

    static getAllAudios() {
        return Audios;
    }

    /**
     * 添加语音消息
     * @param message
     */
    static addMessage(target) {
        message.push(target);
    }

    /**
     * 暂停其他语音消息
     * @param target
     */
    static pauseOthers(target) {
        for( let i = 0, l = message.length; i < l; i++ ) {
            if( message[i] != target && message[i].isPlaying() ) {
                message[i].pause();
            }
        }
    }

    /**
     * 暂停所有
     */
    static pauseAll() {
        for( let i = 0, l = message.length; i < l; i++ ) {
            if(message[i].isPlaying()) {
                message[i].pause();
            }
        }
    }

}
window.AudioBank = AudioBank;

module.exports = AudioBank;
