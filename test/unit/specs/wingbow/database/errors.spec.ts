import { IllegalCastTypeError, MassAssignmentError, NotFillableError } from 'src/wingbow/database/errors';

describe(`errors`, () => {

    describe(`IllegalCastTypeError`, () => {

        it(`should be exposed`, () => {
            expect(IllegalCastTypeError).not.toBe(undefined);
        });

        it(`should have a name`, () => {
            const err = new IllegalCastTypeError();
            expect(err.name).toBe(`IllegalCastTypeError`);
        });

        it(`should pass along the message`, () => {
            const err = new IllegalCastTypeError(`message`);
            expect(err.message).toBe(`message`);
        });

    });

    describe(`MassAssignmentError`, () => {

        it(`should be exposed`, () => {
            expect(MassAssignmentError).not.toBe(undefined);
        });

        it(`should have a name`, () => {
            const err = new MassAssignmentError();
            expect(err.name).toBe(`MassAssignmentError`);
        });

        it(`should pass along the message`, () => {
            const err = new MassAssignmentError(`message`);
            expect(err.message).toBe(`message`);
        });

    });
    describe(`NotFillableError`, () => {

        it(`should be exposed`, () => {
            expect(NotFillableError).not.toBe(undefined);
        });

        it(`should have a name`, () => {
            const err = new NotFillableError();
            expect(err.name).toBe(`NotFillableError`);
        });

        it(`should pass along the message`, () => {
            const err = new NotFillableError(`message`);
            expect(err.message).toBe(`message`);
        });

    });


});

/* vim: set cc=0 : */
