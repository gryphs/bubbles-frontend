import { apiFetch, getEndpoint } from "../api"
const ENDPOINT_ROOT = '/people/human/'
const ENDPOINT_LIST = 'list'
const ENDPOINT_DETAIL = 'detail'
const ENDPOINT_ENTRIES = 'entries'

/**
 * get the short list of humans.
 * 
 * Returns: [{"uuid", "name", "gender", "mobile"}]
 * @param {function (json_data)} callback_ok 
 */
export function getHumanList(callback_ok, vuethis) {
    apiFetch(ENDPOINT_ROOT + ENDPOINT_LIST,
        (json_data) => {
            return callback_ok(json_data, vuethis);
        },
        () => {}
    )
}

export function getHumanDetail(uuid, callback_ok, vuethis) {
    apiFetch(ENDPOINT_ROOT + ENDPOINT_DETAIL + "/" + uuid,
        (json_data) => {
            return callback_ok(json_data, vuethis);
        },
        () => {}
    )
}

export function getHumanEntryList(uuid, type, callback_ok, vuethis) {
    apiFetch(ENDPOINT_ROOT + ENDPOINT_ENTRIES + "/" + uuid + "?type=" + type,
        (json_data) => {
            return callback_ok(json_data, vuethis);
        },
        () => {}
    )
}