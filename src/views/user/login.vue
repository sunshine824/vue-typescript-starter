<template>
  <global-bg class="site-wrapper site-page--login">
    <template slot="content">
      <!-- <div class="sub-logo">
      <img src="../assets/logo.png" />
      </div>-->
      <div class="site-content__wrapper">
        <div class="site-content">
          <div class="login-main">
            <img class="img"
                 :src="logo" />
            <a-form-model :model="dataForm"
                          :rules="dataRule"
                          ref="dataForm"
                          @keyup.enter.native="dataFormSubmit()"
                          status-icon
                          :label-col="labelCol"
                          :wrapper-col="wrapperCol">
              <a-form-model-item prop="username">
                <a-input size="large"
                         v-model="dataForm.username"
                         placeholder="请输入用户名"></a-input>
              </a-form-model-item>
              <a-form-model-item prop="password">
                <a-input size="large"
                         v-model="dataForm.password"
                         type="password"
                         placeholder="请输入密码"></a-input>
              </a-form-model-item>
              <!-- <a-form-model-item prop="captcha">
                <a-row :gutter="20" style="display:flex;flex-flow: row nowrap;align-items: center;">
                  <a-col :span="16">
                    <a-input size="large" v-model="dataForm.captcha" placeholder="请输入验证码"></a-input>
                  </a-col>
                  <a-col :span="8" class="login-captcha">
                    <img :src="captchaPath" @click="getCaptcha()" alt style="height: 38px;" />
                  </a-col>
                </a-row>
              </a-form-model-item>-->
              <a-form-model-item :wrapper-col="{ span: 18, offset: 3 }">
                <a-button size="large"
                          class="login-btn-submit"
                          type="primary"
                          @click="dataFormSubmit">登录</a-button>
              </a-form-model-item>
            </a-form-model>
          </div>
        </div>
      </div>
      <p class="notice">
        建议使用Chrome浏览器（版本：
        <span style="color:#1890ff">84.0.4147.89</span>
        及以上）在分辨率为
        <span style="color:#1890ff">1920x1080</span>
        下访问本平台
      </p>
    </template>
  </global-bg>
</template>

<script lang="ts">
import uuid from 'uuid/v1';
import GlobalBg from '@/components/GlobalBg.vue';
import { setToken } from '@/utils/token';
import { UserModule } from '@/store/modules/user';
import { login } from '@/api/users';
import { Component, Vue } from 'vue-property-decorator';
import { FormModel, Row, Col, Button, Input } from 'ant-design-vue';
import { User } from './interface'; // 引入模块接口

@Component({
  components: {
    GlobalBg,
    ARow: Row,
    ACol: Col,
    AButton: Button,
    AInput: Input,
    AFormModel: FormModel,
    AFormModelItem: FormModel.Item,
  },
})
export default class Login extends Vue {
  // initial data
  private labelCol: object = { span: 4 };

  private wrapperCol: object = { span: 18, offset: 3 };

  private captchaPath = '';

  private logo = '';

  private dataRule: any = {
    username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
    captcha: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
  };

  private dataForm: User.Login = {
    username: '',
    password: '',
    captcha: '',
    uuid: '',
  };

  mounted() {
    this.$nextTick(() => {
      this.getCaptcha();
    });
  }

  // login提交
  private dataFormSubmit() {
    (this.$refs.dataForm as FormModel).validate(async (valid: boolean) => {
      if (valid) {
        try {
          const { data } = await login(this.dataForm);
          // 将token存储到store
          UserModule.SET_TOKEN(data.token);
          // 将token存储到sessionStorage
          setToken(data.token);
          sessionStorage.setItem('userInfo', JSON.stringify(data.userInfo));
          window.location.href = '/';
        } catch (error) {
          this.getCaptcha();
        }
      }
    });
  }

  // 加载验证码
  private getCaptcha() {
    this.dataForm.uuid = uuid();
    this.captchaPath = `/dbd-authority/captcha.jpg?uuid=${this.dataForm.uuid}`;
  }
}
</script>

<style lang="less" scope>
.site-wrapper.site-page--login {
  .notice {
    position: absolute;
    bottom: 10px;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.8);
    width: 100%;
    text-align: center;
  }
  .sub-logo {
    position: absolute;
    width: 100px;
    height: 64px;
    top: 20px;
    left: 20px;
    img {
      height: 100%;
      width: 100%;
    }
  }
  &:before {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: '';
    //background-image: url(~@/assets/img/bgc.jpg);
    background-size: cover;
  }
  .site-content__wrapper {
    margin: 0 auto;
    align-self: center;
    .site-content {
      min-height: 100%;
      padding: 30px;
    }
  }

  .login-main {
    padding: 10px;
    min-height: 100%;
    min-width: 520px;
    .img {
      width: 500px;
      margin-bottom: 46px;
    }
    // opacity: 0.9;
  }
  .login-title {
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    text-align: center;
    margin-bottom: 15px;
  }
  .login-captcha {
    overflow: hidden;
    > img {
      width: 100%;
      cursor: pointer;
    }
  }
  .login-btn-submit {
    width: 100%;
    margin-top: 15px;
  }
  .ant-form-item-label > label {
    font-weight: 800;
    color: #fff !important;
    font-size: 16px !important;
    display: flex;
    justify-content: space-between;
  }
  .ant-form-item-required::before {
    margin-top: 15px;
  }
}
</style>
