<template>
    <div class="wallpaper">
        <div>
            <v-card class="setup-card settings-card">
                <v-card-text>
                    <div class="w-100 mb-4">
                        <v-btn class="w-25" prepend-icon="mdi-arrow-left" variant="tonal" color="grey"
                            @click="$router.back()">
                            返回
                        </v-btn>
                    </div>
                    <img src="@/assets/bluemap.jpg" style="width: 100%; display: block;" class="mb-4">
                    <p class="text-h5">网页地图</p>
                    <p class="text-grey my-1">即使不打开MC，也可以在浏览器上查看世界地图，以及在线的玩家。
                    </p>
                    <div class="mt-4">
                        <p class="my-2 text-red text-center" v-if="isStoppedServer()"><v-icon class="me-1" color="red" icon="mdi-close"></v-icon>只有服务器是开启状态时才能使用喔</p>
                        <v-btn class="w-100 mt-2" color="blue" variant="tonal" @click="menuClick()">打开网页地图</v-btn>
                        <v-btn class="w-100 mt-2" color="grey" variant="tonal" @click="copyClick()">复制网页地图网址</v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
import copy from 'copy-to-clipboard';

export default {
    created() {
    },
    methods: {
        menuClick() {
            let mapAddr = "play.mizuiro.xyz:" + new String(parseInt(localStorage.getItem("port"))+1);
            window.open('http://' + mapAddr);
        },
        isStoppedServer() {
            return (!localStorage.getItem("lastStatus") || localStorage.getItem("lastStatus") != '3');
        },
        copyClick() {
            let mapAddr = "play.mizuiro.xyz:" + new String(parseInt(localStorage.getItem("port"))+1);
            copy(mapAddr);
        }
    },
    data() {
        return {
        };
    },

};
</script>