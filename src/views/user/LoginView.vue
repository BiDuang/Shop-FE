<script lang="ts" setup>
import type { LoginForm } from '@/models/user';
import useUserStore from '@/stores/user';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import useToggle from '@/utils/useToggle';
import { message } from 'ant-design-vue';

const router = useRouter();
const userStore = useUserStore();
const { val: isPending, set: setPending } = useToggle(false);

const loginForm = reactive<LoginForm>({
  username: '',
  password: '',
});

const handleLogin = async (loginForm: LoginForm) => {
  setPending(true);
  if (await userStore.login(loginForm)) {
    message.success('登录成功');
    await router.push('/');
  }
  setPending(false);
};
</script>

<template>
  <div id="card-wrapper">
    <div id="login-card">
      <div id="card-content">
        <div id="card-title">
          <span class="title gray">登录</span>
          <span class="deepgray">丨</span>
          <span class="title lightgray" @click="$router.push('/register')">注册</span>
        </div>
        <a-form :model="loginForm" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" autocomplete="on"
          @finish="handleLogin">
          <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '用户名不能为空!' }]">
            <a-input v-model:value="loginForm.username" />
          </a-form-item>
          <a-form-item label="密码" name="password" :rules="[{ required: true, message: '密码不能为空!' }]">
            <a-input-password v-model:value="loginForm.password" />
          </a-form-item>
          <div id="btn-wrapper">
            <a-button type="link">使用设备认证登录</a-button>
            <a-button type="text" @click="$router.push('/recover')">忘记密码</a-button>
            <a-button type="primary" html-type="submit" :loading="isPending">
              登录
            </a-button>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
#card-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

#login-card {
  background-color: #ffffff;
  border-radius: 12px;
  width: 400px;
}

#card-content {
  padding: 24px 24px 36px 24px;
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
</style>
