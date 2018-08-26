module.exports = function () {
  return function (style) {
    var nodes = this.nodes
    style.define('camelize', str => {
      return new nodes.Ident(str.string.replace(/-[a-z]/g, s => s.substr(1).toUpperCase()))
    })
  }
}
