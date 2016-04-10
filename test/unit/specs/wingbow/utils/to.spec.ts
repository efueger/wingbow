import {
    toArray,
    toBoolean,
    toDate,
    toJSON,
    toNumber,
    toNumberOrNaN,
    toObject,
    toString,
    toTimestamp,
} from 'src/wingbow/utils/to';

describe(`is`, () => {

    describe(`toArray`, () => {

        it(`should convert values to an "Array"`, () => {
            expect(toArray({0: `a`, 1: `b`, 2: `c`, length: 3})).toEqual([`a`, `b`, `c`]);
            expect(toArray(null)).toEqual([]);
            expect(toArray(undefined)).toEqual([]);
        });

    });

    describe(`toBoolean`, () => {

        it(`should convert values to an "Boolean"`, () => {
            expect(toBoolean(0)).toEqual(false);
            expect(toBoolean(1)).toEqual(true);
            expect(toBoolean(null)).toEqual(false);
            expect(toBoolean(undefined)).toEqual(false);
        });

    });

    describe(`toDate`, () => {

        it(`should convert values to a "Date"`, () => {
            expect(toDate(`1 Jan 2000 UTC`)).toEqual(new Date(`1 Jan 2000 UTC`));
            expect(toDate()).toEqual(new Date(null));
        });

    });

    describe(`toJSON`, () => {

        it(`should convert values to "JSON"`, () => {
            expect(toJSON({a: 1, b: 2, c: 3})).toEqual(JSON.stringify({a: 1, b: 2, c: 3}));
            expect(toJSON()).toEqual(JSON.stringify(null));
        });

    });

    describe(`toNumber`, () => {

        it(`should convert values to a "Number"`, () => {
            expect(toNumber()).toEqual(0);
            expect(toNumber(2)).toEqual(2);
            expect(toNumber(NaN)).toEqual(NaN);
            expect(toNumber(true)).toEqual(1);
            expect(toNumber(false)).toEqual(0);
            expect(toNumber(`123`)).toEqual(123);
            expect(toNumber(`Infinity`)).toEqual(Infinity);
            expect(toNumber(`Twenty Seven`)).toEqual(NaN);
        });

    });

    describe(`toNumberOrNaN`, () => {

        it(`should convert values to a "Number" or "NaN"`, () => {
            expect(toNumberOrNaN()).toEqual(NaN);
            expect(toNumberOrNaN(2)).toEqual(2);
            expect(toNumberOrNaN(NaN)).toEqual(NaN);
            expect(toNumberOrNaN(true)).toEqual(NaN);
            expect(toNumberOrNaN(false)).toEqual(NaN);
            expect(toNumberOrNaN(`123`)).toEqual(NaN);
            expect(toNumberOrNaN(`Infinity`)).toEqual(NaN);
            expect(toNumberOrNaN(`Twenty Seven`)).toEqual(NaN);
        });

    });

    describe(`toObject`, () => {

        it(`should convert values to an "Object"`, () => {
            expect(toObject([`a`, `b`, `c`])).toEqual({0: `a`, 1: `b`, 2: `c`, length: 3});
            expect(toObject(JSON.stringify({a: 1, b: 2, c: 3}))).toEqual({a: 1, b: 2, c: 3});
            expect(toObject({d: 4, e: 5, f: 6})).toEqual({d: 4, e: 5, f: 6});
            expect(toObject(null)).toEqual({});
            expect(toObject(undefined)).toEqual({});
            expect(toObject(function () {})).toEqual({});
            expect(toObject(/a/)).toEqual({});
        });

    });

    describe(`toString`, () => {

        it(`should convert values to a "String"`, () => {
            expect(toString()).toBe('');
            expect(toString('foo')).toBe('foo');
            expect(toString(123)).toBe('123');
        });

    });

    describe(`toTimestamp`, () => {

        it(`should convert values to a "Timestamp"`, () => {
            expect(toTimestamp()).toEqual(0);
            expect(toTimestamp(946684800000)).toEqual(946684800000);
            expect(toTimestamp(`1 Jan 2000 UTC`)).toEqual(946684800000);
            expect(toTimestamp(new Date(`1 Jan 2000 UTC`))).toEqual(946684800000);
        });

    });

});

/* vim: set cc=0 : */
