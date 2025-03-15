<template>
    <v-card class="setup-card settings-card">
        <v-card-text>
            <img src="@/assets/sail.jpg" style="width: 100%; display: block;" class="mb-4">
            <p class="m-0 text-grey">属于你的「{{ serverName }}」</p>
            <p class="text-h6">欢迎回来，{{ adminName }}</p>
            <v-divider class="border-opacity-75 my-4" color="info"></v-divider>
            <p class="text-h6 text-blue"><code style="user-select: all;">{{ serverAddress }}</code>
                <v-chip class="ms-2" density="comfortable" size="small" :prepend-icon="chipIcon" :color="chipColor" @click="$emit('refreshStatus')">
                    {{ chipMessage }}
                    <v-tooltip activator="parent" location="bottom">点击以刷新</v-tooltip>
                </v-chip>
            </p>
            <p class="text-grey">请在「多人游戏」中粘贴上面的服务器 IP</p>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        adminName: "",
        serverName: "",
        serverAddress: "",
        status: 0
    },
    computed: {
        chipIcon() {
            switch (this.status) {
                case 0:
                    return "mdi-close";
                case 1:
                case 2:
                    return "mdi-reload";
                case 3:
                    return "mdi-check";
                case 4:
                    return "mdi-help";
                default:
                    return "mdi-help";
            }
        },
        chipColor() {
            switch (this.status) {
                case 0:
                    return "red";
                case 1:
                case 2:
                    return "grey";
                case 3:
                    return "green";
                default:
                    return "blue";
            }
        },
        chipMessage() {
            switch (this.status) {
                case 0:
                    return "已关闭";
                case 1:
                    return "正在关闭";
                case 2:
                    return "正在开启";
                case 3:
                    return "运行中";
                case 4:
                    return "查询状态中"
                default:
                    return "未知";
            }
        }
    }
}
</script>