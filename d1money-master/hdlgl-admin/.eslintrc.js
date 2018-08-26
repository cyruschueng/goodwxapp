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
    // 0: 关闭规则 1: 打开规则(warn) 2: 打开规则(error)
    rules: {
        //箭头函数用小括号括起来
        'arrow-parens': 0,
        //生成器函数*的前后空格
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        //禁止使用eval
        "no-eval": 1,
        //空行最多不能超过2行
        "no-multiple-empty-lines": [1, {"max": 2}],
        //禁用var，用let和const代替
        "no-var": 2,
        //禁用with
        "no-with": 2,
        //缩进风格
        "indent": [2, 4],
        //函数调用时 函数名与()之间不能有空格
        "no-spaced-func": 2,
        //关键字后面是否要空一格
        "space-after-keywords": [0, "always"],
        //不以新行开始的块{前面要不要有空格
        "space-before-blocks": [0, "always"],
        //函数定义时括号前面要不要有空格
        "space-before-function-paren": [0, "always"],
        //小括号里面要不要有空格
        "space-in-parens": [0, "never"],
        //必须使用全等
        "eqeqeq": 2
    }
}
