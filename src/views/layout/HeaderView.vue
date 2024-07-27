<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();
const username = ref('');
const handleLogout = () => {
    // 清空 localStorage
    localStorage.clear();

    // 跳转到登录页面
    router.push('/login');
};
onMounted(() => {
    username.value = localStorage.getItem('username') || '用户';
});

</script>

<template>
    <el-header class="header">
        <el-dropdown>
            <span class="el-dropdown-link">
                <el-avatar :size="50" :src="'../../src/assets/user-icon.png'" />
            </span>
            <template #dropdown>
                <el-dropdown-menu style="list-style-type: none;">
                    <el-dropdown-item>{{ username }}</el-dropdown-item>
                    <el-dropdown-item @click="handleLogout">退 出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </el-header>
</template>

<style lang="scss" scoped>
.header {
    position: fixed;
    top: 0%;
    left: 15%;
    width: 85%;
    height: 11.5%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
</style>
