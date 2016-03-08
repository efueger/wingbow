const store = new Map();

export function getAttribute(instance :any, key? :string) :any {
    if (!store.has(instance)) {
        store.set(instance, {});
    }
    const model = store.get(instance);
    if (key == null) {
        return model;
    }
    return model[key];
}

export function hasAttribute(instance :any, key :string) :any {
    if (!store.has(instance)) {
        store.set(instance, {});
    }
    const model = store.get(instance);
    return key in model;
}

export function setAttribute(instance :any, key :string, value :any) :void {
    if (!store.has(instance)) {
        store.set(instance, {});
    }
    const model = store.get(instance);
    model[key] = value;
    store.set(instance, model);
}
