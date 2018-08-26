// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    "no-new": 0,
    "no-new-func": 0,//禁止使用new Function
    "no-extend-native": 0,//禁止扩展native对象
    'generator-star-spacing': 'off',
    "no-const-assign": 0,//禁止修改const声明的变量
    "no-unused-expressions": 0,//禁止无用的表达式
    "no-useless-escape":0,
    "no-octal-escape": 0,//禁止使用八进制转义序列
    'arrow-parens': 0,
    "comma-spacing": 0, //逗号前后的空格
    "no-multi-spaces": 0, //不能用多余的空格
    "no-spaced-func": 0, //函数调用时 函数名与()之间不能有空格
    "object-curly-spacing": [0, "never"], //大括号内是否允许不必要的空格
    "space-in-parens": [0, "never"], //小括号里面要不要有空格
    "array-bracket-spacing": [0, "never"], //是否允许非空数组里面有多余的空格
    "space-unary-ops": [0, {
      "words": true,
      "nonwords": false
    }], //一元运算符的前/后要不要加空格
    "no-unused-vars": [0, {
      "vars": "all",
      "args": "after-used"
    }], //不能有声明后未被使用的变量或参数
    "space-before-function-paren": [0, "always"], //函数定义时括号前面要不要有空格

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
