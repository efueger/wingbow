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

    describe(`first`, () => {

        it(`should return the "first" element in the Collection`, () => {
            expect(col.first()).toEqual({id: 0, value: `foo`});
        });

    });

    describe(`last`, () => {

        it(`should return the "last" element in the Collection`, () => {
            expect(col.last()).toEqual({id: 7, value: `bar`});
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
