import { Jsonable, JsonableObject } from '../utils/types';

let attributesStore = new Map<any, any>();
let originalsStore = new Map<any, any>();

function getStoreInstance<K>(store :Map<K, JsonableObject>, instance :K) :JsonableObject {
    if (!store.has(instance)) {
        store.set(instance, {} as JsonableObject);
    }
    return store.get(instance);
}

function setStoreInstance<K, V extends JsonableObject>(store :Map<K, V>, instance :K, data :V) :void {
    store.set(instance, data);
}

export function _setAttributesStore<K, V extends JsonableObject>(store :Map<K, V>) :void {
    attributesStore = store;
}

export function _setOriginalsStore<K, V extends JsonableObject>(store :Map<K, V>) :void {
    originalsStore = store;
}

export function getRawAttribute<K>(instance :K, key :string) :Jsonable {
    const attributes = getRawAttributes<K>(instance);
    return attributes[key];
}

export function getRawAttributes<K>(instance :K) :JsonableObject {
    return getStoreInstance<K>(attributesStore, instance);
}

export function getRawOriginals<K>(instance :K) :JsonableObject {
    return getStoreInstance<K>(originalsStore, instance);
}

export function setRawAttribute<K, V extends JsonableObject>(instance :K, key :string, value :Jsonable) :void {
    const attributes = getRawAttributes<K>(instance);
    attributes[key] = value;
    setRawAttributes<K, JsonableObject>(instance, attributes);
}

export function setRawAttributes<K, V extends JsonableObject>(instance :K, data :V) :void {
    setStoreInstance<K, JsonableObject>(attributesStore, instance, data);
}

export function setRawOriginals<K, V extends JsonableObject>(instance :K, data :V) :void {
    setStoreInstance<K, JsonableObject>(originalsStore, instance, data);
}
