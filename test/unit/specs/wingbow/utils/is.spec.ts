import {
    isArray,
    isBoolean,
    isDate,
    isError,
    isFunction,
    isNull,
    isNumber,
    isObject,
    isRegExp,
    isString,
    isUndefined,
} from 'src/wingbow/utils/is';

describe(`is`, () => {

    describe(`isArray`, () => {

        it(`should return "true" when passed an Array`, () => {
            expect(isArray(new Array())).toBe(true);
            expect(isArray([])).toBe(true);
        });

        it(`should return "false" when not passed an Array`, () => {
            expect(isArray(new Boolean())).toBe(false);
            expect(isArray(true)).toBe(false);
            expect(isArray(new Date())).toBe(false);
            expect(isArray(new Error())).toBe(false);
            expect(isArray(new Function())).toBe(false);
            expect(isArray(function () {})).toBe(false);
            expect(isArray(null)).toBe(false);
            expect(isArray(new Number())).toBe(false);
            expect(isArray(0)).toBe(false);
            expect(isArray(new Object())).toBe(false);
            expect(isArray({})).toBe(false);
            expect(isArray(new RegExp(`regexp`))).toBe(false);
            expect(isArray(/regexp/)).toBe(false);
            expect(isArray(new String())).toBe(false);
            expect(isArray(``)).toBe(false);
            expect(isArray(undefined)).toBe(false);
        });

    });

    describe(`isBoolean`, () => {

        it(`should return "true" when passed a Boolean`, () => {
            expect(isBoolean(new Boolean())).toBe(true);
            expect(isBoolean(true)).toBe(true);
        });

        it(`should return "false" when not passed a Boolean`, () => {
            expect(isBoolean(new Array())).toBe(false);
            expect(isBoolean([])).toBe(false);
            expect(isBoolean(new Date())).toBe(false);
            expect(isBoolean(new Error())).toBe(false);
            expect(isBoolean(new Function())).toBe(false);
            expect(isBoolean(function () {})).toBe(false);
            expect(isBoolean(null)).toBe(false);
            expect(isBoolean(new Number())).toBe(false);
            expect(isBoolean(0)).toBe(false);
            expect(isBoolean(new Object())).toBe(false);
            expect(isBoolean({})).toBe(false);
            expect(isBoolean(new RegExp(`regexp`))).toBe(false);
            expect(isBoolean(/regexp/)).toBe(false);
            expect(isBoolean(new String())).toBe(false);
            expect(isBoolean(``)).toBe(false);
            expect(isBoolean(undefined)).toBe(false);
        });

    });

    describe(`isDate`, () => {

        it(`should return "true" when passed a Date`, () => {
            expect(isDate(new Date())).toBe(true);
        });

        it(`should return "false" when not passed a Date`, () => {
            expect(isDate(new Array())).toBe(false);
            expect(isDate([])).toBe(false);
            expect(isDate(new Boolean())).toBe(false);
            expect(isDate(true)).toBe(false);
            expect(isDate(new Error())).toBe(false);
            expect(isDate(new Function())).toBe(false);
            expect(isDate(function () {})).toBe(false);
            expect(isDate(null)).toBe(false);
            expect(isDate(new Number())).toBe(false);
            expect(isDate(0)).toBe(false);
            expect(isDate(new Object())).toBe(false);
            expect(isDate({})).toBe(false);
            expect(isDate(new RegExp(`regexp`))).toBe(false);
            expect(isDate(/regexp/)).toBe(false);
            expect(isDate(new String())).toBe(false);
            expect(isDate(``)).toBe(false);
            expect(isDate(undefined)).toBe(false);
        });

    });

    describe(`isError`, () => {

        it(`should return "true" when passed an Error`, () => {
            expect(isError(new Error())).toBe(true);
        });

        it(`should return "false" when not passed an Error`, () => {
            expect(isError(new Array())).toBe(false);
            expect(isError([])).toBe(false);
            expect(isError(new Boolean())).toBe(false);
            expect(isError(true)).toBe(false);
            expect(isError(new Date())).toBe(false);
            expect(isError(new Function())).toBe(false);
            expect(isError(function () {})).toBe(false);
            expect(isError(null)).toBe(false);
            expect(isError(new Number())).toBe(false);
            expect(isError(0)).toBe(false);
            expect(isError(new Object())).toBe(false);
            expect(isError({})).toBe(false);
            expect(isError(new RegExp(`regexp`))).toBe(false);
            expect(isError(/regexp/)).toBe(false);
            expect(isError(new String())).toBe(false);
            expect(isError(``)).toBe(false);
            expect(isError(undefined)).toBe(false);
        });

    });

    describe(`isFunction`, () => {

        it(`should return "true" when passed a Function`, () => {
            expect(isFunction(new Function())).toBe(true);
            expect(isFunction(function () {})).toBe(true);
        });

        it(`should return "false" when not passed a Function`, () => {
            expect(isFunction(new Array())).toBe(false);
            expect(isFunction([])).toBe(false);
            expect(isFunction(new Boolean())).toBe(false);
            expect(isFunction(true)).toBe(false);
            expect(isFunction(new Date())).toBe(false);
            expect(isFunction(new Error())).toBe(false);
            expect(isFunction(null)).toBe(false);
            expect(isFunction(new Number())).toBe(false);
            expect(isFunction(0)).toBe(false);
            expect(isFunction(new Object())).toBe(false);
            expect(isFunction({})).toBe(false);
            expect(isFunction(new RegExp(`regexp`))).toBe(false);
            expect(isFunction(/regexp/)).toBe(false);
            expect(isFunction(new String())).toBe(false);
            expect(isFunction(``)).toBe(false);
            expect(isFunction(undefined)).toBe(false);
        });

    });

    describe(`isNull`, () => {

        it(`should return "true" when passed null`, () => {
            expect(isNull(null)).toBe(true);
        });

        it(`should return "false" when not passed null`, () => {
            expect(isNull(new Array())).toBe(false);
            expect(isNull([])).toBe(false);
            expect(isNull(new Boolean())).toBe(false);
            expect(isNull(true)).toBe(false);
            expect(isNull(new Date())).toBe(false);
            expect(isNull(new Error())).toBe(false);
            expect(isNull(new Function())).toBe(false);
            expect(isNull(function () {})).toBe(false);
            expect(isNull(new Number())).toBe(false);
            expect(isNull(0)).toBe(false);
            expect(isNull(new Object())).toBe(false);
            expect(isNull({})).toBe(false);
            expect(isNull(new RegExp(`regexp`))).toBe(false);
            expect(isNull(/regexp/)).toBe(false);
            expect(isNull(new String())).toBe(false);
            expect(isNull(``)).toBe(false);
            expect(isNull(undefined)).toBe(false);
        });

    });

    describe(`isNumber`, () => {

        it(`should return "true" when passed a Number`, () => {
            expect(isNumber(new Number())).toBe(true);
            expect(isNumber(0)).toBe(true);
        });

        it(`should return "false" when not passed a Number`, () => {
            expect(isNumber(new Array())).toBe(false);
            expect(isNumber([])).toBe(false);
            expect(isNumber(new Boolean())).toBe(false);
            expect(isNumber(true)).toBe(false);
            expect(isNumber(new Date())).toBe(false);
            expect(isNumber(new Error())).toBe(false);
            expect(isNumber(new Function())).toBe(false);
            expect(isNumber(function () {})).toBe(false);
            expect(isNumber(null)).toBe(false);
            expect(isNumber(new Object())).toBe(false);
            expect(isNumber({})).toBe(false);
            expect(isNumber(new RegExp(`regexp`))).toBe(false);
            expect(isNumber(/regexp/)).toBe(false);
            expect(isNumber(new String())).toBe(false);
            expect(isNumber(``)).toBe(false);
            expect(isNumber(undefined)).toBe(false);
        });

    });

    describe(`isObject`, () => {

        it(`should return "true" when passed an Object`, () => {
            expect(isObject(new Object())).toBe(true);
            expect(isObject({})).toBe(true);
        });

        it(`should return "false" when not passed an Object`, () => {
            expect(isObject(new Array())).toBe(false);
            expect(isObject([])).toBe(false);
            expect(isObject(new Boolean())).toBe(false);
            expect(isObject(true)).toBe(false);
            expect(isObject(new Date())).toBe(false);
            expect(isObject(new Error())).toBe(false);
            expect(isObject(new Function())).toBe(false);
            expect(isObject(function () {})).toBe(false);
            expect(isObject(null)).toBe(false);
            expect(isObject(new Number())).toBe(false);
            expect(isObject(0)).toBe(false);
            expect(isObject(new RegExp(`regexp`))).toBe(false);
            expect(isObject(/regexp/)).toBe(false);
            expect(isObject(new String())).toBe(false);
            expect(isObject(``)).toBe(false);
            expect(isObject(undefined)).toBe(false);
        });

    });

    describe(`isRegExp`, () => {

        it(`should return "true" when passed a RegExp`, () => {
            expect(isRegExp(new RegExp(`regexp`))).toBe(true);
            expect(isRegExp(/regexp/)).toBe(true);
        });

        it(`should return "false" when not passed a RegExp`, () => {
            expect(isRegExp(new Array())).toBe(false);
            expect(isRegExp([])).toBe(false);
            expect(isRegExp(new Boolean())).toBe(false);
            expect(isRegExp(true)).toBe(false);
            expect(isRegExp(new Date())).toBe(false);
            expect(isRegExp(new Error())).toBe(false);
            expect(isRegExp(new Function())).toBe(false);
            expect(isRegExp(function () {})).toBe(false);
            expect(isRegExp(null)).toBe(false);
            expect(isRegExp(new Number())).toBe(false);
            expect(isRegExp(0)).toBe(false);
            expect(isRegExp(new Object())).toBe(false);
            expect(isRegExp({})).toBe(false);
            expect(isRegExp(new String())).toBe(false);
            expect(isRegExp(``)).toBe(false);
            expect(isRegExp(undefined)).toBe(false);
        });

    });

    describe(`isString`, () => {

        it(`should return "true" when passed a String`, () => {
            expect(isString(new String())).toBe(true);
            expect(isString(``)).toBe(true);
        });

        it(`should return "false" when not passed a String`, () => {
            expect(isString(new Array())).toBe(false);
            expect(isString([])).toBe(false);
            expect(isString(new Boolean())).toBe(false);
            expect(isString(true)).toBe(false);
            expect(isString(new Date())).toBe(false);
            expect(isString(new Error())).toBe(false);
            expect(isString(new Function())).toBe(false);
            expect(isString(function () {})).toBe(false);
            expect(isString(null)).toBe(false);
            expect(isString(new Number())).toBe(false);
            expect(isString(0)).toBe(false);
            expect(isString(new Object())).toBe(false);
            expect(isString({})).toBe(false);
            expect(isString(new RegExp(`regexp`))).toBe(false);
            expect(isString(/regexp/)).toBe(false);
            expect(isString(undefined)).toBe(false);
        });

    });

    describe(`isUndefined`, () => {

        it(`should return "true" when passed undefined`, () => {
            expect(isUndefined(undefined)).toBe(true);
        });

        it(`should return "false" when not passed undefined`, () => {
            expect(isUndefined(new Array())).toBe(false);
            expect(isUndefined([])).toBe(false);
            expect(isUndefined(new Boolean())).toBe(false);
            expect(isUndefined(true)).toBe(false);
            expect(isUndefined(new Date())).toBe(false);
            expect(isUndefined(new Error())).toBe(false);
            expect(isUndefined(new Function())).toBe(false);
            expect(isUndefined(function () {})).toBe(false);
            expect(isUndefined(null)).toBe(false);
            expect(isUndefined(new Number())).toBe(false);
            expect(isUndefined(0)).toBe(false);
            expect(isUndefined(new Object())).toBe(false);
            expect(isUndefined({})).toBe(false);
            expect(isUndefined(new RegExp(`regexp`))).toBe(false);
            expect(isUndefined(/regexp/)).toBe(false);
            expect(isUndefined(new String())).toBe(false);
            expect(isUndefined(``)).toBe(false);
        });

    });

});

/* vim: set cc=0 : */
