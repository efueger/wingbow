import { isString } from 'src/wingbow/utils/is';
import { IllegalOperatorError } from 'src/wingbow/utils/errors';
import { BaseCollection } from 'src/wingbow/utils/baseCollection';

let col = null;

describe(`BaseCollection`, () => {

    beforeEach(() => {
        col = new BaseCollection();
    });

    describe(`constructor`, () => {

        it(`should have valid "instanceof" checks`, () => {
            expect(col instanceof BaseCollection).toBe(true);
            expect(col instanceof Array).toBe(true);
        });

        it(`should preserve the "constructor"`, () => {
            expect(col.constructor).toBe(BaseCollection);
        });

    });

});
