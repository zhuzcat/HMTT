<script setup lang="ts">
import theme from "@/config/theme";
const themeVars = theme;
</script>

<template>
  <VanConfigProvider :theme-vars="themeVars">
    <router-view></router-view>
  </VanConfigProvider>
</template>

<style></style>
