import { apiFetch, getEndpoint } from "../api"
const ENDPOINT_ROOT = '/people/propertie/'

export function getPropDetail(uuid, callback_ok, vuethis) {
    apiFetch(ENDPOINT_ROOT + uuid,
        (json_data) => {
            return callback_ok(json_data, vuethis);
        },
        () => {}
    )
}