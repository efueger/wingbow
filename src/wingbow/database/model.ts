import { Trait } from '../utils/trait';
import { Extend } from '../utils/extend';
import { hasOwn } from '../utils/has-own';
import { isFunction, isString } from '../utils/is';
import { Jsonable, JsonableObject } from '../utils/types';
import { toLowerCase, toPascalCase, toSnakeCase, trim } from '../utils/str';
import { toArray, toDate, toJSON, toNumber, toObject, toTimestamp } from '../utils/to';
import { IllegalCastTypeError, MassAssignmentError, NotFillableError  } from './errors';
import { getRawAttribute, getRawAttributes, setRawAttribute, setRawOriginals } from './store';

@Trait([
    Extend
])
export abstract class Model {

    constructor(attributes :Object = {}) {
        this.syncOriginal();
        this.fill(attributes);
    }

    protected callGetMutator(key :string, value :Jsonable) :Jsonable {
        const mutator = this.mutatorName(`get`, key);
        return this[mutator](value);
    }

    protected callSetMutator(key :string, value :Jsonable) :Jsonable {
        const mutator = this.mutatorName(`set`, key);
        return this[mutator](value);
    }

    protected castAttribute(key :string, value :Jsonable) :Jsonable {
        const casts = this.getCasts();
        const caster = casts[key];
        switch (caster) {
            case `array`:
                return toArray(value);
            case `boolean`:
                return Boolean(value);
            case `json`:
                return toJSON(value);
            case `number`:
                return toNumber(value);
            case `object`:
                return toObject(value);
            case `string`:
                return String(value);
            case `timestamp`:
                return toTimestamp(value);
        }
        throw new IllegalCastTypeError(`Could not cast "${key}" to "${caster}"`);
    }

    protected casts() :Object {
        return {};
    }

    // protected connection() :string {
    //     return `memory`;
    // }

    protected createdAt() :string {
        return `created_at`;
    }

    protected dates() :Array<string> {
        return [];
    }

    public fill(attributes :Object) :void {
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

    protected fillable() :Array<string> {
        return [];
    }

    public getAttribute(key :string) :Jsonable|void {
        if (this.hasAttribute(key) || this.hasGetMutator(key)) {
            return this.getAttributeValue(key);
        }
        return this.getRelationValue(key);
    }

    public getAttributes() :JsonableObject {
        const rawAttributes = getRawAttributes(this);
        const attributes = {};
        for (const key in rawAttributes) {
            attributes[key] = this.getAttribute(key);
        }
        return attributes;
    }

    public getAttributeValue(key :string) :Jsonable {
        const value = getRawAttribute(this, key);
        if (this.hasGetMutator(key)) {
            return this.callGetMutator(key, value);
        }
        if (this.hasCast(key)) {
            return this.castAttribute(key, value);
        }
        if (this.getDates().includes(key)) {
            return toDate(value);
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

    public getRelationValue(key :string) :void {
        // TODO
    }

    protected guarded() :Array<string> {
        return [`*`];
    }

    protected hasAttribute(key :string) :boolean {
        const attributes = getRawAttributes(this);
        return hasOwn(attributes, key);
    }

    public hasCast(key :string, caster :string = null) :boolean {
        const casts = this.getCasts();
        if (caster === null) {
            return key in casts;
        }
        return casts[key] === caster;

    }

    public hasGetMutator(key :string) :boolean {
        const mutator = this.mutatorName(`get`, key);
        return isFunction(this[mutator]);
    }

    public hasSetMutator(key :string) :boolean {
        const mutator = this.mutatorName(`set`, key);
        return isFunction(this[mutator]);
    }

    // protected hidden() :Array<string> {
    //     return [`password`];
    // }

    protected incrementing() :boolean {
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

    protected mutatorName(accessor :string, key :string) :string {
        return `${accessor}${toPascalCase(key)}Attribute`;
    }

    // protected perPage() :number {
    //     return 20;
    // }

    protected primaryKey() :string {
        return `id`;
    }

    public setAttribute(key :string, value :Jsonable) :void {
        if (this.hasSetMutator(key)) {
            value = this.callSetMutator(key, value);
        } else if (this.getDates().includes(key) || this.isDateCastable(key)) {
            value = toTimestamp(value);
        }
        setRawAttribute(this, key, value);
    }

    public syncOriginal() :void {
        const attributes = getRawAttributes(this);
        setRawOriginals(this, attributes);
    }

    // protected table() :string {
    //     const name = this.constructor.name;
    //     return toSnakeCase(name);
    // }

    protected timestamps() :boolean {
        return true;
    }

    public toJSON() :string {
        const attributes = getRawAttributes(this);
        return JSON.stringify(attributes);
    }

    protected updatedAt() :string {
        return `updated_at`;
    }

}
