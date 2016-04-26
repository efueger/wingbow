import * as collection from 'src/wingbow/collection';

describe(`collection`, () => {

    it(`should expose "errors"`, () => {
        expect(collection.errors).not.toBe(undefined);
    });

    it(`should expose "Collection"`, () => {
        expect(collection.Collection).not.toBe(undefined);
    });

});

/* vim: set cc=0 : */
