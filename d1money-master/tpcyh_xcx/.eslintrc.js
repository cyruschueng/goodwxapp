module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.wpy files
  plugins: [
    'html'
  ],
  settings: {
    'html/html-extensions': ['.html', '.wpy']
  },
  // add your custom rules here
  'rules': {
    'arrow-parens': 0,                      //箭头函数用小括号括起来
    'generator-star-spacing': 0,            //生成器函数*的前后空格
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, //禁止使用debugger
    "semi": [2, "always"],//语句强制分号结尾
    "space-after-keywords": [0, "always"],//关键字后面是否要空一格
    "space-before-blocks": [0, "always"],//不以新行开始的块{前面要不要有空格
    'space-before-function-paren': 0,   //函数定义时括号前面要不要有空格
    'lines-around-comment': 0,//行前备注
    'indent':[2,4],         //缩进风格 4
    'curly': [2, 'all'],//必须使用 if(){} 中的{}
  }
}
