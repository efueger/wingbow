import { hasOwn } from 'src/wingbow/utils/has-own';

let TestConstructor = null;
let classObj = null;
let normalObj = null;

describe(`hasOwn`, () => {

    beforeEach(() => {
        TestConstructor = function () {
            this.localProp = null;
        };
        classObj = new TestConstructor();
        normalObj = {
            hasOwnProperty: null,
            testProp: null,
        };
    });

    it(`should be able to find properties`, function () {
        expect(hasOwn(normalObj, `testProp`)).toBe(true);
    });

    it(`should not be error on properties that have not been defined`, function () {
        expect(hasOwn(normalObj, `missingProp`)).toBe(false);
    });

    it(`should still work even when the "hasOwnProperty" has been redefined`, function () {
        expect(hasOwn(normalObj, `hasOwnProperty`)).toBe(true);
    });

    it(`should match properties present on instances`, function () {
        expect(hasOwn(classObj, `localProp`)).toBe(true);
    });

    it(`should not match "prototype" properties`, function () {
        expect(hasOwn(classObj, `testProp`)).toBe(false);
    });

    it(`should not error if called on "null" or "undefined"`, function () {
        expect(hasOwn()).toBe(false);
        expect(hasOwn(null)).toBe(false);
        expect(hasOwn(undefined)).toBe(false);
        expect(hasOwn(normalObj)).toBe(false);
        expect(hasOwn(normalObj, null)).toBe(false);
        expect(hasOwn(normalObj, undefined)).toBe(false);
    });

    describe(`when "Object.prototype.hasOwnProperty" is hijacked`, () => {

        const oldHasOwnProperty = Object.prototype.hasOwnProperty;

        beforeEach(() => {
            /*eslint no-extend-native: 0*/
            Object.prototype.hasOwnProperty = null;
        });

        afterEach(() => {
            Object.prototype.hasOwnProperty = oldHasOwnProperty;
        });

        it(`should still work`, function () {
            expect(hasOwn(normalObj, `testProp`)).toBe(true);
        });

    });

});

/* vim: set cc=0 : */
