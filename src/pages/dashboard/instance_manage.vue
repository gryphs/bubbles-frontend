<template>
    <div class="wallpaper">
        <v-snackbar :timeout="3000" v-model="snakebar.toggle" :color="snakebar.color">
            {{ snakebar.msg }}
        </v-snackbar>
        <div>
            <v-card class="setup-card settings-card">
                <v-card-text>
                    <div class="w-100 mb-4">
                        <v-btn class="w-25" prepend-icon="mdi-arrow-left" variant="tonal" color="grey"
                            @click="$router.back()">
                            返回
                        </v-btn>
                    </div>
                    <img src="@/assets/instance.jpg" style="width: 100%; display: block;" class="mb-4">
                    <p class="text-h5">高级服务器管理</p>
                    <p class="mt-1 mb-4 text-grey">一不小心就会把服务器夷为平地的操作都在这里了</p>
                    <v-card class="my-5" title="服务器备份" variant="outlined" color="blue-darken-3">
                        <v-card-text>
                            <p class="mb-2">备份服务器 or 恢复备份。请确保服务器已关闭。</p>
                            <p class="my-1 ms-2">1. 只有一个备份档位：每次您创建新备份，就会删除上次备份。</p>
                            <p class="my-1 ms-2">2. 备份包括了服务器上的所有内容。</p>
                            <p class="my-1 ms-2">3. 恢复备份后，服务器将完全恢复到您备份时的状态。</p>
                            
                            <v-btn class="w-100 mt-4" variant="tonal" color="blue" @click="clickBackup()">创建新备份</v-btn>
                            <v-btn class="w-100 mt-2" variant="tonal" color="blue-darken-3" @click="clickRestore()">恢复上次备份状态</v-btn>
                        </v-card-text>
                    </v-card>

                    <v-card class="my-5" title="重新生成世界" variant="outlined" color="red">
                        <v-card-text>
                            <p class="mb-2">当前存档（包括主世界、地狱、末地）将被删除，下次开服的时候，将重新生成新的世界。<br>请在关服状态下操作。</p>
                            <v-btn class="w-100 mt-2" variant="tonal" color="red" @click="clickDeleteWorld()">确认重置当前存档</v-btn>
                        </v-card-text>
                    </v-card>

                    <v-card class="my-5" title="开启新周目" variant="outlined" color="orange-darken-2">
                        <v-card-text>
                            <p class="mb-2">如果您想开启一个新的周目，服务器将被重置：</p>
                            <p class="my-1 ms-2">1. 服务器将被重置到初始状态</p>
                            <p class="my-1 ms-2">2. 存档、模组、白名单均会被删除</p>
                            <p class="my-1 ms-2">3. 备份不会被删除，如果想保留存档，请先关服备份</p>
                            <p class="my-1 ms-2">4. 请在服务器关闭状态下操作</p>
                            <v-btn class="w-100 mt-2" variant="tonal" color="orange-darken-2" @click="clickImage()">确认重置服务器</v-btn>
                        </v-card-text>
                    </v-card>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
import { Power } from '@/impl/utils';

export default {
    created() {
    },
    methods: {
        clickBackup() {
            if(!confirm("请确认：创建新备份，并且上次备份将被删除。")) return;
            if (!this.isStoppedServer()) {
                alert("备份被取消：服务器没有关闭，或者状态未刷新，请返回后台首页。");
                return;
            }

            Power('backup', null, (data, vuethis) => {
                vuethis.snakebar.msg = "备份操作已成功完成";
                vuethis.snakebar.color = "green";
                vuethis.snakebar.toggle = true;
                return;
            }, this);
        },
        clickRestore() {
            if(!confirm("请确认：从上次备份中恢复，服务器当前存档将被替换。如果从未备份，不会执行任何操作。\n您可以点击取消按钮取消本次操作。")) return;
            if (!this.isStoppedServer()) {
                alert("恢复被取消：服务器没有关闭，或者状态未刷新，请返回后台首页。");
                return;
            }

            Power('restore', null, (data, vuethis) => {
                vuethis.snakebar.msg = "恢复操作已成功完成";
                vuethis.snakebar.color = "green";
                vuethis.snakebar.toggle = true;
                return;
            }, this);
        },
        clickDeleteWorld() {
            if(!confirm("请确认重置存档：\n现有服务器的存档将被 **删除** 且无法恢复。")) return;
            if(!confirm("请再次确认重置存档：现有服务器的存档将被删除！\n您可以点击取消按钮取消本次操作。")) return;
            if (!this.isStoppedServer()) {
                alert("重置存档被取消：服务器没有关闭，或者状态未刷新，请返回后台首页。");
                return;
            }

            Power('delete_world', null, (data, vuethis) => {
                vuethis.snakebar.msg = "已成功重置存档，请开启服务器";
                vuethis.snakebar.color = "green";
                vuethis.snakebar.toggle = true;
                return;
            }, this);
        },
        clickImage() {
            if(!confirm("请确认开启新周目：\n现有服务器的所有内容都将被 **删除** 且无法恢复。")) return;
            if(!confirm("请再次确认：现有服务器的所有内容将被删除！\n您可以点击取消按钮取消本次操作。")) return;
            if (!this.isStoppedServer()) {
                alert("开启新周目被取消：服务器没有关闭，或者状态未刷新，请返回后台首页。");
                return;
            }

            Power('reset_image', null, (data, vuethis) => {
                vuethis.snakebar.msg = "已成功开启新周目，请开启服务器";
                vuethis.snakebar.color = "green";
                vuethis.snakebar.toggle = true;
                return;
            }, this);
        },
        isStoppedServer() {
            return (localStorage.getItem("lastStatus") && localStorage.getItem("lastStatus") == '0');
        }
    },
    data() {
        return {
            snakebar: {
                color: "",
                msg: "",
                toggle: false,
            },
        };
    },

};
</script>