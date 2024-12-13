<script setup lang="ts">
import { RouterView } from 'vue-router'

</script>

<template>
  <RouterView />
</template>

<style scoped>
* {
  box-sizing: border-box;
  font-family: Roboto, sans-serif;
}

body {
  height: 100vh;
}

#app {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  transform: none;
  min-height: 100vh;
}


#app::before {
  content: "";
  position: fixed;
  top: -10px;
  left: -314px;
  right: -10px;
  bottom: -10px;
  background-image: url("https://cdn.friendship.org.cn/LightPicture/2024/12/83035360e8a255f1.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  filter: blur(2px);
  z-index: -1;
}
</style>
