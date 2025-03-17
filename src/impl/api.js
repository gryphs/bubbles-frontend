import axios from "axios";
import md5 from "md5";


export const API_PREFIX = "https://app.mizuiro.xyz/";
const STRICT_JSON = true;

export function getEndpoint(endpoint) {
    return API_PREFIX + endpoint;
}

function catchNonJSONError() {

}

function catchJavaScriptError(error) {
    console.error("An javascript error is caught:", error);
    alert("对不起 (>人<；)\n发生运行时错误，请重试一下。详情：\n" + error);
}

/**
 * fetch an API of specific URL, in bubbles' API manner.
 * this function will automatically handle errors and show it to the UI.
 * @param {string} endpoint API's URL (no base_url will be added)
 * @param {function (json_data)} then_callback callback when success
 * @param {function ()} finally_callback finally callback (will be executed anyway)
 */
export function apiFetch(
    endpoint,
    then_callback,
    finally_callback = ()=>{}
) {
    let url = getEndpoint(endpoint);
    axios.get(url, {withCredentials: true})
        .then(function (response) {
            // check if response is json
            if((typeof response.data) != 'object') {
                if(STRICT_JSON) {
                    return catchNonJSONError();
                }
            }
            // fire callback
            then_callback(response.data);
        })
        .catch(function (error) {
            return catchJavaScriptError(error);
        })
        .finally(function () {
            return finally_callback();
        });
}