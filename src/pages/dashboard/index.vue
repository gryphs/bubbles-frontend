<template>
    <div class="wallpaper">
        <div>
            <ServerName class="my-3" :serverName="serverName" :adminName="adminName" :serverAddress="address"
                :status="status" v-on:refresh-status="reloadStatus();">
            </ServerName>

            <ServerPower class="my-3" v-on:status-changed="reloadStatus()"></ServerPower>
            <v-card class="setup-card-np my-3">
                <v-list>
                    <v-list-item title="如何加入服务器" prepend-icon="mdi-help" @click="helpCheck()"></v-list-item>
                </v-list>
            </v-card>
            <v-card class="setup-card-np my-3">
                <v-list>
                    <v-list-subheader>玩家管理</v-list-subheader>
                    <v-list-item v-for="item in playersItems" :title="item.title" :value="item.value"
                        :prepend-icon="item.prependIcon" @click="menuClick(item.value)"></v-list-item>
                </v-list>
            </v-card>
            <v-card class="setup-card-np my-3">
                <v-list>
                    <v-list-subheader>游戏性设置</v-list-subheader>
                    <v-list-item v-for="item in ingameItems" :title="item.title" :value="item.value"
                        :prepend-icon="item.prependIcon" @click="menuClick(item.value)"></v-list-item>
                </v-list>
            </v-card>
            <v-card class="setup-card-np my-3">
                <v-list>
                    <v-list-subheader>高级设置</v-list-subheader>
                    <v-list-item v-for="item in settingsItems" :title="item.title" :value="item.value"
                        :prepend-icon="item.prependIcon" @click="menuClick(item.value)"></v-list-item>
                </v-list>
            </v-card>
        </div>
    </div>
</template>

<script>
import ServerName from "@/components/dashboard/ServerName.vue";
import ServerPower from "@/components/dashboard/ServerPower.vue";
import { getInstance, Power, redirectLogin } from "@/impl/utils";
export default {
    created() {
        redirectLogin(this);
        let currentTS = Date.now();
        let localLastUpdated = localStorage.getItem("lastUpdated");
        if (localLastUpdated != null) {
            let cacheDeltaTime = (currentTS - parseInt(localLastUpdated));
            cacheDeltaTime = Math.round(cacheDeltaTime / 1000);
            console.log("cacheDeltaTime:", cacheDeltaTime);
            if (cacheDeltaTime <= 600) {
                this.serverName = localStorage.getItem("serverName");
                this.adminName = localStorage.getItem("adminName");
                this.userID = localStorage.getItem("userID");
                this.address = "play.mizuiro.xyz:" + (localStorage.getItem("port"));
            }
        }

        if (this.serverName == '') {
            getInstance((data, vuethis) => {
                if(!data) return;
                vuethis.serverName = data.name;
                vuethis.adminName = data.adminName;
                vuethis.userID = data.userid;
                vuethis.address = "play.mizuiro.xyz:" + (new String(data.port));
                localStorage.setItem("serverName", data.name);
                localStorage.setItem("adminName", data.adminName);
                localStorage.setItem("port", data.port);
                localStorage.setItem("userID", data.userid);
                localStorage.setItem("lastUpdated", currentTS);
                console.log("API call to getInstance()");
            }, this);
        } else {
            console.log("Bypassed internet API call. We have a cache " + Math.round((currentTS - parseInt(localLastUpdated)) / 1000) + "s ago");
        }


        this.reloadStatus();
    },
    methods: {
        reloadStatus() {
            this.status = 4;
            Power("status", null, (data, vuethis) => {
                vuethis.status = data['result']['status'];
                localStorage.setItem("lastStatus", vuethis.status);
            }, this);

        },
        menuClick(a) {
            switch (a) {
                case 1:
                    this.$router.push("/dashboard/whitelist");
                    break;
                case 2:
                    this.$router.push("/dashboard/op");
                    break;
                case 3:
                    this.$router.push("/dashboard/mcsm");
                    break;
                case 4:
                    this.$router.push("/dashboard/gamerule");
                    break;
                case 5:
                    this.$router.push("/dashboard/instance_manage");
                    break;
                case 6:
                    this.$router.push("/dashboard/bluemap");
                    break;
                case 7:
                    this.$router.push("/dashboard/mods/modpack");
                    break;
                case 8:
                    this.$router.push("/dashboard/staff_notes");
                    break;
                default:
                    window.location.reload();
                    break;
            }
        },
        helpCheck() {
            window.open("https://publish.pvpin.org/publish/help-minecraft?userid=" + this.userID);
        }
    },
    data() {
        return {
            serverName: "",
            adminName: "",
            address: "",
            userID: "",
            status: 4,
            selection: [],
            playersItems: [
                {
                    title: '白名单管理',
                    value: 1,
                    prependIcon: 'mdi-home-lock',
                },
                {
                    title: '钦定管理员（OP）',
                    value: 2,
                    prependIcon: 'mdi-chess-queen',
                },
            ],
            ingameItems: [
                {
                    title: "游戏规则",
                    value: 4,
                    prependIcon: 'mdi-controller'
                },
                {
                    title: "网页地图",
                    value: 6,
                    prependIcon: 'mdi-map'
                },
                {
                    title: '安装整合包',
                    value: 7,
                    prependIcon: 'mdi-folder-move',
                },
                {
                    title: '指令控制台/文件管理',
                    value: 3,
                    prependIcon: 'mdi-console',
                },
            ],
            settingsItems: [
                {
                    title: '给 STAFF 备注',
                    value: 8,
                    prependIcon: 'mdi-sticker-outline',
                },
                {
                    title: '高级服务器管理',
                    value: 5,
                    prependIcon: 'mdi-server',
                }
            ]
        };
    },

};
</script>