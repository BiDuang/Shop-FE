<script lang="ts" setup>
import type { LoginForm } from '@/models/user';
import { Avatar, Lock, Message } from '@element-plus/icons-vue'
import useUserStore from '@/stores/user';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import useToggle from '@/utils/useToggle';
import { ElMessage } from 'element-plus';

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
    ElMessage.success('登录成功');
    await router.push('/');
  }
  setPending(false);
};
</script>

<template>
  <div class="background">
    <el-row class="login-container" justify="flex-start" align="middle" style="padding-left: 900px;">
      <el-card style="max-width: 480px">
        <template #header>
          <div class="card-header">
            <span class="title">登录</span>
            <span class="gray">丨</span>
            <span class="title gray" @click="$router.push('/register')">
              注册
            </span>
          </div>
        </template>

        <el-form :model="loginForm" style="width: 400px" class="demo-ruleForm">
          <el-form-item prop="username" :rules="[{ required: true, message: '用户名不能为空!' }]">
            <el-input v-model="loginForm.username" placeholder="用户名" :prefix-icon="Avatar" />
          </el-form-item>
          <el-form-item prop="password" :rules="[{ required: true, message: '密码不能为空!' }]">
            <el-input v-model="loginForm.password" type="password" placeholder="密码" :prefix-icon="Lock" />
          </el-form-item>

          <div class="jump-link">
            <el-link @click="$router.push('/recover')">忘记密码</el-link>
          </div>

          <el-form-item prop="validCode">
            <el-button type="primary" :style="{ width: '100%' }" @click="handleLogin">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
  </div>
</template>
<style scoped>
.background {
  background-image: url('back.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  height: 100vh;
  width: 100vw;
}

:deep(.el-card__header) {
  padding: 0
}

.login-container {
  height: 100vh;

  .jump-link {
    text-align: right;
    margin-bottom: 10px;

  }

  .card-header {
    font-size: 25px;
    padding: 20px;
    margin: 10px 0;
    text-align: left;
  }
}
</style>
