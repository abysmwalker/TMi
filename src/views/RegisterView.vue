<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// 表单数据
const username = ref('');
const password = ref('');
const repassword = ref('');
const router = useRouter();

const toLogin = (event: Event) => {
    event.preventDefault(); // 防止表单提交时页面刷新

    // 校验用户名（必须是英文字母）
    const usernamePattern = /^[a-zA-Z]+$/;
    if (!usernamePattern.test(username.value)) {
        ElMessage.error('用户名必须是英文字母！');
        return;
    }

    // 校验密码（必须是英文字母和数字，且大于6位）
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{7,}$/;
    if (!passwordPattern.test(password.value)) {
        ElMessage.error('密码必须包含英文字母和数字，且长度大于6位！');
        return;
    }

    // 验证确认密码
    if (password.value !== repassword.value) {
        ElMessage.error('两次输入密码不一致！');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some((user: { username: string }) => user.username === username.value);

    if (userExists) {
        ElMessage.error('用户名已存在！');
        return;
    }

    users.push({
        username: username.value,
        password: password.value
    });
    localStorage.setItem('users', JSON.stringify(users));

    // 注册成功
    ElMessage.success('注册成功！');
    router.push('/login');
};
</script>


<template>

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TMi</title>
        <!-- <link rel="stylesheet" href="../assets/main.css"> -->
        <!-- <link rel="stylesheet" href="../assets/font/css/all.min.css"> -->
        <!-- <script src="js/jq.js"></script> -->
    </head>

    <body>
        <div class="container">
            <div class="header">
                <h1>新用户注册</h1>
            </div>
            <div class="main">
                <form>
                    <span>
                        <el-icon>
                            <IEpUserFilled />
                        </el-icon>
                        <input v-model="username" type="text" placeholder="用户名" required>
                    </span><br>
                    <span>
                        <el-icon>
                            <IEpLock />
                        </el-icon>
                        <input v-model="password" type="password" placeholder="密码" required>
                    </span><br>
                    <span>
                        <el-icon>
                            <IEpLock />
                        </el-icon>
                        <input v-model="repassword" type="password" placeholder="确认密码" required>
                    </span><br>
                    <button @click="toLogin">注 册</button>
                </form>
            </div>
        </div>

    </body>

</template>>



<style scoped>
.container {
    width: 380px;
    height: 350px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.1);
    /* 阴影部分 */
    box-shadow: 0 0 17px #333;
}

.header {
    text-align: center;
    padding-top: 20px;
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
    margin-bottom: 20px;
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