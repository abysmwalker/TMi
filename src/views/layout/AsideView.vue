<script setup lang="ts">
import { isCollapse } from './isCollapse'
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import './global.scss';
import HistoryMenu from './HistoryMenu.vue'


const emit = defineEmits(['open-dialog', 'start-new-chat']);
const router = useRouter(); // 使用 router 实例
const dialogVisible = ref(false)

const handleDialogOpen = () => {
    emit('open-dialog', '设置的值')  // 传递值
    dialogVisible.value = true
}
const handleNewChat = () => {
    emit('start-new-chat');
    const newId = Date.now().toString(); // 使用当前时间戳作为唯一标识
    // 使用 router.push 方法导航到新页面，传递动态参数
    router.push({ name: 'page', params: { id: newId } });
};

</script>

<template>
    <el-aside class="aside">
        <!-- <el-row class="tac" type='flex' justify="center">
        <el-col :span="20"> -->
        <el-menu router unique-opened :collapse="isCollapse">
            <el-menu-item class="is-loading" @click="handleNewChat">
                <el-icon>
                    <IEpChatSquare />
                </el-icon>
                <span> 新的对话</span>
            </el-menu-item>

            <el-menu-item index="/problem">
                <el-icon>
                    <IEpQuestionFilled />
                </el-icon>
                <span> 常见问题</span>
            </el-menu-item>

            <el-sub-menu class="custom-history-menu">
                <template #title>
                    <el-icon>
                        <IEpChatLineSquare />
                    </el-icon>
                    <span style="font-size: 25px; color: #f6f6f6;"> 历史记录</span>
                </template>
                <HistoryMenu />
            </el-sub-menu>

            <el-menu-item class="bottom-item" @click="handleDialogOpen">
                <el-icon>
                    <IEpSetting />
                </el-icon>
                <span> 设置</span>
            </el-menu-item>

            <!-- <el-menu-item index="/5" disabled>
              <el-icon><Opportunity /></el-icon>
              <span>关于TMi</span>
            </el-menu-item> -->
        </el-menu>
        <!-- </el-col>
      </el-row> -->
        <el-icon class="arrow-icon" :style="{ right: isCollapse ? '65%' : '5%' }" @click="isCollapse = !isCollapse">
            <IEpDArrowRight v-show="isCollapse" />
            <IEpDArrowLeft v-show="!isCollapse" />
        </el-icon>

    </el-aside>
</template>

<style lang="scss" scoped>
.aside {
    font-size: 30px;
    position: fixed;
    width: 15%;
    top: 11%;
    left: 0%;
    background-color: #2d2d2d00;
    height: 100vh;
    color: #f6f6f6;
    overflow-y: auto;
    display: flex;


}


.el-menu {
    left: 0%;
    font-size: 20px;
    width: 100%;
    background-color: #292626;
    color: #f6f6f6;
    border-right: none;
    margin-top: 0%;
    align-items: center;
    justify-content: flex-start;

    &.el-menu--collapse {

        width: 100%;

        & h1 {
            display: none;
        }
    }
}

.arrow-icon {
    position: absolute;
    top: 35%;
    font-size: 15px;
    transition: right 1s ease;


}

.el-icon {
    margin-right: 8%;
    margin-left: 3%;
    transform: scale(2.3);
    color: #f6f6f6;
}


.el-menu-item {
    font-size: 25px;
    margin-top: 30px;
    margin-bottom: 40px;
    font-family: Arial, Helvetica, sans-serif;
    color: #f6f6f6;
}

.el-menu-item:hover {
    background-color: #7d7a7a;
    /* Background color when hovering over menu item */
}

.bottom-item {
    font-size: 25px;

    bottom: -45%;
}
</style>
