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
                    <img src="@/assets/heaven.jpg" style="width: 100%; display: block;" class="mb-4">
                    <p class="text-h6">向玩家降下天罚</p>
                    <div class="my-2">
                        <p class="text-grey mb-3">请输入玩家名字：</p>
                        <v-text-field clearable label="玩家名字" variant="outlined" v-model="input"></v-text-field>
                    </div>
                    <div class="operation mt-1">
                        <p class="text-grey mb-3">可用的天罚：</p>
                        <v-list lines="two" style="margin: 0; padding: 0;">
                            <v-list-item style="margin: 0; padding: 0; margin-top: 5px; margin-bottom: 5px;"
                                v-for="h in heavens" :key="h.key" :subtitle="h.subtitle" :title="h.title">
                                <template v-slot:append>
                                    <v-btn color="green-lighten-1" icon="mdi-magic-staff" variant="tonal" class="ms-2"
                                        @click="clickHeaven(h.key, true)">
                                        </v-btn>
                                    <v-btn color="red-lighten-1" icon="mdi-minus" variant="tonal" class="ms-2" :disabled="!h.cancellable"
                                        @click="clickHeaven(h.key, false)"></v-btn>
                                </template>
                            </v-list-item>
                        </v-list>
                    </div>
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
            return (!localStorage.getItem("lastStatus") || localStorage.getItem("lastStatus") != '3');
        }
    },
    data() {
        return {
            input: "",
            snakebar: {
                color: "",
                msg: "",
                toggle: false
            },
            heavens: [
                {
                    key: "kick",
                    cancellable: false,
                    title: "踢出游戏",
                    subtitle: "踢出玩家（显示连接中断）"
                },
                {
                    key: "ban",
                    cancellable: true,
                    title: "封禁玩家",
                    subtitle: "封禁该玩家"
                },
                {
                    key: "blind",
                    cancellable: true,
                    title: "无限失明",
                    subtitle: "给予该玩家无限失明效果，需要点击减号取消。"
                },
                {
                    key: "ban",
                    cancellable: true,
                    title: "无限缓慢",
                    subtitle: "给予该玩家无限缓慢效果，需要点击减号取消。"
                },
            ]
        };
    },
    computed: {
        
    }

};
</script>