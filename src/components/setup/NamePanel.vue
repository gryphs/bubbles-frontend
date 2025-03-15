<template>
    <div>
        <Dialog ref="dialog" :text="dialog.text" :title="dialog.title"></Dialog>
        <v-card class="setup-card">
            <v-card-text>
                <img src="@/assets/naming.jpg" style="width: 100%; display: block;" class="mb-4">
                <p class="text-h6">请为坠落的服务器命名：</p>
                <p class="mb-4 text-grey-darken-2">这个名字会显示在MC的服务器列表里</p>
                <v-text-field placeholder="我的服务器" variant="outlined" v-model="serverName"></v-text-field>
                <v-text-field label="服主的游戏名字" variant="outlined" v-model="adminName"></v-text-field>
                <p class="my-1 text-grey-darken-2"><span v-if="adminName == ''">玩家</span>
                    <span v-else-if="adminName.toLocaleLowerCase() == 'ash'">这只叫 {{ adminName }} 的猫猫</span>
                    <span v-else>服主 {{ adminName }}&nbsp;</span>将成为MC的管理员。
                </p>
                <v-btn class="w-100 mt-2" color="blue" @click="onFinish" :loading="this.loading">创建服务器</v-btn>
                <p v-if="this.loading" class="mt-3 text-grey">服务器正在创建，可能会花费一点时间。</p>
            </v-card-text>
        </v-card>
    </div>

</template>

<script>
import { API_PREFIX } from '@/impl/api';
import { redirectLogin } from '@/impl/utils';
import axios from 'axios';

export default {
    data() {
        return {
            serverName: "",
            adminName: "",
            loading: false,
            dialog: {
                title: "",
                text: ""
            }
        }
    },
    methods: {
        onSaveRequest() {
            localStorage.setItem("serverName", this.adminName);
            localStorage.setItem("adminName", this.adminName);
            console.log("Submitting name to localStorage:", this.serverName, this.adminName);
        },
        onFinish() {
            if (this.adminName == '' || this.serverName == '') {
                this.dialog.text = "请您填写完整喔。";
                this.dialog.title = "请等一下";
                this.$refs.dialog.show();
                return;
            }

            this.loading = true;
            var vuethis = this;

            axios.post(API_PREFIX + "create_server", {
                serverName: this.serverName,
                adminName: this.adminName
            }, { withCredentials: true })
                .then(function (response) {
                    if (response.data['code'] == 200) {
                        vuethis.$router.push("/dashboard/");
                    } else {
                        let code = response.data['code'];
                        let message = response.data['message'];
                        if (message == 'duplicated') {
                            vuethis.$router.push("/dashboard/");
                            return;
                        } else if (message == 'assign_port_limited') {
                            vuethis.dialog.text = "服务器创建失败，因为达到了当前主机的最大端口数上限。请联系管理员以手动分配端口。";
                            vuethis.dialog.title = "非常抱歉";
                            vuethis.$refs.dialog.show();
                            return;
                        } else {
                            vuethis.dialog.text = "服务器创建失败了，错误代码：" + code + "，错误提示为 " + message + "。请您联系管理员。";
                            vuethis.dialog.title = "非常抱歉";
                            vuethis.$refs.dialog.show();
                        }
                        vuethis.$refs.dialog.show();
                        vuethis.loading = false;
                        return;
                    }
                })
                .catch(function (error) {
                    alert("应用程序发生了错误：\n" + error);
                });
        }
    },
    computed: {

    }
}
</script>