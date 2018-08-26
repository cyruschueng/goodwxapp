<template xmlns="http://www.w3.org/1999/html">
  <div class="user-center" :style="{'background': 'url(' + bgImg + ')'}">
    <div class="header"  >
      <div class="name-header" style="color:#ffffff;fontSize:14px ">{{showStageName}}</div>
      <el-button style="background: transparent;height:24px;padding:3px" class="el-button-header" @click="alertPassword('updatePasswordForm')" size="small" round>修改密码</el-button>
      <!--<img :src="bgImg" alt="">-->
    </div>
    <user-logan class="user-logan"></user-logan>
    <div class="user-table-access" v-if="userInfo.roleId === 3 ">
      <div class="table-header" >
        <div class="name-table-header" style="fontSize:12px">权限管理</div>
        <el-button style="height:20px;padding:2px 13px" class="el-button-table" plain size="small"  @click="doAddRegister()">添加账户</el-button>
      </div>
      <el-table :data="tableData" border  max-height="400"  >
        <el-table-column fixed="left" label="用户ID" header-align="center" width="150">
          <template slot-scope="scope">
            <div style="text-align:center;color: #909399">{{scope.row.userId}}</div>
          </template>
        </el-table-column>
        <el-table-column  label="用户名"   header-align="center" width="150">
          <template slot-scope="scope">
            <div style="text-align:center;color: #909399">{{scope.row.userName}}</div>
          </template>
        </el-table-column>
        <el-table-column  label="部门" header-align="center" width="150">
          <template slot-scope="scope">
            <div style="text-align:center" v-if="scope.row.isEditEnable">{{scope.row.departmentName}}</div>
            <el-select  v-model="scope.row.departmentId" @change="changeName" v-else  placeholder="请选择">
              <el-option v-for="item in departmentOptions"
                :key="item.departmentId"
                :label="item.departmentName"
                :value="item.departmentId">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column  label="用户类型"  header-align="center" width="150">
          <template slot-scope="scope">
            <div style="text-align:center" v-if="scope.row.isEditEnable">{{scope.row.roleName}}</div>
            <el-select v-model="scope.row.roleId" @change="changeType"  v-else  placeholder="请选择">
              <el-option v-for="item in userRoleOptions" :key="item.roleId" :label="item.roleName" :value="item.roleId">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column  label="权限申请"  header-align="center" align="center" width="120">
          <template slot-scope="scope" >
            <el-popover trigger="hover" v-if="scope.row.applyIsShow" placement="bottom">
              <span style="margin-left: 20px">同意</span><span style="margin-left: 40px">拒绝</span>
              <div class="apply-dialog" style="margin-top: 5px">
                <el-button class="apply-deal-agree" size="small"  @click="audit(scope.row, 1)" >
                  <i style="color: green" class="el-icon-check"></i>
                </el-button>
                <el-button class="apply-deal-refuse" size="small" @click="audit(scope.row, 0)" >
                  <i style="color: red" class="el-icon-close"></i>
                </el-button>
              </div>
              <div v-if="operation" slot="reference" >
                <span  >{{ userApplyroleId(scope.row.apply.applyRoleType) }}<i class="el-icon-arrow-down "></i></span>
              </div>
              <span style="color: #909399" v-else slot="reference" >{{operationInfo}}</span>
            </el-popover>
            <div style="color: #909399" v-else size="medium" slot="reference">无申请记录</div>
          </template>
        </el-table-column>
        <el-table-column  label="已拥有权限"  prop="power" width="600">
          <template slot-scope="scope">
            <span class="access-span" v-for="item in scope.row.power"  >{{item}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" align="center" header-align="center" label="操作" width="150">
          <template  slot-scope="scope">
            <template v-if="scope.row.isEditEnable">
              <el-button class="edit-icon" type="text" size="small" @click="editClomn(scope.$index, scope.row)" >
                <i  style="color: #9b9b9b" class="el-icon-edit"></i>
              </el-button>
              <el-button class="delete-icon" type="text" size="small" @click="open2(scope.$index, scope.row)">
                <i style="color: #9b9b9b" class="el-icon-delete"></i>
              </el-button>
            </template>
            <template v-else>
              <el-button class="save-icon" type="text" size="small" @click="saveEditClomn(scope.$index, scope.row)">
                <i style="color: #9b9b9b" class="el-icon-check"></i>
              </el-button>
              <el-button class="close-icon" type="text" size="small" @click="cancleEditClomn(scope.$index, scope.row)">
                <i style="color: #9b9b9b" class="el-icon-close"></i>
              </el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <div class="user-page">
        <compagenumber class="pagenumberBox"
           :pagenumber="pageNumber"
           :totalnumber="pageTotal"
           v-on:number-change-to="handleCurrentChange" />
      </div>
    </div>
    <my-alert class="my-alert" v-if="showDialog">
      <div class="comment-dialog" v-if="showConfirmCode">
        <el-form
          :model="updatePasswordForm"
          status-icon :rules="newPasswordRule"
          ref="updatePasswordForm"
          label-position="left"
          class="form-table" >
          <div class="legend"  >
            <div class="title">修改密码</div>
            <div class="close el-icon-close" @click="dismissCofirm()"></div>
          </div>
          <div class="content" style="padding: 5px">
            <div>
              <el-form-item label="原密码" prop="password">
                <el-input type="password" v-model="updatePasswordForm.password" placeholder="原密码"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="新密码" prop="newPassword">
                <el-input type="password" v-model="updatePasswordForm.newPassword" placeholder="新密码"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="确认新密码" prop="confirmPassword">
                <el-input type="password" v-model="updatePasswordForm.confirmPassword"  placeholder="确认密码"></el-input>
              </el-form-item>
            </div>
            <el-form-item class="comment-btn" >
              <el-button type="primary"  @click="updatePassword('updatePasswordForm')">修改</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="comment-dialog" v-if="addUserDialog" >
        <el-form :inline="true" :model="addUseForm"
                 status-icon :rules="addUserRule"
                 ref="addUseForm"
                 label-position="top"
                 style="background-color: #ffffff ; " label-height="30px"
                 label-width="100px" class="form-table">
          <div class="legend"  >
            <div class="title">添加用户</div>
            <div class="close el-icon-close" @click="dismissRegister ()"></div>
          </div>
          <div class="content">
            <div >
              <el-form-item label="用户名"  prop="userName">
                <el-input type="text" v-model="addUseForm.userName"  auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="部门" prop="departmentId">
                <el-select style="width:190px"  v-model="addUseForm.departmentId"  placeholder="请选择">
                  <el-option v-for="item in departmentOptions" :key="item.departmentId" :label="item.departmentName" :value="item.departmentId">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div >
              <el-form-item label="密码"  prop="password">
                <el-input type="password" v-model="addUseForm.password" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="confirmPassword">
                <el-input type="password" v-model="addUseForm.confirmPassword" auto-complete="off"></el-input>
              </el-form-item>
            </div>
            <div >
              <el-form-item label="电话"  prop="phone">
                <el-input v-model.number="addUseForm.phone"  auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input type="email" v-model="addUseForm.email"   auto-complete="off"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="用户身份" prop="roleId">
                <el-select style="width:190px"  v-model="addUseForm.roleId"  placeholder="请选择">
                  <el-option
                    v-for="item in userRoleOptions"
                    :key="item.roleId"
                    :label="item.roleName"
                    :value="item.roleId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="visibility: hidden" label="用户身份"   >
                <el-input type="text"  auto-complete="off"></el-input>
              </el-form-item>
            </div>
            <el-form-item class="comment-btn">
              <el-button type="primary"  @click="createUser('addUseForm')">确认添加</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </my-alert>
    <div class="comment-dialog2" v-if="showTipDialog && userInfo.roleId === 1 " >
      <el-form label-position="top" class="form-table">
        <div class="legend"  >
          <div class="title">申请【高级用户】</div>
          <div class="close el-icon-close" @click="dismissTip()"></div>
        </div>
        <div class="content">
          <div style="text-align: center" >您现在可以申请【高级用户】权限<br>成功申请高级用户后，您将获得以下权限：</div>
          <div>
            <el-tag>全景管理</el-tag>
            <el-tag>空间管理</el-tag>
            <el-tag>专题管理</el-tag>
            <el-tag>发布管理</el-tag>
          </div>
          <div>
            <el-tag>业务统计</el-tag>
            <el-tag>拍摄需求</el-tag>
            <el-tag>三维管理</el-tag>
          </div>
          <el-form-item class="comment-btn">
            <el-button type="primary" @click="apply()"  >{{commit}}</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="comment-dialog2" v-if="showTipDialog && userInfo.roleId === 2 " >
      <el-form label-position="top" class="form-table">
        <div class="legend"  >
          <div class="title">申请【管理员】</div>
          <div class="close el-icon-close" @click="dismissTip()"></div>
        </div>
        <div class="content">
          <div style="text-align: center" >您现在可以申请【管理员】权限<br>成功申请管理员后，您将获得以下权限：</div>
          <div>
            <el-tag>全景管理</el-tag>
            <el-tag>空间管理</el-tag>
            <el-tag>专题管理</el-tag>
            <el-tag>发布管理</el-tag>
          </div>
          <div>
            <el-tag>三维管理</el-tag>
            <el-tag>业务统计</el-tag>
            <el-tag>拍摄需求</el-tag>
            <el-tag>权限分配</el-tag>
          </div>
          <el-form-item class="comment-btn">
            <el-button type="primary" @click="apply()"  >提交申请</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import compagenumber from '../components/common/compagenumber'
import myAlert from '../components/login/myAlert.vue'
import userLogan from '../components/usercenter/userlogan.vue'
// import bgImg from '@/assets/login/bgusercenter.jpg'
import bgImg from '../../static/login/bgusercenter.jpg'
export default {
  name: 'component-usercenter',
  components: {
    compagenumber,
    'my-alert': myAlert,
    'user-logan': userLogan
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.addUseForm.checkPass !== '') {
          this.$refs.addUseForm.validateField('confirmPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.addUseForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.updatePasswordForm.confirmPassword !== '') {
          this.$refs.updatePasswordForm.validateField('confirmPassword')
        }
        callback()
      }
    }
    var validatePass4 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.updatePasswordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('电话号码必须是数字'))
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          if (!reg.test(value)) {
            callback(new Error('请输入正确的电话号码！'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    return {
      commit: '提交申请',
      bgImg: bgImg,
      operation: true,
      operationInfo: '',
      showStageName: '用户中心',
      tableData: [],
      pageNumber: 1,
      pageTotal: 2,
      userRoleOptions: [ {
        roleId: 1,
        roleName: '一般用户'
      }, {
        roleId: 2,
        roleName: '高级用户'
      }, {
        roleId: 3,
        roleName: '管理员'
      }],
      power1: ['全景管理', '空间管理', '专题管理', '发布管理', '拍摄需求'],
      power2: ['全景管理', '空间管理', '专题管理', '发布管理', '拍摄需求', '三维管理', '业务统计'],
      power3: ['全景管理', '空间管理', '专题管理', '发布管理', '拍摄需求', '三维管理', '业务统计', '权限分配'],
      showConfirmCode: false,
      showDialog: false,
      addUserDialog: false,
      showTipDialog: true,
      role: ['申请高级用户', '申请管理员'],
      addUserRule: {
        userName: [
          { required: true, message: '请输入注册名称', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        departmentId: [
          { required: true, message: '请选择所属部门', trigger: 'change' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ],
        phone: [
          { required: true, validator: checkPhone, trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '请选择要创建的用户类型', trigger: 'change' }
        ]
      },
      curUserData: null,
      curUserDataBackup: null,
      addUseForm: {
        userName: '',
        departmentId: '',
        password: '',
        confirmPassword: '',
        phone: '',
        email: '',
        roleId: ''
      },
      updatePasswordForm: {
        password: '',
        newPassword: '',
        confirmNewPassword: ''
      },
      newPasswordRule: {
        password: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, validator: validatePass3, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, validator: validatePass4, trigger: 'blur' }
        ]
      },
      userIdParam: {
        userId: ''
      },
      userUpdateParam: {
        userId: '',
        departmentId: '',
        roleId: ''
      },
      userListParam: {
        pageNo: '1',
        pageSize: '10'
      },
      auditParam: {
        applyId: '',
        status: ''
      }
    }
  },
  created () {
    this.$api.getUserList(this.userListParam).then(res => {
      if (res.code === 0) {
        this.pageTotal = Math.ceil(res.data.total / 10)
        this.tableData = res.data.list.map(it => {
          it.isEditEnable = true
          if (it.apply) {
            it.applyIsShow = true
          }
          if (it.roleId === 1) {
            it.power = this.power1
          } else if (it.roleId === 2) {
            it.power = this.power2
          } else {
            it.power = this.power3
          }
          return it
        })
      } else {
        this.openWarn(res.msg)
      }
    })
  },
  mounted () {
  },
  methods: {
    open2 (index, rowData) {
      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteClomn(index, rowData)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleCurrentChange (number) {
      this.userListParam.pageNo = number
      this.$api.getUserList(this.userListParam).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.tableData.forEach((it) => {
            this.$set(it, 'isEditEnable', true)
          })
          for (var i in this.tableData) {
            if (this.tableData[i].roleId === 1) {
              this.tableData[i].roleName = '一般用户'
              this.$set(this.tableData[i], 'power', this.power1)
            } else if (this.tableData[i].roleId === 2) {
              this.$set(this.tableData[i], 'power', this.power2)
              this.tableData[i].roleName = '高级用户'
            } else {
              this.$set(this.tableData[i], 'power', this.power3)
              this.tableData[i].roleName = '管理员'
            }
          }
        } else {
          this.openWarn(res.msg)
        }
      })
    },
    changeName (data) {
      this.departmentOptions.forEach(item => {
        if (item.departmentId === this.curUserData.departmentId) {
          this.curUserData.departmentName = item.departmentName
        }
      })
    },
    changeType (data) {
      this.userRoleOptions.forEach(item => {
        if (item.roleId === this.curUserData.roleId) {
          this.curUserData.roleName = item.roleName
        }
      })
    },
    dismissRegister () {
      this.showDialog = false
      this.addUserDialog = false
    },
    dismissCofirm () {
      this.showDialog = false
      this.showConfirmCode = false
    },
    dismissTip () {
      this.showTipDialog = false
    },
    alertPassword () {
      this.showConfirmCode = true
      this.showDialog = true
    },
    doAddRegister () {
      this.showDialog = true
      this.addUserDialog = true
    },
    apply () {
      this.$api.userApply().then(res => {
        console.error(res)
        if (res.code === 0) {
          this.openSuccess('已提交成功，请等待管理员审核')
          this.commit = '已提交'
        } else {
          this.openWarn(res.data.msg)
        }
      })
    },
    audit (rowData, state) {
      this.operation = false
      this.auditParam.status = state
      this.auditParam.applyId = rowData.apply.applyId
      this.$api.managerAudit(this.auditParam).then(res => {
        if (res.code === 0) {
          if (state === 0) {
            this.operationInfo = '已拒绝申请'
          } else {
            this.operationInfo = '已同意申请'
          }
          rowData.apply.applyId = null
          this.openSuccess(res.msg)
        } else {
          this.openWarn(res.msg)
        }
      })
    },
    updatePassword (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.updatePassword(this.updatePasswordForm).then(res => {
            if (res.code === 0) {
              this.showDialog = false
              this.showConfirmCode = false
              this.openSuccess(res.msg)
            } else {
              this.openWarn(res.msg)
            }
          })
        } else {
          this.openWarn('检查输入格式')
        }
      })
    },
    createUser (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.createUser(this.addUseForm).then(res => {
            if (res.code === 0) {
              this.$api.getUserList(this.userListParam).then(res => {
                if (res.code === 0) {
                  this.tableData = res.data.list
                  this.pageTotal = Math.ceil(res.data.total / 10)
                  this.tableData.forEach((it) => {
                    this.$set(it, 'isEditEnable', true)
                  })
                  for (var i in this.tableData) {
                    if (this.tableData[i].apply) {
                      this.tableData[i].applyIsShow = true
                    }
                    if (this.tableData[i].roleId === 1) {
                      this.tableData[i].roleName = '一般用户'
                      this.tableData[i].power = this.power1
                    } else if (this.tableData[i].roleId === 2) {
                      this.tableData[i].power = this.power2
                      this.tableData[i].roleName = '高级用户'
                    } else {
                      this.tableData[i].power = this.power3
                      this.tableData[i].roleName = '管理员'
                    }
                  }
                } else {
                  this.openWarn(res.msg)
                }
              })
              this.showDialog = false
              this.addUserDialog = false
              this.openSuccess(res.msg)
            } else {
              this.openWarn(res.msg)
            }
          })
        } else {
          this.openWarn('检查输入格式')
        }
      })
    },
    editClomn (index, rowData) {
      if (this.curUserData && !this.curUserData.isEditEnable) {
        this.tableData[this.curUserDataBackup.index] = this.curUserDataBackup
      }
      rowData.index = index
      this.curUserData = rowData
      this.curUserDataBackup = JSON.parse(JSON.stringify(rowData))
      rowData.isEditEnable = !rowData.isEditEnable
    },
    deleteClomn (index, rowData) {
      this.userIdParam.userId = rowData.userId
      this.$api.deleteUser(this.userIdParam).then(res => {
        if (res.code === 0) {
          this.openSuccess(res.msg)
          this.tableData.splice(index, 1)
        } else {
          this.openWarn(res.msg)
        }
      })
    },
    saveEditClomn (index, rowData) {
      this.userUpdateParam.userId = rowData.userId
      this.userUpdateParam.departmentId = rowData.departmentId
      this.userUpdateParam.roleId = rowData.roleId
      this.$api.updateUser(this.userUpdateParam).then(res => {
        if (res.code === 0) {
          rowData.isEditEnable = !rowData.isEditEnable
          switch (rowData.roleId) {
            case 1:
            case '1':
              rowData.power = this.power1
              break
            case 2:
            case '2':
              rowData.power = this.power2
              break
            case 3:
            case '3':
              rowData.power = this.power3
              break
          }
          this.openSuccess(res.msg)
        } else {
          this.tableData[index] = this.curUserDataBackup
          this.openWarn(res.msg)
        }
      })
    },
    cancleEditClomn (index, rowData) {
      this.tableData[index] = this.curUserDataBackup
      rowData.isEditEnable = !rowData.isEditEnable
    },
    userApplyroleId: function (applyroleType) {
      if (applyroleType === 2 || applyroleType === '2') {
        return '高级用户'
      } else if (applyroleType === 3 || applyroleType === '3') {
        return '管理员'
      } else {
        return
      }
    },
    openError (msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: 'error'
      })
    },
    openWarn (msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: 'warning'
      })
    },
    openSuccess (msg) {
      this.$message({
        message: msg,
        type: 'success'
      })
    }
  },
  computed: {
    departmentOptions () {
      return this.$store.state.departmentList
    },
    userInfo () {
      return this.$store.state.userInfo
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
   /*user-center*/
  .user-center{
    /*background-color: #f0f0f0;*/
    /*background:url('/static/login/bgusercenter.jpg');*/
    padding: 10px 20px;
     /*header*/
    .header{
      height: 40px;
      display: flex;
      align-items: center;
      border-bottom:0.5px solid #555555;
      justify-content: space-between;
      .el-button-header{
        border-color: #1bb1e6;
        color:#1bb1e6
      }
    }
    /*user-table-access*/
    .user-table-access{
      .table-header{
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 20px;
        background-color: white;
        .el-button-table{
          border-color: #1bb1e6;
          color:#1bb1e6
        }
      }
    }
    .user-page{
      margin-top: 20px;
      .pagenumberBox{
        margin: 10px 0 50px;
      }
    }
    .my-alert{
      .comment-dialog{
        .form-table{
          border-radius:5px;
          background-color: #ffffff;
          .legend{
            background-color: #f5f5f5;
            height: 40px;
            display: flex;
            border-radius:5px;
            align-items: center;
            justify-content: space-between;
            padding: 0px 10px;
          }
          .content{
            margin: 20px;
            display: flex;
            flex-flow:column nowrap;
            justify-content: center;
            label{
              margin:0;
              padding: 0px;
            }
            >div{
              margin-bottom: 10px;
              display: flex;
              flex-flow:row nowrap;
              justify-content: center;
            }
            .comment-btn{
              margin:20px 0 30px;
            }
          }
        }
      }
    }
    .comment-dialog2{
      width:40%;
      margin:0 auto;
      .form-table{
        border-radius:5px;
        background-color: #ffffff;
        .legend{
          background-color: #f5f5f5;
          height: 40px;
          display: flex;
          border-radius:5px;
          align-items: center;
          justify-content: space-between;
          padding: 0px 10px;
        }
        .content{
          margin: 20px;
          display: flex;
          flex-flow:column nowrap;
          justify-content: center;
          label{
            margin:0;
            padding: 0px;
          }
          >div{
            margin-bottom: 10px;
            display: flex;
            flex-flow:row nowrap;
            justify-content: center;
          }
          .comment-btn{
            margin:20px 0 30px;
          }
        }
      }
    }
  }
   .apply-deal-agree{
     width: 60px;
     height: 30px;
     border-color: green;
   }
   .apply-deal-refuse{
     border-color: red;
     width: 60px;
   }
   .edit-icon :hover{

   }
   .access-span{
     margin:5px;
     color:#909399
   }
   .el-table__row{
     td{
       padding: 0!important;
     }
   }
   .el-table th {
     padding: 0px 0!important;
     height: 10px;
   }
   .el-table {
     padding: 0!important;
   }
</style>
