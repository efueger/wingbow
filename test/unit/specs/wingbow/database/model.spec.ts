import * as moment from 'moment';
import { Model } from 'src/wingbow/database/model';
import { _mockStore } from 'src/wingbow/database/store';
import { Jsonable, JsonableObject } from 'src/wingbow/utils/types';
import { IllegalCastTypeError, MassAssignmentError, NotFillableError } from 'src/wingbow/database/errors';

class MockModel extends Model {
    public callGetMutator(key :string, value :Jsonable) :Jsonable {
        return super.callGetMutator(key, value);
    }
    public castAttribute(key :string, value :Jsonable) :Jsonable {
        return super.castAttribute(key, value);
    }
    public fillable() {
        return [`a`, `b`, `c`];
    }
    public getAttributeValue(key :string) :any {
        return super.getAttributeValue(key);
    }
    public getRelationValue(key :string) :void {
        super.getRelationValue(key);
    }
}
let attributes = {a: 1, b: 2, c: 3};
let mockAttributesStore = new Map();
let model = new MockModel(attributes);

describe(`Model`, () => {

    beforeEach(() => {
        mockAttributesStore = new Map();
        _mockStore(`attributes`, mockAttributesStore);
        attributes = {a: 1, b: 2, c: 3};
        model = new MockModel(attributes);
    });

    describe(`constructor`, () => {

        it(`should protect the user from mass assignment`, () => {
            class MockModel extends Model {}
            expect(() => {
                const model = new MockModel();
            }).toThrowError(MassAssignmentError);
        });

    });

    describe(`asDate`, () => {

        it(`should return a moment instance if one was passed in`, () => {
            const m = moment();
            expect(model.asDate(m)).toBe(m);
        });

        it(`should return a moment instance if a Number was passed in`, () => {
            expect(model.asDate(946684800000).valueOf).toEqual(moment(946684800000).valueOf);
        });

        it(`should return a moment instance if a Date was passed in`, () => {
            expect(model.asDate(new Date(946684800000)).valueOf).toEqual(moment(946684800000).valueOf);
        });

        it(`should return a moment instance if a anything else was passed in`, () => {
            expect(model.asDate(`2000-01-01T00:00:00.000Z`).valueOf).toEqual(moment(946684800000).valueOf);
        });

    });

    describe(`asTimestamp`, () => {
    });

    describe(`attributesToObject`, () => {
    });

    describe(`callGetMutator`, () => {

        it(`should mutate attribute getters`, () => {
            class MockModel extends Model {
                public fillable() { return [`name`]; }
                public getNameAttribute(value) { return value.toUpperCase(); }
            }
            const model = new MockModel({name: `John Doe`});
            expect(model.getAttribute(`name`)).toBe(`JOHN DOE`);
        });

    });

    describe(`callSetMutator`, () => {

        it(`should mutate attribute getters`, () => {
            class MockModel extends Model {
                public fillable() { return [`birthday`]; }
                public setBirthdayAttribute(value) { return Number(value); }
            }
            const model = new MockModel({birthday: new Date(`2000-01-01T00:00:00.000Z`)});
            expect(model.getAttribute(`birthday`)).toBe(946684800000);
        });

    });

    describe(`castAttribute`, () => {

        it(`should cast the attributes to their various types`, () => {
            class MockModel extends Model {
                public casts() { return {a1: Array, a2: `array`, b1: Boolean, b2: `boolean`, d1: `date`, d2: Date, j1: JSON, j2: `json`, j3: `json`, n1: Number, n2: `number`, o1: Object, o2: `object`, s1: String, s2: `string`, t: `timestamp`}; }
                public fillable() { return [`a1`, `a2`, `b1`, `b2`, `d1`, `d2`, `j1`, `j2`, `j3`, `n1`, `n2`, `o1`, `o2`, `s1`, `s2`, `t`]; }
            }
            const input = {a1: {0: `a1`, length: 1}, a2: null, b1: 0, b2: 1, d1: 946684800000, d2: `2000-01-01T00:00:00.000Z`, j1: {j1: 1}, j2: null, j3: undefined, n1: `Infinity`, n2: `123`, o1: `{"o1": 1}`, o2: function () {}, s1: Infinity, s2: 123, t: new Date(`2000-01-01T00:00:00.000Z`)};
            const output = {a1: [`a1`], a2: [], b1: false, b2: true, d1: moment(946684800000).valueOf(), d2: moment(`2000-01-01T00:00:00.000Z`).valueOf(), j1: JSON.stringify({j1: 1}), j2: `null`, j3: `null`, n1: Infinity, n2: 123, o1: {o1: 1}, o2: {}, s1: `Infinity`, s2: `123`, t: 946684800000};
            const model = new MockModel(input);
            const attrs = model.getAttributes();
            attrs.d1 = attrs.d1.valueOf();
            attrs.d2 = attrs.d2.valueOf();
            expect(attrs).toEqual(output);
        });

        it(`should throw when getting the attributes if the cast type is invalid`, () => {
            const AttributeExample = function () { this.localProp = false; };
            AttributeExample.prototype.protoProp = true;
            class MockModel extends Model {
                public casts() { return {a: AttributeExample}; }
                public fillable() { return [`a`, `b`, `c`]; }
            }
            const model = new MockModel(attributes);
            expect(() => {
                model.getAttributes();
            }).toThrowError(IllegalCastTypeError);
        });

    });

    describe(`casts`, () => {
    });

    describe(`connection`, () => { // TODO
    });

    describe(`createdAt`, () => {

        it(`should default to "created_at"`, () => {
            expect(model.createdAt()).toBe(`created_at`);
        });

    });

    describe(`dateFormat`, () => {
    });

    describe(`dates`, () => {
    });

    describe(`fill`, () => {

        it(`should only fill non prototypal properties`, () => {
            const ProtoExample = function () { this.localProp = false; };
            ProtoExample.prototype.protoProp = true;
            class MockModel extends Model {
                public fillable() { return [`localProp`]; }
            }
            attributes = new ProtoExample();
            const model = new MockModel(attributes);
            expect(model.getAttributes()).toEqual({localProp: false});
        });

    });

    describe(`fillable`, () => {

        it(`should fill the "fillable" attributes`, () => {
            expect(model.getAttributes()).toEqual({a: 1, b: 2, c: 3});
        });

        it(`should not fill any non "fillable" attributes`, () => {
            class MockModel extends Model {
                public fillable() { return [`a`, `d`]; }
            }
            const model = new MockModel(attributes);
            expect(model.getAttributes()).toEqual({a: 1});
        });

    });

    describe(`fromDate`, () => {
    });

    describe(`getAttribute`, () => {

        it(`should get the attribute value if the model has the given attribute`, () => {
            spyOn(model, `hasAttribute`).and.callThrough();
            expect(model.hasAttribute(`a`)).toBe(true);
            expect(model.getAttribute(`a`)).toBe(1);
            expect(model.hasAttribute).toHaveBeenCalledWith(`a`);
        });

        it(`should call the mutator if one exists but the model does not have the given attribute`, () => {
            class MockModel extends Model {
                public callGetMutator(key :string, value :Jsonable) :Jsonable {
                    return super.callGetMutator(key, value);
                }
                public fillable() { return [`age`, `name`]; }
                public getAgeAttribute(age) {
                    expect(age).toBe(undefined);
                    return 21;
                }
                public getNameAttribute(name) {
                    expect(name).toBe(`Joe`);
                    return `${name} ${name}`;
                }
            }
            const model = new MockModel({name: `Joe`});
            spyOn(model, `callGetMutator`).and.callThrough();
            expect(model.hasAttribute(`age`)).toBe(false);
            expect(model.getAttribute(`age`)).toBe(21);
            expect(model.getAttribute(`name`)).toBe(`Joe Joe`);
            expect(model.callGetMutator).toHaveBeenCalledWith(`age`, undefined);
        });

        it(`should attempt to get the relational value if the attribute does not exist locally`, () => {
            spyOn(model, `getRelationValue`).and.callThrough();
            expect(model.hasAttribute(`d`)).toBe(false);
            expect(model.getAttribute(`d`)).toBe(undefined);
            expect(model.getRelationValue).toHaveBeenCalledWith(`d`);
        });

    });

    describe(`getAttributes`, () => {

        it(`should get all of the attributes for the model`, () => {
            expect(model.getAttributes()).toEqual({a: 1, b: 2, c: 3});
        });

        it(`should exclude stored prototypal proterties`, () => {
            const map = new Map();
            _mockStore(`attributes`, map);
            let that = null;
            class MockModel extends Model {
                constructor(attributes :JsonableObject) {
                    super(attributes);
                    that = this;
                }
                public fillable() { return [`q`, `r`, `s`]; }
            }
            const attributes = {q: 17, r: 18, s: 19};
            const model = new MockModel(attributes);
            expect(model.getAttributes()).toEqual({q: 17, r: 18, s: 19});
            function Store() {
                this.x = 24;
                this.z = 26;
            }
            Store.prototype.y = 25;
            const store = new Store();
            map.set(that, store);
            expect(model.getAttributes()).toEqual({x: 24, z: 26});
        });

    });

    describe(`getAttributeValue`, () => {

        it(`should return the mutated attribute should a get mutator be set`, () => {
            class MockModel extends Model {
                public callGetMutator(key :string, value :Jsonable) :Jsonable {
                    return super.callGetMutator(key, value);
                }
                public fillable() { return [`marital`]; }
                public getAttributeValue(key :string) :any {
                    return super.getAttributeValue(key);
                }
                public getMaritalAttribute(value) {
                    expect(value).toBe(`divorced`);
                    return `single`;
                }
            }
            const model = new MockModel({marital: `divorced`});
            spyOn(model, `hasGetMutator`).and.callThrough();
            spyOn(model, `callGetMutator`).and.callThrough();
            expect(model.getAttributeValue(`marital`)).toBe(`single`);
            expect(model.hasGetMutator).toHaveBeenCalledWith(`marital`);
            expect(model.callGetMutator).toHaveBeenCalledWith(`marital`, `divorced`);
        });

        it(`should return the mutated attribute should a get mutator be set`, () => {
            class MockModel extends Model {
                public castAttribute(key :string, value :Jsonable) :Jsonable {
                    return super.castAttribute(key, value);
                }
                public casts() { return {age: Number}; }
                public fillable() { return [`age`]; }
                public getAttributeValue(key :string) :any {
                    return super.getAttributeValue(key);
                }
            }
            const model = new MockModel({age: `21`});
            spyOn(model, `hasCast`).and.callThrough();
            spyOn(model, `castAttribute`).and.callThrough();
            expect(model.getAttributeValue(`age`)).toBe(21);
            expect(model.hasCast).toHaveBeenCalledWith(`age`);
            expect(model.castAttribute).toHaveBeenCalledWith(`age`, `21`);
        });

        it(`should return the value as a Date if it exists in "dates()"`, () => {
            class MockModel extends Model {
                public dates() { return [`birthday`]; }
                public fillable() { return [`birthday`]; }
                public getAttributeValue(key :string) :any {
                    return super.getAttributeValue(key);
                }
            }
            const model = new MockModel({birthday: 946684800000});
            spyOn(model, `getDates`).and.callThrough();
            expect(model.getAttributeValue(`birthday`).valueOf()).toEqual(new Date(`2000-01-01T00:00:00.000Z`).valueOf());
            expect(model.getDates).toHaveBeenCalled();
        });

        it(`should return the mutated attribute should a get mutator be set`, () => {
            spyOn(model, `hasGetMutator`).and.callThrough();
            spyOn(model, `hasCast`).and.callThrough();
            spyOn(model, `getDates`).and.callThrough();
            expect(model.getAttributeValue(`a`)).toEqual(1);
            expect(model.hasGetMutator).toHaveBeenCalledWith(`a`);
            expect(model.hasCast).toHaveBeenCalledWith(`a`);
            expect(model.getDates).toHaveBeenCalled();
        });

    });

    describe(`getCasts`, () => {

        it(`should throw if the cast type is "null" or "undefined"`, () => {
            class MockModel extends Model {
                public casts() { return {aaa: null, bbb: undefined}; }
                public fillable() { return [`aaa`, `bbb`, `ccc`]; }
            }
            expect(() => {
                const model = new MockModel({aaa: 1, bbb: 2, ccc: 3});
            }).toThrowError(IllegalCastTypeError);
        });

        it(`should include the "primary key" if the model is "incrementing()"`, () => {
            class MockModel extends Model {
                public casts() { return {a: String, b: `string`}; }
                public fillable() { return [`a`, `b`, `c`]; }
                public incrementing() { return true; }
            }
            const model = new MockModel(attributes);
            expect(model.getCasts()).toEqual({a: `string`, b: `string`, id: `number`});
        });

        it(`should not include the "primary key" if the model is not "incrementing()"`, () => {
            class MockModel extends Model {
                public casts() { return {a: String, b: `string`}; }
                public fillable() { return [`a`, `b`, `c`]; }
                public incrementing() { return false; }
            }
            const model = new MockModel(attributes);
            expect(model.getCasts()).toEqual({a: `string`, b: `string`});
        });

        it(`should not include prototypal properties`, () => {
            const CastExample = function () { this.localProp = `string`; };
            CastExample.prototype.protoProp = `string`;
            class MockModel extends Model {
                public casts() { return new CastExample(); }
                public fillable() { return [`a`, `b`, `c`]; }
            }
            const model = new MockModel(attributes);
            expect(model.getCasts()).toEqual({localProp: `string`, id: `number`});
        });

    });

    describe(`getCastType`, () => {
    });

    describe(`getDates`, () => {

        it(`should include "createdAt()" and "updatedAt" if the model has "timestamps()"`, () => {
            class MockModel extends Model {
                public dates() { return [`birthday`]; }
                public fillable() { return [`birthday`]; }
                public timestamps() { return true; }
            }
            const model = new MockModel();
            expect(model.getDates()).toEqual([`birthday`, `created_at`, `updated_at`]);
        });

        it(`should not include "createdAt()" and "updatedAt" if the model does not have "timestamps()"`, () => {
            class MockModel extends Model {
                public dates() { return [`birthday`]; }
                public fillable() { return [`birthday`]; }
                public timestamps() { return false; }
            }
            const model = new MockModel();
            expect(model.getDates()).toEqual([`birthday`]);
        });

    });

    describe(`getDateFormat`, () => {
    });

    describe(`getJsonableAttributes`, () => {
    });

    describe(`getJsonableItems`, () => {
    });

    describe(`getMutatorName`, () => {
    });

    describe(`getRelationValue`, () => {

        it(`should return "undefined" if no "relational" value exists`, () => {
            expect(model.getRelationValue(`d`)).toBe(undefined);
        });

    });

    describe(`guarded`, () => {
    });

    describe(`hasAttribute`, () => {
    });

    describe(`hasCast`, () => {
    });

    describe(`hasGetMutator`, () => {
    });

    describe(`hasSetMutator`, () => {
    });

    describe(`hidden`, () => {
    });

    describe(`incrementing`, () => {
    });

    describe(`isDateCastable`, () => {
    });

    describe(`isFillable`, () => {

        it(`should return "true" if the attribute is listed in "fillable()"`, () => {
            expect(model.isFillable(`a`)).toBe(true);
        });

        it(`should return "false" if the attribute is listed in "guarded()"`, () => {
            class MockModel extends Model {
                public fillable() { return [`a`, `b`, `c`]; }
                public guarded() { return [`d`]; }
            }
            const model = new MockModel();
            expect(model.isFillable(`d`)).toBe(false);
        });

        it(`should throw if an attribute is not listed in "fillable()" or "guarded()"`, () => {
            class MockModel extends Model {
                public fillable() { return [`a`, `b`, `c`]; }
                public guarded() { return [`d`]; }
            }
            const model = new MockModel();
            expect(() => {
                model.isFillable(`e`);
            }).toThrowError(NotFillableError);
        });

    });

    describe(`isFullyGuarded`, () => {
    });

    describe(`isGuarded`, () => {

        it(`should return "true" if the attribute is guarded against`, () => {
        });

        it(`should return "false" if the attribute is not guarded against`, () => {
        });

    });

    describe(`isWriteProtected`, () => {
    });

    describe(`perPage`, () => { // TODO
    });

    describe(`primaryKey`, () => {
    });

    describe(`serializeDate`, () => {
    });

    describe(`setAttribute`, () => {
    });

    describe(`syncOriginal`, () => {
    });

    describe(`table`, () => { // TODO
    });

    describe(`timestamps`, () => {
    });

    describe(`toJSON`, () => {

        it(`should be pretty by default`, () => {
            expect(model.toJSON()).toBe(model.toJSON({pretty: true}));
        });

        it(`should convert the models attributes to a JSON string`, () => {
            class MockModel extends Model {
                public fillable() { return [`a`, `b`, `c`]; }
            }
            const model = new MockModel(attributes);
            expect(model.toJSON({pretty: false})).toBe(JSON.stringify({a: 1, b: 2, c: 3}));
        });

        it(`should not show hidden attributes`, () => {
            class MockModel extends Model {
                public fillable() { return [`a`, `b`, `c`]; }
                public hidden() { return [`b`]; }
            }
            const model = new MockModel(attributes);
            expect(model.toJSON({pretty: false})).toBe(JSON.stringify({a: 1, c: 3}));
        });

        it(`should show visible attributes`, () => {
            class MockModel extends Model {
                public fillable() { return [`a`, `b`, `c`]; }
                public visible() { return [`c`]; }
            }
            const model = new MockModel(attributes);
            expect(model.toJSON({pretty: false})).toBe(JSON.stringify({c: 3}));
        });

    });

    describe(`toObject`, () => {
    });

    describe(`updatedAt`, () => {

        it(`should default to "updated_at"`, () => {
            expect(model.updatedAt()).toBe(`updated_at`);
        });

    });

    describe(`visible`, () => { // TODO
    });

});

/* vim: set cc=0 : */
