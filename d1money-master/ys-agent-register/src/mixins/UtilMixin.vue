<!--工具类-->
<script>
    import {
        dateFormat
    } from 'vux'

    export default {
        data() {
            return {}
        },
        mounted() {},
        methods: {
            // 获取时间（今天，昨天，日期[数组格式]）
            /**
             * dealYear : 不需要年
             * hasTime: 精确到时分秒
             * */
            // 获取时间（今天，昨天，日期）
            time(val, dealYear = 0, hasTime = 0) {
                let time = val
                let nowDate = dateFormat(new Date(), 'YYYY-MM-DD')
                let nowDateArr = nowDate.split('-')
                let DateArr = val.split('-')
                if (parseInt(nowDateArr[0]) === parseInt(DateArr[0])) {
                    // 如果年份相同
                    if (parseInt(nowDateArr[1]) === parseInt(DateArr[1])) {
                        // 如果月份相同
                        if (parseInt(nowDateArr[2]) === parseInt(DateArr[2])) {
                            // 如果日期相同
                            time = '今天'
                            if (hasTime) {
                                time += DateArr[2].split(' ')[1]
                                return time
                            }
                        } else if ((parseInt(nowDateArr[2]) - 1) === parseInt(DateArr[2])) {
                            // 如果日期相差1天
                            time = '昨天'
                            if (hasTime) {
                                time += DateArr[2].split(' ')[1]
                                return time
                            }
                        }
                    }
                    if (dealYear) {
                        return time.substring(5)
                    }
                }
                return time
            },
            formatDateAgo(date) {
                let nowDate = dateFormat(new Date(), 'YYYY-MM-DD')
                let nowDateArr = nowDate.split('-')
                let DateArr = date.split('-')
                let year = DateArr[0]
                let month = DateArr[1]
                let day = DateArr[2]
                if (parseInt(nowDateArr[0]) === parseInt(DateArr[0])) {
                    // 如果年份相同
                    if (parseInt(nowDateArr[1]) === parseInt(DateArr[1])) {
                        // 如果月份相同
                        if (parseInt(nowDateArr[2]) === parseInt(DateArr[2])) {
                            // 如果日期相同
                            return ['今天', null, null]
                        } else if ((parseInt(nowDateArr[2]) - 1) === parseInt(DateArr[2])) {
                            // 如果日期相差1天
                            return ['昨天', null, null]
                        }
                        // return [day, null, null]
                    }
                    return [day, month, null]
                }
                return [day, month, year]
            },
            timeAgoHasHourAndMinute(val) {
                let oldDate = typeof val === 'string' ? new Date(val.replace(/-/g, '/')) : new Date(val)
                let newDate = new Date()
                // 时间对象
                let time = {
                    year: oldDate.getFullYear(),
                    month: ( '0' + (oldDate.getMonth() + 1)).slice(-2),
                    day: ( '0' + oldDate.getDate()).slice(-2),
                    hour: ( '0' + oldDate.getHours()).slice(-2),
                    minute: ( '0' + oldDate.getMinutes()).slice(-2),
                    second: ( '0' + oldDate.getSeconds()).slice(-2)
                }
                let nowTime = {
                    year: newDate.getFullYear(),
                    month: ( '0' + (newDate.getMonth() + 1)).slice(-2),
                    day: ( '0' + newDate.getDate()).slice(-2),
                    hour: ( '0' + newDate.getHours()).slice(-2),
                    minute: ( '0' + newDate.getMinutes()).slice(-2),
                    second: ( '0' + newDate.getSeconds()).slice(-2)
                }
                if (nowTime.year === time.year) {
                    if (nowTime.month === time.month) {
                        if (nowTime.day === time.day) {
                            if (nowTime.hour === time.hour) {
                                // 如果小时相同
                                if (nowTime.minute === time.minute) {
                                    // 如果在分钟相同
                                    return '刚刚'
                                }
                                return parseInt(nowTime.minute) - parseInt(time.minute) + '分钟前'
                            } else if (parseInt(nowTime.hour) - 1 === parseInt(time.hour)) {
                                // 如果小时 相差 1 (1-60分钟前 / 1小时前)
                                return (parseInt(nowTime.minute) - parseInt(time.minute)) < 0 ? parseInt(nowTime.minute) + 60 - parseInt(time.minute) + '分钟前' : '1小时前'
                            }
                            return parseInt(nowTime.hour) - parseInt(time.hour) + '小时前'
                        } else if (parseInt(nowTime.day) - 1 === parseInt(time.day)) {
                            return '昨天 ' + time.hour + ':' + time.minute
                        }
                    }
                    return time.month + '月' + time.day + '日 ' + time.hour + ':' + time.minute
                }
//                return time.year + '年' + time.month + '月' + time.day + '日 ' + time.hour + ':' + time.minute
                return time.year + '年' + time.month + '月' + time.day + '日 '
            },
            // 路由跳转
            routerLink(url, params, query = {}) {
                this.$router.push({name: url, params, query})
            },
            //  去空
            trim(str) {
                return str.replace(/^\s+|\s+$/g, '')
            }
        }
    }
</script>
