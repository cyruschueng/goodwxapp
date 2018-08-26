config.toolbar = 'Full';
 
config.toolbar_Full =
[
    { name: 'document', items : [ 'Source','-','Save','NewPage','DocProps','Preview','Print','-','Templates' ] },
    { name: 'clipboard', items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
    { name: 'editing', items : [ 'Find','Replace','-','SelectAll','-','SpellChecker', 'Scayt' ] },
    { name: 'forms', items : [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 
        'HiddenField' ] },
    '/',
    { name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat' ] },
    { name: 'paragraph', items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','CreateDiv',
    '-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl' ] },
    { name: 'links', items : [ 'Link','Unlink','Anchor' ] },
    { name: 'insert', items : [ 'Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak','Iframe' ] },
    '/',
    { name: 'styles', items : [ 'Styles','Format','Font','FontSize' ] },
    { name: 'colors', items : [ 'TextColor','BGColor' ] },
    { name: 'tools', items : [ 'Maximize', 'ShowBlocks','-','About' ] }
];
 
config.toolbar_Basic =
[
    ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink','-','About']
];
复制代码
下面是经删除过后的工具条代码

复制代码
config.toolbar = 'Full';
    config.toolbar_Full = [
        {name: 'document',items: ['Source', '-', 'DocProps', 'Preview', 'Print', '-']},
        {name: 'clipboard',items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']},
        {name: 'editing',items: ['Find', 'Replace', '-', 'SelectAll', '-']},
        { name: 'basicstyles',items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat']},
        '/',
        {name: 'paragraph',items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl']},
        {name: 'links',items: ['Link', 'Unlink', 'Anchor']},
        {name: 'insert',items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak']},
        '/',
        { name: 'styles',items: ['Styles', 'Format', 'Font', 'FontSize']},
        { name: 'colors',items: ['TextColor', 'BGColor']},
        { name: 'tools',items: [ 'ShowBlocks', '-']}
    ];
    config.toolbar_Basic = [['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']];
复制代码
 

 

工具栏的定义英汉对照说明：
Source = 源码模式
-
Save = 保存(提交表单)
NewPage = 新建
Preview = 预览
- = 分割线
Templates = 模板
Cut = 剪切
Copy = 复制
Paste = 粘贴
PasteText = 粘贴为无格式文本
PasteFromWord = 从 MS WORD 粘贴
-
Print = 打印
SpellChecker = 拼写检查
Scayt = 即时拼写检查
Undo = 撤销
Redo = 重做
-
Find = 查找
Replace = 替换
-
SelectAll = 全选
RemoveFormat = 清除格式
Form = 表单
Checkbox = 复选框
Radio = 单选框
TextField = 单行文本
Textarea = 多行文本
Select = 列表/菜单
Button = 按钮
ImageButton = 图片按钮
HiddenField = 隐藏域
/
Bold = 加粗
Italic = 倾斜
Underline = 下划线
Strike = 删除线
-
Subscript = 下标
Superscript = 上标
NumberedList = 编号列表
BulletedList = 项目列表
-
Outdent = 减少缩进量
Indent = 增加缩进量
Blockquote = 块引用
CreateDiv = 创建DIV容器
JustifyLeft = 左对齐
JustifyCenter = 居中
JustifyRight = 右对齐
JustifyBlock = 两端对齐
BidiLtr = 文字方向从左到右
BidiRtl = 文字方向从右到左
Link = 插入/编辑超链接(上传文件)
Unlink = 取消超链接
Anchor = 插入/编辑锚点链接
Image = 图像(上传)
Flash = 动画(上传)
Table = 表格
HorizontalRule = 插入水平线
Smiley = 插入表情
SpecialChar = 插入特殊符号
PageBreak = 插入分页符
/
Styles = 样式快捷方式
Format = 文本格式
Font = 字体
FontSize = 文字大小
TextColor = 文字颜色
BGColor = 背景颜色
Maximize = 全屏编辑模式
ShowBlocks = 显示区块
-
About = 显示关于