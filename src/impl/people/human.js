import { apiFetch, getEndpoint } from "../api"
const ENDPOINT_ROOT = '/people/human/'
const ENDPOINT_LIST = 'list'
const ENDPOINT_DETAIL = 'detail'
const ENDPOINT_STORIES = 'stories'
const ENDPOINT_PROPERTIES = 'properties'

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

export function getHumanStoryList(uuid, callback_ok, vuethis) {
    apiFetch(ENDPOINT_ROOT + ENDPOINT_STORIES + "/" + uuid,
        (json_data) => {
            return callback_ok(json_data, vuethis);
        },
        () => {}
    )
}

export function getHumanPropList(uuid, callback_ok, vuethis) {
    apiFetch(ENDPOINT_ROOT + ENDPOINT_PROPERTIES + "/" + uuid,
        (json_data) => {
            return callback_ok(json_data, vuethis);
        },
        () => {}
    )
}