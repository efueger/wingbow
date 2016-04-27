import { getClass } from 'src/wingbow/utils/get-class';

const args = (function iife(a, b, c) { return arguments; })(`a`, `b`, `c`);
const arrLikeObj = {0: `a`, 1: `b`, 2: `c`, length: 3};

describe(`getClass`, () => {

    describe(`Array`, () => {

        it(`should return "array" when passed an Array`, () => {
            expect(getClass(new Array())).toBe(`array`);
            expect(getClass([])).toBe(`array`);
        });

    });

    describe(`ArrayLike`, () => {

        it(`should return "object" when passed an ArrayLike Object`, () => {
            expect(getClass(args)).toBe(`object`);
            expect(getClass(arrLikeObj)).toBe(`object`);
        });

    });

    describe(`Boolean`, () => {

        it(`should return "boolean" when passed a Boolean`, () => {
            expect(getClass(new Boolean())).toBe(`boolean`);
            expect(getClass(true)).toBe(`boolean`);
        });

    });

    describe(`Date`, () => {

        it(`should return "date" when passed a Date`, () => {
            expect(getClass(new Date())).toBe(`date`);
        });

    });

    describe(`Error`, () => {

        it(`should return "error" when passed an Error`, () => {
            expect(getClass(new Error())).toBe(`error`);
        });

    });

    describe(`Function`, () => {

        it(`should return "function" when passed a Function`, () => {
            expect(getClass(new Function())).toBe(`function`);
            expect(getClass(function () {})).toBe(`function`);
        });

    });

    describe(`Null`, () => {

        it(`should return "null" when passed null`, () => {
            expect(getClass(null)).toBe(`null`);
        });

    });

    describe(`Number`, () => {

        it(`should return "number" when passed a Number`, () => {
            expect(getClass(new Number())).toBe(`number`);
            expect(getClass(0)).toBe(`number`);
        });

    });

    describe(`Object`, () => {

        it(`should return "object" when passed an Object`, () => {
            expect(getClass(new Object())).toBe(`object`);
            expect(getClass({})).toBe(`object`);
        });

    });

    describe(`RegExp`, () => {

        it(`should return "regExp" when passed a RegExp`, () => {
            expect(getClass(new RegExp(`regexp`))).toBe(`regexp`);
            expect(getClass(/regexp/)).toBe(`regexp`);
        });

    });

    describe(`String`, () => {

        it(`should return "string" when passed a String`, () => {
            expect(getClass(new String())).toBe(`string`);
            expect(getClass(``)).toBe(`string`);
        });

    });

    describe(`Undefined`, () => {

        it(`should return "undefined" when passed undefined`, () => {
            expect(getClass(undefined)).toBe(`undefined`);
        });

    });

    describe(`other`, () => {

        it(`should return "other" when passed anything else`, () => {
            expect(getClass(document.body)).toBe(`object`);
        });

    });

});

/* vim: set cc=0 : */
