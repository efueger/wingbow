import { isString } from 'src/wingbow/utils/is';
import { IllegalOperatorError } from 'src/wingbow/collection/errors';
import { Collection } from 'src/wingbow/collection/collection';

interface TestCollection {
    id :number;
    value :any;
}

let col = new Collection<TestCollection>();

describe(`Collection`, () => {

    beforeEach(() => {
        col = new Collection<TestCollection>(
            {id: 0, value: `foo`},
            {id: 1, value: 0},
            {id: 2, value: 1},
            {id: 3, value: null},
            {id: 4, value: undefined},
            {id: 5, value: true},
            {id: 6, value: false},
            {id: 7, value: `bar`}
        );
    });

    describe(`[Symbol.species]`, () => {

        it(`should return the constructor to use`, () => {
            const ctor = Collection[Symbol.species];
            expect(ctor).toEqual(Collection);
        });

    });

    describe(`[Symbol.toStringTag]`, () => {

        it(`should return the name of the constructor`, () => {
            const name = col[Symbol.toStringTag];
            expect(name).toEqual(`Collection`);
            expect(Object.prototype.toString.call(col)).toEqual(`[object Collection]`);
        });

    });

    describe(`chunk`, () => {

        it(`should chop up the collection into smaller bits`, () => {
            expect(col.chunk(2) instanceof Collection).toBe(true);
            expect(col.chunk(2)).toEqual(new Collection<Collection<TestCollection>>(
                new Collection<TestCollection>({id: 0, value: `foo`}, {id: 1, value: 0}),
                new Collection<TestCollection>({id: 2, value: 1}, {id: 3, value: null}),
                new Collection<TestCollection>({id: 4, value: undefined}, {id: 5, value: true}),
                new Collection<TestCollection>({id: 6, value: false}, {id: 7, value: `bar`})
            ));
        });

        it(`should handle remainders`, () => {
            expect(col.chunk(3) instanceof Collection).toBe(true);
            expect(col.chunk(3)).toEqual(new Collection<Collection<TestCollection>>(
                new Collection<TestCollection>({id: 0, value: `foo`}, {id: 1, value: 0}, {id: 2, value: 1}),
                new Collection<TestCollection>({id: 3, value: null}, {id: 4, value: undefined}, {id: 5, value: true}),
                new Collection<TestCollection>({id: 6, value: false}, {id: 7, value: `bar`})
            ));
        });

        it(`should default to chopping up every "1" item(s)`, () => {
            expect(col.chunk() instanceof Collection).toBe(true);
            expect(col.chunk()).toEqual(new Collection<Collection<TestCollection>>(
                new Collection<TestCollection>({id: 0, value: `foo`}),
                new Collection<TestCollection>({id: 1, value: 0}),
                new Collection<TestCollection>({id: 2, value: 1}),
                new Collection<TestCollection>({id: 3, value: null}),
                new Collection<TestCollection>({id: 4, value: undefined}),
                new Collection<TestCollection>({id: 5, value: true}),
                new Collection<TestCollection>({id: 6, value: false}),
                new Collection<TestCollection>({id: 7, value: `bar`})
            ));
        });

    });

    describe(`clone`, () => {

        it(`should return the same items that were passed in`, () => {
            expect(col.clone() instanceof Collection).toBe(true);
            expect(col.clone()).not.toBe(col);
            expect(col.clone()).toEqual(new Collection<TestCollection>(
                {id: 0, value: `foo`},
                {id: 1, value: 0},
                {id: 2, value: 1},
                {id: 3, value: null},
                {id: 4, value: undefined},
                {id: 5, value: true},
                {id: 6, value: false},
                {id: 7, value: `bar`}
            ));
        });

    });

    describe(`compact`, () => {

        it(`should remove all falsy values from the Collection`, () => {
            col = new Collection<any>(undefined, 0, NaN, 1, false, 2, ``, 3, null, `4`);
            expect(col.compact() instanceof Collection).toBe(true);
            expect(col.compact()).toEqual(new Collection<any>(1, 2, 3, `4`));
        });

    });

    describe(`first`, () => {

        it(`should return the "first" element in the Collection`, () => {
            expect(col.first()).toEqual({id: 0, value: `foo`});
        });

    });

    describe(`flatten`, () => {

        it(`should remove nested Arrays and Collections`, () => {
            col = new Collection<any>(1, [[2], [new Collection<any>(3, 4), [5, [6, new Collection<any>(7)]], new Collection<any>(8, 9, 10)], new Collection<any>(11)], [12]);
            expect(col.flatten() instanceof Collection).toBe(true);
            expect(col.flatten()).toEqual(new Collection<any>(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));
        });

    });

    describe(`last`, () => {

        it(`should return the "last" element in the Collection`, () => {
            expect(col.last()).toEqual({id: 7, value: `bar`});
        });

    });

    describe(`remove`, () => {

        it(`should be able to remove an item by an "index"`, () => {
            expect(col.remove(3) instanceof Collection).toBe(true);
            expect(col.remove(3)).toEqual(new Collection<TestCollection>(
                {id: 0, value: `foo`},
                {id: 1, value: 0},
                {id: 2, value: 1},
                {id: 4, value: undefined},
                {id: 5, value: true},
                {id: 6, value: false},
                {id: 7, value: `bar`}
            ));
            expect(col.remove(-2) instanceof Collection).toBe(true);
            expect(col.remove(-2)).toEqual(new Collection<TestCollection>(
                {id: 0, value: `foo`},
                {id: 1, value: 0},
                {id: 2, value: 1},
                {id: 3, value: null},
                {id: 4, value: undefined},
                {id: 5, value: true},
                {id: 7, value: `bar`}
            ));
        });

        it(`should be able to remove an item by a "predicate"`, () => {
            expect(col.remove((v, i) => i % 2 === 0) instanceof Collection).toBe(true);
            expect(col.remove((v, i) => i % 2 === 0)).toEqual(new Collection<TestCollection>(
                {id: 1, value: 0},
                {id: 3, value: null},
                {id: 5, value: true},
                {id: 7, value: `bar`}
            ));
        });

    });

    describe(`sample`, () => {

        it(`should return an item from within the Collection`, () => {
            const s = col.sample();
            expect(col.includes(s)).toBe(true);
        });

    });

    describe(`shuffle`, () => {

        it(`should return a new shuffled Collection`, () => {
            expect(col.shuffle() instanceof Collection).toBe(true);
            expect(col.shuffle()).not.toBe(col);
        });

        xit(`should be sufficiently random`, () => {
            const nums = new Collection<number>(1, 2, 3, 4, 5);
            const avg = Math.floor(nums.reduce((p, c) => p + c, 0) / nums.length);
            const iterations = 10000;
            const arr = new Array(iterations).fill(null).map(v => nums.shuffle());
            const sums = arr.reduce((p, c) => {
                return p.map((v, i) => {
                    return v + c[i];
                });
            }, new Array(nums.length).fill(0));
            sums.forEach(total => {
                const result = Math.round(total / iterations);
                expect(result).toBe(avg);
            });
        });

        it(`should only contain the shuffled items`, () => {
            const shuffled = col.shuffle();
            expect(shuffled.length).toBe(col.length);
            shuffled.forEach((v, i) => {
                const index = col.findIndex(c => v);
                expect(index).not.toBe(-1);
                col = col.remove(index);
            });
            expect(col.length).toBe(0);
        });

    });

    describe(`unique`, () => {

        it(`should return a Collection of unique items`, () => {
            col = new Collection<any>(2, 1, NaN, 2, `3`, 4, null, 3, NaN, 1, 5);
            expect(col.unique() instanceof Collection).toBe(true);
            expect(col.unique()).toEqual(new Collection<any>(2, 1, NaN, `3`, 4, null, 3, 5));
        });

    });

    describe(`where`, () => {

        describe(`0 arguments`, () => {

            it(`should return an empty Collection`, () => {
                expect(col.where() instanceof Collection).toBe(true);
                expect(col.where().length).toBe(0);
            });

        });

        describe(`1 arguments`, () => {

            it(`should filter by "truthy"`, () => {
                expect(col.where(`id`) instanceof Collection).toBe(true);
                expect(col.where(`id`)).toEqual(new Collection<TestCollection>(
                    {id: 1, value: 0},
                    {id: 2, value: 1},
                    {id: 3, value: null},
                    {id: 4, value: undefined},
                    {id: 5, value: true},
                    {id: 6, value: false},
                    {id: 7, value: `bar`}
                ));
            });

        });

        describe(`2 arguments`, () => {

            it(`should filter by "==="`, () => {
                expect(col.where(`value`, null) instanceof Collection).toBe(true);
                expect(col.where(`value`, null)).toEqual(new Collection<TestCollection>(
                    {id: 3, value: null}
                ));
            });

            it(`should also be able to filter by a function`, () => {
                expect(col.where(`value`, isString) instanceof Collection).toBe(true);
                expect(col.where(`value`, isString)).toEqual(new Collection<TestCollection>(
                    {id: 0, value: `foo`},
                    {id: 7, value: `bar`}
                ));
            });

        });

        describe(`3 arguments`, () => {

            describe(`==`, () => {

                it(`should filter by "=="`, () => {
                    expect(col.where(`value`, `==`, null) instanceof Collection).toBe(true);
                    expect(col.where(`value`, `==`, null)).toEqual(new Collection<TestCollection>(
                        {id: 3, value: null},
                        {id: 4, value: undefined}
                    ));
                });

            });

            describe(`===`, () => {

                it(`should filter by "==="`, () => {
                    expect(col.where(`value`, `===`, null) instanceof Collection).toBe(true);
                    expect(col.where(`value`, `===`, null)).toEqual(new Collection<TestCollection>(
                        {id: 3, value: null}
                    ));
                });

            });

            describe(`>`, () => {

                it(`should filter by ">"`, () => {
                    expect(col.where(`value`, `>`, 0) instanceof Collection).toBe(true);
                    expect(col.where(`value`, `>`, 0)).toEqual(new Collection<TestCollection>(
                        {id: 2, value: 1}
                    ));
                });

            });

            describe(`>=`, () => {

                it(`should filter by >=`, () => {
                    expect(col.where(`value`, `>=`, 0) instanceof Collection).toBe(true);
                    expect(col.where(`value`, `>=`, 0)).toEqual(new Collection<TestCollection>(
                        {id: 1, value: 0},
                        {id: 2, value: 1}
                    ));
                });

            });

            describe(`<`, () => {

                it(`should filter by "<"`, () => {
                    expect(col.where(`value`, `<`, 1) instanceof Collection).toBe(true);
                    expect(col.where(`value`, `<`, 1)).toEqual(new Collection<TestCollection>(
                        {id: 1, value: 0}
                    ));
                });

            });

            describe(`<=`, () => {

                it(`should filter by "<="`, () => {
                    expect(col.where(`value`, `<=`, 1) instanceof Collection).toBe(true);
                    expect(col.where(`value`, `<=`, 1)).toEqual(new Collection<TestCollection>(
                        {id: 1, value: 0},
                        {id: 2, value: 1}
                    ));
                });

            });

            describe(`!=`, () => {

                it(`should filter by "!="`, () => {
                    expect(col.where(`value`, `!=`, null) instanceof Collection).toBe(true);
                    expect(col.where(`value`, `!=`, null)).toEqual(new Collection<TestCollection>(
                        {id: 0, value: `foo`},
                        {id: 1, value: 0},
                        {id: 2, value: 1},
                        {id: 5, value: true},
                        {id: 6, value: false},
                        {id: 7, value: `bar`}
                    ));
                });

            });

            describe(`!==`, () => {

                it(`should filter by "!=="`, () => {
                    expect(col.where(`value`, `!==`, null) instanceof Collection).toBe(true);
                    expect(col.where(`value`, `!==`, null)).toEqual(new Collection<TestCollection>(
                        {id: 0, value: `foo`},
                        {id: 1, value: 0},
                        {id: 2, value: 1},
                        {id: 4, value: undefined},
                        {id: 5, value: true},
                        {id: 6, value: false},
                        {id: 7, value: `bar`}
                    ));
                });

            });

            describe(`other`, () => {

                it(`should throw an Error`, () => {
                    expect(() => {
                        col.where(`value`, `<>`, null);
                    }).toThrowError(IllegalOperatorError);
                });

            });

        });

    });

});

/* vim: set cc=0 : */
