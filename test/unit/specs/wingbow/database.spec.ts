import * as database from 'src/wingbow/database';

describe('database', () => {

    describe('errors', () => {

        it('should expose `CouldNotFillError`', () => {
            expect(database.CouldNotFillError).not.toBe(null);
        });

        it('should expose `NotDatableError`', () => {
            expect(database.NotDatableError).not.toBe(null);
        });

        it('should expose `MassAssignmentError`', () => {
            expect(database.MassAssignmentError).not.toBe(null);
        });

    });

    it('should expose `DB`', () => {
        expect(database.DB).not.toBe(null);
    });

    it('should expose `Model`', () => {
        expect(database.Model).not.toBe(null);
    });

});
