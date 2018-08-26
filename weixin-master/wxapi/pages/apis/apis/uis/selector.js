/**
 * API -- UI Selector
 * 
 * WXML节点信息
 * 
 * >= 1.4.0
 */

const TIP = require('./tip')


module.exports = {

  // SelectorQuery 对象
  selectorQuery: {
    /** 方法 */

    /**
     * 将选择器的选取范围更改为自定义组件component内。（初始化时，选择器仅选取页面的范围节点，
     * 不会选取任何自定义组件中的节点。）
     * >= 1.6.0
     */
    in(objectComponent) { },

    /**
     * 在当前页面下选择第一个匹配选择器selector的节点，返回一个NodesRef对象实例，可以用于获取节点信息
     * 
     * selector类似css选择器，仅支持：
     * 1. ID选择器：#id,
     * 2. class选择器（可连续指定多个）: .clsa.clsb.clsc
     * 3. 子元素选择器：.parent > .child
     * 4. 后代选择器：.ancestor .descendant
     * 5. 跨自定义组件的后代选择器：.ancestor >>> .descendant
     * 6. 多选择器并集：#id, .some-cls
     */
    select(selector) { },
    selectAll(selector) { },
    /**
     * 选择显示区域，可用于获取显示区域尺寸、滚动位置等信息，返回一个NodesRef对象实例
     */
    selectViewport() { },

    /**
     * 执行所有请求，请求结果按请求次序构成数组，在callback第一个参数中返回
     */
    exec(callback) {
      const _callback = res => {
      }
    },

    /**
     * NodesRef 对象实例
     */
    nodesRef: {
      /**
       * 添加节点的布局位置的查询请求，相对于显示区域，像素单位。其功能类似DOM的
       * getBoudingCientRect。返回值是nodesRef对应的selectorQuery。
       * 
       * 返回的几点信息中，每个节点位置用 left, right, top, bottom, width, height字段描述。
       * 如果提供了回调callback，在执行selectQuery的exec方法后，节点信息会在callback中返回
       */
      boudingClientRect([callback]) { },

      /**
       * 添加节点的滚动位置查询请求，像素单位。节点必须是scroll-view或viewport。返回NodesRef对应的selectQuery
       */
      scrollOffset([callback]) {},

      /**
       * 获取节点相关信息，需要获取的字段在fields参数中指定。返回nodesRef对应的selectQuery.可指定字段：
       * 
       * Name     Default   desc
       * id       false     是否返回节点id
       * dataset  false     是否返回节点dataset
       * rect     false     是否返回节点布局位置（left, right, top, bottom）
       * size     false     是否返回节点尺寸(width, height)
       * scrollOffset false 是否返回节点的 scrollLeft, scrollTop，节点必须是scroll-view或viewport
       * properties []      指定属性名列表，返回节点对应的属性名的当前属性值（只能获取组件文档中标注的常规属性值，id/classs/style/事件绑定属性值不可获取）
       */
      fileds(fields, {callback}) {}
    }
  },

  example() {
    // 1. 单个元素回调返回参数为 rect 数组
    // Page({
    // getRect: () => {
    // 单个元素
    wx.createSelectorQuery().select('#the-id').boudingClientRect(rect => {
      const _rect = {
        id: 'String',
        dataset: 'String',
        left: 'px',
        right: 'px',
        top: 'px',
        bottom: 'px',
        width: 'px',
        height: 'px'
      }
    }).exec()
    // }
    // })

    // 2. 多个元素回调返回参数为 rect 数组
    // Page({
    // getAllRects: () => {
    // 单个元素
    wx.createSelectorQuery().selectAll('.a-class').boudingClientRect(rects => {
      const _rect = [{
        id: 'String',
        dataset: 'String',
        left: 'px',
        right: 'px',
        top: 'px',
        bottom: 'px',
        width: 'px',
        height: 'px'
      }]
    }).exec()
    // }
    // })

    // 3. 节点滚动位置获取请求
    // Page({
    // getScrollOffset: () => {
    // 单个元素
    wx.createSelectorQuery().selectViewport().scrollOffset(res => {
      const _res = {
        id: 'String',
        dataset: 'String',
        scrollLeft: 'px', // 节点水平滚动位置
        scrollTop: 'px' // 节点垂直滚动位置
      }
    }).exec()
    // }
    // })

    // 3. 节点滚动位置获取请求
    // Page({
    // getFields: () => {
    // 单个元素
    wx.createSelectorQuery().select('#the-id').fields({
      dataset: true,
      size: true,
      scrollOffset: true,
      properties: ['scrollX', 'scrollY']
    }, res => {
      // dataset
      res.dataset
      // size
      res.width
      res.height
      // scrollOffset
      res.scrollLeft
      res.scrollTop
      // properties
      res.scrollX
      res.scrollY
    }).exec()
    // }
    // })
  },

  /**
   * 返回一个 SelectorQuery对象实例。可以在这个实例上使用 select 等方法选择节点，
   * 并使用boudingClientRect等方法选择需要查询的信息
   */
  create() {
    if (!wx.createSelectorQuery) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    return wx.createSelectorQuery()
  },
}