import { Jsonable } from '../utils/types';
import { toNumberOrNaN } from '../utils/to';
import { IllegalOperatorError } from '../collection/errors';
import { isArrayLike, isFunction, isNumber } from '../utils/is';
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

    public chunk(size :number = 1) {
        const arr = [];
        let index = 0;
        const len = this.length;
        while (index < len) {
            let partial = this.slice(index, (index += size));
            arr.push(partial);
        }
        const Ctor = this.constructor[Symbol.species];
        const result = new Ctor(...arr);
        return result;
    }

    public compact() {
        return this.filter(Boolean);
    }

    public first() :T {
        return this[0];
    }

    public flatten() {
        const arr = _flatten(this, []);
        const Ctor = this.constructor[Symbol.species];
        const result = new Ctor(...arr);
        return result;
        ////////////////////
        function _flatten(item, _arr) {
            let index = -1;
            const len = item.length;
            while (++index < len) {
                const value = item[index];
                if (isArrayLike(value)) {
                    _flatten(value, _arr);
                } else {
                    _arr.push(value);
                }
            }
            return _arr;
        }
    }

    public last() :T {
        return this[this.length - 1];
    }

    public remove(predicate :(value :T, index :number, obj :this) => boolean, thisArg? :any);
    public remove(predicate :number, thisArg? :any);
    public remove(predicate, thisArg) {
        if (isNumber(predicate)) {
            let index :number = predicate;
            if (index < 0) {
                index += this.length;
            }
            predicate = (v, i) => i === index;
        }
        const arr = [];
        this.forEach((value, index, obj) => {
            if (!predicate(value, index, obj)) {
                arr.push(value);
            }
        }, thisArg);
        const Ctor = this.constructor[Symbol.species];
        const result = new Ctor(...arr);
        return result;
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
