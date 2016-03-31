import { getClass } from './getClass';

export function isArray<T>(item :any) :item is Array<T> {
    return getClass(item) === `array`;
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
