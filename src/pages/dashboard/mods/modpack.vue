<template>
    <div class="wallpaper">
        <v-snackbar :timeout="5000" v-model="snakebar.toggle" :color="snakebar.color">
            {{ snakebar.msg }}
        </v-snackbar>
        <v-dialog v-model="dialog" max-width="600" :persistent="!installed">
            <v-card title="安装整合包">
                <v-card-text>
                    <div v-if="!installing.status">
                        <p class="my-2">您即将在服务器安装整合包「{{ pending.title }}」。安装只会替换模组文件，存档等内容不会丢失。</p>
                        <v-checkbox color="green" v-model="choose.backup" label="先备份整个服务器"
                            style="margin:0; padding:0;"></v-checkbox>
                        <v-checkbox color="green" v-model="choose.reset_world" label="重置当前存档（所有世界）"
                            style="margin:0; padding:0;"></v-checkbox>
                        <p class="text-orange-lighten-1" v-if="choose.reset_world && !choose.backup">
                            小提示：您选择了重置世界但没有备份服务器喔。</p>
                    </div>
                    <div v-else>
                        <p class="my-1 text-grey-darken-3" v-for="msg in installing.msgs"> {{ msg }}</p>
                    </div>
                </v-card-text>
                <template v-slot:actions>
                    <v-spacer></v-spacer>
                    <div v-if="!installed">
                        <v-btn color="green-darken-2" :disabled="installing.status"
                            @click="() => { try { this.confirmInstall(); } catch(error) { this.catchException(error); } }">
                            确认开始安装
                        </v-btn>
                        <v-btn color="grey" :disabled="installing.status" @click="dialog = false">
                            取消并返回
                        </v-btn>
                    </div>
                    <div v-else>
                        <v-btn color="green-darken-2"
                            @click="() => { $router.push('/dashboard/') }">
                            返回控制台
                        </v-btn>
                    </div>
                </template>
            </v-card>
        </v-dialog>
        <div>
            <v-card class="setup-card settings-card">
                <v-card-text>
                    <div class="w-100 mb-4">
                        <v-btn class="w-25" prepend-icon="mdi-arrow-left" variant="tonal" color="grey"
                            @click="$router.back()">
                            返回
                        </v-btn>
                    </div>
                    <img src="@/assets/modpacks.jpg" style="width: 100%; display: block;" class="mb-4">
                    <p class="text-h5">安装 Mod 整合包</p>
                    <p class="mt-1 mb-5 text-grey">这是什么？点一下。这是什么？点一下。这是什么？点一下。</p>
                    <p class="text-grey my-5 text-center text-h5" v-if="!datapacks">正在获取可用整合包...</p>
                    <template v-for="dp in datapacks" v-if="datapacks != []">
                        <v-card class="my-4">
                            <v-img height="200px" :src="dp.img_src" cover></v-img>
                            <v-card-title>
                                {{ dp.title }}
                            </v-card-title>
                            <v-card-subtitle>
                                {{ dp.subtitle }}
                            </v-card-subtitle>
                            <v-card-actions>
                                <v-btn color="blue-darken-2 w-100" text="安装该整合包" @click="install(dp)"></v-btn>
                            </v-card-actions>
                        </v-card>
                    </template>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
import { Power } from '@/impl/utils';
import axios from 'axios';

export default {
    created() {
        let vuethis = this;
        axios.get("https://app.mizuiro.xyz/static/modpacks").then(function (response) {
            vuethis.datapacks = response.data;
        }).catch(function (error) {
            vuethis.catchException(error);
        });
    },
    methods: {
        isStoppedServer() {
            return (localStorage.getItem("lastStatus") && localStorage.getItem("lastStatus") == '0');
        },
        install(obj) {
            this.pending = obj;
            this.dialog = true;
        },
        catchException(error){
            alert("对不起 (>人<；)\n发生运行时错误，请重试一下，或者截图联系管理员。详情：\n" + error);
        },
        confirmInstall() {
            if (!this.isStoppedServer()) {
                this.snakebar.color = 'red';
                this.snakebar.msg = '服务器必须先关闭';
                this.snakebar.toggle = true;
                return;
            }

            this.installing.status = true;
            this.installing.msgs.push("开始安装" + this.pending.title + "整合包。")

            if (this.choose.backup) {
                this.installing.msgs.push("您选择了先进行备份。正在触发备份...");
                this.installing.lock = true;
                Power('backup', null, (data, vuethis) => {
                    vuethis.installing.msgs.push("备份成功。");
                    if (vuethis.choose.reset_world) {
                        vuethis.installing.msgs.push("您选择了重置世界。正在触发重置...");
                        Power('delete_world', null, (data, vuethis) => {
                            vuethis.installing.msgs.push("重置成功。");
                            vuethis.reallyInstall(vuethis.pending.id);
                            return;
                        }, vuethis);
                    } else {
                        vuethis.reallyInstall(vuethis.pending.id);
                    }
                    return;
                }, this);
            } else {
                if (this.choose.reset_world) {
                    this.installing.msgs.push("您选择了重置世界。正在触发重置...");
                    Power('delete_world', null, (data, vuethis) => {
                        vuethis.installing.msgs.push("重置成功。");
                        vuethis.reallyInstall(vuethis.pending.id);
                        return;
                    }, this);
                } else {
                    this.reallyInstall(this.pending.id);
                }
            }
        },
        reallyInstall(id) {
            this.installing.msgs.push("正在安装整合包 (" + id + ")...");
            Power('modpack', id, (data, vuethis) => {
                vuethis.installing.msgs.push("安装成功~ 请您返回首页开启服务器。");
                vuethis.installed = true;
                return;
            }, this);
        }
    },
    data() {
        return {
            snakebar: {
                color: "",
                msg: "",
                toggle: false,
            },
            dialog: false,
            datapacks: null,
            pending: {
                id: "",
                title: ""
            },
            choose: {
                backup: false,
                reset_world: false,
            },
            installing: {
                status: false,
                msgs: [],
            },
            installed: false,
        };
    },

};
</script>

<style>
.v-input__details {
    display: none !important;
}

.v-checkbox .v-selection-control {
    min-height: 0px !important;
}
</style>