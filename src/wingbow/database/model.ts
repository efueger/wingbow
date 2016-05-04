import { Moment } from 'moment';
import * as moment from 'moment';
import { Trait } from '../utils/trait';
import { Extend } from '../utils/extend';
import { hasOwn } from '../utils/has-own';
import { NotImplementedError } from '../utils/errors';
import { getRaw, getRaws, setRaw, setRaws } from './store';
import { intersectWithObj, intersectWithoutObj } from '../utils/intersect-obj';
import { Jsonable, JsonableObject, JsonSerializable } from '../utils/types';
import { toLowerCase, toPascalCase, toSnakeCase, trim } from '../utils/str';
import { isDate, isEmptyObject, isFunction, isNumber, isString } from '../utils/is';
import { IllegalCastTypeError, MassAssignmentError, NotFillableError } from './errors';
import { toArray, toBoolean, toJSON, toNumber, toObject, toString, toTimestamp } from '../utils/to';

@Trait([
    Extend,
])
export abstract class Model {

    static get [Symbol.species]() {
        return this;
    }

    get [Symbol.toStringTag]() {
        const Ctor = this.constructor[Symbol.species];
        const name = Ctor.name;
        return name;
    }

    constructor(attributes :JsonableObject = {}) {
        this.syncOriginal();
        this.fill(attributes);
    }

    public asDate(value :any) :Moment {
        if (value instanceof moment) {
            return value;
        }
        if (isDate(value) || isNumber(value)) {
            return moment(value);
        }
        return moment(value, this.getDateFormat());
    }

    public asTimestamp(value :any) :number {
        const date = this.asDate(value);
        return toTimestamp(date);
    }

    public attributesToObject() :JsonableObject {
        const attributes = this.getJsonableAttributes();
        return attributes;
    }

    protected callGetMutator(key :string, value :Jsonable) :Jsonable {
        const mutator = this.getMutatorName(`get`, key);
        return this[mutator](value);
    }

    protected callSetMutator(key :string, value :Jsonable) :Jsonable {
        const mutator = this.getMutatorName(`set`, key);
        return this[mutator](value);
    }

    protected castAttribute(key :string, value :Jsonable) :Jsonable {
        const casts = this.getCasts();
        const caster = casts[key];
        switch (caster) {
            case `array`:
                return toArray(value);
            case `boolean`:
                return toBoolean(value);
            case `date`:
                return this.asDate(value);
            case `json`:
                return toJSON(value);
            case `number`:
                return toNumber(value);
            case `object`:
                return toObject(value);
            case `string`:
                return toString(value);
            case `timestamp`:
                return this.asTimestamp(value);
        }
        throw new IllegalCastTypeError(`Could not cast "${key}" to "${caster}"`);
    }

    public casts() :Object {
        return {};
    }

    public connection() :string {
        throw new NotImplementedError();
    }

    public createdAt() :string {
        return `created_at`;
    }

    public dateFormat() :string {
        return ``;
    }

    public dates() :Array<string> {
        return [];
    }

    public fill(attributes :JsonableObject) :void {
        if (isEmptyObject(attributes)) {
            return;
        }
        if (this.isWriteProtected()) {
            throw new MassAssignmentError();
        }
        for (const key in attributes) {
            if (hasOwn(attributes, key)) {
                if (this.isFillable(key)) {
                    this.setAttribute(key, attributes[key]);
                }
            }
        }
    }

    public fillable() :Array<string> {
        return [];
    }

    public fromDate(value :any) :string {
        const date = this.asDate(value);
        return this.serializeDate(date);
    }

    public getAttribute(key :string) :any {
        if (this.hasAttribute(key) || this.hasGetMutator(key)) {
            return this.getAttributeValue(key);
        }
        return this.getRelationValue(key);
    }

    public getAttributes() :any {
        const rawAttributes = getRaws(this, `attributes`);
        const attributes = {};
        for (const key in rawAttributes) {
            if (hasOwn(rawAttributes, key)) {
                attributes[key] = this.getAttribute(key);
            }
        }
        return attributes;
    }

    protected getAttributeValue(key :string) :any {
        const value = getRaw(this, `attributes`, key);
        if (this.hasGetMutator(key)) {
            return this.callGetMutator(key, value);
        }
        if (this.hasCast(key)) {
            return this.castAttribute(key, value);
        }
        if (this.getDates().includes(key)) {
            return this.asDate(value);
        }
        return value;
    }

    public getCasts() :Object {
        const castables = this.casts();
        const casts = {};
        for (const caster in castables) {
            if (hasOwn(castables, caster)) {
                casts[caster] = this.getCastType(castables[caster]);
            }
        }
        if (this.incrementing()) {
            const key = this.primaryKey();
            casts[key] = `number`;
        }
        return casts;
    }

    public getCastType(castee :any) :string {
        if (isFunction(castee)) {
            return toLowerCase(castee.name);
        }
        if (isString(castee)) {
            return trim(toLowerCase(castee));
        }
        if (castee === JSON) {
            return `json`;
        }
        throw new IllegalCastTypeError(`Cast type for "${castee}" is not supported`);
    }

    public getDates() :Array<string> {
        const dates = this.dates();
        if (!this.timestamps()) {
            return dates;
        }
        return [
            ...dates,
            this.createdAt(),
            this.updatedAt(),
        ];
    }

    protected getDateFormat() :string {
        const format = this.dateFormat();
        return format || `YYYY-MM-DDTHH:mm:ss.SSSZ`;
    }

    protected getJsonableAttributes() :JsonableObject {
        const attributes = getRaws(this, `attributes`);
        const jsonable = this.getJsonableItems(attributes);
        return jsonable;
    }

    protected getJsonableItems(items :JsonableObject) :JsonableObject {
        const visible = this.visible();
        if (visible.length > 0) {
            return intersectWithObj<JsonableObject>(items, visible);
        }
        const hidden = this.hidden();
        if (hidden.length > 0) {
            return intersectWithoutObj<JsonableObject>(items, hidden);
        }
        return items;
    }

    protected getMutatorName(accessor :string, key :string) :string {
        return `${accessor}${toPascalCase(key)}Attribute`;
    }

    protected getRelationValue(key :string) :void {
        throw new NotImplementedError();
    }

    public guarded() :Array<string> {
        return [`*`];
    }

    public hasAttribute(key :string) :boolean {
        const attributes = getRaws(this, `attributes`);
        return hasOwn(attributes, key);
    }

    public hasCast(key :string, caster :string = null) :boolean {
        const casts = this.getCasts();
        if (caster === null) {
            return hasOwn(casts, key);
        }
        return casts[key] === caster;

    }

    public hasGetMutator(key :string) :boolean {
        const mutator = this.getMutatorName(`get`, key);
        return isFunction(this[mutator]);
    }

    public hasSetMutator(key :string) :boolean {
        const mutator = this.getMutatorName(`set`, key);
        return isFunction(this[mutator]);
    }

    public hidden() :Array<string> {
        return [];
    }

    public incrementing() :boolean {
        return true;
    }

    protected isDateCastable(key :string) :boolean {
        return this.hasCast(key, `date`);
    }

    public isFillable(key :string) :boolean {
        const fillables = this.fillable();
        if (fillables.includes(key)) {
            return true;
        }
        if (this.isGuarded(key)) {
            return false;
        }
        throw new NotFillableError(key);
    }

    public isFullyGuarded() :boolean {
        const guards = this.guarded();
        return guards.includes(`*`);
    }

    public isGuarded(key :string) :boolean {
        const guards = this.guarded();
        if (guards.includes(key)) {
            return true;
        }
        return this.isFullyGuarded();
    }

    public isWriteProtected() :boolean {
        return this.fillable().length === 0 && this.isFullyGuarded();
    }

    public perPage() :number {
        throw new NotImplementedError();
    }

    public primaryKey() :string {
        return `id`;
    }

    protected serializeDate(date :Moment) :string {
        const formatter = this.getDateFormat();
        return date.format(formatter);
    }

    public setAttribute(key :string, value :Jsonable) :void {
        if (this.hasSetMutator(key)) {
            value = this.callSetMutator(key, value);
        } else if (this.getDates().includes(key) || this.isDateCastable(key)) {
            value = this.fromDate(value);
        }
        setRaw(this, `attributes`, key, value);
    }

    public syncOriginal() :void {
        const attributes = getRaws(this, `attributes`);
        setRaws(this, `originals`, attributes);
    }

    public table() :string {
        const name = this[Symbol.toStringTag];
        const plural = name; // TODO add pluralification
        return toSnakeCase(plural);
    }

    public timestamps() :boolean {
        return true;
    }

    public toJSON({ pretty = true } :JsonSerializable = {}) :string {
        const obj = this.toObject();
        const space = pretty ? 4 : 0;
        return JSON.stringify(obj, null, space);
    }

    public toObject() :JsonableObject {
        const attributes = this.attributesToObject();
        return Object.assign({}, attributes);
    }

    public updatedAt() :string {
        return `updated_at`;
    }

    public visible() :Array<string> {
        return [];
    }

}
