import { intersectWithObj, intersectWithoutObj } from 'src/wingbow/utils/intersect-obj';

const obj =  {
    alpha: 1,
    bravo: 2,
    charlie: 3,
    delta: 4,
    echo: 5,
};
const keys = [`bravo`, `delta`];

describe(`intersections`, () => {

    describe(`intersectWithObj`, () => {

        it(`should return an Object with props matching "keys"`, () => {
            expect(intersectWithObj(obj, keys)).toEqual({
                bravo: 2,
                delta: 4,
            });
        });

    });

    describe(`intersectWithoutObj`, () => {

        it(`should return an Object with props not matching "keys"`, () => {
            expect(intersectWithoutObj(obj, keys)).toEqual({
                alpha: 1,
                charlie: 3,
                echo: 5,
            });
        });

    });

});

/* vim: set cc=0 : */
