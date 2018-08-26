// pages/normalpages/review_homework/review_homework.js
// 评价作业和课堂表现页面

import Media from '../../../utils/Media'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageType: "",
        student_name: "你剑哥",
        // 评价内容
        evaluation: [
            {
                name: 'score',
                value: '分数*',
                show: true,
                showMediaTool: false,
                dataFileList: [],
                placeholder: "请输入",
            },
            {
                name: 'attention',
                value: '总体表现*',
                show: true,
                showMediaTool: false,
                dataFileList: [],
                imageFileAccount: 0,
                videoFileAccount: 0,
                placeholder: "",
                description: ""
            },
            {
                name: 'good',
                value: '',
                show: true,
                showMediaTool: false,
                dataFileList: [],
                imageFileAccount: 0,
                videoFileAccount: 0,
                placeholder: "",
                description: ""
            },
            {
                name: 'improvable',
                value: '',
                show: true,
                showMediaTool: false,
                dataFileList: [],
                imageFileAccount: 0,
                videoFileAccount: 0,
                placeholder: "",
                description: ""
            },
        ],

        currentEvaluationType: "",

        // 评价的多媒体按钮
        imageBtns: [
            {
                name: 'microphone',
                value: '语音',
                show: true,
                style: "image-btn",
                src: "../../image/microphone.png"
            },
            {
                name: 'video',
                value: '录像',
                show: true,
                style: "image-btn",
                src: "../../image/videocamera.png"
            },
            {
                name: 'camera',
                value: '照相',
                show: true,
                style: "image-btn",
                src: "../../image/photo_camera.png"
            },
            {
                name: 'picture',
                value: '选择图片',
                show: true,
                style: "image-btn",
                src: "../../image/photo.png"
            },
            {
                name: 'save',
                value: '保存',
                show: true,
                style: "image-btn",
                src: "../../image/done.png"
            },
        ],

        // 音频录制状态
        voiceStatus: {
            recording: false,
            playing: false,
            hasRecord: false,
            recordTime: 0,
            playTime: 0,
            formatedRecordTime: '00:00:00',
            formatedPlayTime: '00:00:00',
        },

        voiceRecordTimeInterval: '',
        voicePlayTimeInterval: ''

    },

    checkFileLimit: function (file_type) {
        let fileAccount = 0;
        let passedCheck = false;
        for (let item of this.data.evaluation) {
            if (item.name === this.data.currentEvaluationType) {
                fileAccount = file_type === "Image" ? item.imageFileAccount : item.videoFileAccount;
                break;
            }
        }
        if (fileAccount === 9) {
            let content = "数量超过九个";
            if (file_type === "Image") {
                content = '视频数量不能超过九个！';
            } else if (file_type === "Video") {
                content = '图片数量不能超过九个！';
            }
            wx.showModal({
                title: 'Sorry',
                content: content,
            });
            passedCheck = false;
        } else {
            passedCheck = true;
        }

        return passedCheck;
    },

    onClick: function (e) {
        console.log("Image button clicked and click button is:", e.currentTarget.id);
        let evaluation = this.data.evaluation;
        let voiceStatus = this.data.voiceStatus;

        switch (e.currentTarget.id) {
            case "microphone":
                if (!voiceStatus.recording) {
                    Media.startRecordVoice(this);
                } else {
                    Media.stopRecordVoice(this);
                }
                break;
            case "video":
                if (this.checkFileLimit("Video")) {
                    Media.addVideo(this);
                }
                break;
            case "camera":
                if (this.checkFileLimit("Image")) {
                    Media.addImage(this);
                }
                break;
            case "picture":
                if (this.checkFileLimit("Image")) {
                    Media.addImage(this);
                }
                break;
            case "save":
                for (let item of evaluation) {
                    item.show = true;
                    item.showMediaTool = false;
                }

                this.setData({
                    evaluation: evaluation
                });
                break;
            default:
                break;
        }
    },

    /**
     *
     * @param e
     */
    onEditClicked: function (e) {
        console.log("TextArea clicked and click area is:", e.currentTarget.id);
        let evaluation = this.data.evaluation;
        let currentEvaluationType = e.currentTarget.id;

        for (let item of evaluation) {
            item.show = item.name === currentEvaluationType;
            item.showMediaTool = item.name === currentEvaluationType;
        }

        this.setData({
            currentEvaluationType: currentEvaluationType,
            evaluation: evaluation
        });
    },

    onEditConfirm: function (e) {

    },

    /**
     * 点击文件响应
     * @param e
     */
    onPlayFile: function (e) {
        // 文件id
        let currentFileIdx = e.currentTarget.id;

        let evaluation = this.data.evaluation;

        let currentFileType = "";

        // 用于图片浏览
        let currentImageUrl = "";
        let imageUrls = [];

        // 获取当前点击项的类别
        for (let item of evaluation) {
            if (item.name === this.data.currentEvaluationType) {
                currentFileType = item.dataFileList[currentFileIdx].type;
                if (currentFileType === "Image") {
                    currentImageUrl = item.dataFileList[currentFileIdx].path;
                    for (let file of item.dataFileList) {
                        if (file.type === "Image") {
                            imageUrls.push(file.path);
                        }
                    }
                }
                break;
            }
        }

        console.log(currentImageUrl,imageUrls);

        console.log("playFile:", e.currentTarget.id, "and it's type is:", currentFileType);

        switch (currentFileType) {
            case "Audio":
                // let voiceStatus = this.data.voiceStatus;
                if (!this.data.voiceStatus.playing) {
                    Media.playVoice(this, parseInt(e.currentTarget.id));
                } else {
                    Media.stopPlayVoice(this);
                }
                break;
            case "Image":
                wx.previewImage({
                    current: currentImageUrl, // 当前显示图片的http链接
                    urls: imageUrls // 需要预览的图片http链接列表
                });
                break;
            case "Video":
                break;
            default:
                console.log("File ", e.currentTarget.id, "can not be played!");
                break;
        }
    },

    /**
     * 删除文件响应
     * @param e
     */
    onDeleteFile: function (e) {
        // console.log(e.currentTarget.id);
        // 文件id
        let currentFileIdx = e.currentTarget.id;
        let evaluation = this.data.evaluation;
        for (let item of evaluation) {
            if (item.name === this.data.currentEvaluationType) {
                item.dataFileList.splice(currentFileIdx, 1);
                console.log(item.name, "file number", currentFileIdx, "was deleted!");
                console.log("after deleted, file list:", item.dataFileList);
                break;
            }
        }

        this.setData({
            evaluation: evaluation
        });
    },


    /**
     * 提交表单
     * 需要在这里做验证
     */
    onFormSubmit: function (e) {
        // TODO 表单校验
        // 根据入口不同，选择切换不同的Tab
        console.log('form发生了submit事件，携带数据为：', e.detail.value);


        // 准备跳转页面及保存数据
        let tabUrl = '';

        if (this.data.options.model === "homework") {
            // 由新建页面进入，创建用户信息，页面设置完成，跳转到首页
            tabUrl = '../../tabpages/student/student';

        } else {
            // 由更新页面进入，页面设置完成，跳转到设置
            // 应对用户删除本地存储，在获取了用户id之后，更新用户信息，这步必须的。
            tabUrl = '../../tabpages/setting/setting';
        }

        // 后台创建或更新，并同步保存到本地
        // app.DateTimeUtils.syncData(null, "user", data, userInfo);

        wx.switchTab({
            url: tabUrl,
        });
    },

    /**
     * 重置表单
     * 恢复到未修改之前
     */
    onFormReset: function () {
        this.setData({
            userInfo: wx.getStorageSync("WeChatUser"),
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let pageType = "";
        let evaluation = this.data.evaluation;

        if (options.model === "homework") {
            pageType = "作业";
            evaluation[1].placeholder = "给" + this.data.student_name + "的作业一个总体评价吧。";
            evaluation[2].value = "本次作业的亮点";
            evaluation[2].placeholder = "今天" + this.data.student_name + "的作业，做的很好地方有...";
            evaluation[3].value = "本次作业待提高的部分";
            evaluation[3].placeholder = "今天" + this.data.student_name + "的作业，还有可以提高的地方，比如...";
        } else {
            pageType = "课堂表现";

            evaluation[1].placeholder = "给" + this.data.student_name + "的课堂表现一个总体评价吧。";
            evaluation[2].placeholder = "今天" + this.data.student_name + "在课上表现很好的地方有...";
            evaluation[2].value = "本节课的亮点";
            evaluation[3].value = "本节课待提高的部分";
            evaluation[3].placeholder = "今天" + this.data.student_name + "在课上表现还有可以提高的地方，比如...";
        }

        wx.setNavigationBarTitle({
            title: '评价' + pageType,
        });

        this.setData({
            options: options,
            pageType: pageType,
            evaluation: evaluation
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        Media.exitMedia(this);
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})