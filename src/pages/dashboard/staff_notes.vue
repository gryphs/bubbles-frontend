<template>
    <div class="wallpaper">
        <div>
            <v-snackbar :timeout="2000" v-model="snakebar.toggle" :color="snakebar.color">
                {{ snakebar.msg }}
            </v-snackbar>
            <v-card class="setup-card settings-card">
                <v-card-text>
                    <div class="w-100 mb-4">
                        <v-btn class="w-25" prepend-icon="mdi-arrow-left" variant="tonal" color="grey"
                            @click="$router.back()">
                            返回
                        </v-btn>
                    </div>
                    <p class="text-h5">STAFF 备注</p>
                    <p class="text-grey my-1">如果您需要管理员的帮助，请在此处写下详细需求。</p>

                    <div class="mt-4">
                        <v-textarea v-model="contents" label="小纸条" variant="solo-filled"
                            style="min-height: 160px;"></v-textarea>
                        <v-btn class="w-100 mt-2" color="blue" variant="tonal" :loading="loading" prepend-icon="mdi-lock-check"
                            @click="setContents()">保存</v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
import { API_PREFIX } from '@/impl/api';
import { redirectLogin } from '@/impl/utils';
import axios from 'axios';

export default {
    created() {
        redirectLogin();
        this.getContents();
    },
    methods: {
        getContents() {
            let vuethis = this;
            axios.get(API_PREFIX + "/static/staff_notes/read", { withCredentials: true })
                .then(function (data) {
                    if (data.data != 'NO_CONTENTS') {
                        vuethis.contents = data.data;
                    }
                })
                .catch(function (error) {
                    alert("(＞人＜；) 对不起，出现错误：\n" + error);
                })
        },
        setContents() {
            let vuethis = this;
            this.loading = true;
            axios.post(API_PREFIX + "/static/staff_notes/create", {
                content: this.contents
            }, { withCredentials: true })
                .then(function (data) {
                    vuethis.loading = false;
                    if (data.data['code'] != 200) {
                        vuethis.snakebar.msg = "抱歉，没有保存成功，请联系管理员";
                        vuethis.snakebar.color = "orange";
                        vuethis.snakebar.toggle = true;
                        return;
                    } else {
                        vuethis.snakebar.msg = "保存成功";
                        vuethis.snakebar.color = "green";
                        vuethis.snakebar.toggle = true;
                    }
                })
                .catch(function (error) {
                    alert("(＞人＜；) 对不起，出现错误：\n" + error);
                })
        }
    },
    data() {
        return {
            contents: "",
            loading: false,
            snakebar: {
                color: "",
                msg: "",
                toggle: false
            },
        };
    },

};
</script>