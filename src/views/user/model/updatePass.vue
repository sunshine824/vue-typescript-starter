<template>
  <a-modal class="input-form my-modal"
           title="修改密码"
           :footer="false"
           :width="550"
           @cancel="hide"
           centered
           :visible="visible">
    <a-form-model class="my-form"
                  ref="ruleForm"
                  :model="ruleForm"
                  :rules="rules"
                  v-bind="layout">
      <a-form-model-item label="账号"
                         prop="userName">
        <a-input v-model="userName"
                 type="text"
                 autocomplete="off"
                 disabled />
      </a-form-model-item>
      <a-form-model-item label="原密码"
                         prop="password">
        <a-input v-model="ruleForm.password"
                 type="password"
                 autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item label="新密码"
                         prop="newPassword">
        <a-input v-model="ruleForm.newPassword"
                 type="password"
                 autocomplete="off" />
        <div class="psw-block"
             v-if="ruleForm.newPassword">
          <div class="ps-child">
            <span class="p-colors"
                  :style="{'background':userStyleInput>=1?'red':'#ccc'}"></span>
            <span class="p-text">弱</span>
          </div>
          <div class="ps-child">
            <span class="p-colors"
                  :style="{'background':userStyleInput>=3?'blue':'#ccc'}"></span>
            <span class="p-text">中</span>
          </div>
          <div class="ps-child">
            <span class="p-colors"
                  :style="{'background':userStyleInput>=4?'green':'#ccc'}"></span>
            <span class="p-text">强</span>
          </div>
        </div>
        <span class="text"
              v-if="ruleForm.newPassword">提示：密码由数字、小写字母、大写字母、特殊字符4种类型组成</span>
      </a-form-model-item>
      <a-form-model-item has-feedback
                         label="密码确认"
                         prop="confirmPassword">
        <a-input v-model="ruleForm.confirmPassword"
                 type="password"
                 autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 24}"
                         :style="{'text-align': 'right','margin-bottom':'0'}">
        <a-button type="primary"
                  @click="handleSubmit">确认</a-button>
        <a-button style="margin-left: 10px"
                  @click="hide">取消</a-button>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator';
import { checkPassModes } from '@/utils/util';
import { FormModel, Button, Input } from 'ant-design-vue';
import { User } from '../interface';

@Component({
  components: {
    AFormModel: FormModel,
    AFormModelItem: FormModel.Item,
    AButton: Button,
    AInput: Input,
  },
})
export default class App extends Vue {
  @Ref('ruleForm') readonly refRuleForm!: FormModel;

  // inital data
  private visible = false;

  private ruleForm: User.UpdatePass = {
    userName: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
  };

  private rules: object = {
    password: [{ required: true, message: '旧密码不能为空', trigger: 'blur' }],
    newPassword: [
      { required: true, validator: this.passwordFun, trigger: 'change' },
    ],
    confirmPassword: [
      { required: true, message: '确认密码不能为空', trigger: 'blur' },
      { validator: this.validateConfirmPassword, trigger: 'blur' },
    ],
  };

  private layout: StoreState.Layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  // inital computed

  // 获取用户名
  private get userName() {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo') as string);
    return userInfo.username;
  }

  // 密码强度
  private get userStyleInput() {
    const value = this.ruleForm.newPassword;
    return checkPassModes(value);
  }

  // inital methods

  // 自定义验证新密码与旧密码是否相同
  private validateConfirmPassword(rule: unknown, value: string, callback: any) {
    if (this.ruleForm.newPassword !== value) {
      callback(new Error('确认密码与新密码不一致'));
    } else {
      callback();
    }
  }

  // 自定义检测新密码强度
  private passwordFun(rule: unknown, value: string, callback: any) {
    const datas = this.ruleForm.newPassword;
    const modes = checkPassModes(datas);
    const reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
    if (value == '') {
      callback(new Error('密码不能为空'));
    } else if (reg.test(value)) {
      callback(new Error('密码不能为中文'));
    } else if (value.length < 8) {
      callback(new Error('密码长度不能小于8位字符'));
    } else if (modes < 3) {
      callback(new Error('密码类型不能少于三种'));
    } else {
      callback();
    }
  }

  // 表单提交
  private handleSubmit() {
    this.refRuleForm.validate((valid) => {
      if (valid) {
        return true;
      }
      return false;
    });
  }

  // 显示弹窗
  show() {
    this.visible = true;
    this.$nextTick(() => {
      this.refRuleForm.resetFields();
    });
  }

  // 隐藏弹窗
  hide() {
    this.visible = false;
  }
}
</script>

<style lang='less' scope>
.input-form {
  .psw-block {
    color: #fff;
    display: flex;
    .ps-child {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 10px;
      padding-top: 10px;
      .p-colors {
        width: 60px;
        height: 5px;
        border-radius: 3px;
        background: #ccc;
      }
      .p-text {
        font-size: 12px;
        line-height: 20px;
      }
    }
  }
  .text {
    color: red;
    font-size: 12px;
  }
}
</style>
