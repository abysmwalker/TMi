<script setup lang="ts">
import { ref, watch } from 'vue'
import SlideButton from './SlideButton.vue'
import DialogView from "./DialogView.vue"
import { isCollapse } from './isCollapse'

const props = defineProps<{
    dialogVisible: boolean
    dialogValue: string
    clearChat: boolean
}>()

const emit = defineEmits<{
    (e: 'clear-chat'): void
}>()

const localDialogVisible = ref(props.dialogVisible)
const localDialogValue = ref(props.dialogValue)
const isDarkMode = ref(false)
const messages = ref<string[]>([]); // 用于存储聊天记录

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

// 清除聊天记录的逻辑
watch(() => props.clearChat, (newVal) => {
    if (newVal) {
        messages.value = []; // 清空聊天记录
        emit('clear-chat');
    }
});
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
        <DialogView :messages="messages" />
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
    color: antiquewhite;
    font-size: 16px;
    display: flex;
    align-items: center;
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
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 10px;
}

.message-list {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 10px;
}

.message {
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 5px;
}

.message.user {
    background: #d1f0ff;
    align-self: flex-end;
}

.message.ai {
    background: #f0f0f0;
    align-self: flex-start;
}

.input-container {
    display: flex;
    gap: 10px;
    align-items: center;
}

input {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 5px;
}
</style>
