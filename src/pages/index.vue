<template>
  <div class="wallpaper">
    <v-card class="setup-card">
      <v-card-text>
        <img src="@/assets/motd.jpg" style="width: 100%; display: block;" class="mb-4">
        <p class="text-h5 mb-2">你好 (>.&lt;)/</p>
        <p class="mb-4">这是一个实验性的项目，可以让你很方便地在MC里和朋友联机一起玩儿。有多简单呢？只需要下面几个步骤：</p>

        <div class="setup-intro my-5">
          <img src="@/assets/steps.png" style="width: 100%; max-width: 300px; margin: 0 auto; display: block;">
          <!-- <v-card class="mx-auto mb-2" variant="tonal" color="blue-lighten-1" prepend-icon="mdi-pen"
            subtitle="给服务器取个名字，然后就开好辣！" title="超方便"></v-card> -->
          <!-- <v-card class="mx-auto  mb-2" variant="tonal" color="blue-darken-1" prepend-icon="mdi-account-lock-outline"
            subtitle="只有你允许的玩家名字才能加入游戏。" title="2. 选择你的伙伴"></v-card>
          <v-card class="mx-auto" variant="tonal" color="blue-darken-3" prepend-icon="mdi-cloud-download"
            subtitle="下载能直接游玩的游戏本体，然后一起玩儿就好啦。" title="3. 下载游戏"></v-card> -->
        </div>
        <p class="my-1">在之后，你还可以到服务器后台，给服务器安装模组、设置管理员儿、在服务器控制台输入指令之类的。</p>
        <p class="my-1">那么，要来试试嘛？</p>
        <br />
        <v-btn class="w-100" color="blue" @click="$router.push('/login/')">开始</v-btn>
      </v-card-text>
    </v-card>

    <v-card density="compact" class="setup-card-np mt-5">
      <v-card-text>
        <p class="text-center">image credit <a class="text-blue" href="https://www.pixiv.net/users/144415"
            style="text-decoration: none;">@さきの新月 (pixiv)</a></p>
        <p class="text-center text-grey">Project Mizuiro 1.0</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
</script>
