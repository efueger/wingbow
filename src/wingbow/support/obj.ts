/// <reference path="./ext.d.ts" />

const hasOwnProperty = Object.prototype.hasOwnProperty;

export function assign(target :any, ...sources :Array<any>) :any {
    if (Object.assign) {
        return Object.assign.apply(Object, arguments);
    }
    const result = toObject(target);
    for (let index = 0; index < sources.length; index++) {
        const src = sources[index];
        if (src !== undefined && src !== null) {
            for (let key in src) {
                if (hasOwn(src, key)) {
                    result[key] = src[key];
                }
            }
        }
    }
    return result;
}

export function create(proto :Object, props :Object) :Object {
    if (typeof proto !== 'object') {
        throw new TypeError('Object prototype may only be an Object or null');
    }
    function Temp() {}
    Temp.prototype = proto;
    const result = new Temp();
    if (typeof props === 'object') {
        for (let key in props) {
            if (hasOwn(props, key)) {
                result[key] = props[key];
            }
        }
    }
    return result;
}

export function hasOwn(obj :any, key :string) :boolean {
    if (obj === null || obj === undefined) {
        return false;
    }
    return hasOwnProperty.call(obj, key);
}

export function toObject(val) {
    if (val === null || val === undefined) {
        throw new TypeError('Cannot convert null or undefined to object');
    }
    return Object(val);
}
