import { rnd } from 'src/wingbow/utils/rnd';

const min = 1;
const max = 5;

describe(`rnd`, () => {

    it(`should be sufficiently random`, () => {
        const avg = Math.floor((min + max) / 2);
        const iterations = 10000;
        const arr = new Array(iterations).fill(null).map(v => rnd(min, max));
        const total = arr.reduce((p, c) => p + c, 0);
        const result = Math.round(total / iterations);
        expect(result).toBe(avg);
    });

    describe(`0 arguments`, () => {

        it(`should default to a random number inclusive of "1" and "100"`, () => {
            expect(rnd() >= 1).toBe(true);
            expect(rnd() <= 100).toBe(true);
        });

    });

    describe(`1 argument`, () => {

        it(`should default to a random number inclusive of "1" and the given argument`, () => {
            expect(rnd(27) >= 1).toBe(true);
            expect(rnd(27) <= 27).toBe(true);
        });

    });

    describe(`2 arguments`, () => {

        it(`should produce a random number inclusive of "min" and "max"`, () => {
            expect(rnd(min, max) >= min).toBe(true);
            expect(rnd(min, max) <= max).toBe(true);
        });

    });

});

/* vim: set cc=0 : */
