<template>
  <div class="wallpaper">
    <v-card class="setup-card">
      <v-card-text>
        <v-alert class="mb-3" title="页面不存在" text="您当前访问的页面不存在。" type="error" variant="tonal"></v-alert>
        <br />
        <v-btn class="w-100" color="blue" @click="$router.push('/')">转到首页</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
</script>
