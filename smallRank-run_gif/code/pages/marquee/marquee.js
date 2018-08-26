export default {
  getWidth: (str) => {
    return [].reduce.call(str, (pre, cur, index, arr) => {
      if (str.charCodeAt(index) > 255) {// charCode大于255是汉字
        pre++;
      } else {
        pre += 0.5;
      }
      return pre;
    }, 0);
  },
  getDuration: (str) => {// 保留，根据文字长度设置时间
    return this.getWidth() / 20;
  }
}