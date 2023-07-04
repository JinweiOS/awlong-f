<template>
  人数
  <el-input-number v-model="playerNum" :min="0" :max="10" />
  <el-button @click="getServerId">获取桌面码</el-button>
  <el-input v-model="serverCode" disabled></el-input>
</template>
<script setup>
import http from "@/util/http";
import { onMounted, ref } from "vue";
const playerNum = ref(6);
const serverCode = ref("");

onMounted(() => {
  if (sessionStorage.getItem("serverId")) {
    serverCode.value = sessionStorage.getItem("serverId");
  }
});

async function getServerId() {
  const { data: serverInfo } = await http.get("/server/create", {
    params: {
      peopleCount: playerNum.value,
    }
  });
  if (serverInfo.code === 0) {
    serverCode.value = serverInfo.data.serverId;
    sessionStorage.setItem("serverId", serverCode.value);
  }
}
</script>
