<script setup>
import VoteComp from "./Vote.vue";
import PickComp from "./Pick.vue";
import { ref, onMounted } from "vue";
import http from "@/util/http";

const activeName = ref("first");
const showVote = ref(false);
const userInfo = ref([])
const votionInfo = ref([])

import { getSocket } from "@/util/ws";
onMounted(async () => {
  const socket = await getSocket();
  socket.addEventListener("message", (msg) => {
    const data = JSON.parse(msg.data);
    console.log(data)
    if (data.vote) {
      showVote.value = true;
      return;
    }
    if (data.type === "voteinfo") {
      votionInfo.value = data.data;
      return;
    }
    if (data.type === "useradd") {
      console.log(data.data, 'useradd')
      userInfo.value = data.data;
      return;
    }
  });
});

async function vote(type) {
  const { data: res } = await http.get("/user/vote", {
    params: {
      userId: sessionStorage.getItem("userId"),
      serverId: sessionStorage.getItem("serverId"),
      votion: type,
    },
  });
  if (res.code === 0) {
    showVote.value = false;
  }
}

async function resetTurn() {
  const { data: res } = await http.get("/turn/reset", {
    params: {
      serverId: sessionStorage.getItem("serverId"),
    },
  });
  if (res.code === 0) {
    showVote.value = false;
  }
}
</script>

<template>
  <div class="mb-4 mt-4 flex justify-center text-[#606266] text-3xl">
    阿瓦隆投票器
  </div>
  <el-tabs :stretch="true" v-model="activeName" class="demo-tabs">
    <el-tab-pane name="first"
      ><template v-slot:label>🎮玩家</template>
      <vote-comp :data="votionInfo"></vote-comp>
    </el-tab-pane>
    <el-tab-pane label="发车" name="second"
      ><template v-slot:label>🚜发车</template>
      <pick-comp :data="userInfo"></pick-comp>
    </el-tab-pane>
  </el-tabs>

  <!-- 投票组件 -->
  <el-drawer
    v-model="showVote"
    direction="btt"
    :close-on-click-modal="false"
    :show-close="true"
    @close="resetTurn"
  >
    <template v-slot:header>
      <div>💯 投票器</div>
    </template>
    <div class="h-full flex justify-around">
      <div class="mt-2">
        <el-button
          @click="vote('agree')"
          size="large"
          type="primary"
          icon="Check"
          circle
        />
        <div class="mt-1 text-[#64748b] flex text-sm justify-center">赞成</div>
      </div>

      <div class="mt-2">
        <el-button
          @click="vote('disagree')"
          size="large"
          type="danger"
          icon="Close"
          circle
        />
        <div class="mt-1 text-[#64748b] flex text-sm justify-center">反对</div>
      </div>
    </div>
  </el-drawer>
</template>
