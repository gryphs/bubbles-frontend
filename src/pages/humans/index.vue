<template>
  <div>
    <v-app-bar scroll-behavior="hide elevate" scroll-threshold="80">
      <v-app-bar-title>Bubbles of People</v-app-bar-title>
    </v-app-bar>

    <div class="b-content">
      <v-text-field
        hint="人名、电话号码"
        label="搜索人类"
        clearable
        type="input"
        variant="solo-filled"
      ></v-text-field>

      <div id="human-list">
        <v-list lines="two">
          <v-skeleton-loader :loading="humans == null" class="w-100" type="list-item-avatar">
            <v-list-item
              v-for="human in humans"
              @click="openDetail(human)"
              :subtitle="human.role + '    ' + human.mobile"
              :title="human.name"
            >
              <template v-slot:append>
                <v-btn
                  color="grey-lighten-1"
                  icon="mdi-chevron-right"
                  variant="text"
                ></v-btn>
              </template>
            </v-list-item> </v-skeleton-loader
        ></v-list>
        <v-divider :thickness="3" width="300px" style="margin:0 auto; margin-top: 10px; margin-bottom: 10px;"></v-divider>
      </div>
    </div>
  </div>
</template>

<script>
import { getHumanList } from "@/impl/people/human";
import { next } from "@/impl/utils";
export default {
  data() {
    return {
      humans: null,
    };
  },
  created: function () {
    getHumanList((data, vuethis) => {
      vuethis.humans = data;
    }, this);
  },
  methods: {
    openDetail(human) {
      next.human = human;
      this.$router.push('/humans/' + human.uuid);
    }
  },
};
</script>

<style>
.v-skeleton-loader {
  display: block !important;
}</style>