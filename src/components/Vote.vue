<template>
  <div class="flex justify-center items-center mb-4">
    <el-button @click="getVoteStatus">手动刷新投票状态</el-button>
  </div>
  <el-collapse v-model="turns">
    <el-collapse-item v-for="turn in votion">
      <template v-slot:title
        ><div class="ml-2">
          第<span class="text-2xl pl-1 pr-1 text-[#337ecc]">
            {{ turn.turnIndex }}</span
          >轮投票结果
        </div></template
      >
      <div class="flex">
        <div
          v-for="disagree in turn.disagree"
          class="w-20 h-20 rounded-lg bg-[#fef0f0] shadow-md flex justify-center items-center text-4xl text-[#f56c6c] m-2"
        >
          <el-icon><CircleCloseFilled /></el-icon>
        </div>
        <div
          v-for="agree in turn.agree"
          class="w-20 h-20 rounded-lg bg-[#ecf5ff] shadow-md flex justify-center items-center text-4xl text-[#337ecc] m-2"
        >
          <el-icon><SuccessFilled /></el-icon>
        </div>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup>
import { ref } from "vue";
import http from "@/util/http";

const votion = ref([]);

async function getVoteStatus() {
  const { data: voteStatus } = await http.get("/turns/info", {
    params: {
      serverId: sessionStorage.getItem("serverId") || "548235",
    },
  });
  if (voteStatus.code === 0) {
    const result = voteStatus.data;
    Object.keys(result).forEach((v) => {
      const agree = [];
      const disagree = [];
      result[v].turnsInfo.forEach((voteFlag) => {
        voteFlag ? agree.push(voteFlag) : disagree.push(voteFlag);
      });
      result[v].agree = agree;
      result[v].disagree = disagree;
      votion.value.push({ turnIndex: parseInt(v) + 1, ...result[v] });
    });
  }
}

const turns = ref(["1"]);
</script>
