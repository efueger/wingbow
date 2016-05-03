import { IllegalStoreTypeError } from './errors';
import { Jsonable, JsonableObject } from '../utils/types';

let attributesStore = new Map<any, any>();
let originalsStore = new Map<any, any>();

function getStore<K, V extends JsonableObject>(name :string) :Map<K, V> {
    switch (name) {
        case `attributes`:
            return attributesStore;
        case `originals`:
            return originalsStore;
        default:
            throw new IllegalStoreTypeError();
    }
}

function getStoreInstance<K>(instance :K, name :string) :JsonableObject {
    const store = getStore(name);
    if (!store.has(instance)) {
        store.set(instance, {} as JsonableObject);
    }
    return store.get(instance);
}

function setStoreInstance<K, V extends JsonableObject>(instance :K, name :string, newData :V) :void {
    const store = getStore(name);
    store.set(instance, newData);
}

export function _mockStore<K, V extends JsonableObject>(name :string, store :Map<K, V>) {
    switch (name) {
        case `attributes`:
            attributesStore = store;
            break;
        case `originals`:
            originalsStore = store;
            break;
        default:
            throw new IllegalStoreTypeError();
    }
}

export function getRaw<K>(instance :K, name :string, key :string) :Jsonable {
    const existingData = getRaws<K>(instance, name);
    return existingData[key];
}

export function getRaws<K>(instance :K, name :string) :JsonableObject {
    return getStoreInstance<K>(instance, name);
}

export function setRaw<K, V extends JsonableObject>(instance :K, name :string, key :string, value :Jsonable) :void {
    const newData = {
        [key]: value,
    };
    setRaws<K, JsonableObject>(instance, name, newData);
}

export function setRaws<K, V extends JsonableObject>(instance :K, name :string, newData :V) :void {
    const existingData = getRaws<K>(instance, name);
    const updatedData = Object.assign({}, existingData, newData);
    setStoreInstance<K, JsonableObject>(instance, name, updatedData);
}
