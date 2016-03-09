import { isFunction } from 'src/wingbow/support/fn';

describe(`isFunction`, () => {

    it(`should return "true" when passed a Function`, () => {
        expect(isFunction(new Function())).toBe(true);
        expect(isFunction(function () {})).toBe(true);
        expect(isFunction(() => {})).toBe(true);
    });

    it(`should return "false" when not passed a Function`, () => {
        expect(isFunction({})).toBe(false);
        expect(isFunction('')).toBe(false);
        expect(isFunction([])).toBe(false);
        expect(isFunction(0)).toBe(false);
    });

});
