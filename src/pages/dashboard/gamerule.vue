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
                    <img src="@/assets/gamerule_config.jpg" style="width: 100%; display: block;" class="mb-4">
                    <p class="text-h6">游戏规则设置</p>
                    <p class="mt-1 mb-4 text-grey">作为神，改变整个世界的规则也是很容易的事情哦。</p>
                    <div class="operation my-3">
                        <v-list lines="two" style="margin: 0; padding: 0;">
                            <v-list-item style="margin: 0; padding: 0; margin-top: 5px; margin-bottom: 5px;"
                                v-for="gm in gamerules" :key="gm.key" :subtitle="gm.subtitle" :title="gm.title">
                                <template v-slot:append>
                                    <v-btn color="green-lighten-1" icon="mdi-check" variant="tonal" class="ms-2"
                                        @click="clickOp(gm.key, 'true')"></v-btn>
                                    <v-btn color="red-lighten-1" icon="mdi-close" variant="tonal" class="ms-2"
                                        @click="clickOp(gm.key, 'false')"></v-btn>
                                </template>
                            </v-list-item>
                        </v-list>
                    </div>
                    <v-divider></v-divider>
                    <v-switch label="显示不常用规则" v-model="showAdvancedGRs" color="blue"></v-switch>
                    <div class="operation" v-if="showAdvancedGRs">
                        <v-list lines="two" style="margin: 0; padding: 0;">
                            <v-list-item style="margin: 0; padding: 0; margin-top: 5px; margin-bottom: 5px;"
                                v-for="gm in advancedGRs" :key="gm.key" :subtitle="gm.subtitle" :title="gm.title">
                                <template v-slot:append>
                                    <v-btn color="green-lighten-1" icon="mdi-check" variant="tonal" class="ms-2"
                                        @click="clickOp(gm.key, 'true')"></v-btn>
                                    <v-btn color="red-lighten-1" icon="mdi-close" variant="tonal" class="ms-2"
                                        @click="clickOp(gm.key, 'false')"></v-btn>
                                </template>
                            </v-list-item>
                        </v-list>
                    </div>
                </v-card-text>
            </v-card>

            <v-card class="setup-card settings-card mt-4">
                <v-card-text>
                    <p class="my-1">篇幅限制，部分游戏规则没有展示。您可以到 wiki 查询：</p>
                    <p class="my-1"><a class="text-blue" style="text-decoration: none;"
                            href="https://minecraft.fandom.com/zh/wiki/%E6%B8%B8%E6%88%8F%E8%A7%84%E5%88%99"
                            target="_blank">游戏规则 -
                            Minecraft Wiki</a></p>
                    <p class="my-1">设定游戏规则的命令如下：</p>
                    <p class="my-1"><b>/gamerule [游戏规则名称] [true/false/设定值]</b></p>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
import { Power } from '@/impl/utils';

export default {
    methods: {
        clickOp(rule, value) {
            if (this.isStoppedServer()) {
                this.snakebar.msg = "请开服以后再执行此操作";
                this.snakebar.color = "orange";
                this.snakebar.toggle = true;
                return;
            }

            Power("gamerule", rule + "," + value, (data, vuethis) => {
                vuethis.snakebar.msg = rule + " 成功更新为 " + value;
                vuethis.snakebar.color = "green";
                vuethis.snakebar.toggle = true;
                vuethis.loading_add = false;
            }, this);
        },
        isStoppedServer() {
            return (!localStorage.getItem("lastStatus") || localStorage.getItem("lastStatus") != '3');
        }
    },
    data() {
        return {
            snakebar: {
                color: "",
                msg: "",
                toggle: false,
            },
            showAdvancedGRs: false,
            gamerules: [
                {
                    key: "keepInventory",
                    title: "死亡不掉落",
                    subtitle: "开启此规则后，玩家死亡将不掉落背包物品和经验。"
                },
                {
                    key: "mobGriefing",
                    title: "开启生物破坏地形",
                    subtitle: "关闭此规则可以阻止苦力怕等生物破坏方块，但同时也会影响村民等生物的正常机制。"
                },
                {
                    key: "playersSleepingPercentage",
                    title: "一个玩家睡觉就可跳过夜晚",
                    subtitle: "开启此规则后，只要任何一个玩家睡觉，就可以跳过夜晚。"
                },
                {
                    key: "doDaylightCycle",
                    title: "启用日夜交替",
                    subtitle: "关闭后，时间将不会流动。开启恢复。"
                }
            ],
            advancedGRs: [
                {
                    key: "doMobSpawning",
                    title: "启用生物自然生成",
                    subtitle: "关闭后，生物将不会自然生成，刷怪笼除外。"
                },
                {
                    key: "fallDamage",
                    title: "启用掉落伤害",
                    subtitle: "关闭后，玩家将不会受到掉落伤害。"
                },
                {
                    key: "fireDamage",
                    title: "启用火焰伤害",
                    subtitle: "关闭后，玩家将不会受到火焰伤害。"
                },
                {
                    key: "doFireTick",
                    title: "启用火焰蔓延",
                    subtitle: "关闭后，着火的方块将不会把火扩散到其它方块。"
                },
                {
                    key: "mobExplosionDropDecay",
                    title: "苦力怕破坏的方块概率不掉落",
                    subtitle: "控制由生物源爆炸炸毁的方块是否会有概率不掉落。"
                },
                {
                    key: "naturalRegeneration",
                    title: "启用自然生命恢复",
                    subtitle: "玩家是否能在饥饿值足够时自然恢复生命值。"
                },
                {
                    key: "doImmediateRespawn",
                    title: "启用立即重生",
                    subtitle: "	玩家死亡时是否不显示死亡界面直接重生。"
                }
            ]
        };
    },
    computed: {

    }

};
</script>

<style>
.v-switch .v-input__details {
    display: none !important;
}
</style>