<template>
  <div class="login-wrapper">
    <el-card class="login-card" shadow="always">
      <el-image class="img-login" :src="banner" fit="contain" />

      <div class="login-form">
        <h2 class="title">用户登录</h2>

        <el-form ref="ruleForm" :model="form" :rules="rules" :hide-required-asterisk="true">
          <el-form-item class="mb-6" prop="phone">
            <el-input v-model="form.phone" class="form-input" maxlength="11" placeholder="请输入账号">
              <template #prefix>
                <div class="icon">
                  <i class="el-icon-user" style="width: 15px; height: 15px; color: #8aa7ca" />
                </div>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input v-model="form.password" class="form-input" type="password" show-password placeholder="请输入密码">
              <template #prefix>
                <div class="icon">
                  <i class="el-icon-lock" style="width: 15px; height: 15px; color: #8aa7ca" />
                </div>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item class="btn-group">
            <el-button type="primary" class="btn-submit" @click="handleSubmit('ruleForm')"> 登录 </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import FormValidator from '@/utils/validator'
import banner from '@imgs/login.png'

export default {
  props: {
    redirect: {
      type: String,
      default: '/'
    }
  },

  data() {
    const checkPhone = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('请输入账号'))
      } else {
        if (!FormValidator.isMobile(value)) {
          callback(new Error('请填写正确的账号'))
          return
        }
        callback()
      }
    }

    return {
      banner,

      form: {
        phone: '',
        password: ''
      },

      rules: {
        phone: [{ validator: checkPhone, trigger: 'blur' }],
        password: [{ required: true, max: 20, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },

  methods: {
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch('LoginByPhone', this.form).then(() => {
            this.$message.success('登录成功')
            this.$router.replace({ path: this.redirect })
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  @include flex(center);
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  background: #03a9f4;
  .login-card {
    width: 900px;
    height: 500px;
    border: none;
    border-radius: 15px;

    :deep(.el-card__body) {
      display: flex;
      width: 100%;
      height: 100%;
      padding: 0;
      background-color: #e0edfd;
      overflow: hidden;
    }

    .img-login {
      width: 60%;
    }

    .login-form {
      width: 40%;
      padding: 20px;
      border-radius: 15px;
      background-color: #ffffff;

      .title {
        margin: 40px 0;
        font-weight: bold;
      }

      .mb-6 {
        margin-bottom: 24px;
      }

      :deep {
        .form-input {
          @include autofill(#f5f5f5);
          height: 36px;
          border-radius: 6px;
          background: #f5f5f5;

          .el-input__prefix {
            @include flex(center);
            top: 9px;
            width: 23px;
            height: 23px;
            padding: 4px 4px;
            border-radius: 2px;
            background: #ffffff;
          }

          .el-input__inner {
            height: 100%;
            padding-left: 35px;
            background: inherit;
            box-shadow: none;
            border: none;

            &::placeholder {
              font-size: 14px;
            }
          }
        }
      }

      .btn-group {
        text-align: right;
        margin-top: 40px;

        .btn-submit {
          height: 36px;
          width: 100%;
        }
      }
    }
  }
}
</style>
