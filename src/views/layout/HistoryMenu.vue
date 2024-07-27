<template>
    <el-menu :default-active="activeMenuItem">
        <el-menu-item v-for="item in historyItems" :key="item.url" @click="handleItemClick(item.url)">
            <span>{{ item.name }}</span>
        </el-menu-item>
    </el-menu>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

interface HistoryItem {
    name: string;
    url: string;
}

const historyItems = ref<HistoryItem[]>([]);
const activeMenuItem = ref<string | null>(null);
const router = useRouter();
const route = useRoute();

// 从 localStorage 加载历史记录项
const loadHistoryItems = () => {
    const keys = getAllKeys();
    const items: HistoryItem[] = keys
        .filter(key => key.startsWith('/page')) // 只处理以 '/page' 开头的键名
        .map(key => {
            const savedMessages = localStorage.getItem(key);
            if (savedMessages) {
                try {
                    const messages = JSON.parse(savedMessages);
                    const firstMessageContent = messages.length > 0 ? messages[0].content : '';
                    const shortName = firstMessageContent.slice(0, 8); // 提取前8个字符
                    return {
                        // name: `${key}`, 
                        name: shortName,
                        url: `${key}`
                    };
                } catch (e) {
                    console.error('解析聊天记录数据时出错:', e);
                }
            }
            return null;
        }).filter(item => item !== null) as HistoryItem[];

    historyItems.value = items;
};

// 获取 localStorage 中所有的键名
const getAllKeys = (): string[] => {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        keys.push(localStorage.key(i) || '');
    }
    return keys;
};

// 处理菜单项点击
const handleItemClick = (url: string) => {
    router.push(url);
    activeMenuItem.value = url;
};

// 监听路由变化，动态更新历史记录
watch(() => route.fullPath, () => {
    loadHistoryItems();
});

// 在组件初始化时加载历史记录
onMounted(() => {
    loadHistoryItems();
});
</script>

<style scoped>
.el-menu-item {
    color: #f6f6f6;
    background-color: #292626;
    font-size: 20px;
}

.el-menu-item:hover {
    background-color: #7d7a7a;
}
</style>
