<template>
  <div class="wallpaper">
    <div>
      
      <NamePanel ref="namePanel" v-on:finish="onFinish()" :loading="loading"></NamePanel>
      <!-- <v-stepper class="setup-card-np" v-else editable prev-text="上一步" next-text="下一步" :items="['信息', '白名单', '完成']"
        v-on:update:modelValue="onStageChange" v-model="stage">
        <template v-slot:item.1>
          <NamePanel ref="namePanel"></NamePanel>
        </template>

        <template v-slot:item.2>
          <WhitelistPanel ref="wlPanel"></WhitelistPanel>
        </template>

        <template v-slot:item.3>
          <SubmitPanel ref="submitPanel"></SubmitPanel>
        </template>
      </v-stepper> -->
    </div>
  </div>
</template>

<script>
import { redirectLogin } from '@/impl/utils';

export default {
  created() {
    redirectLogin(this, true);
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    onFinish() {
      this.loading = true;
    },
    onStageChange() {
      // Now, the stage is previous one, not changed right in this moment
      let lastStage = this.stage;
      if (lastStage == "1") {
        this.$refs.namePanel.onSaveRequest();
        if(this.$refs.wlPanel) this.$refs.wlPanel.handleNameChange();
      }

      /** if (lastStage == "1") {
        this.$refs.namePanel.onSaveRequest();
        if (localStorage.getItem("serverName") == '' || localStorage.getItem("adminName") == '') {
          alert("还不能进入到下一步。请检查服务器名称或管理员名称是否存在空值。");
          throw new Exception("Null value check")
        }
        localStorage.setItem("stage", "whitelist");
      } **/
    }
  }
};
</script>

<style>
@media screen and (max-width: 600px) {
  .v-window {
    padding: 0 !important;
    margin: 5px !important;
  }
}
</style>