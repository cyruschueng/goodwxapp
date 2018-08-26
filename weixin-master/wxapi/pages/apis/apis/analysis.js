/**
 * API -- 数据分析接口
 * 
 * 详细功能介绍及指标解释：https://mp.weixin.qq.com/debug/wxadoc/analysis/#%E5%8A%9F%E8%83%BD%E6%A6%82%E8%BF%B0
 * 
 * 接口地址：https://api.weixin.qq.com/datacube/getweanalysisappiddailysummarytrend?access_token=ACCESS_TOKEN
 * 
 * 获取token方式：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140183
 * 
 * POST 请求参数:
 * 
 *  1. begin_date, required, 开始日期
 *  2. end_date, required, 结束日期，限定查询1天数据，end_date允许设置的最大值为昨日
 * 
 * 比如：{ "begin_date" : "20170313", "end_date" : "20170313" }
 * 
 */

module.exports = {
  post() {
    // ajax 请求

    // 请求地址
    const reqUrl = 'https://api.weixin.qq.com/datacube/getweanalysisappiddailysummarytrend?access_token=ACCESS_TOKEN'

    // 请求参数
    const args = {
      "begin_date": "20170313", 
      "end_date": "20170313"
    }

    // 返回数据
    const resObj = {
      "list": [
        {
          // 请求数据日期
          "ref_date": "20170313",
          // 累计用户数
          "visit_total": 391,
          // 转发次数
          "share_pv": 572,
          // 转发人数
          "share_uv": 383
        }
      ]
    }

  }
}