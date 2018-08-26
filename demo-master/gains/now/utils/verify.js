import { Toast } from 'mint-ui';

// 手机验证
export const phoneVerify = (phoneV) => {
  if (phoneV === '') {
    Toast({
      message: '请输入手机号',
      position: 'bottom',
      duration: 5000
    });
    return false;
  } else if (!/^1[34578]\d{9}$/.test(phoneV)) {
    Toast({
      message: '请输入正确的手机号',
      position: 'bottom',
      duration: 5000
    });
    return false;
  };
  return true;
};

//验证码
export const codeVerify = (codeV) => {
  if (codeV === '') {
    Toast({
      message: '请输入验证码',
      position: 'bottom',
      duration: 5000
    });
    return false;
  } else if (!/^\d{4}$/.test(codeV)) {
    Toast({
      message: '请输入正确的验证码',
      position: 'bottom',
      duration: 5000
    });
    return false;
  }
  return true;
};

// 昵称验证
export const nicknameVerify = (nicknameV) => {
  if (nicknameV === '') {
    Toast({
      message: '请输入昵称',
      position: 'bottom',
      duration: 5000
    });
    return false;
  } else if (!/^[\u4e00-\u9fa5a-zA-Z0-9_-]{4,20}$/.test(nicknameV)) {
    Toast({
      message: '请输入正确的昵称',
      position: 'bottom',
      duration: 5000
    });
    return false;
  }
  return true;
};

// 密码验证
export const passwordVerify = (passwordV) => {
  if (passwordV === '') {
    Toast({
      message: '请输入密码',
      position: 'bottom',
      duration: 5000
    });
    return false;
  } else if (!/^[\x21-\x7E]{6,20}$/.test(passwordV)) {
    Toast({
      message: '请输入正确的密码',
      position: 'bottom',
      duration: 5000
    });
    return false;
  }
  return true;
};

// 两次密码验证
export const rePsswordVerify = (newPasswordV, rePasswordV) => {
  if (rePasswordV !== newPasswordV) {
    Toast({
      message: '两次输入的密码不一致',
      position: 'bottom',
      duration: 5000
    });
    return false;
  }
  return true;
}

// 旧密码验证
export const oldPasswordVerify = (oldPasswordV) => {
  if (oldPasswordV === '') {
    Toast({
      message: '请输入旧密码',
      position: 'bottom',
      duration: 5000
    });
    return false;
  } else if (!/^[\x21-\x7E]{6,20}$/.test(oldPasswordV)) {
    Toast({
      message: '请输入正确的旧密码',
      position: 'bottom',
      duration: 5000
    });
    return false;
  }
  return true;
};

// 新密码验证
export const newPasswordVerify = (newPasswordV) => {
  if (newPasswordV === '') {
    Toast({
      message: '请输入新密码',
      position: 'bottom',
      duration: 5000
    });
    return false;
  } else if (!/^[\x21-\x7E]{6,20}$/.test(newPasswordV)) {
    Toast({
      message: '请输入6-20位数字或字母做为新密码',
      position: 'bottom',
      duration: 5000
    });
    return false;
  }
  return true;
};

// 输入内容不为空
export const contentVerify = (contentV) => {
  if (contentV === '') {
    Toast({
      message: '请输入内容',
      position: 'bottom',
      duration: 5000
    });
    return false;
  }else if(!/^([\w\W]){0,200}$/.test(contentV)){
    Toast({
      message: '请输入200内个字符',
      position: 'bottom',
      duration: 5000
    });
    return false;
  }
  return true;
};