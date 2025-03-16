<template>
    <div class="wallpaper">
        <div>

            <v-snackbar :timeout="2000" v-model="snakebar.toggle" :color="snakebar.color">
                {{ snakebar.msg }}
            </v-snackbar>
            <v-card class="setup-card settings-card">
                <v-card-text>
                    <div class="w-100 mb-2">
                        <v-btn class="w-25" prepend-icon="mdi-arrow-left" variant="tonal" color="grey"
                            @click="$router.back()">
                            返回
                        </v-btn>
                    </div>
                    <img src="@/assets/friends.jpg" style="width: 100%; display: block;" class="mb-4">
                    
                    <p class="text-h6">白名单</p>
                    <p class="mt-1 mb-4 text-grey">将彼此的名字刻入白名单，让星空见证这一切。<br />
                        服务器创建后默认开启白名单，只有白名单用户才能进入游戏。
                    </p>

                    <div class="operation my-3">
                        <v-text-field clearable label="玩家名字" variant="outlined" v-model="input"></v-text-field>
                        <v-row no-gutters>
                            <v-col class="mr-2">
                                <v-sheet>
                                    <v-btn class="w-100" prepend-icon="mdi-plus" variant="tonal" color="green" @click="clickAdd()" :loading="loading_add">
                                        添加
                                    </v-btn>
                                </v-sheet>
                            </v-col>
                            <v-col>
                                <v-sheet>
                                    <v-btn class="w-100" prepend-icon="mdi-close" variant="tonal" color="red" @click="clickRemove()" :loading="loading_remove">
                                        从白名单中删除
                                    </v-btn>
                                </v-sheet>
                            </v-col>
                        </v-row>
                    </div>
                </v-card-text>
            </v-card>

            <v-card class="setup-card settings-card mt-4">
                <v-card-text>
                    <p class="my-1">您还可以通过游戏内命令管理白名单。命令如下：</p>
                    <p class="my-1"><b>/cwhitelist list</b></p>
                    <p class="my-1">输入上述指令可以查看当前在白名单内的所有用户。然后您可以在本界面进行增删操作。</p>
                    <p class="my-1">如果您想关闭白名单，请删除 cwhitelist 模组。(在高级控制台中)</p>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
import { Power } from '@/impl/utils';

export default {
    methods: {
        clickAdd() {
            if(this.input == '') {
                this.snakebar.msg = "请先输入玩家名喔";
                this.snakebar.color = "orange";
                this.snakebar.toggle = true;
                return;
            }
            if(this.isStoppedServer()) {
                this.snakebar.msg = "请开服以后再执行此操作";
                this.snakebar.color = "orange";
                this.snakebar.toggle = true;
                return;
            }
            this.loading_add = true;
            Power("addwl", this.input, (data, vuethis) => {
                vuethis.snakebar.msg = "操作成功提交~";
                vuethis.snakebar.color = "green";
                vuethis.snakebar.toggle = true;
                vuethis.loading_add = false;
            }, this);
        },
        clickRemove() {
            if(this.input == '') {
                this.snakebar.msg = "请先输入玩家名喔";
                this.snakebar.color = "orange";
                this.snakebar.toggle = true;
                return;
            }
            if(this.isStoppedServer()) {
                this.snakebar.msg = "请开服以后再执行此操作";
                this.snakebar.color = "orange";
                this.snakebar.toggle = true;
                return;
            }
            this.loading_remove = true;
            Power("removewl", this.input, (data, vuethis) => {
                vuethis.snakebar.msg = "操作成功提交~";
                vuethis.snakebar.color = "green";
                vuethis.snakebar.toggle = true;
                vuethis.loading_remove = false;
            }, this);
        },
        isStoppedServer() {
            return (!localStorage.getItem("lastStatus") || localStorage.getItem("lastStatus") == '0');
        }
    },
    data() {
        return {
            loading_add: false,
            loading_remove: false,
            snakebar: {
                color: "",
                msg: "",
                toggle: false,
            },
            input: ""
        };
    },
};
</script>