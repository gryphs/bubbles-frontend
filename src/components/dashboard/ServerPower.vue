<template>
    <div>
        <v-dialog
      v-model="kill.dialog"
      max-width="500"
      persistent
    >
      <v-card
        text="如果强制关闭的话，服务器将不会保存存档，还可能会导致文件损坏。请仅在服务器无法关闭或者出现问题时才这么做。"
        title="真的要强制给服务器拔电源吗？"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn color="red-darken-1" @click="() => { kill.dialog = false; onMethod('kill'); }">
            确认强制关闭
          </v-btn>
          <v-btn color="grey" @click="kill.dialog = false">
            取消并返回
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
        <v-snackbar :timeout="2000" v-model="snakebar.toggle" :color="snakebar.color">
            {{ snakebar.msg }}
        </v-snackbar>
        <v-card class="setup-card settings-card">
            <v-card-text>
                <v-row no-gutters>
                    <v-col>
                        <v-sheet class="me-2">
                            <v-btn prepend-icon="mdi-power" color="green" class="w-100" @click="onMethod('start')"
                                :loading="loading.start">
                                开启
                            </v-btn>
                        </v-sheet>
                    </v-col>
                    <v-col>
                        <v-sheet class="me-2">
                            <v-btn prepend-icon="mdi-power-plug-off-outline" color="orange" class="w-100"
                                @click="onMethod('stop')" :loading="loading.stop">
                                关闭
                            </v-btn>
                        </v-sheet>
                    </v-col>
                    <v-col>
                        <v-sheet>
                            <v-btn prepend-icon="mdi-power-socket-us" color="red-darken-1" class="w-100"
                                @click="kill.dialog = true" :loading="loading.kill">
                                强制拔电源
                            </v-btn>
                        </v-sheet>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>

</template>

<script>
import { Power } from '@/impl/utils';

export default {
    methods: {
        onMethod(method) {
            this.loading[method] = true;
            Power(method, null, (data, vuethis) => {
                if (data['code'] == 500) {
                    vuethis.snakebar.msg = "操作失败，请联系管理员";
                    vuethis.snakebar.color = "red-darken-1";
                    vuethis.snakebar.toggle = true;
                    vuethis.$emit('statusChanged');
                } else {
                    vuethis.snakebar.msg = "操作成功提交~";
                    vuethis.snakebar.color = "green";
                    vuethis.snakebar.toggle = true;
                    vuethis.$emit('statusChanged');
                }

                vuethis.loading[method] = false;
            }, this);
        }
    },
    data() {
        return {
            loading: {
                start: false,
                stop: false,
                kill: false
            },
            snakebar: {
                color: "",
                msg: "",
                toggle: false,
            },
            kill: {
                dialog: false
            }
        }
    },
    props: {
        adminName: "",
        serverName: "",
        serverAddress: ""
    }
}
</script>