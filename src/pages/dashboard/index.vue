<template>
    <div class="wallpaper">
        <div>
            <ServerName class="my-3" :serverName="serverName" :adminName="adminName" :serverAddress="address"
                :status="status" v-on:refresh-status="reloadStatus();">
            </ServerName>

            <ServerPower class="my-3" v-on:status-changed="reloadStatus()"></ServerPower>
            <v-card class="setup-card-np my-3">
                <v-list ref="menuObj">
                    <v-list-item title="如何加入服务器" prepend-icon="mdi-help" @click="helpCheck()"></v-list-item>
                </v-list>
            </v-card>
            <v-card class="setup-card-np my-3">
                <v-list ref="menuObj">
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
            cacheDeltaTime = Math.round(cacheDeltaTime/1000);
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
            console.log("Bypassed internet API call. We have a cache " + Math.round((currentTS - parseInt(localLastUpdated))/1000) + "s ago");
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
            settingsItems: [
                {
                    title: '白名单设置',
                    value: 1,
                    prependIcon: 'mdi-home-lock',
                },
                {
                    title: '钦定管理员（OP）',
                    value: 2,
                    prependIcon: 'mdi-chess-queen',
                },
                {
                    title: '进入控制台',
                    value: 3,
                    prependIcon: 'mdi-console',
                },
            ]
        };
    },

};
</script>