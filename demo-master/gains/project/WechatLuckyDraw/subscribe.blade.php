<!DOCTYPE html>
<html>

<head>
    <title>关注二维码</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="renderer" content="webkit">
    <meta name="description" content="关注二维码">
    <meta name="keyword" content="关注二维码">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <link href="/luckyDraw/css/module/raffle.css" rel="stylesheet">
    <style type="text/css">
    body {
        background: #ff5242;
    }

    .subscribe {
        width: 100vw;
        height: 100vh;
        background: #eee7d7;
        background: url("/luckyDraw/img/bg_top.png") no-repeat;
        background-size: contain;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .subscribe .container {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: flex-end;
    }

    .subscribe .content {
        flex: 1;
        padding: 18px 20px;
        width: 100%;
        background: none
    }

    .subscribe .content .box {
        width: 100%;
        padding: 0 15px;
    }

    .subscribe .content .detail {
        height: 300px;
        width: 100%;
        padding: 20px;
    }


    .subscribe .content .detail img {
        height: 100%;
        width: 100%;
    }

    .subscribe .content .text {
        padding: 20px;
        font-size: 14px;
        color: #fff;
        text-align: center;
    }
    </style>
</head>

<body>
    <div id="app" class="subscribe" v-cloak>
        <div class="container">
            <div class="content">
                <div class="box recodes">
                    <div class="nav">
                        <div class="nav-box">
                            <span>长按识别二维码，关注公众号</span>
                        </div>
                    </div>
                    <div class="detail">
                        <img :src="wxUrl">
                    </div>
                    <p class="text">@2018湖南双菱科技技术支持</p>
                </div>
            </div>
        </div>
        <div class="footer"></div>
    </div>
    </div>
    <script type="text/javascript" src="/luckyDraw/js/vue-2.5.13.js"></script>
    <script type="text/javascript" src="/luckyDraw/js/axios-0.17.1.js"></script>
    <script type="text/javascript">
    new Vue({
        el: '#app',
        mixins: [],
        data: function() {
            return {
                wxUrl: '',
            }
        },
        created: function() {
            this.wxUrl = <?php echo json_encode($qr_code );?>;
            console.log(this.wxUrl);

        },
        mounted: function() {},
        computed: {},
        watch: {},
        methods: {}
    })
    </script>
</body>

</html>