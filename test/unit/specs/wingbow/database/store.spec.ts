import {
    _mockStore,
    getRaw,
    getRaws,
    setRaw,
    setRaws,
} from 'src/wingbow/database/store';
import { IllegalStoreTypeError } from 'src/wingbow/database/errors';

const storeKey = {};
const storeNames = [`attributes`, `originals`];
let localData :any = {};
let localStores :any = {};

storeNames.forEach(storeName => {
    localStores[storeName] = new Map();
});

describe(`store`, () => {

    beforeEach(() => {
        localData = {};
        localStores = {};
        storeNames.forEach(storeName => {
            const store = new Map();
            _mockStore(storeName, store);
            localStores[storeName] = store;
        });
    });

    afterEach(() => {
        expect(Object.keys(storeKey).length).toBe(0);
    });

    describe(`_mockStore`, () => {

        it(`should throw if data is attempted to be retrieved from a store that does not exist`, () => {
            const store = new Map();
            expect(() => {
                _mockStore(`STORE_NAME_NOT_DEFINED`, store);
            }).toThrowError(IllegalStoreTypeError);
        });

        it(`should override the existing store with the one passed in`, () => {
            storeNames.forEach(storeName => {
                setRaw(storeKey, storeName, `aaa`, `AAA`);
                expect(getRaw(storeKey, storeName, `aaa`)).toBe(`AAA`);
                const store = new Map();
                store.set(storeKey, {aaa: `MOCKED_AAA`});
                _mockStore(storeName, store);
                expect(getRaw(storeKey, storeName, `aaa`)).toBe(`MOCKED_AAA`);
            });
        });

    });

    describe(`getRaw`, () => {

        it(`should throw if data is attempted to be retrieved from a store that does not exist`, () => {
            storeNames.forEach(storeName => {
                expect(() => {
                    getRaw(storeKey, `STORE_NAME_NOT_DEFINED`, `aaa`);
                }).toThrowError(IllegalStoreTypeError);
            });
        });

        it(`should get a property associated with an instance`, () => {
            storeNames.forEach(storeName => {
                localData = {};
                localData = {
                    aaa: `AAA`,
                    bbb: `BBB`,
                };
                localStores[storeName].set(storeKey, localData);
                expect(getRaw(storeKey, storeName, `aaa`)).toBe(`AAA`);
                expect(getRaw(storeKey, storeName, `bbb`)).toBe(`BBB`);
            });
        });

    });

    describe(`getRaws`, () => {

        it(`should throw if data is attempted to be retrieved from a store that does not exist`, () => {
            storeNames.forEach(storeName => {
                expect(() => {
                    getRaws(storeKey, `STORE_NAME_NOT_DEFINED`);
                }).toThrowError(IllegalStoreTypeError);
            });
        });

        it(`should return an empty Object when no data has been stored`, () => {
            storeNames.forEach(storeName => {
                expect(getRaws(storeKey, storeName)).toEqual({});
            });
        });

        it(`should return an Object represeting the data that has been associated with an instance`, () => {
            storeNames.forEach(storeName => {
                localData = {};
                localData = {
                    aaa: `AAA`,
                    bbb: `BBB`,
                };
                localStores[storeName].set(storeKey, localData);
                expect(getRaws(storeKey, storeName)).toEqual({
                    aaa: `AAA`,
                    bbb: `BBB`,
                });
            });
        });

    });


    describe(`setRaw`, () => {

        it(`should throw if data is attempted to be stored on a store that does not exist`, () => {
            storeNames.forEach(storeName => {
                expect(() => {
                    setRaw(storeKey, `STORE_NAME_NOT_DEFINED`, `aaa`, `AAA`);
                }).toThrowError(IllegalStoreTypeError);
            });
        });

        it(`should be able to set a single property associated with an instance`, () => {
            storeNames.forEach(storeName => {
                setRaw(storeKey, storeName, `aaa`, `AAA`);
                setRaw(storeKey, storeName, `bbb`, `BBB`);
                expect(localStores[storeName].get(storeKey)).toEqual({
                    aaa: `AAA`,
                    bbb: `BBB`,
                });
            });
        });

    });

    describe(`setRaws`, () => {

        it(`should throw if data is attempted to be stored on a store that does not exist`, () => {
            storeNames.forEach(storeName => {
                expect(() => {
                    setRaws(storeKey, `STORE_NAME_NOT_DEFINED`, localData);
                }).toThrowError(IllegalStoreTypeError);
            });
        });

        it(`should merge all data associated with an instance`, () => {
            storeNames.forEach(storeName => {
                localData = {
                    aaa: `AAA`,
                    bbb: `BBB`,
                };
                setRaws(storeKey, storeName, localData);
                expect(localStores[storeName].get(storeKey)).toEqual({
                    aaa: `AAA`,
                    bbb: `BBB`,
                });
                localData = {
                    ccc: `CCC`,
                    ddd: `DDD`,
                };
                setRaws(storeKey, storeName, localData);
                expect(localStores[storeName].get(storeKey)).toEqual({
                    aaa: `AAA`,
                    bbb: `BBB`,
                    ccc: `CCC`,
                    ddd: `DDD`,
                });
            });
        });

    });

});

/* vim: set cc=0 : */
