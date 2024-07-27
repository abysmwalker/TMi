<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { ElIcon } from 'element-plus';
import { isCollapse } from './isCollapse';

interface Message {
    id: number;
    type: 'user' | 'gpt';
    content: string;
}

const messages = ref<Message[]>([]);
const newMessage = ref('');
const isSending = ref(false); // 新增状态：是否正在发送消息

// 获取当前路由
const route = useRoute();

// 从 localStorage 加载聊天记录
const loadMessagesFromLocalStorage = () => {
    const key = `${route.fullPath}`;
    const savedMessages = localStorage.getItem(key);
    if (savedMessages) {
        messages.value = JSON.parse(savedMessages);
    } else {
        messages.value = []; // 如果没有找到消息，则初始化为空数组
    }
};

// 保存聊天记录到 localStorage
const saveMessagesToLocalStorage = () => {
    const key = `${route.fullPath}`;
    localStorage.setItem(key, JSON.stringify(messages.value));
};

// 处理发送消息
const sendMessage = async () => {
    if (newMessage.value.trim() === '' || isSending.value) return; // 如果消息内容为空或者正在发送，则直接返回

    isSending.value = true; // 设置状态为正在发送

    // 创建用户消息
    const userMessage: Message = { id: Date.now(), type: 'user', content: newMessage.value };
    messages.value.push(userMessage);

    // 获取 GPT 响应
    const response = await getGptResponse(newMessage.value);
    // 创建 GPT 消息
    const gptMessage: Message = { id: Date.now(), type: 'gpt', content: response };
    messages.value.push(gptMessage);

    // 保存聊天记录
    saveMessagesToLocalStorage();
    newMessage.value = '';
    isSending.value = false; // 发送完成后，重置状态
};


// 模拟获取 GPT 响应
const getGptResponse = async (message: string): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`你好，我是TMi助手，您的私人管家！ \n"${message}"`), 1000);
    });
};

// 监听路由变化
watch(() => route.fullPath, (newPath, oldPath) => {
    if (newPath !== oldPath) {
        loadMessagesFromLocalStorage();
    }
});

// 在组件初始化时加载聊天记录
loadMessagesFromLocalStorage();
</script>

<template>
    <div class="chat-box" :style="{ width: isCollapse ? '90%' : '80%' }">
        <div class="messages">
            <div v-for="message in messages" :key="message.id" :class="['message-wrapper', message.type]">
                <div v-if="message.type === 'user'" class="message-icon">
                    <el-icon :size="40" color="black" style="margin-left: 30%;">
                        <IEpAvatar />
                    </el-icon>
                </div>
                <div v-if="message.type === 'gpt'" class="message-icon">
                    <img src="../../assets/logo.jpg" alt="GPT Icon" class="gpt-icon" />
                </div>
                <div class="message-content">{{ message.content }}</div>
            </div>
        </div>
        <div class="input-container">
            <input v-model="newMessage" @keydown.enter="sendMessage" placeholder="Type your message..." />
            <button @click="sendMessage" class="send-button" :disabled="isSending">Send</button>
        </div>
    </div>
</template>

<style scoped>
.chat-box {
    display: flex;
    flex-direction: column;
    height: 85%;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    margin-left: 5%;
}

.messages {
    flex: 1;
    padding: 15px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-left: 2%;
    max-width: 100%;
}

.message-wrapper {
    display: flex;
    align-items: flex-start;
    max-width: 98%;
}

.user {
    flex-direction: row-reverse;
}

.gpt {
    flex-direction: row;
}

.message-icon {
    margin-right: 10px;
    display: flex;
    align-items: center;
    position: relative;
}

.gpt-icon {
    width: 120px;
    height: 35px;
    margin-top: 5%;
}

.message-content {
    padding: 10px 15px;
    border-radius: 20px;
    font-size: 20px;
    line-height: 1.4;
    background-color: #e5e5e5;
    word-wrap: break-word;
    overflow-wrap: break-word;
    max-width: 80%;
}

.user .message-content {
    background-color: #007bff;
    color: #fff;
    border-top-left-radius: 0;
}

.gpt .message-content {
    background-color: #e5e5e5;
    color: #333;
    border-top-right-radius: 0;
}

.input-container {
    display: flex;
    padding: 30px;
    border-top: 1px solid #ddd;
    background-color: #fff;
}

input {
    flex: 1;
    padding: 15px;
    border: 2px solid #ddd;
    border-radius: 20px;
    font-size: 25px;
    outline: none;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
}

input:focus {
    border-color: #007bff;
}

.send-button {
    margin-left: 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    background-color: #007bff;
    color: #fff;
    font-size: 25px;
    cursor: pointer;
    outline: none;
}

.send-button:disabled {
    background-color: #b0b0b0;
    cursor: not-allowed;
}

.send-button:hover:disabled {
    background-color: #b0b0b0;
}
</style>
