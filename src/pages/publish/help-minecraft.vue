<template>
    <div class="wallpaper">
        <v-card class="public-card">
            <v-card-text>
                <img src="@/assets/sail.jpg" style="width: 100%; display: block;" class="mb-4">
                <p class="text-h5 mb-2">您好 (>.&lt;)/</p>
                <p class="my-1">本页面将帮助您加入<span v-if="isPrivateMode">&nbsp;{{ adminName }} 的 「{{ serverName }}」
                        服务器</span>
                    <span v-else>您朋友或您自己的 Minecraft 服务器</span>，提前感谢您接下来的耐心。一起去远航吧！</p>
                <p class="my-1">您也可以 <a class="text-blue" @click="copyURL()" style="cursor: pointer;">将本网页地址复制到剪贴板</a> 并发送给朋友。</p>
            </v-card-text>
        </v-card>

        <v-card class="public-card mt-5">
            <v-card-text>
                <p class="text-h6 mb-2">第一步、下载游戏本体</p>
                <p class="my-1">请点击下面的链接，下载游戏本体。</p>
                <v-btn class="w-100 my-2" variant="flat" color="blue" @click="downloadGame()">下载</v-btn>
            </v-card-text>
        </v-card>

        <v-card class="public-card mt-5">
            <v-card-text>
                <p class="text-h6 mb-2">第二步、打开客户端</p>
                <p class="my-1">解压压缩包，并打开其中的 <b>Game Launcher.exe</b> 文件。</p>
                <img src="@/assets/mchelp/run.png" style="width: 100%; display: block;" class="mt-3 elevation-2 rounded">
            </v-card-text>
        </v-card>

        <v-card class="public-card mt-5">
            <v-card-text>
                <p class="text-h6 mb-2">第三步、启动游戏</p>
                <p class="my-1">在打开游戏启动器（PCL）以后，请按照下图的指示设置您的游戏名并启动游戏。</p>
                <img src="@/assets/mchelp/setup-pcl.png" style="width: 100%; display: block;" class="mt-3 elevation-2 rounded">
            </v-card-text>
        </v-card>

        <v-card class="public-card mt-5">
            <v-card-text>
                <p class="text-h6 mb-2">第四步、添加服务器</p>
                <p class="my-1">在打开游戏以后，按顺序点击：「多人游戏」、「添加服务器」按钮。</p>
                <p class="my-1">您将打开下面界面。请复制&nbsp;<span v-if="isPrivateMode">{{ serverName }}</span>&nbsp;服务器的地址：</p>
                <p class="text-h6 text-blue"><code style="user-select: all;">{{ serverIP }}</code>
                </p>
                <p class="my-1">并粘贴到下面的界面中。如图所示。</p>
                <img src="@/assets/mchelp/server-ip.png" style="width: 100%; display: block;" class="mt-3 elevation-2 rounded">
            </v-card-text>
        </v-card>
    </div>
</template>

<style>
.public-card {
    max-width: 800px;
    min-width: 300px;
    margin: 0 auto;
    padding: 10px 20px !important;
    user-select: none;
}

p {
    font-size: 16px;
}
</style>

<script>
import { apiFetch } from '@/impl/api';
import axios from 'axios';
import copy from 'copy-to-clipboard';

export default {
    data() {
        return {
            serverName: "",
            adminName: "",
            serverIP: "",
            isPrivateMode: false,
        }
    },
    created() {
        if (!this.$route.query.userid) {
            this.isPrivateMode = false;
            return;
        }

        var vuethis = this;
        apiFetch("public?userid=" + this.$route.query.userid, (data) => {
            if (data['code'] == 200) {
                vuethis.isPrivateMode = true;
                vuethis.serverName = data['result']['name'];
                vuethis.serverIP = "play.mizuiro.xyz:" + new String(data['result']['port']);
                vuethis.adminName = data['result']['adminName'];
            } else {
                vuethis.isPrivateMode = false;
            }
        });
    },
    methods: {
        copyURL() {
            copy(window.location.href);
        },
        downloadGame() {
            window.open("https://aka.mizuiro.xyz/download_minecraft");
        }
    }
}
</script>