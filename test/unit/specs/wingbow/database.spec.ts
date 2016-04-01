import * as database from 'src/wingbow/database';

describe(`database`, () => {

    it(`should expose "errors"`, () => {
        expect(database.errors).not.toBe(undefined);
    });

    it(`should expose "DB"`, () => {
        expect(database.DB).not.toBe(undefined);
    });

    it(`should expose "Model"`, () => {
        expect(database.Model).not.toBe(undefined);
    });

});

/* vim: set cc=0 : */
