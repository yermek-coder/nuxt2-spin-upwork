// @ts-check
// API Service
class API {
    get(path, config = null) {
        return this.exec("get", path, null, config);
    }

    put(path, body = null, config = null) {
        return this.exec("put", path, body, config);
    }

    post(path, body = null, config = null) {
        return this.exec("post", path, body, config);
    }

    remove(path, config = null) {
        return this.exec("delete", path, null, config);
    }

    exec(method, path, body = null, config = {}) {
        // Init headers
        const headers = {};

        // Check upload type
        if (body && typeof body == "object") {
            const isServer = process.server;
            const isFormData = isServer
                ? body.constructor && body.constructor.name === 'FormData'
                : body instanceof FormData;

            if (!isFormData) {
                body = JSON.stringify(body);
                headers["Content-Type"] = "application/json";
            }
        }

        // Execute fetch
        return fetch('/api/' + path, {
            body,
            method,
            ...config,
            credentials: "include",
            headers: { ...headers, ...config?.headers }
        }).then(async res => {
            if (res.status >= 400) {
                let payload = { message: await res.text() };
                try {
                    payload = JSON.parse(payload.message);
                } catch (e) { }

                throw { status: res.status, statusText: res.statusText, ...payload };
            }

            // Parse json
            const text = await res.text();
            try {
                return JSON.parse(text);
            } catch (err) {
                return text;
            }
        });
    }
}

export default new API();
