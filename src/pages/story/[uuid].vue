<template>
  <div>
    <v-app-bar scroll-behavior="hide elevate" scroll-threshold="80">
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          icon="mdi-arrow-left"
          @click="
            human ? $router.push('/humans/' + human.uuid) : $router.back()
          "
        ></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>详细故事资料</v-app-bar-title>
    </v-app-bar>

    <div class="b-content">
      <v-card class="py-3 px-4 my-3 d-flex justify-space-between">
        <p class="text-grey">发生时间</p>
        <p>{{ story.create_date }}</p>
      </v-card>

      <v-card class="py-3 px-4 my-3 d-flex justify-space-between">
        <p class="text-grey">故事性质</p>
        <p>{{ story.nature }}</p>
      </v-card>

      <v-card class="py-3 my-3">
        <p class="text-grey px-4 pb-2 d-flex align-center">
          <v-icon icon="mdi-text-box-outline" class="me-2"></v-icon>内容
        </p>
        <v-divider></v-divider>
        <div class="px-4 pt-3">
          <v-skeleton-loader type="paragraph" :loading="story.content == null">
            <p>{{ story.content }}</p>
          </v-skeleton-loader>
        </div>
      </v-card>

      <v-card class="py-3 my-3">
        <p class="text-grey px-4 pb-2 d-flex align-center">
          <v-icon icon="mdi-message-text" class="me-2"></v-icon>反思与评价
        </p>
        <v-divider></v-divider>
        <div class="px-4 pt-3">
          <v-skeleton-loader type="paragraph" :loading="story.comment == null">
            <p>{{ story.comment }}</p>
          </v-skeleton-loader>
        </div>
      </v-card>

      <v-card class="py-3 my-3" variant="tonal" color="yellow-darken-4">
        <p class="px-4 pb-2 d-flex align-center justify-space-between">
          <span>
            <v-icon icon="mdi-creation" class="me-2"></v-icon>
            AI Assistance
          </span>
          <v-btn
            prepend-icon="mdi-restart"
            size="small"
            rounded="xl"
            variant="flat"
            color="white"
            >重新生成</v-btn
          >
        </p>
        <v-divider class="border-opacity-50"></v-divider>
        <div class="px-4 pt-3">
          <v-skeleton-loader
            type="paragraph"
            :loading="story.ai_evaluation == null"
          >
            <p>{{ story.ai_evaluation }}</p>
          </v-skeleton-loader>
        </div>
      </v-card>

      <div id="operations" class="my-3">
        <v-row no-gutters>
          <v-col>
            <v-sheet class="pa-2"
              ><v-btn rounded="lg" prepend-icon="mdi-pencil" size="large" block variant="tonal">编辑资料</v-btn></v-sheet
            >
          </v-col>
          <v-col>
            <v-sheet class="pa-2"><v-btn rounded="lg" prepend-icon="mdi-delete" size="large" block color="red-darken-3" variant="tonal">删除</v-btn></v-sheet>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getHumanDetail, getHumanEntryList } from "@/impl/people/human";
import { getStoryDetail } from "@/impl/people/story";
import { next } from "@/impl/utils";
export default {
  data() {
    return {
      finished_loading: false,
      story: {},
      human: {},
    };
  },
  created: function () {
    getStoryDetail(
      this.$route.params.uuid,
      (data, vuethis) => {
        vuethis.story = data;
        vuethis.finished_loading = true;
      },
      this
    );

    if (next.previous_human) {
      this.human.name = next.previous_human.name;
      next.previous_human = undefined;
    }
  },
  methods: {},
};
</script>
