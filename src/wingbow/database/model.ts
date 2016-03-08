/// <reference path="../support/ext.d.ts" />

import { Extend } from '../support/extend';
import { Jsonable } from '../contracts/jsonable';
import { Trait } from '../support/trait';
import {
    CouldNotFillError,
    NotDatableError,
    MassAssignmentError,
} from './errors';
import {
    isFunction,
} from '../support/fn';
import {
    assign,
    hasOwn,
} from '../support/obj';
import {
    toLowerCase,
    toPascalCase,
    toSnakeCase,
    trim,
} from '../support/str';
import {
    getAttribute,
    hasAttribute,
    setAttribute,
} from './private';

@Trait([
    Extend
])
export abstract class Model implements Jsonable {

    constructor(attributes = {}) {
        this.fill(attributes);
    }

    protected callGetMutator(key :string, value :any) :any {
        const mutator = this.mutatorName(`get`, key);
        return this[mutator](value);
    }

    protected callSetMutator(key :string, value :any) :any {
        const mutator = this.mutatorName(`set`, key);
        return this[mutator](value);
    }

    protected castAttribute(key :string, value: any) :any {
        if (value == null) {
            return value;
        }
        switch (this.getCastType(key)) {
            case 'array':
                return Array.from(value);
            case 'boolean':
                return Boolean(value);
            case 'date':
                return this.toDate(value);
            case 'number':
                return Number(value);
            case 'object':
                return Object(value);
            case 'string':
                return String(value);
            default:
                return value;
        }
    }

    protected casts() :Object {
        return {};
    }

    protected connection() :string {
        return `memory`;
    }

    protected createdAt() :string {
        return `created_at`;
    }

    protected dates() :Array<string> {
        return [];
    }

    protected fill(attributes :Object) :this {
        const writeProtected = this.isWriteProtected();
        for (const key in attributes) {
            if (hasOwn(attributes, key)) {
                if (this.isFillable(key)) {
                    this.setAttribute(key, attributes[key]);
                } else if (writeProtected) {
                    throw new MassAssignmentError(key);
                }
            }
        }
        return this;
    }

    protected fillable() :Array<string> {
        return [];
    }

    protected fromDate(value :any) :number {
        const date = new Date(value);
        const timestamp = Number(date);
        if (isNaN(timestamp)) {
            throw new NotDatableError(value);
        }
        return timestamp;
    }

    protected getAttribute(key :string) :any {
        if (hasAttribute(this, key) || this.hasGetMutator(key)) {
            return this.getAttributeValue(key);
        }
        return this.getRelationValue(key);
    }

    protected getAttributes() :any {
        return getAttribute(this);
    }

    protected getAttributeValue(key :string) :any {
        const value = getAttribute(this, key);
        if (this.hasGetMutator(key)) {
            return this.callGetMutator(key, value);
        }
        if (this.hasCast(key)) {
            return this.castAttribute(key, value);
        }
        if (this.getDates().includes(key)) {
            return this.toDate(value);
        }
        return value;
    }

    protected getCasts() :Object {
        const castables = this.casts();
        const key = this.primaryKey();
        if (this.incrementing()) {
            castables[key] = `number`;
        }
        return castables;
    }

    protected getCastType(key :string) :string {
        return trim(toLowerCase(this.getCasts()[key]));
    }

    protected getDates() :Array<string> {
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

    protected getRelationValue(key :string) :any {
        // TODO
    }

    protected guarded() :Array<string> {
        return [`*`];
    }

    protected hasCast(key :string, caster :string = null) :boolean {
        const casts = this.getCasts();
        if (caster === null) {
            return key in casts;
        }
        return casts[key] === caster;

    }

    protected hasGetMutator(key :string) :boolean {
        const mutator = this.mutatorName(`get`, key);
        return isFunction(this[mutator]);
    }

    protected hasSetMutator(key :string) :boolean {
        const mutator = this.mutatorName(`set`, key);
        return isFunction(this[mutator]);
    }

    protected hidden() :Array<string> {
        return [`password`];
    }

    protected incrementing() :boolean {
        return true;
    }

    protected isDateCastable(key :string) :boolean {
        return this.hasCast(key, `date`);
    }

    protected isFillable(key :string) :boolean {
        const fillables = this.fillable();
        if (fillables.includes(key)) {
            return true;
        }
        if (this.isGuarded(key)) {
            return false;
        }
        throw new CouldNotFillError(key);
    }

    protected isFullyGuarded() :boolean {
        const guards = this.guarded();
        return guards.includes(`*`);
    }

    protected isGuarded(key :string) :boolean {
        const guards = this.guarded();
        if (guards.includes(key)) {
            return true;
        }
        return this.isFullyGuarded();
    }

    protected isWriteProtected() :boolean {
        return this.fillable().length === 0 && this.isFullyGuarded();
    }

    protected mutatorName(accessor :string, key :string) :string {
        return `${accessor}${toPascalCase(key)}Attribute`;
    }

    protected primaryKey() :string {
        return `id`;
    }

    protected perPage() :number {
        return 20;
    }

    protected setAttribute(key :string, value :any) :this {
        if (this.hasSetMutator(key)) {
            value = this.callSetMutator(key, value);
        } else if (this.getDates().includes(key) || this.isDateCastable(key)) {
            value = this.fromDate(value);
        }
        setAttribute(this, key, value);
        return this;
    }

    protected table() :string {
        const name = this.constructor.name;
        return toSnakeCase(name);
    }

    protected toDate(value :any) :Date {
        return new Date(value);
    }

    protected timestamps() :boolean {
        return true;
    }

    protected updatedAt() :string {
        return `updated_at`;
    }

    public toJSON() :any {
        return this.getAttributes();
    }

}
