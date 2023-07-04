<template>
  <!-- 获取并展示所有用户信息 -->
  <div class="flex ml-4 mb-4 text-[#606266]">
    📍开始非任务投票<span
      class="text-[#64748b] text-xs font-normal leading-7 ml-1"
      >决定当前任务是否发车</span
    >
  </div>
  <div class="flex ml-4">
    <el-button @click="launchNonTaskVoting('nottask')">发起非任务投票</el-button>
  </div>
  <el-divider content-position="center">⚖️</el-divider>
  <div class="flex ml-4 mb-4 mt-4 text-[#606266]">
    🫧开始任务投票<span class="text-[#64748b] text-xs font-normal leading-7 ml-1"
      >挑选人员，发起任务</span
    >
  </div>
  <div class="m2 shadow-sm border-[#e4e7ed] border-1 border-solid rounded-lg">
    <el-checkbox-group
      v-model="pickedUser"
      class="flex m-2 flex-wrap"
      @change="pickStatus($event)"
    >
      <el-checkbox
        v-for="user in refUsers"
        :label="user.userId"
        size="large"
        :border="true"
        class="m-2"
      >
        <div class="w-12">{{ user.userName }}</div>
      </el-checkbox>
    </el-checkbox-group>
  </div>
  <div class="mt-4 flex justify-center">
    <el-button @click="launchTaskVoting('task')">发起任务投票</el-button>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import http from "@/util/http";
const pickedUser = ref([]);
const refUsers = ref([]);

onMounted(() => {
  getAllUsers();
});

async function launchNonTaskVoting(turnType) {
  // TODO: http请求，发起任务
  await http.post("/task/launch", {
    ids: refUsers.value.map((user) => user.userId),
    serverId: sessionStorage.getItem("serverId"),
    turnType
  });
}

// 需要挑选用户信息
async function launchTaskVoting(turnType) {
  await http.post("/task/launch", {
    ids: pickedUser.value,
    serverId: sessionStorage.getItem("serverId"),
    turnType
  });
}

// 获取所有用户信息
async function getAllUsers() {
  const { data: allUsers } = await http.get("/user/info/all", {
    params: {
      serverId: sessionStorage.getItem("serverId") || "630946",
    },
  });
  if (allUsers.code === 0) {
    refUsers.value = allUsers.data;
    console.log(refUsers.value);
  }
}

function pickStatus(event) {
  console.log(event);
  console.log(pickedUser.value);
}
</script>
