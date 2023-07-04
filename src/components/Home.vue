<script setup>
import VoteComp from './Vote.vue'
import PickComp from './Pick.vue'
import { ref } from "vue";

const activeName = ref("first");

const handleClick = (tab, event) => {
  // console.log(tab, event);
};
</script>

<template>
  <h1>阿瓦隆投票器</h1>
  <el-tabs :stretch="true" v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane name="first"><template v-slot:label>🎮玩家</template>
      <vote-comp></vote-comp>
    </el-tab-pane>
    <el-tab-pane label="发车" name="second"><template v-slot:label>🚜发车</template>
      <pick-comp></pick-comp>
    </el-tab-pane>
  </el-tabs>
</template>
