export function clone(obj) {
    if (obj === null || obj === undefined) {
        return obj;
    }

    return JSON.parse(JSON.stringify(obj));
}

export const IMAGE_TYPES = ["image/bmp", "image/jpeg", "image/png", "image/webp"]