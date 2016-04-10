import { isArray, isDate, isFunction, isNull, isNumber, isRegExp, isString } from './is';

function arrayToObject(arr :Array<any>) :Object {
    const obj = arr.reduce((prev, current, index) => {
        prev[index] = current;
        return prev;
    }, {});
    obj.length = arr.length;
    return obj;
}

export function toArray(value :any = null) :Array<any> {
    if (isNull(value)) {
        return [];
    }
    return Array.from(value);
}

export function toBoolean(value :any = false) :boolean {
    return Boolean(value);
}

export function toDate(value :any = null) :Date {
    return new Date(value);
}

export function toJSON(value :any = null) :string {
    return JSON.stringify(value);
}

export function toNumber(value :any = null) :number {
    return Number(value);
}

export function toNumberOrNaN(value :any = null) :number {
    if (isNumber(value)) {
        return value;
    }
    return NaN;
}

export function toObject(value :any = null) :Object {
    if (isArray(value)) {
        return arrayToObject(value);
    }
    if (isString(value)) {
        return JSON.parse(value);
    }
    if (isNull(value) || isFunction(value) || isRegExp(value)) {
        return {};
    }
    return value;
}

export function toString(value :any = '') :string {
    return String(value);
}

export function toTimestamp(value :any = null) :number {
    const date = toDate(value);
    return date.valueOf();
}
