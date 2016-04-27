import { getClass } from './get-class';
import { MAX_ARRAY_LENGTH } from './max-array-length';

export function isArray<T>(item :any) :item is Array<T> {
    return getClass(item) === `array`;
}

export function isArrayLike(item :any) :boolean {
    if (item === null || item === undefined) {
        return false;
    }
    if (isArray(item) || isString(item)) {
        return true;
    }
    if (isFunction(item)) {
        return false;
    }
    const len = item.length;
    if (len === 0) {
        return true;
    }
    if (!isNumber(len) || len < 0 || len % 1 !== 0 || len > MAX_ARRAY_LENGTH) {
        return false;
    }
    return (len - 1) in item;
}

export function isBoolean(item :any) :item is Boolean {
    return getClass(item) === `boolean`;
}

export function isDate(item :any) :item is Date {
    return getClass(item) === `date`;
}

export function isError(item :any) :item is Error {
    return getClass(item) === `error`;
}

export function isFunction(item :any) :item is Function {
    return getClass(item) === `function`;
}

export function isNull(item :any) :boolean {
    return getClass(item) === `null`;
}

export function isNumber(item :any) :item is Number {
    return getClass(item) === `number`;
}

export function isObject(item :any) :item is Object {
    return getClass(item) === `object`;
}

export function isRegExp(item :any) :item is RegExp {
    return getClass(item) === `regexp`;
}

export function isString(item :any) :item is String {
    return getClass(item) === `string`;
}

export function isUndefined(item :any) :boolean {
    return getClass(item) === `undefined`;
}
