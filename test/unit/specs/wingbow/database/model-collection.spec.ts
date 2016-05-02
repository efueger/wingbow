import { ModelCollection } from 'src/wingbow/database/model-collection';


interface ModelTestCollection {
    id :number;
    value :any;
}

let mcol = new ModelCollection<ModelTestCollection>();

describe(`ModelCollection`, () => {

    beforeEach(() => {
        mcol = new ModelCollection<ModelTestCollection>(
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
            const ctor = ModelCollection[Symbol.species];
            expect(ctor).toEqual(ModelCollection);
        });

    });

    describe(`[Symbol.toStringTag]`, () => {

        it(`should return the name of the constructor`, () => {
            const name = mcol[Symbol.toStringTag];
            expect(name).toEqual(`ModelCollection`);
            expect(Object.prototype.toString.call(mcol)).toEqual(`[object ModelCollection]`);
        });

    });


});

/* vim: set cc=0 : */
