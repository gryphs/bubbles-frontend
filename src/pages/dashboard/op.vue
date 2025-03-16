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
                    <img src="@/assets/giveop.jpg" style="width: 100%; display: block;" class="mb-4">
                    <p class="text-h6">钦定游戏内管理员（OP）</p>
                    <p class="mt-1 mb-4 text-grey">将你的神之力分给信任的人吧！<br />
                        管理员拥有通过指令开关服、ban 玩家在内的所有权限。</p>
                    <div class="operation my-3">
                        <v-text-field clearable label="玩家名字" variant="outlined" v-model="input"></v-text-field>
                        <v-row no-gutters>
                            <v-col class="mr-2">
                                <v-sheet>
                                    <v-btn class="w-100" prepend-icon="mdi-plus" variant="tonal" color="green" @click="clickAdd()" :loading="loading_add">
                                        钦定为OP
                                    </v-btn>
                                </v-sheet>
                            </v-col>
                            <v-col>
                                <v-sheet>
                                    <v-btn class="w-100" prepend-icon="mdi-close" variant="tonal" color="red" @click="clickRemove()" :loading="loading_remove">
                                        剥夺其权力
                                    </v-btn>
                                </v-sheet>
                            </v-col>
                        </v-row>
                    </div>
                </v-card-text>
            </v-card>

            <v-card class="setup-card settings-card mt-4">
                <v-card-text>
                    <p class="my-1">您还可以通过游戏内命令管理OP。命令如下：</p>
                    <p class="my-1"><b>/op [玩家名]</b></p>
                    <p class="my-1">输入上述指令可以添加玩家为OP。</p>
                    <p class="my-1"><b>/deop [玩家名]</b></p>
                    <p class="my-1">输入上述指令可以取消玩家的OP权限。</p>
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
            Power("addop", this.input, (data, vuethis) => {
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
            Power("deop", this.input, (data, vuethis) => {
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
    computed: {
        
    }

};
</script>