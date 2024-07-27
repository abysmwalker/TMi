<script setup lang="ts">
import { ref, watch } from 'vue'
import SlideButton from './SlideButton.vue'
import { isCollapse } from './isCollapse'

const props = defineProps<{
    dialogVisible: boolean
    dialogValue: string
}>()

const localDialogVisible = ref(props.dialogVisible)
const localDialogValue = ref(props.dialogValue)
const isDarkMode = ref(false)

// 监听属性变化
watch(() => props.dialogVisible, (newVal) => {
    localDialogVisible.value = newVal
})

watch(() => props.dialogValue, (newVal) => {
    localDialogValue.value = newVal
})

const handleClose = () => {
    localDialogVisible.value = false
}

// 处理 SlideButton 发出的 toggle-color 事件
const handleToggleColor = (active: boolean) => {
    isDarkMode.value = active
}

// 模拟问答内容
const messages = ref<{ id: number, type: 'user' | 'ai', content: string }[]>([
    { id: 1, type: 'user', content: '你好！' },
    { id: 2, type: 'ai', content: '你好！有什么我可以帮助你的吗？' },
    { id: 3, type: 'user', content: '你能告诉我今天的天气吗？' },
    { id: 4, type: 'ai', content: '今天的天气晴朗，气温在 20°C 到 25°C 之间。' }
])
</script>

<template>
    <el-main class="main" :class="{ 'collapsed': isCollapse, 'expanded': !isCollapse, 'dark-mode': isDarkMode }">
        <!-- MainView 内容 -->
        <el-dialog class="custom-dialog" v-model="localDialogVisible" width="500" @close="handleClose">
            <div class="dialog-content">
                <span class="dialog-text">主题切换</span>
                <div class="dialog-footer">
                    <SlideButton @toggle-color="handleToggleColor" />
                </div>
            </div>
        </el-dialog>

        <!-- 问答内容区域 -->
        <div class="chat-container" :style="{ width: isCollapse ? '95%' : '85%' }">
            <div class="message-list">
                <div v-for="message in messages" :key="message.id" :class="['message', message.type]">
                    <div class="message-content">
                        {{ message.content }}
                    </div>
                </div>
            </div>
        </div>
    </el-main>
</template>

<style lang="scss" scoped>
.custom-dialog {
    background-color: #f0f0f0;
}

.dialog-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
}

.dialog-text {
    flex: 1;
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
}

.main {
    position: fixed;
    top: 11%;
    bottom: 0;
    background: #e7e2e2;
    width: 95%;
    height: 90vh;
    color: rgb(13, 13, 12);
    font-size: 16px;
    display: flex;
    flex-direction: column;
    transition: background-color 0.5s ease;
}

.main.collapsed {
    left: 5%;
    transition: left 0.5s ease;
}

.main.expanded {
    left: 15%;
    transition: left 1s ease;
}

.main.dark-mode {
    background-color: #5d5959;
}

.chat-container {
    flex-direction: column;
    height: 90%;
    /* Adjust height to fit the container */
    width: 85%;
    margin-left: 2%;
    margin-top: 1%;
    padding: 10px;
    border-radius: 25px;
    background: #ffffff;
}

.message-list {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 10px;
}

.message {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 5px;
    max-width: 100%;
    word-wrap: break-word;
}

.message.user {
    justify-content: flex-end;
}

.message.ai {
    justify-content: flex-start;
}

.message-content {
    background: #d1f0ff;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
}

.message.ai .message-content {
    background: #f0f0f0;
}
</style>