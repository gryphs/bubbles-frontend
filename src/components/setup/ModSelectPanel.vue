<template>
    <v-card class="setup-card-np">
        <v-tabs v-model="tab" bg-color="blue" align-tabs="center">
            <v-tab value="one">添加新模组</v-tab>
            <v-tab value="two">已选的模组</v-tab>
        </v-tabs>

        <v-card-text>
            <v-tabs-window v-model="tab">
                <v-tabs-window-item value="one">
                    <v-alert text="请仅搜索模组的英文名！在B站或者PCL内找到模组的英文名后，到这里选择安装。或者喊人帮你~" type="info" variant="tonal" density="compact"></v-alert>
                    <v-text-field class="my-2" :loading="search.loading" append-inner-icon="mdi-magnify" density="compact"
                        label="搜索模组" variant="outlined" single-line v-model="search.text"
                        @click:append-inner="onClickSearch"></v-text-field>
                    <div class="search-result">
                        <div class="search-entry my-2" v-for="i in search.objs">
                            <v-card :color="i.color" :title="i.title" :text="i.description" variant="outlined">
                                <template v-slot:prepend>
                                    <v-avatar size="36">
                                        <v-img alt="John" :src="i.icon_url"></v-img>
                                    </v-avatar>
                                </template>
                                <template v-slot:append>
                                    <v-icon icon="mdi-plus-circle" style="cursor: pointer;"></v-icon>
                                </template>
                            </v-card>
                        </div>
                    </div>
                </v-tabs-window-item>

                <v-tabs-window-item value="two">
                    Two
                </v-tabs-window-item>
            </v-tabs-window>
        </v-card-text>
    </v-card>
</template>

<script>
import { ModrinthV2Client } from '@xmcl/modrinth'
import { fa } from 'vuetify/locale';
export default {
    data() {
        return {
            tab: "",
            loading: false,
            search: {
                loading: false,
                text: "",
                objs: {}
            },
            mod_choices: {}
        }
    },
    methods: {
        async onClickSearch() {
            this.search.loading = true;
            const client = new ModrinthV2Client()
            const searchOptions = {
                query: this.search.text,
                limits: 20,
                facets: '[["categories:neoforge"],["versions:1.21.1"],["project_type:mod"],["server_side:optional", "server_side:required"]]'
            };
            const result = await client.searchProjects(searchOptions);
            const totalProjectCounts = result.total_hits;
            this.search.objs = result.hits;
            for (const project of result.hits) {
                console.log(`${project.project_id} ${project.title} ${project.description}`); // print project info
            }
            this.search.loading = false;
        },
        onAddMod() {
            
        }
    }
}
</script>