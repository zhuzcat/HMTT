<script setup lang="ts">
import theme from "@/config/theme";
const themeVars = theme;
</script>

<template>
  <VanConfigProvider :theme-vars="themeVars">
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component
          :is="Component"
          :key="route.meta.keepAlive ? route.path : Date.now()"
          v-if="route.meta.keepAlive"
        />
      </keep-alive>
      <component
        :is="Component"
        :key="route.meta.keepAlive ? route.path : Date.now()"
        v-if="!route.meta.keepAlive"
      />
    </router-view>
  </VanConfigProvider>
</template>

<style></style>
