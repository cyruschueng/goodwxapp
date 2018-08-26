<script>
    export default {
        data() {
            return {
                isLeader: false,
                commentModal: {
                    show: false,
                    text: '',
                    title: '评论'
                },
                commentObj: {
                    type: 0,    // 0: 评论  1: 回复
                    index: -1,
                    commentIndex: -1
                }
            }
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
            // 点赞
            thumbUpMethod(index) {
                let _obj = this.list[index]
                if (_obj.thumbUpCount) {
                    this.$axios.post({
                        url: '/agent/article/services/cancelThumbsUpByVisitId',
                        data: {
                            // 模板消息
                            userid: _obj.userid,
                            visitId: _obj.id,
                            customerName: _obj.userName,
                            customerId: _obj.customerId
                        },
                        tips: false
                    }).then(res => {
                        _obj.thumbUpCount = 0
                        for (let i = 0; i < _obj.thumbsUplist.length; i++) {
                            if (_obj.thumbsUplist[i].name === res) {
                                _obj.thumbsUplist.splice(i, 1)
                            }
                        }
                        this.list.splice(index, 1, _obj)
                    }).catch((code, msg) => {
                        console.err(`CODE:${code},msg:${msg}`)
                        this.$vux.toast.show({
                            type: 'text',
                            text: '点赞失败'
                        })
                    })
                } else {
                    this.$axios.post({
                        url: 'submitThumbsUpByVisitId',
                        data: {
                            userid: _obj.userid,
                            visitId: _obj.id,
                            customerName: _obj.userName,
                            customerId: _obj.customerId
                        },
                        tips: false
                    }).then(res => {
                        _obj.thumbUpCount = 1
                        if (_obj.thumbsUplist == null) {
                            _obj.thumbsUplist = [{name: res}]
                        } else {
                            _obj.thumbsUplist.push({name: res})
                        }
                        this.list.splice(index, 1, _obj)
                    }).catch((code, msg) => {
                        console.error(`CODE:${code},msg:${msg}`)
                        this.$vux.toast.show({
                            type: 'text',
                            text: '点赞失败'
                        })
                    })
                }
            },
            // 评论
            commentMethod(index) {
                console.log(index)
                this.commentModal.title = '回复'
                this.commentModal.show = true
                this.commentObj.type = 0
                this.commentObj.index = index
            },
            // 回复
            replyMethod(index, commentIndex) {
//                console.log(index)
//                console.log(commentIndex)
                this.commentModal.title = '回复' + this.list[index].commentlist[commentIndex].name + '的评论'
                this.commentModal.show = true
                this.commentObj.type = 1
                this.commentObj.index = index
                this.commentObj.commentIndex = commentIndex
            },
            // 打开评论
            commentModal_onShow() {

            },
            commentModal_onConfirm() {
//                console.log('同意')
                if (this.trim(this.commentModal.text) === '') {
                    this.$vux.toast.show({
                        type: 'text',
                        text: '请填写评论内容'
                    })
                    this.commentModal.show = true
                    return
                }
                if (this.commentObj.type === 0) {
                    // 评论
                    this.ajaxComment(this.commentObj.index)
                } else if (this.commentObj.type === 1) {
                    // 回复
                    this.ajaxReply(this.commentObj.index, this.commentObj.commentIndex)
                }
            },
            commentModal_onCancel() {
//                console.log('取消')
                this.commentModal.text = ''
            },
            commentModal_onHide() {
            },
            // 提交评论
            ajaxComment(index) {
                this.$axios.post({
                    url: '/cust/article/services/submitArticleCommentReply',
                    data: {
                        commentid: this.list[index].commentid,
                        content: this.commentModal.text
                    }
                }).then(res => {
                    this.list[index].articlecommentReplyList ? this.list[index].articlecommentReplyList.push({
                        content: this.commentModal.text,
                        nickname: res.nickname,
                        id: res.id
                    }) : this.$set(this.list[index], 'articlecommentReplyList', [{
                        content: this.commentModal.text,
                        nickname: res.nickname,
                        id: res.id
                    }])
                    this.commentModal.show = false
                    this.commentModal.text = ''
                })
            },
            // 提交回复
            ajaxReply(index, commentIndex) {
                this.$axios.post({
                    url: '/agent/article/services/submitReplyByCommentId',
                    data: {
                        visitId: this.list[index].id,
                        customerName: this.list[index].userName,
                        customerId: this.list[index].customerId,
                        replyComment: this.commentModal.text,
                        userid: this.list[index].commentlist[commentIndex].userid,
                        commentId: this.list[index].commentlist[commentIndex].id
                    }
                }).then(res => {
//                    console.log(!!this.list[index].commentlist[commentIndex].commentReplylist)
                    this.list[index].commentlist[commentIndex].commentReplylist.push({
                        name: res,
                        replyComment: this.commentModal.text
                    })
//                    console.log(this.list[index])
                    this.commentModal.show = false
                    this.commentModal.text = ''
                })
            }
        }
    }
</script>
