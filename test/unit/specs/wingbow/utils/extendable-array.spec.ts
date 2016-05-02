import { isString } from 'src/wingbow/utils/is';
import { ExtendableArray } from 'src/wingbow/utils/extendable-array';

let extArr = new ExtendableArray<string>();

describe(`ExtendableArray`, () => {

    beforeEach(() => {
        extArr = new ExtendableArray<string>(`a`, `b`, `c`);
    });

    describe(`[Symbol.species]`, () => {

        it(`should return the constructor to use`, () => {
            const ctor = ExtendableArray[Symbol.species];
            expect(ctor).toEqual(ExtendableArray);
        });

    });

    describe(`concat`, () => {

        it(`should be able to "concat" a ExtendableArray`, () => {
            extArr = new ExtendableArray<string>(`a`, `b`, `c`);
            expect(extArr.concat(`d`, `e`, `f`)).toEqual(new ExtendableArray<string>(`a`, `b`, `c`, `d`, `e`, `f`));
            expect(extArr).toEqual(new ExtendableArray<string>(`a`, `b`, `c`));
        });

    });

    describe(`filter`, () => {

        it(`should be able to "filter" a ExtendableArray`, () => {
            extArr = new ExtendableArray<string>(`a`, `b`, `c`);
            expect(extArr.filter(item => item === `b`) instanceof ExtendableArray).toBe(true);
            expect(extArr.filter(item => item === `b`)).toEqual(new ExtendableArray<string>(`b`));
        });

    });

    describe(`map`, () => {

        it(`should be able to "map" a ExtendableArray`, () => {
            extArr = new ExtendableArray<string>(`a`, `b`, `c`);
            expect(extArr.map(item => item.toUpperCase()) instanceof ExtendableArray).toBe(true);
            expect(extArr.map(item => item.toUpperCase())).toEqual(new ExtendableArray<string>(`A`, `B`, `C`));
        });

    });

    describe(`slice`, () => {

        it(`should be able to "slice" a ExtendableArray`, () => {
            extArr = new ExtendableArray<string>(`a`, `b`, `c`);
            expect(extArr.slice(1) instanceof ExtendableArray).toBe(true);
            expect(extArr.slice(1)).toEqual(new ExtendableArray<string>(`b`, `c`));
        });

    });

    describe(`splice`, () => {

        it(`should be able to "splice" a ExtendableArray`, () => {
            extArr = new ExtendableArray<string>(`a`, `b`, `c`);
            expect(extArr.splice(1, 1)).toEqual(new ExtendableArray<string>(`b`));
            expect(extArr).toEqual(new ExtendableArray<string>(`a`, `c`));
        });

    });

    describe(`toArray`, () => {

        it(`should cast to a regular Array`, () => {
            const realArr = extArr.toArray();
            expect(realArr instanceof ExtendableArray).toBe(false);
            expect(realArr instanceof Array).toBe(true);
            expect(realArr).toEqual([`a`, `b`, `c`]);
        });

    });

});

/* vim: set cc=0 : */
