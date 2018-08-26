<!DOCTYPE html>
<html lang="en">
<body>

<h1><span>${userName}</span>，您好</h1>

<p>您于<span>${time}</span>通过"顺德区地理国情监测全景平台"用户密码找回功能提交了密码重置申请，请点击下列密码重置链接（或将密码重置链接地址拷贝到浏览器地址栏）输入验证码，完成你的账户：${userName} 密码重置操作。

<p>验证码：<span style="color:red">${verifyCode}</span></p>

<a style="color:blue" href="${url}">点这里进行密码重置</a>
<p>如果上述文字点击无效，请把下面网页地址复制到浏览器地址栏中打开：</p>

<p>${url}<p/>

<p style="font-style:italic">邮件系统请勿回复<p/>

</body>
</html>