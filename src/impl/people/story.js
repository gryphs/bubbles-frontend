import { apiFetch, getEndpoint } from "../api"
const ENDPOINT_ROOT = '/people/story/'

export function getStoryDetail(uuid, callback_ok, vuethis) {
    apiFetch(ENDPOINT_ROOT + uuid,
        (json_data) => {
            return callback_ok(json_data, vuethis);
        },
        () => {}
    )
}