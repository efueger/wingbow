import * as wingbow from 'src/wingbow';

describe('wingbow', () => {

    it('should be able to pass a test', () => {
        expect(true).toBe(true);
    });

    it('should expose `auth`', () => {
        expect(wingbow.auth).not.toBe(null);
    });

    it('should expose `database`', () => {
        expect(wingbow.database).not.toBe(null);
    });

});
