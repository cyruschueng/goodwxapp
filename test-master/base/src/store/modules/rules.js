const state = {
  login: {
    account: [
      { required: true, message: '请输入账号', trigger: 'blur' }
    ],
    checkPass: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    yhphone: [
      {
        validator: (rule, value, callback) => {
          if ((/^1[34578]\d{9}$/.test(value)) === false) {
            callback(new Error('电话错误'))
          } else {
            callback()
          }
        },
        trigger: 'blur'
      }
    ]
  }
}

const actions = {
}

const mutations = {
}

export default {
  state,
  actions,
  mutations
}
