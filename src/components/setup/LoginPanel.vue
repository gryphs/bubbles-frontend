<template>
    <v-card class="setup-card" title="请登录">
        <v-card-text>
            <v-alert v-if="failedStatus" class="mb-4" text="后台暂未收到您的消息，请等几秒以后再点一次？" type="warning" variant="tonal"
                density="compact"></v-alert>
            <p class="text-center" style="font-size: 16px;">
                请扫描进入公众号<br />
                并向后台私信以下验证码以登录<br />
                辛苦啦
                <span class="my-2 d-block"><v-chip v-if="pin == ''" color="grey">
                        正在获取中...
                    </v-chip>
                    <span v-else style="font-weight: bold; font-size: 20px;">{{ pin }}</span></span>

            </p>
            <img src="@/assets/wechat_qr.jpg" style="width: 200px; margin: 0 auto; display: block;">
            <v-btn class="w-100 mt-2" color="blue" @click="$emit('checkPin')" :loading="loading">我发完啦！</v-btn>
            <p class="mt-2 text-grey-darken-2 text-center">您的服务器完全私密，只有验证微信才能管理</p>
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
        pin: "",
        failedStatus: false,
        loading: false,
    }
}
</script>