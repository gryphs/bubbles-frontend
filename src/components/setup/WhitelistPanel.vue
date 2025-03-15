<template>
    <v-card flat>
        <v-card-text>
            <img src="@/assets/friends.jpg" style="width: 100%; display: block;" class="mb-4">
            <p class="text-h6">介绍：让朋友加入服务器</p>
            <p class="my-2">将彼此的名字刻入白名单，让星空见证这一切。</p>
            <p class="my-2">在服务器创建以后，默认只有服主 {{ adminName }} 才能加入服务器。</p>
            <p class="my-2">如果以后朋友要来玩儿，请在后台输入朋友的游戏名并加入白名单。加入服务器不需要登录账号，请让您的朋友使用「离线登录」功能设置玩家名后加入。</p>
            <p class="my-2">客户端接入了 LittleSkin 皮肤站，可以在上面修改皮肤。</p>
            
            <!-- <v-combobox v-model="whitelistIDs" v-model:search="wlSearch" :hide-no-data="false" :items="[this.getAdminName]" chips hide-selected
                multiple>
                <template v-slot:no-data>x's
                    <v-list-item>
                        <v-list-item-title>
                            <span v-if="wlSearch">按回车将 <strong>{{ wlSearch }}</strong> 加入白名单</span>
                            <span v-else>输入要添加到白名单的游戏名字</span>
                        </v-list-item-title>
                    </v-list-item>
                </template>
            </v-combobox> -->
            
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            whitelistIDs: [],
            wlSearch: null,
            adminName: null
        }
    },
    created() {
        this.handleNameChange();
    },
    methods: {
        handleNameChange() {
            this.adminName = localStorage.getItem('adminName');
        }
    }
}
</script>