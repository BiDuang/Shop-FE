<template>
  <div id="card-wrapper">
    <div id="register-card">
      <div id="card-content">
        <div id="card-title">
          <span class="title lightgray" @click="$router.push('/login')">登录</span>
          <span class="deepgray">丨</span>
          <span class="title gray">注册</span>
        </div>
        <a-form :model="registerForm" name="register" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }"
          autocomplete="off" @finish="handleRegister">
          <a-form-item label="邮箱" name="email" :rules="[{ required: true, message: '邮箱不能为空!' }]">
            <a-input v-model:value="registerForm.email" />
          </a-form-item>
          <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '用户名不能为空!' }]">
            <a-input v-model:value="registerForm.username" />
          </a-form-item>
          <a-form-item label="密码" name="password" :rules="[{ required: true, message: '密码不能为空!' }]">
            <a-input-password v-model:value="registerForm.password" />
          </a-form-item>
          <a-form-item label="确认密码" name="confirm_password" :rules="[{ required: true, message: '确认密码不能为空!' }]">
            <a-input-password v-model:value="registerForm.confirm_password" />
          </a-form-item>
          <a-form-item label="验证码" name="captcha" :rules="[{ required: true, message: '验证码不能为空!' }]">
            <a-input-group compact class="captcha">
              <a-input-number v-model:value="registerForm.captcha" :controls=false />
              <a-button type="primary" @click="getCaptcha" :loading="isCaptchaLoading"
                :disabled="!registerForm.email || isCaptchaSended">{{ captcha.text }}</a-button>
            </a-input-group>
          </a-form-item>
          <div id="btn-wrapper">
            <a-button type="link" @click="$router.push('/login')">已有账号？登录</a-button>
            <a-button type="primary" html-type="submit">注册</a-button>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { RegisterModel } from "@/models/user";
import { message } from "ant-design-vue";
import { reactive, ref } from "vue";
import useUserStore from "@/stores/user";
import useToggle from "@/utils/useToggle";
import router from "@/router";

const userStore = useUserStore();
const registerForm = reactive<RegisterModel>({
  email: "",
  username: "",
  password: "",
  confirm_password: "",
  captcha: "",
});

const requestId = ref("");

const { val: isCaptchaSended, set: setCaptchaSended } = useToggle(false);
const { val: isCaptchaLoading, set: setCaptchaLoading } = useToggle(false);
const captcha = reactive({
  text: "获取验证码",
  time: 60,
})

const getCaptcha = async () => {
  setCaptchaLoading(true);
  if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(registerForm.email))) {
    message.warn("请输入正确的邮箱格式!");
    setCaptchaLoading(false);
    return;
  }
  const data = await userStore.registerCaptcha(registerForm.email);
  if (data) {
    requestId.value = data
    setCaptchaSended(true);
    const countDown = setInterval(() => {
      if (captcha.time === 0) {
        captcha.time = 60;
        captcha.text = "获取验证码";
        setCaptchaSended(false);
        clearInterval(countDown);
      } else {
        captcha.time--;
        captcha.text = `${captcha.time}秒后重新获取`;
      }
    }, 1000);
    message.success("验证码发送成功!");
  }
  setCaptchaLoading(false);
};

const handleRegister = async () => {
  if (registerForm.password !== registerForm.confirm_password) {
    message.warn("两次输入的密码不一致!");
    return;
  }
  try {
    if (await userStore.register(registerForm, requestId.value)) {
      message.success("注册成功!");
      await router.push("/login");
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
#card-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

#register-card {
  background-color: #ffffff;
  border-radius: 12px;
  width: 400px;
}

#card-content {
  padding: 24px 36px 36px 24px;
}

#card-title {
  font-size: 2em;
  margin-bottom: 24px;
}

.gray {
  color: #9d9d9d;
}

.deepgray {
  color: #818181;
}

.lightgray {
  color: #d9d9d9;
}

.title {
  cursor: pointer;
}

#btn-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.captcha {
  display: flex;
  justify-content: flex;
}

.captcha>.ant-input-number {
  flex-grow: 1;
}
</style>
