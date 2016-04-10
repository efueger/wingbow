import {
    _setAttributesStore,
    _setOriginalsStore,
    getRawAttribute,
    getRawAttributes,
    getRawOriginals,
    setRawAttribute,
    setRawAttributes,
    setRawOriginals,
} from 'src/wingbow/database/store';

const mockInstance = {};
let mockAttributes = null;
let mockAttributesStore = null;
let mockOriginals = null;
let mockOriginalsStore = null;

describe(`store`, () => {

    beforeEach(() => {
        mockAttributes = {};
        mockOriginals = {};
        mockAttributesStore = new Map();
        mockOriginalsStore = new Map();
        _setAttributesStore(mockAttributesStore);
        _setOriginalsStore(mockOriginalsStore);
    });

    afterEach(() => {
        expect(Object.keys(mockInstance).length).toBe(0);
    });

    describe(`getRawAttribute`, () => {

        it(`should get an attribute on an instance`, () => {
            mockAttributes.one = `One`;
            mockAttributes.two = `Two`;
            mockAttributesStore.set(mockInstance, mockAttributes);
            expect(getRawAttribute(mockInstance, `one`)).toBe(`One`);
            expect(getRawAttribute(mockInstance, `two`)).toBe(`Two`);
        });

    });

    describe(`getRawAttributes`, () => {

        it(`should return an empty Object when no attributes have been stored`, () => {
            expect(getRawAttributes(mockInstance)).toEqual({});
        });

        it(`should return the stored attributes`, () => {
            mockAttributes.one = `One`;
            mockAttributes.two = `Two`;
            mockAttributesStore.set(mockInstance, mockAttributes);
            expect(getRawAttributes(mockInstance)).toEqual({
                one: `One`,
                two: `Two`,
            });
        });

    });

    describe(`getRawOriginals`, () => {

        it(`should return an empty Object when no originals have been stored`, () => {
            expect(getRawOriginals(mockInstance)).toEqual({});
        });

        it(`should return the stored originals`, () => {
            mockOriginals.one = `One`;
            mockOriginals.two = `Two`;
            mockOriginalsStore.set(mockInstance, mockOriginals);
            expect(getRawOriginals(mockInstance)).toEqual({
                one: `One`,
                two: `Two`,
            });
        });

    });




    describe(`setRawAttribute`, () => {

        it(`should should be able to set a single attribute`, () => {
            setRawAttribute(mockInstance, `one`, `ONE`);
            setRawAttribute(mockInstance, `two`, `TWO`);
            expect(mockAttributesStore.get(mockInstance)).toEqual({
                one: `ONE`,
                two: `TWO`,
            });
        });

    });

    describe(`setRawAttributes`, () => {

        it(`should should be able to set attributes`, () => {
            mockAttributes.one = `One`;
            mockAttributes.two = `Two`;
            setRawAttributes(mockInstance, mockAttributes);
            expect(mockAttributesStore.get(mockInstance)).toEqual({
                one: `One`,
                two: `Two`,
            });
        });

    });

    describe(`setRawOriginals`, () => {

        it(`should should be able to set Originals`, () => {
            mockOriginals.one = `One`;
            mockOriginals.two = `Two`;
            setRawOriginals(mockInstance, mockOriginals);
            expect(mockOriginalsStore.get(mockInstance)).toEqual({
                one: `One`,
                two: `Two`,
            });
        });

    });

});

/* vim: set cc=0 : */
