
3.4.0 / 2017-11-23
================

`feat`: gingle icon can be got from Icon varibles like `import { User } from 'salt-icon'`

3.3.0 / 2017-11-01
================

`refactor`: 去除动态加载

3.2.2 / 2017-09-18
================
`feat`: salt-svg-loader 有调整，移除掉 svg 中的 class 属性

3.2.1 / 2017-09-08
================
`feat`: salt-svg-loader 有调整，外层包了一层div，把 position: relative 包在内部

3.2.0 / 2017-09-06
================
`feat`: 使用新的 salt-svg-loader 处理icon，涉及改动点如下：
  1、remove svg4everybody
  2、style inline 化，不依赖外部样式
  3、最外层容器由 span 更换为 div

3.1.3 / 2017-07-13
================
`feat`: add option-checked

3.1.2 / 2017-07-10
================
`fix`: upload icon 无法更改颜色

3.1.1 / 2017-07-07
================
`feat`: 更新 upload

3.1.0 / 2017-07-03
================
`feat`: 添加 Symbol 的方式用于兼容老方案

3.0.7 / 2017-06-27
=================
`feat`: 更新plus-round、minus-round、plus-circle、minus-circle

3.0.6 / 2017-06-11
=================
`feat`: 更新cross-round和check-round

3.0.5 / 2017-05-30
=================
`feat`: 对svg添加line-height 0，以修复无法垂直居中的问题

3.0.4 / 2017-05-26
=================
`feat`: 新增eye-close

3.0.3 / 2017-05-25
=================
`fix`: 删除lib目录，重建icon

3.0.2 / 2017-05-25
=================
`feat`: 新增eye、totop、lock

3.0.0 / 2017-05-25
=================
`feat`: 可以单独使用 Icon 了。

2.0.5 / 2017-05-24
=================
`feat`: 更新 search

2.0.4 / 2017-05-17
==================
`feat`: 更新toast-error
`feat`: 更新toast-success

2.0.3 / 2017-05-17
==================
`feat`: 更新note-found
`feat`: 更新star
`feat`: 更新search
`feat`: 新增warn-line
`feat`: 新增loading-round

2.0.2 / 2017-03-14
==================
`feat`: 新增加13个icon

2.0.0 / 2017-02-20
==================
`feat`: 将tingle-icon-source的svg copy了过来，项目中可以不再依赖tingle-icon-source。因为salt-tools使用了tingle-svg4react-loader，将自动给svg"贴膜"和处理兼容性。