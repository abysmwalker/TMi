<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// 表单数据
const username = ref('');
const password = ref('');
const router = useRouter();

const onSubmit = (event: Event) => {
    event.preventDefault(); // 防止表单提交时页面刷新
    // 验证用户名和密码
    // if (!username.value.trim()) {
    //     ElMessage.error('请输入用户名');
    //     return;
    // }

    // if (!password.value.trim()) {
    //     ElMessage.error('请输入密码');
    //     return;
    // }
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find((user: { username: string, password: string }) =>
        user.username === username.value
    );
    // 如果用户名和密码匹配，显示成功消息
    if (username.value === 'admin') {
        if (password.value === '123') {
            ElMessage.success('登录成功！');
            localStorage.setItem('username', username.value); // 保存用户名
            const newId = Date.now().toString();
            router.push(`/page/${newId}`);
        } else {
            ElMessage.error('密码错误！');
        }

    } else if (user) {
        if (user.password == password.value) {
            ElMessage.success('登录成功！');
            localStorage.setItem('username', username.value); // 保存用户名
            const newId = Date.now().toString();
            router.push(`/page/${newId}`);
        } else {
            ElMessage.error('密码错误！');
        }


    } else {
        ElMessage.error('用户名不存在！');
    }
};

</script>

<template>

    <body>
        <div class="container">
            <div class="header">
                <h1>故障诊断助手</h1>
            </div>
            <div class="main">
                <form ref="formRef">
                    <span>
                        <el-icon>
                            <IEpUserFilled />
                        </el-icon>
                        <input v-model="username" type="text" class="username" placeholder="用户名" required>
                    </span><br>
                    <span>
                        <el-icon>
                            <IEpLock />
                        </el-icon>
                        <input v-model="password" type="password" class="password" placeholder="密码" required>
                    </span><br>
                    <span>
                        <button class="login" type="submit" @click="onSubmit">登 录</button>
                    </span><br>
                    <!-- <a href="./register">还没有账号，注册一下</a> -->
                    <router-link to="/register">没有账号？注册一个吧</router-link>

                </form>
            </div>
        </div>
    </body>

</template>>


<style scoped>
.container {
    width: 380px;
    height: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.1);
    /* 阴影部分 */
    box-shadow: 0 0 17px #333;
    position: absolute;
}

.header {
    text-align: center;
    padding-top: 30px;
    font-family: Arial, Helvetica, sans-serif;
}

.header h1 {
    color: #414141;
    font-size: 25px;
    margin-bottom: 30px;
}

.main {
    text-align: center;
}

.main input,
button {
    width: 300px;
    height: 40px;
    /* 边框消失 */
    border: none;
    /* 选中的时候的边框提醒去掉 */
    outline: none;
    padding-left: 40px;
    box-sizing: border-box;
    font-size: 15px;
    color: #ffffff;
    margin-bottom: 25px;

}

.main input {
    color: #000000;
}

.main button {
    width: 150px;
    height: 40px;
    cursor: pointer;
    border-radius: 10px;
}

.main button {
    padding-left: 0;
    background-color: #2f68ab;
    letter-spacing: 1px;
    font-weight: bold;
    margin-bottom: 70px;
}

.main button:hover {
    box-shadow: 2px 2px 5px #555;
    background-color: #7799d4;
}

.main input:hover {
    box-shadow: 2px 2px 5px #555;
    background-color: #ddd;
}

.main span {
    /* 相对定位 */
    position: relative;
}

.main i {
    position: absolute;
    left: 15px;
    color: #333;
    font-size: 16px;
    top: 2px;
}
</style>>