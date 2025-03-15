import { apiFetch, getEndpoint } from "../api"
import { STORY_NATURES } from "../utils";
const ENDPOINT_ROOT = '/people/story/'

export function getStoryDetail(uuid, callback_ok, vuethis) {
    apiFetch(ENDPOINT_ROOT + uuid,
        (json_data) => {
            return callback_ok(json_data, vuethis);
        },
        () => {}
    )
}

export function getNatureColor(nature) {
    if(nature == undefined) return "";
    return STORY_NATURES[nature][1];
}

export function getNatureShort(nature) {
    if(nature == undefined) return "";
    return STORY_NATURES[nature][2];
}

export function getNatureName(nature) {
    if(nature == undefined) return "";
    return STORY_NATURES[nature][0];
}