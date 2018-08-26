##技术栈
```
本地存储
1.cookie
2.js-cookie

验证
1.valide
2.mnit + js
3.
```

##范畴
```
安全性
xss,xsfs攻击防御原理
稳定性
复用性
维护性

```

##登录注册
``` 
#双菱-青芒

1.登入1种：
login

2.退出3种：
set退出
单点登录
cookie过时

3.cookie(userInfor),localstorege(userInfor),store(userInfor)

4.安全性与单点登录
前端生成token,防护csrf
_token: this.createToken('/app/delMyInfo'),
Vue.prototype.createToken = function(routname) {
  return 'sl' + md5.hex(routname + this.gettime()) + 'mgfm'
}

时间戳
nonce: this.gettime(),
Vue.prototype.gettime = function() {
  let time = Date.parse(new Date())
  return (time = time / 1000)
}

userToken: this.userInfo.token//初次登录后台生成token,存入session，返回前端token，前端出入cookie,每次请求携带，做验证。
单点登录


同域名
headers: {
  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
},

nonce: this.gettime(),//随机时间
_token:this.createToken('/app/modifyPassword'),//安全机制
userToken:this.userInfo.token//单点登录


#iview-admin

登录成功
Cookies.set('user', this.form.userName);
Cookies.set('password', this.form.password);
if (this.form.userName === 'iview_admin') {
    Cookies.set('access', 0);//access,权限管理
} else {
    Cookies.set('access', 1);
}

//路由判断
// 判断是否已经登录且前往的页面不是登录页
!Cookies.get('user') && to.name !== 'login')

```

##[单系统登录机制(1.涉及回话id,也就是token。2.涉及多系统。)](https://www.cnblogs.com/ywlaker/p/6113927.html)
```
多系统登录注册

使用独立登录系统
一般说来，大型应用会把授权的逻辑与用户信息的相关逻辑独立成一个应用，称为用户中心。
用户中心不处理业务逻辑，只是处理用户信息的管理以及授权给第三方应用。第三方应用需要登录的时候，则把用户的登录请求转发给用户中心进行处理，用户处理完毕返回凭证，第三方应用验证凭证，通过后就登录用户。
```
