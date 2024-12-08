<script lang="ts" setup>
import type { LoginForm } from '@/models/user';
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
