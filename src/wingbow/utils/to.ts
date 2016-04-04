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

export function toDate(value :any = null) :Date {
    return new Date(value);
}

export function toJSON(value :any = null) :string {
    return JSON.stringify(value);
}

export function toNumber(value :any = null) :Number {
    return Number(value);
}

export function toNumberOrNaN(value :any = null) :Number {
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

export function toTimestamp(value :any = null) :Number {
    const date = toDate(value);
    return Number(date);
}
