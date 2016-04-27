import { MAX_ARRAY_LENGTH } from 'src/wingbow/utils/max-array-length';

describe(`is`, () => {

    it(`should be one less than a 32 bit number`, () => {
        expect(MAX_ARRAY_LENGTH).toBe(Math.pow(2, 32) - 1);
    });

});

/* vim: set cc=0 : */
