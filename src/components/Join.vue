<template>
  <div class="flex justify-center">
    <img class="w-40 rounded-lg mt-20 mb-20" src="../assets/awlong.jpg" />
  </div>
  <div class="flex justify-center mb-4 text-[#606266] text-lg">
    📍欢迎来到阿瓦隆~
  </div>
  <div class="m-8">
    <el-form
      label-position="top"
      label-width="100px"
      :model="startInfo"
      :rules="rules"
      style="max-width: 460px"
      status-icon
    >
      <el-form-item label="请输入桌面码" prop="serverId">
        <el-input v-model="startInfo.serverId" placeholder="桌面码6位哦~" />
      </el-form-item>
      <el-form-item label="请输入姓名" prop="userName">
        <el-input
          v-model="startInfo.userName"
          placeholder="大家都是线下，就用真名拉~"
        />
      </el-form-item>
    </el-form>
  </div>
  <div class="flex justify-center mt-8">
    <el-button type="primary" size="large" @click="join">GO 加入游戏</el-button>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import http from "@/util/http";
const startInfo = reactive({
  serverId: "",
  userName: "",
});

const rules = reactive({
  serverId: [
    { required: true, message: "请输入桌面码", trigger: "blur" },
    { min: 6, max: 6, message: "长度必须是6位", trigger: "blur" },
  ],
  userName: [
    {
      required: true,
      message: "写上你的大名吧，别整活！！！",
      trigger: "blur",
    },
    { min: 2, max: 4, message: "咱中国人，2-4个字", trigger: "blur" },
  ],
});

async function join() {
  const { data: userInfo } = await http.get("/user/add", {
    params: {
      serverId: startInfo.serverId,
      userName: startInfo.userName,
    },
  });
  if (userInfo.code === 0) {
    sessionStorage.setItem("serverId", userInfo.data.serverId);
    sessionStorage.setItem("userId", userInfo.data.userId);
    // 路由跳转至home
    router.push("/home");
  }
}
</script>
