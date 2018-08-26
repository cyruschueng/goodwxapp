class SafeRenderUtil {
  /**
   * @param {String} opts.arrName 数组名称
   * @param {Function} opts.formatItem 处理数组的每一个 item ，并将该 item 返回
   * @param {Function} opts.setData 调用页面的渲染方法
   */
  constructor(opts) {
    this.arrName = opts.arrName;
    this.setData = opts.setData;
    this.originLen = 0; //原始数组长度
  }
  /**
   * @param {Array} arr 需要渲染的数组
   */
  addList(arr) {
    if (arr && arr.length) {
      let newList = {};
      for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        if (typeof (this.formatItem) === 'function') {
          item = this.formatItem(item);
        }
        /**
         * 此处为静态数据，后端接口提供收藏数据即可删除
         * todo
         */
        // item.collectNum = Math.ceil(Math.random() * 500);
        newList[`${this.arrName}[${this.originLen}]`] = item;
        this.originLen += 1;
      };

      // callback && callback(newList);
      this.setData(newList);
    }
  }
  /**
   * 清空数组数据
   */
  clearArr() {
    this.setData({
      [`${this.arrName}`]: []
    });
    this.originLen = 0;
  }
}

module.exports = SafeRenderUtil;