import { isString } from 'src/wingbow/utils/is';
import { Collection } from 'src/wingbow/utils/collection';
import { IllegalOperatorError } from 'src/wingbow/utils/errors';
import { BaseCollection, MAX_ARRAY_LENGTH } from 'src/wingbow/utils/base-collection';

let col = null;

describe(`Collection`, () => {

    beforeEach(() => {
        col = new Collection(
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

    describe(`constructor`, () => {

        it(`should have valid "instanceof" checks`, () => {
            expect(col instanceof Collection).toBe(true);
            expect(col instanceof BaseCollection).toBe(true);
            expect(col instanceof Array).toBe(true);
        });

        it(`should preserve the "constructor"`, () => {
            expect(col.constructor).toBe(Collection);
        });

    });

    describe(`concat`, () => {

        it(`should be able to "concat" a Collection`, () => {
            col = new Collection(`a`, `b`, `c`);
            expect(col.concat(`d`, `e`, `f`)).toEqual(new Collection(`a`, `b`, `c`, `d`, `e`, `f`));
            expect(col).toEqual(new Collection(`a`, `b`, `c`));
        });

    });

    describe(`filter`, () => {

        it(`should be able to "filter" a Collection`, () => {
            col = new Collection(`a`, `b`, `c`);
            expect(col.filter(item => item === `b`) instanceof Collection).toBe(true);
            expect(col.filter(item => item === `b`)).toEqual(new Collection(`b`));
        });

    });

    describe(`first`, () => {

        it(`should return the "first" element in the Collection`, () => {
            expect(col.first()).toEqual({id: 0, value: `foo`});
        });

    });

    describe(`length`, () => {

        it(`should return the "length" when used as a "getter"`, () => {
            col = new Collection(`a`, `b`, `c`);
            expect(col.length).toBe(3);
        });

        it(`should ignore indecies that are greater than or equal to the "MAX_ARRAY_LENGTH"`, () => {
            col = new Collection(`a`, `b`, `c`);
            col[MAX_ARRAY_LENGTH] = true;
            expect(col.length).toBe(3);
        });

        it(`should ignore indecies on the prototype`, () => {
            col = new Collection(`a`, `b`, `c`);
            expect(col.length).toBe(3);
            Collection.prototype[4] = `d`;
            expect(col.length).toBe(3);
            delete Collection.prototype[4];
        });

        it(`should ignore negative indecies`, () => {
            col = new Collection(`a`, `b`, `c`);
            expect(col.length).toBe(3);
            col[-2] = `y`;
            expect(col.length).toBe(3);
            delete Collection.prototype[5];
        });

        it(`should still calculate the length correctly when the indecies are added out of order`, () => {
            col = new Collection(`a`, `b`, `c`);
            expect(col.length).toBe(3);
            delete col[1];
            delete col[2];
            col[2] = `C`;
            col[1] = `B`;
            expect(col.length).toBe(3);
        });

        it(`should set the "length" when used as a "setter"`, () => {
            col = new Collection(`a`, `b`, `c`);
            col[7] = `h`;
            expect(col.length).toBe(8);
            [3, 4, 5, 6].forEach(function (index) {
                expect(index in col).toBe(false);
                expect(col[index]).toBe(undefined);
            });
        });

        it(`should remove any excess elements when the "set" length is less than the instance "length"`, () => {
            col = new Collection(`a`, `b`, `c`);
            col.length = 2;
            expect(col[3]).toBe(undefined);
        });

        it(`should throw a "RangeError" if a length greater than or equal to the "MAX_ARRAY_LENGTH" is trying to be set`, () => {
            col = new Collection(`a`, `b`, `c`);
            expect(() => {
                col.length = MAX_ARRAY_LENGTH;
            }).not.toThrow();
            expect(() => {
                col.length = MAX_ARRAY_LENGTH + 1;
            }).toThrowError(RangeError);
        });

    });

    describe(`last`, () => {

        it(`should return the "last" element in the Collection`, () => {
            expect(col.last()).toEqual({id: 7, value: `bar`});
        });

    });

    describe(`map`, () => {

        it(`should be able to "map" a Collection`, () => {
            col = new Collection(`a`, `b`, `c`);
            expect(col.map(item => item.toUpperCase()) instanceof Collection).toBe(true);
            expect(col.map(item => item.toUpperCase())).toEqual(new Collection(`A`, `B`, `C`));
        });

    });

    describe(`slice`, () => {

        it(`should be able to "slice" a Collection`, () => {
            col = new Collection(`a`, `b`, `c`);
            expect(col.slice(1) instanceof Collection).toBe(true);
            expect(col.slice(1)).toEqual(new Collection(`b`, `c`));
        });

    });

    describe(`splice`, () => {

        it(`should be able to "splice" a Collection`, () => {
            col = new Collection(`a`, `b`, `c`);
            expect(col.splice(1, 1)).toEqual(new Collection(`b`));
            expect(col).toEqual(new Collection(`a`, `c`));
        });

    });

    describe(`toArray`, () => {

        it(`should cast the collection to an Array`, () => {
            expect(col.toArray() instanceof Array).toBe(true);
            expect(col.toArray()).toEqual([
                {id: 0, value: `foo`},
                {id: 1, value: 0},
                {id: 2, value: 1},
                {id: 3, value: null},
                {id: 4, value: undefined},
                {id: 5, value: true},
                {id: 6, value: false},
                {id: 7, value: `bar`},
            ]);
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
                expect(col.where(`id`)).toEqual(new Collection(
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
                expect(col.where(`value`, null)).toEqual(new Collection(
                    {id: 3, value: null}
                ));
            });

            it(`should also be able to filter by a function`, () => {
                expect(col.where(`value`, isString) instanceof Collection).toBe(true);
                expect(col.where(`value`, isString)).toEqual(new Collection(
                    {id: 0, value: `foo`},
                    {id: 7, value: `bar`}
                ));
            });

        });

        describe(`3 arguments`, () => {

            describe(`==`, () => {

                it(`should filter by "=="`, () => {
                    expect(col.where(`value`, `==`, null) instanceof Collection).toBe(true);
                    expect(col.where(`value`, `==`, null)).toEqual(new Collection(
                        {id: 3, value: null},
                        {id: 4, value: undefined}
                    ));
                });

            });

            describe(`===`, () => {

                it(`should filter by "==="`, () => {
                    expect(col.where(`value`, `===`, null) instanceof Collection).toBe(true);
                    expect(col.where(`value`, `===`, null)).toEqual(new Collection(
                        {id: 3, value: null}
                    ));
                });

            });

            describe(`>`, () => {

                it(`should filter by ">"`, () => {
                    expect(col.where(`value`, `>`, 0) instanceof Collection).toBe(true);
                    expect(col.where(`value`, `>`, 0)).toEqual(new Collection(
                        {id: 2, value: 1}
                    ));
                });

            });

            describe(`>=`, () => {

                it(`should filter by >=`, () => {
                    expect(col.where(`value`, `>=`, 0) instanceof Collection).toBe(true);
                    expect(col.where(`value`, `>=`, 0)).toEqual(new Collection(
                        {id: 1, value: 0},
                        {id: 2, value: 1}
                    ));
                });

            });

            describe(`<`, () => {

                it(`should filter by "<"`, () => {
                    expect(col.where(`value`, `<`, 1) instanceof Collection).toBe(true);
                    expect(col.where(`value`, `<`, 1)).toEqual(new Collection(
                        {id: 1, value: 0}
                    ));
                });

            });

            describe(`<=`, () => {

                it(`should filter by "<="`, () => {
                    expect(col.where(`value`, `<=`, 1) instanceof Collection).toBe(true);
                    expect(col.where(`value`, `<=`, 1)).toEqual(new Collection(
                        {id: 1, value: 0},
                        {id: 2, value: 1}
                    ));
                });

            });

            describe(`!=`, () => {

                it(`should filter by "!="`, () => {
                    expect(col.where(`value`, `!=`, null) instanceof Collection).toBe(true);
                    expect(col.where(`value`, `!=`, null)).toEqual(new Collection(
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
                    expect(col.where(`value`, `!==`, null)).toEqual(new Collection(
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
