import * as wingbow from 'src/wingbow';

describe(`wingbow`, () => {

    it(`should be able to pass a test`, () => {
        expect(true).toBe(true);
    });

    it(`should expose "database"`, () => {
        expect(wingbow.database).not.toBe(undefined);
    });

    it(`should expose "utils"`, () => {
        expect(wingbow.utils).not.toBe(undefined);
    });

});

/* vim: set cc=0 : */
