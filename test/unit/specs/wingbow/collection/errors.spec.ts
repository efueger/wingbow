import { IllegalOperatorError } from 'src/wingbow/collection/errors';

describe(`errors`, () => {

    describe(`IllegalOperatorError`, () => {

        it(`should be exposed`, () => {
            expect(IllegalOperatorError).not.toBe(undefined);
        });

        it(`should have a name`, () => {
            const err = new IllegalOperatorError();
            expect(err.name).toBe(`IllegalOperatorError`);
        });

        it(`should pass along the message`, () => {
            const err = new IllegalOperatorError(`message`);
            expect(err.message).toBe(`message`);
        });

    });

});

/* vim: set cc=0 : */