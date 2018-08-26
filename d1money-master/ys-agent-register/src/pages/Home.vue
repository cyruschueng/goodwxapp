<template>
    <view-box class="home" ref="viewBox">
        <router-link class="exportData" :to="{ name: 'ExportData' }" tag="div">
            <i class="iconfont icon-download-2"></i>
        </router-link>

        <div class="home_word">
            <img src="../assets/home/home_word.png"/>
        </div>
        <div class="home_record">
            <router-link class="home_record_icon" :to="{ name: 'AddVisitRecord' }" slot="label" tag="div">
                <i class="iconfont icon-msnui-mic"></i>
            </router-link>
            <p class="home_record_text">记录实地面访</p>
        </div>
        <template slot="bottom">
            <tabbar class="home_tabbar">
                <tabbar-item :link="{ name: 'MyVisitingRecord'}">
                    <i class="iconfont icon-addressbook" slot="icon"></i>
                    <span slot="label">我的记录</span>
                </tabbar-item>
                <tabbar-item v-if="isLeader" :link="{ name: 'SubmitMe'}" :badge="submitMeNumber">
                    <i class="iconfont icon-dengpao" slot="icon"></i>
                    <span slot="label">团队拜访动态</span>
                </tabbar-item>
                <tabbar-item v-if="isLeader" :link="{ name: 'teamVisitingRecord'}">
                    <i class="iconfont icon-task" slot="icon"></i>
                    <span slot="label">团队拜访记录</span>
                </tabbar-item>
            </tabbar>
        </template>
    </view-box>
</template>

<script>
    import {ViewBox, Tabbar, TabbarItem} from 'vux'
    import {mapState, mapActions} from 'vuex'

    export default {
        data() {
            return {
                result: null,
                submitMeNumber: 0,
                unRead: 0
            }
        },
        components: {
            ViewBox,
            Tabbar,
            TabbarItem
        },
        computed: {
            ...mapState({
                isLeader: state => state.vux.userInfo
            })
        },
        methods: {
            // 获取当前用户未读拜访记录条数接口
            loadUnreadVisitRecordCount() {
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: 'loadUnreadVisitRecordCount',
                        tips: true
                    })
                        .then(result => {
                            resolve(result)
                        })
                })
            },
            ...mapActions([
                'updateUserInfo'
            ])
        },
        async mounted() {
//            console.log(this.isLeader)
            if (this.isLeader) {
                let submitMeNumber = await this.loadUnreadVisitRecordCount()
                this.submitMeNumber = submitMeNumber.unRead
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @bgColor: #68baf9;
    .home {
        background-image: url("./../assets/home/home_bg.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        .exportData {
            position: absolute;
            width: 35px;
            height: 35px;
            right: 10px;
            top: 10px;
            -webkit-border-radius: 100%;
            -moz-border-radius: 100%;
            border-radius: 100%;
            border: 1px solid @bgColor;
            border: none;
            overflow: hidden;
            text-align: center;
            background-color: #ffffff;
            box-shadow: 0 0px 5px 0px #ddd;
            i.iconfont {
                line-height: 35px;
                color: @bgColor;
                font-size: 20px;
            }
            &:active {
                background-color: @bgColor;
                i.iconfont {
                    color: #ffffff;
                }
            }
        }
        /*标题图片*/
        .home_word {
            position: absolute;
            top: 25%;
            width: 100%;
            text-align: center;
            img {
                width: 86%;
                max-width: 545px;
            }
        }
        /*录音*/
        .home_record {
            position: absolute;
            bottom: 25%;
            left: 50%;
            transform: translateX(-50%);
            .home_record_icon {
                width: 100px;
                height: 100px;
                background-color: @bgColor;
                border-radius: 100%;
                text-align: center;
                line-height: 100px;
                box-shadow: 0 0px 15px 0px #ccc;
                i.iconfont {
                    color: #ffffff;
                    font-size: 70px;
                }
            }
            p.home_record_text {
                margin-top: 15px;
                color: #969696;
            }
        }
        /*我的记录*/
        .home_tabbar {
            padding-bottom: 5px;
            background-color: #ffffff;
            .weui-tabbar__item {
                position: relative;
                .weui-tabbar__icon {
                    position: relative;
                    margin-top: -6px;
                    i.iconfont {
                        font-size: 27px;
                        color: #797D82;
                    }
                    .vux-badge {
                        position: absolute;
                        top: 12px;
                    }
                }
                .weui-tabbar__label {
                    color: #666666;
                    /*margin-top:-4px;*/
                    font-size: 12px;
                }
            }
        }

    }

</style>
