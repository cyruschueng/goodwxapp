/**
 * 媒体功能函数集合
 */

import Util from "../utils/Util"
import DataStructure from '../datamodel/DataStructure'

/**
 * 开始录音
 * @param host
 */
function startRecordVoice(host) {
    console.log("starting voice recording!");
    let voiceStatus = host.data.voiceStatus;
    let evaluation = host.data.evaluation;
    voiceStatus.recording = true;

    host.setData({
        voiceStatus: voiceStatus
    });

    let initRecordTime = 0;
    host.voiceRecordTimeInterval = setInterval(function () {
        voiceStatus.recordTime = (initRecordTime += 1);
        voiceStatus.formatedRecordTime = Util.formatTime(voiceStatus.recordTime);
        host.setData({
            voiceStatus: voiceStatus
        });
    }, 1000);

    wx.showToast({
        title: '点录音图标结束',
        image: '../../image/microphone.png',
        duration: 60000
    });

    wx.startRecord({
        success: function (res) {

            voiceStatus.hasRecord = true;
            voiceStatus.formatedPlayTime = Util.formatTime(voiceStatus.playTime);
            // console.log("res:", res);
            // console.log("host.evaluation:", host.data.evaluation);

            for (let item of evaluation) {
                if (item.name === host.data.currentEvaluationType) {
                    let fileInfo = new DataStructure.FileInfo();
                    fileInfo.path = res.tempFilePath;
                    fileInfo.time = Util.formatTimeToString(new Date);
                    fileInfo.type = "Audio";
                    item.dataFileList.push(fileInfo);
                    break;
                }
            }

            host.setData({
                evaluation: evaluation,
            });
        },
        // 录完收集信息，善后
        complete: function () {
            console.log("complete recording voice!");
            wx.hideToast();
            voiceStatus.recording = false;
            for (let item of evaluation) {
                if (item.name === host.data.currentEvaluationType) {
                    item.dataFileList[item.dataFileList.length - 1].timeLength = voiceStatus.recordTime;
                    item.dataFileList[item.dataFileList.length - 1].name = voiceStatus.recordTime + "s";
                    let width = parseInt(10 * voiceStatus.recordTime);
                    item.dataFileList[item.dataFileList.length - 1].style = "height: 40rpx; width: " + +width + "rpx";
                    console.log(item.name + ".dataFileList", item.dataFileList);
                    console.log(item.dataFileList[item.dataFileList.length - 1].style);
                    break;
                }
            }
            host.setData({
                evaluation: evaluation,
                voiceStatus: voiceStatus
            });

            clearInterval(host.voiceRecordTimeInterval);
        }
    });
}

/**
 * 停止录音
 */
function stopRecordVoice() {
    wx.stopRecord();
}

/**
 * 非正常停止录音
 * @param host
 */
function stopRecordUnexpectedly(host) {
    let voiceStatus = host.data.voiceStatus;

    wx.stopRecord({
        success: function () {
            console.log('stop record success');
            clearInterval(host.voiceRecordTimeInterval);
            voiceStatus.recording = false;
            voiceStatus.hasRecord = false;
            voiceStatus.recordTime = 0;
            voiceStatus.formatedRecordTime = Util.formatTime(0);
            host.setData({
                voiceStatus: voiceStatus
            })
        }
    })
}

/**
 * 播放音频
 */
function playVoice(host, voiceIndex) {
    console.log("starting voice playing!");
    let voiceStatus = host.data.voiceStatus;

    // 获取要播放的文件
    let tempFilePath = "";
    let totalTime = -1;
    for (let item of host.data.evaluation) {
        if (item.name === host.data.currentEvaluationType) {
            tempFilePath = item.dataFileList[voiceIndex].path;
            totalTime = item.dataFileList[voiceIndex].timeLength;
            console.log(item.name, voiceIndex, tempFilePath);
            break;
        }
    }

    host.voicePlayTimeInterval = setInterval(function () {
        voiceStatus.playTime = host.data.voiceStatus.playTime + 1;
        voiceStatus.playing = true;
        voiceStatus.formatedPlayTime = Util.formatTime(voiceStatus.playTime);
        if (voiceStatus.playTime === totalTime) {
            wx.hideToast();
        }
        host.setData({
            voiceStatus: voiceStatus
        });
    }, 1000);


    // 播放文件
    wx.showToast({
        title: '点录音文件结束',
        image: '../../image/microphone.png',
        duration: 60000
    });

    wx.playVoice({
        filePath: tempFilePath,
        success: function () {
            clearInterval(host.voicePlayTimeInterval);
            let playTime = 0;
            voiceStatus.playing = false;
            voiceStatus.formatedPlayTime = Util.formatTime(playTime);
            voiceStatus.playTime = playTime;
            host.setData({
                voiceStatus: voiceStatus
            });
        },
        complete: function () {
            wx.hideToast();
            console.log("complete playing voice!");
        }
    })
}

/**
 * 暂停播放音频
 */
function pausePlayVoice(host) {
    // let voice
    clearInterval(host.voicePlayTimeInterval);
    wx.pauseVoice();
    host.setData({
        playing: false
    });
}

/**
 * 停止播放音频
 * @param host
 */
function stopPlayVoice(host) {
    let voiceStatus = host.data.voiceStatus;
    clearInterval(host.voicePlayTimeInterval);
    voiceStatus.playing = false;
    voiceStatus.formatedPlayTime = Util.formatTime(0);
    voiceStatus.playTime = 0;

    host.setData({
        voiceStatus: voiceStatus
    });

    wx.stopVoice();
    wx.hideToast();
}

/**
 * 删除音频
 */
function deleteVoice(host, voiceIndex) {
    clearInterval(host.voicePlayTimeInterval);
    wx.stopVoice();
    host.setData({
        playing: false,
        hasRecord: false,
        tempFilePath: '',
        formatedRecordTime: Util.formatTime(0),
        recordTime: 0,
        playTime: 0
    });
}

/**
 * 添加图片
 * @param host
 */
function addImage(host) {
    let evaluation = host.data.evaluation;
    wx.chooseImage({
        success: function (res) {
            console.log(res);
            for (let item of evaluation) {
                if (item.name === host.data.currentEvaluationType) {
                    for (let picturePath of res.tempFilePaths) {
                        let fileInfo = new DataStructure.FileInfo();
                        fileInfo.path = picturePath;
                        fileInfo.time = Util.formatTimeToString(new Date);
                        fileInfo.type = "Image";
                        item.dataFileList.push(fileInfo);
                    }
                    item.imageFileAccount = item.dataFileList.length;
                    break;
                }
            }
            console.log("evaluation:", evaluation);
            host.setData({
                evaluation: evaluation,
            });
        },
    });
}

/**
 * 添加已有的视频
 * @param host
 */
function addVideo(host) {
    let evaluation = host.data.evaluation;
    wx.chooseVideo({
        // sourceType: ['album', 'camera'],
        // maxDuration: 60,
        // camera: 'back',
        success: function (res) {
            console.log(res);
            for (let item of evaluation) {
                if (item.name === host.data.currentEvaluationType) {
                    let fileInfo = new DataStructure.FileInfo();
                    fileInfo.path = res.tempFilePath;
                    fileInfo.time = Util.formatTimeToString(new Date);
                    fileInfo.type = "Video";
                    item.dataFileList.push(fileInfo);
                    item.videoFileAccount = item.dataFileList.length;
                    break;
                }
            }
            console.log("evaluation:", evaluation);
            host.setData({
                evaluation: evaluation,
            });
        },
    });
}

/**
 * 退出媒体控制
 * @param host
 */
function exitMedia(host) {
    // 处理音频
    if (host.data.voiceStatus.playing) {
        stopPlayVoice(host);
    } else if (host.data.voiceStatus.recording) {
        stopRecordUnexpectedly(host);
    }

    // 处理视频

}

module.exports = {
    startRecordVoice: startRecordVoice,
    stopRecordVoice: stopRecordVoice,
    stopRecordUnexpectedly: stopRecordUnexpectedly,
    playVoice: playVoice,
    pausePlayVoice: pausePlayVoice,
    stopPlayVoice: stopPlayVoice,
    deleteVoice: deleteVoice,
    addImage: addImage,
    addVideo: addVideo,
    exitMedia: exitMedia

};