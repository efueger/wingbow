let attributesStore = new Map();
let originalsStore = new Map();

function getRaw(store :any, instance :any) :any {
    if (!store.has(instance)) {
        store.set(instance, {});
    }
    return store.get(instance);
}

function setRaw(store :any, instance :any, data :any) :void {
    store.set(instance, data);
}

export function _setAttributesStore(store :any) :void {
    attributesStore = store;
}

export function _setOriginalsStore(store :any) :void {
    originalsStore = store;
}

export function getRawAttribute(instance :any, key :string) :any {
    const attributes = getRawAttributes(instance);
    return attributes[key];
}

export function getRawAttributes(instance :any) :any {
    return getRaw(attributesStore, instance);
}

export function getRawOriginals(instance :any) :any {
    return getRaw(originalsStore, instance);
}

export function setRawAttribute(instance :any, key :string, value :any) :void {
    const attributes = getRawAttributes(instance);
    attributes[key] = value;
    setRawAttributes(instance, attributes);
}

export function setRawAttributes(instance :any, data :any) :void {
    setRaw(attributesStore, instance, data);
}

export function setRawOriginals(instance :any, data :any) :void {
    setRaw(originalsStore, instance, data);
}
