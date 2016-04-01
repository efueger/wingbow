import { Model } from 'src/wingbow/database/model';
import { IllegalCastTypeError, MassAssignmentError, NotFillableError } from 'src/wingbow/database/errors';

let MockModel = null;
let model = null;
let attributes = null;
let AttributeExample = null;
let CastExample = null;

describe(`Model`, () => {

    beforeEach(() => {
        class LocalMockModel extends Model {
            fillable() { return [`a`, `b`, `c`]; }
        }
        MockModel = LocalMockModel;
        attributes = {a: 1, b: 2, c: 3};
        model = new MockModel(attributes);
        AttributeExample = function() { this.localProp = false; };
        AttributeExample.prototype.protoProp = true;
        CastExample = function() { this.localProp = `string`; };
        CastExample.prototype.protoProp = `string`;
    });

    describe(`constructor`, () => {

        it(`should protect the user from mass assignment`, () => {
            class MockModel extends Model {}
            expect(() => {
                model = new MockModel();
            }).toThrowError(MassAssignmentError);
        });

    });

    describe(`callGetMutator`, () => {

        it(`should mutate attribute getters`, () => {
            class MockModel extends Model {
                fillable() { return [`name`]; }
                getNameAttribute(value) { return value.toUpperCase(); }
            }
            model = new MockModel({name: `John Doe`});
            expect(model.getAttribute(`name`)).toBe(`JOHN DOE`);
        });

    });

    describe(`callSetMutator`, () => {

        it(`should mutate attribute getters`, () => {
            class MockModel extends Model {
                fillable() { return [`birthday`]; }
                setBirthdayAttribute(value) { return Number(value); }
            }
            model = new MockModel({birthday: new Date(`1 Jan 2000 UTC`)});
            expect(model.getAttribute(`birthday`)).toBe(946684800000);
        });

    });

    describe(`castAttribute`, () => {

        it(`should cast the attributes to their various types`, () => {
            class MockModel extends Model {
                casts() { return {a1: Array, a2: `array`, b1: Boolean, b2: `boolean`, j1: JSON, j2: `json`, j3: `json`, n1: Number, n2: `number`, o1: Object, o2: `object`, s1: String, s2: `string`, t: `timestamp`}; }
                fillable() { return [`a1`, `a2`, `b1`, `b2`, `j1`, `j2`, `j3`, `n1`, `n2`, `o1`, `o2`, `s1`, `s2`, `t`]; }
            }
            model = new MockModel({a1: {0: `a1`, length: 1}, a2: null, b1: 0, b2: 1, j1: {j1: 1}, j2: null, j3: undefined, n1: `Infinity`, n2: `123`, o1: `{"o1": 1}`, o2: function () {}, s1: Infinity, s2: 123, t: new Date(`1 Jan 2000 UTC`)});
            expect(model.getAttributes()).toEqual({a1: [`a1`], a2: [], b1: false, b2: true, j1: JSON.stringify({j1: 1}), j2: `null`, j3: `null`, n1: Infinity, n2: 123, o1: {o1: 1}, o2: {}, s1: `Infinity`, s2: `123`, t: 946684800000});
        });

        it(`should throw when getting the attributes if the cast type is invalid`, () => {
            class MockModel extends Model {
                casts() { return {a: AttributeExample}; }
                fillable() { return [`a`, `b`, `c`]; }
            }
            model = new MockModel(attributes);
            expect(() => {
                model.getAttributes();
            }).toThrowError(IllegalCastTypeError);
        });

    });

    describe(`connection`, () => { // TODO
    });

    describe(`createdAt`, () => {

        it(`should default to "created_at"`, () => {
            expect(model.createdAt()).toBe(`created_at`);
        });

    });

    describe(`fill`, () => {

        it(`should only fill non prototypal properties`, () => {
            class MockModel extends Model {
                fillable() { return [`localProp`]; }
            }
            attributes = new AttributeExample();
            model = new MockModel(attributes);
            expect(model.getAttributes()).toEqual({localProp: false});
        });

    });

    describe(`fillable`, () => {

        it(`should fill the "fillable" attributes`, () => {
            expect(model.getAttributes()).toEqual({a: 1, b: 2, c: 3});
        });

        it(`should not fill any non "fillable" attributes`, () => {
            class MockModel extends Model {
                fillable() { return [`a`, `d`]; }
            }
            model = new MockModel(attributes);
            expect(model.getAttributes()).toEqual({a: 1});
        });

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
                fillable() { return [`a`, `b`, `c`]; }
                getAgeAttribute(value) { return value; }
            }
            model = new MockModel(attributes);
            spyOn(model, `callGetMutator`).and.callThrough();
            expect(model.hasAttribute(`age`)).toBe(false);
            expect(model.getAttribute(`age`)).toBe(undefined);
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

    });

    describe(`getAttributeValue`, () => {

        it(`should return the mutated attribute should a get mutator be set`, () => {
            class MockModel extends Model {
                fillable() { return [`marital`]; }
                getMaritalAttribute(value) {
                    expect(value).toBe(`divorced`);
                    return `single`;
                }
            }
            model = new MockModel({marital: `divorced`});
            spyOn(model, `hasGetMutator`).and.callThrough();
            spyOn(model, `callGetMutator`).and.callThrough();
            expect(model.getAttributeValue(`marital`)).toBe(`single`);
            expect(model.hasGetMutator).toHaveBeenCalledWith(`marital`);
            expect(model.callGetMutator).toHaveBeenCalledWith(`marital`, `divorced`);
        });

        it(`should return the mutated attribute should a get mutator be set`, () => {
            class MockModel extends Model {
                fillable() { return [`age`]; }
                casts() { return {age: Number}; }
            }
            model = new MockModel({age: `21`});
            spyOn(model, `hasCast`).and.callThrough();
            spyOn(model, `castAttribute`).and.callThrough();
            expect(model.getAttributeValue(`age`)).toBe(21);
            expect(model.hasCast).toHaveBeenCalledWith(`age`);
            expect(model.castAttribute).toHaveBeenCalledWith(`age`, `21`);
        });

        it(`should return the value as a Date if it exists in "dates()"`, () => {
            class MockModel extends Model {
                fillable() { return [`birthday`]; }
                dates() { return [`birthday`]; }
            }
            model = new MockModel({birthday: 946684800000});
            spyOn(model, `getDates`).and.callThrough();
            expect(model.getAttributeValue(`birthday`)).toEqual(new Date(`1 Jan 2000 UTC`));
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

    // describe(`casts`, () => {
    describe(`getCasts`, () => {

        it(`should throw if the cast type is "null" or "undefined"`, () => {
            class MockModel extends Model {
                fillable() { return [`aaa`, `bbb`, `ccc`]; }
                casts() { return {aaa: null, bbb: undefined}; }
            }
            expect(() => {
                model = new MockModel({aaa: 1, bbb: 2, ccc: 3});
            }).toThrowError(IllegalCastTypeError);
        });

        it(`should include the "primary key" if the model is "incrementing()"`, () => {
            class MockModel extends Model {
                casts() { return {a: String, b: `string`}; }
                fillable() { return [`a`, `b`, `c`]; }
                incrementing() { return true; }
            }
            model = new MockModel(attributes);
            expect(model.getCasts()).toEqual({a: `string`, b: `string`, id: `number`});
        });

        it(`should not include the "primary key" if the model is not "incrementing()"`, () => {
            class MockModel extends Model {
                casts() { return {a: String, b: `string`}; }
                fillable() { return [`a`, `b`, `c`]; }
                incrementing() { return false; }
            }
            model = new MockModel(attributes);
            expect(model.getCasts()).toEqual({a: `string`, b: `string`});
        });

        it(`should not include prototypal properties`, () => {
            class MockModel extends Model {
                casts() { return new CastExample(); }
                fillable() { return [`a`, `b`, `c`]; }
            }
            model = new MockModel(attributes);
            expect(model.getCasts()).toEqual({localProp: `string`, id: `number`});
        });

    });

    // describe(`dates`, () => {
    describe(`getDates`, () => {

        it(`should include "createdAt()" and "updatedAt" if the model has "timestamps()"`, () => {
            class MockModel extends Model {
                dates() { return [`birthday`]; }
                fillable() { return [`birthday`]; }
                timestamps() { return true; }
            }
            model = new MockModel();
            expect(model.getDates()).toEqual([`birthday`, `created_at`, `updated_at`]);
        });

        it(`should not include "createdAt()" and "updatedAt" if the model does not have "timestamps()"`, () => {
            class MockModel extends Model {
                dates() { return [`birthday`]; }
                fillable() { return [`birthday`]; }
                timestamps() { return false; }
            }
            model = new MockModel();
            expect(model.getDates()).toEqual([`birthday`]);
        });

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

    describe(`hidden`, () => { // TODO
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
                fillable() { return [`a`, `b`, `c`]; }
                guarded() { return [`d`]; }
            }
            model = new MockModel();
            expect(model.isFillable(`d`)).toBe(false);
        });

        it(`should throw if an attribute is not listed in "fillable()" or "guarded()"`, () => {
            class MockModel extends Model {
                fillable() { return [`a`, `b`, `c`]; }
                guarded() { return [`d`]; }
            }
            model = new MockModel();
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

    describe(`mutatorName`, () => {
    });

    describe(`perPage`, () => { // TODO
    });

    describe(`primaryKey`, () => {
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

        it(`should convert the models attributes to a JSON string`, () => {
            expect(model.toJSON()).toBe(JSON.stringify(model.getAttributes()));
        });

    });

    describe(`updatedAt`, () => {

        it(`should default to "updated_at"`, () => {
            expect(model.updatedAt()).toBe(`updated_at`);
        });

    });

});

/* vim: set cc=0 : */
