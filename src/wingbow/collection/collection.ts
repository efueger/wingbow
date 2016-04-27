import { Jsonable } from '../utils/types';
import { toNumberOrNaN } from '../utils/to';
import { IllegalOperatorError } from '../collection/errors';
import { isArrayLike, isFunction } from '../utils/is';
import { ExtendableArray, ExtendableArrayInstance } from './extendable-array';

export interface CollectionInstance<T> extends ExtendableArrayInstance<T> {
    readonly length :number;
    readonly [n :number] :T;
}

export interface Collection<T> {
    new <T>(...items :Array<T>): CollectionInstance<T>;
    readonly prototype :CollectionInstance<any>;
}

export class Collection<T> extends ExtendableArray<T> {

    public first() :T {
        return this[0];
    }

    public last() :T {
        return this[this.length - 1];
    }

    public where(key? :string, operator? :Function, value? :Jsonable);
    public where(key? :string, operator? :string, value? :Jsonable);
    public where(key, operator, value) {
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
