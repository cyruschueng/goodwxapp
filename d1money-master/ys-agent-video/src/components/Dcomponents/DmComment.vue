<!--评论组件-->
<style scoped rel="stylesheet/less" lang="less">
    .dmComment {
        /*赞 评论   ---   时间*/
        .dmComment__hd {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            font-size: 12px;
            color: #969696;
            height: 28px;
            /*时间展示*/
            .time {
                height: 28px;
                line-height: 28px;
            }
            /*点赞 评论工具*/
            .util {
                color: #56678e;
                list-style: none;
                li {
                    float: left;
                    margin-right: 15px;
                    height: 28px;
                    line-height: 28px;
                    font-size: 12px;
                    &:last-child {
                        margin-right: 0;
                    }
                    i.iconfont {
                        font-size: 12px;
                        vertical-align: middle;
                    }
                    span {
                        font-size: 12px;
                    }
                }
            }
        }
        /*点赞 评论*/
        .dmComment__bd {
            margin-top: 5px;
            position: relative;
            background-color: #f1f1f1;
            padding: 4px 0 0;
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            border-radius: 2px;
            &:before {
                content: '';
                position: absolute;
                top: -8px;
                left: 8px;
                overflow: hidden;
                border-left: 15px solid transparent;
                border-right: 15px solid transparent;
                border-bottom: 15px solid #f1f1f1;
            }
            /*点赞*/
            .thumbUp {
                color: #56678e;
                font-size: 12px;
                position: relative;
                padding: 2px 15px;
                &.bt {
                    &:before {
                        content: '';
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        height: 1px;
                        border-bottom: 1px solid #e5e5e5;
                    }
                }
                i.iconfont {
                    margin-right: 3px;
                    font-size: 12px;
                }
            }
            /*评论*/
            .comments {
                font-size: 12px;
                .user {
                    color: #56678e;
                    margin-right: .5em
                }
                .comment-item {
                    padding: 1px 15px;
                    &:active {
                        background-color: #dddddd;
                    }
                }

            }
        }
    }
</style>
<template>
    <div class="dmComment">
        <div class="dmComment__hd">
            <div class="time">{{dateTime}}</div>
            <ul class="util">
                <template v-if="hasThumbsUp">
                    <li @click.stop="thumbUp(index)">
                        <template v-if="isThumbsUp">
                            <i class="iconfont icon-appreciate_fill_light"></i>
                            <span>已赞 <template
                                v-if="thumbList && thumbList.length!=0">({{thumbList.length}})</template></span>
                        </template>
                        <template v-else>
                            <i class="iconfont icon-appreciate"></i>
                            <span>赞 <template
                                v-if="thumbList && thumbList.length!=0">({{thumbList.length}})</template></span>
                        </template>
                    </li>
                </template>
                <template v-if="hasComment">
                    <li @click.stop="comment(index)">
                        <i class="iconfont icon-comment"></i>
                        <span>回复</span>
                    </li>
                </template>
            </ul>
        </div>
        <div class="dmComment__bd" v-if="(thumbList&&thumbList.length!=0) || (commentList && commentList.length!=0)">
            <template v-if="isThumbsUp">
                <div v-if="thumbList && thumbList.length!=0"
                     :class="['thumbUp', {'bt' : thumbList && thumbList.length!=0 && commentList && commentList.length!=0} ]">
                    <i class="iconfont icon-dianzan"></i>
                    <template v-for="(item, index) in thumbList">
                        <template v-if="index!==0"> , </template>
                        {{item.name}}
                    </template>
                </div>
            </template>
            <template v-if="hasComment">
                <div v-if="commentList && commentList.length!=0" :class="['comments']">
                    <!--评论-->
                    <template v-for="(comment, commentIndex) in commentList">
                        <div class="comment-item comment"><!--@click.stop="reply(index, commentIndex)"-->
                            <span class="user">{{comment.nickname}}:</span> {{comment.content}}
                        </div>
                        <!--回复-->
                        <template v-for="(reply, index) in comment.commentReplylist">
                            <div class="comment-item reply">
                                <span class="user">{{reply.name}}</span>回复<span class="user"
                                                                                style="margin-right:0;margin-left:.5em">{{comment.name}}</span>
                                {{reply.replyComment}}
                            </div>
                        </template>
                    </template>
                </div>
            </template>
        </div>
    </div>
</template>
<script>

    export default {
        props: {
            id: {
                type: Number
            },
            thumbList: {
                type: String
            },
            commentList: {
                type: Array
            },
            isThumbsUp: {
                type: Number,
                default: 0
            },
            dateTime: {
                type: String
            },
            index: {
                type: Number
            },
            hasComment: {
                type: Boolean,
                default: true
            },
            hasThumbsUp: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {}
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
            // 点赞
            thumbUp(index) {
                this.$emit('thumbUp', index)
            },
            // 评论
            comment(index) {
                this.$emit('comment', index)
            },
            // 回复
            reply(index, commentIndex) {
                this.$emit('reply', index, commentIndex)
            }
        }
    }
</script>
