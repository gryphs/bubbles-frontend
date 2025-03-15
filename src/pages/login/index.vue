<template>
    <div class="wallpaper">
        <div>
            <LoginPanel :pin="this.pin" :loading="loading" :failedStatus="failedStatus" v-on:check-pin="checkPIN()"></LoginPanel>
        </div>
    </div>
</template>

<script>
import LoginPanel from "@/components/setup/LoginPanel.vue";
import { apiFetch } from "@/impl/api";
import { checkLogin } from "@/impl/utils";
export default {
    data() {
        return {
            pin: "",
            failedStatus: false,
            loading: false,
        };
    },
    created() {
        checkLogin((login_status, vuethis) => {
            if (login_status > 0) {
                if (login_status == 1402) {
                    vuethis.$router.push("/dashboard/");
                } else {
                    vuethis.$router.push("/setup/");
                }
            } else {
                vuethis.getPIN();
            }
        }, this);
    },
    methods: {
        getPIN() {
            apiFetch("login", (data) => {
                if (data["code"] == 200) {
                    this.pin = data["result"]["pin"];
                    console.log("Successfully fetched PIN:", this.pin);
                    localStorage.clear();
                    console.log("[!] Cleared localStorage in order to reset cache.");
                }
            })
        },
        checkPIN() {
            this.loading = true;
            checkLogin((login_status, vuethis) => {
                vuethis.loading = false;
                console.log("checkPIN, checkLogin, login_status is", login_status);
                if (login_status > 0) {
                    if (login_status == 1402) {
                        vuethis.$router.push("/dashboard/");
                    } else {
                        vuethis.$router.push("/setup/");
                    }
                } else {
                    vuethis.getPIN();
                    vuethis.failedStatus = true;
                }
            }, this);

        }
    }
};
</script>