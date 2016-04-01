import { DB } from 'src/wingbow/database/db';

describe(`DB`, () => {

    it(`should not be null`, () => {
        expect(DB).not.toBe(undefined);
    });

});

/* vim: set cc=0 : */
