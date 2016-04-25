import * as utils from 'src/wingbow/utils';

describe(`utils`, () => {

    it(`should expose "errors"`, () => {
        expect(utils.errors).not.toBe(undefined);
    });

    it(`should expose "is"`, () => {
        expect(utils.is).not.toBe(undefined);
    });

    it(`should expose "str"`, () => {
        expect(utils.str).not.toBe(undefined);
    });

    it(`should expose "to"`, () => {
        expect(utils.to).not.toBe(undefined);
    });

    it(`should expose "Collection"`, () => {
        expect(utils.Collection).not.toBe(undefined);
    });

    it(`should expose "hasOwn"`, () => {
        expect(utils.hasOwn).not.toBe(undefined);
    });

    it(`should expose "Extend"`, () => {
        expect(utils.Extend).not.toBe(undefined);
    });

    it(`should expose "Trait"`, () => {
        expect(utils.Trait).not.toBe(undefined);
    });

});

/* vim: set cc=0 : */
