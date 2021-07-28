export class ServiceRegistry {
    constructor() { }
    static getInstance() {
        if (!ServiceRegistry.instance) {
            ServiceRegistry.instance = new ServiceRegistry();
        }
        return ServiceRegistry.instance;
    }
    static register(key, service) {
        if (this.services.get(key)) {
            throw new Error(`${key} - already registered`);
        }
        this.services.set(key, service);
    }
    static unregister(key) {
        this.services.delete(key);
    }
    static resolve(key) {
        return this.services.get(key);
    }
    static resolveModel(instance) {
        return Array.from(this.services.values()).find((v) => v instanceof instance);
    }
    static reset() {
        this.services.clear();
    }
}
ServiceRegistry.services = new Map();
window.ZUI_APP_CORE = { serviceRegistry: ServiceRegistry.getInstance() };
//# sourceMappingURL=index.js.map