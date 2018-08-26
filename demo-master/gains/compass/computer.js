/*计算机专业导论
第2讲 符号化、计算化与自动化
    -201本讲概述
    -202信息如何用0和1表示
    -203如何用0和1进行计算
    -204如何将减法变为加法
    -205如何用逻辑-用电路实现加法
第5讲 由机器语言到高级语言---程序编写编译
    -501本讲概述
    -502由机器语言到高级语言
    -503高级语言的基本构成要素 
    -504用高级语言构造程序
    -505计算机语言与编译器
    -506计算机语言的发展*/
    
<!-- 4 -->

我的重点：
1. 数据结构与算法设计与分析(数据结构与算法， 前后端分离api接口设计)
2. 计算机网络（ http请求）
3. 数据库系统原理（ mysql, mongodb）

其他：
数学， 语言， 测试， 安全， linux系统， 计算机组成（ 硬件）

发散：
人工智能，ar（增强现实技术）,vr（虚拟现实）,lot（物联网）

var data = {
    name: 'computer',
    children: [{
            name: '大一',
            children: []
        ]
    },
    {
        name: '大二',
        children: [
            { name: '数据结构' },
            { name: '算法设计与分析' },
        ]
    },
    {
        name: '大三',
        children: [
            { name: '计算机网络' },
            { name: '数据库系统原理' },
        ]
    },
    {
        name: '大四',
        children: []
    }]
}


<!-- 3 -->
计算机基础： 计算机专业导论， 计算机组成原理， 软件工程， 编译原理， 操作系统， 面对对象软件开发实践， 计算机系统结构， Linux内核分析
测试安全： 软件测试， 软件测试方法和技术实践， 软件安全， 信息安全数学基础

<!-- 2 -->
语言： java, c, python, c++, c#
数学： 高等数学， 离散数学基础， 概率论与数理统计， 线性代数， 近世代数

<!-- 1 -->
var data = {
    name: 'computer',
    children: [{
            name: '大一',
            children: [
                { name: 'Java程序设计' },
                { name: 'C程序设计' },
                { name: 'Python程序设计' },
                { name: '计算机专业导论' },
                { name: '高等数学' }
            ]
        },
        {
            name: '大二',
            children: [
                { name: 'C++程序设计' },
                { name: '数据结构' },
                { name: 'C#程序设计' },
                { name: '计算机组成原理' },
                { name: '算法设计与分析' },
                { name: '离散数学基础' },
                { name: '概率论与数理统计' },
            ]
        },
        {
            name: '大三',
            children: [
                { name: '软件工程' },
                { name: '编译原理' },
                { name: '操作系统' },
                { name: '计算机网络' },
                { name: '数据库系统原理' },
                { name: '线性代数' },
                { name: '软件测试' }
            ]
        },
        {
            name: '大四',
            children: [
                { name: '软件测试方法和技术实践' },
                { name: '面对对象软件开发实践' },
                { name: '计算机系统结构' },
                { name: 'Linux内核分析' },
                { name: '软件安全' },
                { name: '信息安全数学基础' },
                { name: '近世代数' }
            ]
        }
    ]
}

参考：
计算机专业课程体系http://study.163.com/curricula/cs.htm




<!-- 2 & 3 -->

<!-- 3 -->
<!-- var data = {
name: 'computer',
    children: [{
            name: '大一',
            { name: '计算机专业导论' }
        ]
    }, {
        name: '大二',
        children: [
            { name: '数据结构' },
            { name: '计算机组成原理' },
            { name: '算法设计与分析' },
        ]
    }, {
        name: '大三',
        children: [
            { name: '软件工程' },
            { name: '编译原理' },
            { name: '操作系统' },
            { name: '计算机网络' },
            { name: '数据库系统原理' },
        ]
    }, {
        name: '大四',
        children: [
            { name: '面对对象软件开发实践' },
            { name: '计算机系统结构' },
            { name: 'Linux内核分析' },
        ]
    }]
} -->

<!-- 2 -->
<!-- var data = {
name: 'computer',
    children: [{
            name: '大一',
            children: [{ name: '计算机专业导论' }]
        ]
    }, {
        name: '大二',
        children: [
            { name: '数据结构' },
            { name: '计算机组成原理' },
            { name: '算法设计与分析' },
        ]
    }, {
        name: '大三',
        children: [
            { name: '软件工程' },
            { name: '编译原理' },
            { name: '操作系统' },
            { name: '计算机网络' },
            { name: '数据库系统原理' },
            { name: '软件测试' }
        ]
    }, {
        name: '大四',
        children: [
            { name: '软件测试方法和技术实践' },
            { name: '面对对象软件开发实践' },
            { name: '计算机系统结构' },
            { name: 'Linux内核分析' },
            { name: '软件安全' },
            { name: '信息安全数学基础' }
        ]
    }]
}