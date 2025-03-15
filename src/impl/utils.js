import { apiFetch } from "./api";

// 检查结果如果小于0就是没有登录，大于0就是登录了（但情况不同，1402是有服务器了）
export function checkLogin(callback, vuethis) {
    apiFetch("login", (data) => {
        if (data["code"] == 200) {
            callback(-1, vuethis);
        } else if (data["code"] == 1401 || data["code"] == 1402 || data["code"] == 1201) {
            callback(data["code"], vuethis);
        } else {
            callback(-1, vuethis);
        }
    })
}

export function getInstance(callback, vuethis) {
    apiFetch("instance", (data) => {
        if (data['code'] == 1402) {
            vuethis.$router.push("/setup/");
            return;
        }
        callback(data['result'], vuethis);
    })
}

export function Power(operation, uid, callback, vuethis) {
    apiFetch("power?op=" + operation + "&uid=" + uid, (data) => {
        if (data['code'] == 1402) {
            vuethis.$router.push("/setup/");
            return;
        }
        callback(data, vuethis);
    });
}

export function redirectLogin(vuethis, do_advanced_redirect = false) {
    checkLogin((login_status, vuethis) => {
        if (login_status < 0) {
            vuethis.$router.push("/login/");
        } else {
            if(do_advanced_redirect) {
                console.log("do_advanced_redirect", login_status)
                if(login_status == 1402) {
                    vuethis.$router.push("/dashboard/");
                    return;
                }
            }
        }
    }, vuethis);
}