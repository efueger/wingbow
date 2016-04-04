import { Jsonable } from './types';
import { isFunction } from './is';
import { toNumberOrNaN } from './to';
import { IllegalOperatorError } from './errors';
import { BaseCollection, BaseCollectionInstance } from './baseCollection';

export interface CollectionInstance<T> extends BaseCollectionInstance<T> {
    readonly length :number;
    readonly [n :number] :T;
}

export interface Collection<T> {
    new <T>(...items :Array<T>): CollectionInstance<T>;
    new (...items :Array<any>): CollectionInstance<any>;
    readonly prototype :CollectionInstance<any>;
}

export class Collection<T> extends BaseCollection<T> {

    constructor(...args) {
        super(...args);
    }

    concat(...args) :Collection<T> {
        const arr = this.toArray();
        const result = arr.concat(...args);
        return new Collection<T>(...result);
    }

    filter(callbackfn, thisArg?) :Collection<T> {
        const result = super.filter(callbackfn, thisArg);
        return new Collection<T>(...result);
    }

    first() :T {
        return this[0];
    }

    last() :T {
        return this[this.length - 1];
    }

    map(callbackfn, thisArg?) :Collection<T> {
        const result = super.map(callbackfn, thisArg);
        return new Collection<T>(...result);
    }

    slice(callbackfn, thisArg?) :Collection<T> {
        const result = super.slice(callbackfn, thisArg);
        return new Collection<T>(...result);
    }

    splice(callbackfn, thisArg?) :Collection<T> {
        const result = super.splice(callbackfn, thisArg);
        return new Collection<T>(...result);
    }

    toArray() :Array<T> {
        return Array.from<T>(this);
    }

    where(key? :string, operator? :string|Function, value? :Jsonable) :Collection<T> {
        if (arguments.length === 0) {
            return this.filter(item => false);
        }
        if (arguments.length === 1) {
            return this.filter(item => !!item[key]);
        }
        if (arguments.length === 2) {
            if (isFunction(operator)) {
                const fn :Function = operator;
                return this.filter(item => fn(item[key]));
            }
            value = operator;
            operator = `===`;
        }
        switch (operator) {
            /* tslint:disable:triple-equals */
            case `==`: return this.filter(item => item[key] == value);
            case `===`: return this.filter(item => item[key] === value);
            case `>`: return this.filter(item => toNumberOrNaN(item[key]) > value);
            case `>=`: return this.filter(item => toNumberOrNaN(item[key]) >= value);
            case `<`: return this.filter(item => toNumberOrNaN(item[key]) < value);
            case `<=`: return this.filter(item => toNumberOrNaN(item[key]) <= value);
            case `!=`: return this.filter(item => item[key] != value);
            case `!==`: return this.filter(item => item[key] !== value);
            /* tslint:enable:triple-equals */
            default:
                throw new IllegalOperatorError();
        }
    }

}
