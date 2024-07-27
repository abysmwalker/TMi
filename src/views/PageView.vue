<script setup lang="ts">

import AsideView from "./layout/AsideView.vue";
import HeaderView from "./layout/HeaderView.vue";
import MainView from "./layout/MainView.vue";
import { ref } from 'vue';

const dialogVisible = ref(false);
const dialogValue = ref('');
const clearChat = ref(false);


const handleOpenDialog = (value: string) => {
  dialogVisible.value = true;
  dialogValue.value = value;
};

const handleStartNewChat = () => {
  clearChat.value = true;
  // 在短暂延迟后重置 clearChat 以触发 MainView 中的变化
  setTimeout(() => clearChat.value = false, 0);
};

</script>

<template>
  <div class="common-layout">
    <el-container>
      <HeaderView />
    </el-container>
    <el-container>
      <AsideView @open-dialog="handleOpenDialog" @start-new-chat="handleStartNewChat" />
      <el-container>
        <MainView :dialogVisible="dialogVisible" :dialogValue="dialogValue" :clearChat="clearChat" />
      </el-container>
    </el-container>
  </div>
</template>



<style lang="scss" scoped></style>
