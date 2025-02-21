// @ts-check

export class EventService {
    constructor() {
        this.id = 0;
        this.listeners = [];
    }

    // Subscribe to an event
    on(channel, action) {
        const listener = { id: ++this.id, channel, action };
        this.listeners.push(listener);

        return () => this.off(listener.id);
    }

    off(id) {
        this.listeners = this.listeners.filter(listener => listener.id !== id);
    }

    publish(channel, payload) {
        this.listeners
            .filter(listener => listener.channel === channel)
            .forEach(listener => listener.action({ channel, payload, local: true }));
    }

    clear() {
        this.listeners = [];
    }
}

export default new EventService();