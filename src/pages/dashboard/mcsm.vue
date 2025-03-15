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
                    <img src="@/assets/god.jpg" style="width: 100%; display: block;" class="mb-4">
                    <p class="text-h5">高级控制台</p>
                    <p class="text-grey my-1">访问高级控制台，对您的服务器做更深入的操作。
                    </p>
                    <p class="my-2"><v-chip prepend-icon="mdi-check" color="green" class="ma-1">查看服务器后台
                        </v-chip><v-chip prepend-icon="mdi-check" color="green" class="ma-1">添加模组、查看存档和其他文件
                        </v-chip><v-chip prepend-icon="mdi-check" color="green" class="ma-1">修改配置文件
                        </v-chip><v-chip prepend-icon="mdi-check" color="green" class="ma-1">设置定时执行任务
                        </v-chip></p>
                    <div class="mt-4">
                        <p class="my-1">请复制下列「空间对接密钥」登录异世界的控制台：</p>
                        <p class="my-1">账号：<span style="user-select: text;">{{ adminName }}</span></p>
                        <p class="my-1">密码：<span style="user-select: text;">{{ password }}</span></p>
                    </div>
                    <div class="mt-4">
                        <p></p>
                        <v-btn class="w-100 mt-2" color="orange" variant="tonal" @click="menuClick">打开时空裂缝</v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
import { getInstance } from '@/impl/utils';

export default {
    created() {
        if (localStorage.getItem("adminName")) {
            this.adminName = localStorage.getItem("adminName");
            this.password = localStorage.getItem("password");
        }
        getInstance((data, vuethis) => {
            vuethis.adminName = data.adminName;
            vuethis.password = data.password;
            localStorage.setItem("adminName", data.adminName);
            localStorage.setItem("password", data.password);
        }, this);
    },
    methods: {
        menuClick(a) {
            window.open('https://aka.mizuiro.xyz/mcsm');
        }
    },
    data() {
        return {
            adminName: "",
            password: "********"
        };
    },

};
</script>