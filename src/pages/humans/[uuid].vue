<template>
  <div>
    <v-app-bar scroll-behavior="hide elevate" scroll-threshold="80">
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          icon="mdi-arrow-left"
          @click="$router.push('/humans')"
        ></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>人类详细资料</v-app-bar-title>
    </v-app-bar>

    <div class="b-content">
      <h2 class="text-h2 mt-2">{{ human.name }}</h2>

      <div id="finished-content" v-if="finished_loading.info">
        <v-card class="mt-5 py-4 px-4" elevation="1">
          <div v-for="(value, key, index) in human_brief_detail">
            <span class="d-block"
              >{{ key }}
              <span class="text-grey-darken-1 ms-4 d-inline-block">
                {{ value }}</span
              >
            </span>
            <v-divider v-if="index != 4" class="my-1"></v-divider>
          </div>
        </v-card>

        <v-card class="d-flex mt-3 py-3 px-4 align-center justify-space-between" elevation="1" link>
          <span><v-icon icon="mdi-account-circle" class="me-4"></v-icon>社交媒体信息</span>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </v-card>

        <v-card class="d-flex mt-2 py-3 px-4 align-center justify-space-between" elevation="1" link>
          <span><v-icon icon="mdi-gift" class="me-4"></v-icon>礼物</span>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </v-card>

        <div id="records-list" class="mt-5">
          <v-text-field
            label="搜索记录"
            clearable
            type="input"
            variant="outlined"
          ></v-text-field>
          <v-tabs v-model="tab" align-tabs="center">
            <v-tab value="story" @click="loadStory()">故事</v-tab>
            <v-tab value="propertie">喜好</v-tab>
          </v-tabs>

          <v-tabs-window v-model="tab">
            <v-tabs-window-item key="story" value="story">
              <div>
                <v-card
                  v-for="st in data.story"
                  class="my-3 px-3 py-4"
                  link
                  :color="st.is_nice ? 'cyan-darken-4' : 'deep-purple-darken-4'"
                  variant="tonal"
                  @click="openStory(st.uuid)"
                >
                  <p>{{ st.content }}</p>
                  <p class="mt-1 text-grey text-subtitle-2">
                    {{ st.create_date }}
                  </p>
                </v-card>
              </div>
            </v-tabs-window-item>
            <v-tabs-window-item key="propertie" value="propertie">
            </v-tabs-window-item>
          </v-tabs-window>
        </div>
      </div>
    </div>
    <v-bottom-navigation grow>
      <v-btn value="recent">
        <v-icon>mdi-message-processing</v-icon>

        <span>撰写故事</span>
      </v-btn>

      <v-btn value="favorites">
        <v-icon>mdi-heart</v-icon>

        <span>新增喜好</span>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import { getHumanDetail, getHumanEntryList } from "@/impl/people/human";
import { next } from "@/impl/utils";
export default {
  data() {
    return {
      finished_loading: {
        info: false,
        story: false,
        propertie: false,
      },
      human: {
        name: "",
      },
      data: {
        story: [],
        propertie: [],
      },
      human_brief_detail: {},
      tab: "story",
    };
  },
  created: function () {
    getHumanDetail(
      this.$route.params.uuid,
      (data, vuethis) => {
        vuethis.human = data;
        vuethis.human_brief_detail = {
          性别: this.getGender(data.gender),
          生日: data.date_of_birth,
          角色: data.role,
          电话: data.mobile,
          邮箱: data.email,
        };
        vuethis.finished_loading.info = true;
      },
      this
    );
    this.loadStory(this.$route.params.uuid);
    if (next.human) {
      this.human.name = next.human.name;
      next.human = undefined;
    }
  },
  methods: {
    getGender(gender) {
      if (String(gender) == "male") {
        return "男性";
      } else {
        return "女性";
      }
    },
    loadStory(uuid = null) {
      if (this.finished_loading.story) return;
      let current_uuid = uuid ? uuid : this.human.uuid;
      getHumanEntryList(
        current_uuid,
        "story",
        (data, vuethis) => {
          vuethis.data.story = data;
          vuethis.finished_loading.story = true;
        },
        this
      );
    },
    openStory(uuid) {
      next.previous_human = this.human;
      this.$router.push("/story/" + uuid);
    },
    loadPropertie() {},
  },
};
</script>
