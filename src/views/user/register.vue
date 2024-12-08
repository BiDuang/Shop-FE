<script lang="ts" setup>
import type { RegisterForm } from '@/models/user';
import useUserStore from '@/stores/user';
import { reactive } from 'vue';

const userStore = useUserStore();
const registerForm = reactive<RegisterForm>({
    username: '',
    password: '',
    email: '',
    captcha: '',
});

</script>