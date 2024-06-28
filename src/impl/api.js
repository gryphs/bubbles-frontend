import axios from "axios";
import md5 from "md5";


const API_PREFIX = "https://mock.apipark.cn/m1/4733915-4386511-default";
const STRICT_JSON = true;

export function getEndpoint(endpoint) {
    return API_PREFIX + endpoint;
}

function catchNonJSONError() {

}

function catchJavaScriptError(error) {
    console.error("An javascript error is caught by bubbles:", error);
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
    finally_callback
) {
    let url = getEndpoint(endpoint);
    axios.get(url)
        .then(function (response) {
            // check if response is json
            if((typeof response.data) == 'object') {
                // is json
                // generate cache
                window.localStorage.setItem("cache_" + md5(endpoint), JSON.stringify(response.data));
            } else {
                // is text
                // if json format is strictly required, then non-json contents will cause a Exception.
                if(STRICT_JSON) {
                    return catchNonJSONError();
                } else {
                    window.localStorage.setItem("cache_" + md5(endpoint), response.data);
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