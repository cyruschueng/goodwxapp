<!DOCTYPE html>
<html>

<head>
    <title>红包发放</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="renderer" content="webkit">
    <meta name="description" content="红包发放">
    <meta name="keyword" content="红包发放">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <link href="/luckyDraw/css/module/raffle.css" rel="stylesheet">
    <style type="text/css">
    body {
        background: #fff;
    }

    .red-pack {
        display: flex;
        flex-direction: column;

        width: 100vw;
        height: 100vh;
    }

    .red-pack .container {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding: 40px 50px;
    }

    .red-pack .container .icon {

        width: 70px;
        height: 70px;
    }

    .red-pack .container .title {
        color: #333;
        font-size: 16px;
        font-weight: 700;
        padding: 10px 0;
    }

    .red-pack .container .des {
        color: #b3b3b3;
        font-size: 16px;
    }

    .red-pack .container .detail-logo {
        padding-top: 20px
    }

    .red-pack .text {
        height: 50px;
        line-height: 50px;
        color: #bbb;
        text-align: center;
    }
    </style>
</head>

<body>
    <div id="app" class="red-pack" v-cloak>
        <div class="container" v-if='isok'>
            <p class="icon">
                <img src="/luckyDraw/img/ic_hongbao.png">
            </p>
            <p class="title">
                请求已经确认，等待推送红包。
            </p>
            <p class="des">
                请回到微信主窗口，系统稍后会推送红包通知，收到后请点击拆开红包，拆开后红包金额直接转入零钱。
            </p>
            <div class="detail-logo">
                <img src="/luckyDraw/img/bg_zhanshitu.png">
            </div>
        </div>
        <div class="container" v-if='isno'>
            <p class="icon">
                <img src="/luckyDraw/img/ic_fasongshibai.png">
            </p>
            <p class="title">
                红包发送失败。
            </p>
            <p class="des">
                请联系主办方。
            </p>
        </div>
        <p class="text">@2018湖南双菱科技技术支持</p>
    </div>
    <script type="text/javascript" src="/luckyDraw/js/vue-2.5.13.js"></script>
    <script type="text/javascript" src="/luckyDraw/js/axios-0.17.1.js"></script>
    <script type="text/javascript">
    new Vue({
        el: '#app',
        mixins: [],
        data: function() {
            return {
                isok: false,
                isno: false,
                send: '',
            }
        },
        created: function() {
            this.send = <?php echo json_encode($send );?>;
            if (this.send == 0) {
                this.isno = true;
                this.isok = false;
            } else if (this.send == 1) {
                this.isno = false;
                this.isok = true;
            }
        },
        mounted: function() {},
        computed: {},
        watch: {},
        methods: {
            /*getParam: function(name) {
                var search = document.location.search;
                var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
                var matcher = pattern.exec(search);
                var items = null;
                if (null != matcher) {
                    try {
                        items = decodeURIComponent(decodeURIComponent(matcher[1]));
                    } catch (e) {
                        try {
                            items = decodeURIComponent(matcher[1]);
                        } catch (e) {
                            items = matcher[1];
                        }
                    }
                }
                return items;
            }*/
        }
    })
    </script>
</body>

</html>