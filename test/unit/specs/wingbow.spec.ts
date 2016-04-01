import * as wingbow from 'src/wingbow';

describe(`wingbow`, () => {

    it(`should be able to pass a test`, () => {
        expect(true).toBe(true);
    });

    it(`should only expose "database"`, () => {
        expect(Object.keys(wingbow)).toEqual([`database`]);
    });

});

/* vim: set cc=0 : */
