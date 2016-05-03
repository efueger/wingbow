import {
    IllegalCastTypeError,
    IllegalStoreTypeError,
    MassAssignmentError,
    NotFillableError,
} from 'src/wingbow/database/errors';

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
            const err = new IllegalCastTypeError(`message: IllegalCastTypeError`);
            expect(err.message).toBe(`message: IllegalCastTypeError`);
        });

    });

    describe(`IllegalStoreTypeError`, () => {

        it(`should be exposed`, () => {
            expect(IllegalStoreTypeError).not.toBe(undefined);
        });

        it(`should have a name`, () => {
            const err = new IllegalStoreTypeError();
            expect(err.name).toBe(`IllegalStoreTypeError`);
        });

        it(`should pass along the message`, () => {
            const err = new IllegalStoreTypeError(`message: IllegalStoreTypeError`);
            expect(err.message).toBe(`message: IllegalStoreTypeError`);
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
            const err = new MassAssignmentError(`message: MassAssignmentError`);
            expect(err.message).toBe(`message: MassAssignmentError`);
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
            const err = new NotFillableError(`message: NotFillableError`);
            expect(err.message).toBe(`message: NotFillableError`);
        });

    });


});

/* vim: set cc=0 : */
