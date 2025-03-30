export function clone(obj) {
    if (obj === null || obj === undefined) {
        return obj;
    }

    return JSON.parse(JSON.stringify(obj));
}

export const IMAGE_TYPES = ["image/bmp", "image/jpeg", "image/png", "image/webp"]

export function objectToHttpParams(obj, prefix = null) {
    if (!obj) {
        return "";
    }

    const list = [];
    for (let entry in obj) {
        if (obj.hasOwnProperty(entry)) {
            const p = prefix ? prefix + "__" + entry : entry;
            const e = obj[entry];
            list.push(e !== null && typeof e === "object" ? objectToHttpParams(e, p) : encodeURIComponent(p) + "=" + encodeURIComponent(e));
        }
    }

    return list.join("&");
}

export function httpParamsToObject(queryString) {
    // Handle empty or invalid query string
    if (!queryString || queryString.trim() === '?') {
        return {};
    }

    // Remove leading '?' and split into key-value pairs
    const params = queryString.replace(/^\?/, '').split('&');

    // Object to store the final result
    const result = {};

    // Process each parameter
    params.forEach(param => {
        const [encodedKey, encodedValue] = param.split('=');

        // Decode key and value
        const key = decodeURIComponent(encodedKey);
        const value = encodedValue ? decodeURIComponent(encodedValue) : '';

        // Parse and set the value
        setNestedValue(result, key, processValue(value));
    });

    return result;
}

// Helper function to set nested values dynamically
function setNestedValue(obj, key, value) {
    // Handle simple keys without double underscores
    if (!key.includes('__')) {
        obj[key] = value;
        return;
    }

    const parts = key.split('__');
    const baseKey = parts[0];

    // Determine if it's an array-like key
    const isArrayKey = parts.some(part => !isNaN(parseInt(part)));

    // Ensure the base key exists with appropriate type
    if (!obj[baseKey]) {
        obj[baseKey] = isArrayKey ? [] : {};
    }

    // Handle array-like keys
    if (isArrayKey) {
        // Find the numeric part
        const arrayIndex = parts.find(part => !isNaN(parseInt(part)));

        // Ensure the array exists and has the correct length
        if (Array.isArray(obj[baseKey])) {
            // Pad the array with null if needed
            while (obj[baseKey].length <= parseInt(arrayIndex)) {
                obj[baseKey].push(null);
            }

            // Set the value at the correct index
            obj[baseKey][parseInt(arrayIndex)] = value;
        }
        return;
    }

    // Handle object-like keys
    if (parts.length > 1) {
        const lastKey = parts[parts.length - 1];
        obj[baseKey][lastKey] = value;
    }
}

// Helper function to convert string values to appropriate types
function processValue(value) {
    // Trim whitespace
    value = value.trim();

    // Handle boolean values
    if (value.toLowerCase() === 'true') return true;
    if (value.toLowerCase() === 'false') return false;

    // Handle null or empty string
    if (value.toLowerCase() === 'null' || value === '') return null;

    // Handle numbers
    if (/^-?\d+$/.test(value)) return parseInt(value, 10);
    if (/^-?\d*\.\d+$/.test(value)) return parseFloat(value);

    // Return as string if no other type matches
    return value;
}