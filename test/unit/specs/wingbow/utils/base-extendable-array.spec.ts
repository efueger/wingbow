import { isString } from 'src/wingbow/utils/is';
import { MAX_ARRAY_LENGTH } from 'src/wingbow/utils/max-array-length';
import { BaseExtendableArray } from 'src/wingbow/utils/base-extendable-array';

class CustomExtendableArray<T> extends BaseExtendableArray<T> {}

let baseExtArr = new BaseExtendableArray();
let custExtArr = new CustomExtendableArray();

describe(`BaseExtendableArray`, () => {

    beforeEach(() => {
        baseExtArr = new BaseExtendableArray();
        custExtArr = new CustomExtendableArray();
    });

    describe(`constructor`, () => {

        it(`should have valid "instanceof" checks`, () => {
            expect(baseExtArr instanceof BaseExtendableArray).toBe(true);
            expect(baseExtArr instanceof Array).toBe(true);
        });

        it(`should preserve the "constructor"`, () => {
            expect(baseExtArr.constructor).toBe(BaseExtendableArray);
        });

        it(`should be subclassable`, () => {
            baseExtArr = new CustomExtendableArray(`a`, `b`, `c`);
            expect(baseExtArr instanceof CustomExtendableArray).toBe(true);
            expect(baseExtArr instanceof BaseExtendableArray).toBe(true);
            expect(baseExtArr instanceof Array).toBe(true);
        });

    });

    describe(`length`, () => {

        it(`should return the "length" when used as a "getter"`, () => {
            custExtArr = new CustomExtendableArray(`a`, `b`, `c`);
            expect(custExtArr.length).toBe(3);
        });

        it(`should ignore indecies that are greater than or equal to the "MAX_ARRAY_LENGTH"`, () => {
            custExtArr = new CustomExtendableArray(`a`, `b`, `c`);
            custExtArr[MAX_ARRAY_LENGTH] = true;
            expect(custExtArr.length).toBe(3);
        });

        it(`should ignore indecies on the prototype`, () => {
            custExtArr = new CustomExtendableArray(`a`, `b`, `c`);
            expect(custExtArr.length).toBe(3);
            CustomExtendableArray.prototype[4] = `d`;
            expect(custExtArr.length).toBe(3);
            delete CustomExtendableArray.prototype[4];
        });

        it(`should ignore negative indecies`, () => {
            custExtArr = new CustomExtendableArray(`a`, `b`, `c`);
            expect(custExtArr.length).toBe(3);
            custExtArr[-2] = `y`;
            expect(custExtArr.length).toBe(3);
            delete CustomExtendableArray.prototype[5];
        });

        it(`should still calculate the length correctly when the indecies are added out of order`, () => {
            custExtArr = new CustomExtendableArray(`a`, `b`, `c`);
            expect(custExtArr.length).toBe(3);
            delete custExtArr[1];
            delete custExtArr[2];
            custExtArr[2] = `C`;
            custExtArr[1] = `B`;
            expect(custExtArr.length).toBe(3);
        });

        it(`should set the "length" when used as a "setter"`, () => {
            custExtArr = new CustomExtendableArray(`a`, `b`, `c`);
            custExtArr[7] = `h`;
            expect(custExtArr.length).toBe(8);
            [3, 4, 5, 6].forEach(function (index) {
                expect(index in custExtArr).toBe(false);
                expect(custExtArr[index]).toBe(undefined);
            });
        });

        it(`should remove any excess elements when the "set" length is less than the instance "length"`, () => {
            custExtArr = new CustomExtendableArray(`a`, `b`, `c`);
            custExtArr.length = 2;
            expect(custExtArr[3]).toBe(undefined);
        });

        it(`should throw a "RangeError" if a length greater than or equal to the "MAX_ARRAY_LENGTH" is trying to be set`, () => {
            custExtArr = new CustomExtendableArray(`a`, `b`, `c`);
            expect(() => {
                custExtArr.length = MAX_ARRAY_LENGTH;
            }).not.toThrow();
            expect(() => {
                custExtArr.length = MAX_ARRAY_LENGTH + 1;
            }).toThrowError(RangeError);
        });

    });

});

/* vim: set cc=0 : */
