<style scoped lang="less" rel="stylesheet/less">
    .dmheader {
        /*头部logo*/
        display: flex;
        padding: 0 20px;
        .dmheader-logo {
            position: relative;
            font-size: 16px;
            &:before {
                content: '燕梳云平台';
                position: absolute;
                width: auto;
                height: auto;
                right: -100%;
                top: 0;
                font-size: 12px;
            }
        }
        /*头部导航*/
        .dmheader-nav {
            flex: 1;
            padding: 0 200px;
        }
        /*头部用户信息*/
        .dmheader-right {
            box-sizing: border-box;
            .gotoHome {
                margin-right: 60px;
            }
            .userInfo {
                display: inline-block;
                height: 60px;
                box-sizing: border-box;
                vertical-align: middle;
                .name {
                    height: 100%;
                    float: right;
                    line-height: 60px;
                    margin-left: 10px;
                }
            }
        }
    }
</style>
<template>
    <Menu class="dmheader" mode="horizontal" theme="light" active-name="1">
        <div class="dmheader-logo">
            {{corpInfoCorpName}}
        </div>
        <div class="dmheader-nav">
            <MenuItem name="1">
                <Icon type="clipboard"></Icon>
                活动量管理
            </MenuItem>
        </div>
        <div class="dmheader-right">
            <a href="http://ys.d1money.com" target="view_window" class="gotoHome">进入官网</a>
            <div class="userInfo">

                <Dropdown>
                    <a href="javascript:void(0)">
                        <Avatar :src="userInfoAvatar"/>
                        <span class="name">{{userInfoName}}</span>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem @click.native="loginOut">登出</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    </Menu>
</template>
<script>
    export default {
        data() {
            return {
                // 登录用户姓名
                userInfoName: '',
                // 登录用户头像
                userInfoAvatar: '',
                // 企业名称
                corpInfoCorpName: '',
                // 企业方形头像
                corpInfoCorpSquareLogoUrl: ''
            }
        },
        methods: {
            ajaxLoadGetLoginInfo() {
                this.$http.post('loadGetLoginInfo')
                    .then(res => {
                        this.userInfoName = res.userInfoName
                        this.corpInfoCorpName = res.corpInfoCorpName
                        this.userInfoAvatar = res.userInfoAvatar
                        this.corpInfoCorpSquareLogoUrl = res.corpInfoCorpSquareLogoUrl
                    })
            },
            loginOut() {
                this.$http.post('layout')
                    .then(res => {
                        this.$router.go(0)
                    })
            }
        },
        mounted() {
            this.ajaxLoadGetLoginInfo()
        }
    }
</script>
