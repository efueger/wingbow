import { BaseExtendableArray, BaseExtendableArrayInstance } from './base-extendable-array';

export interface ExtendableArrayInstance<T> extends BaseExtendableArrayInstance<T> {
    readonly length :number;
    readonly [n :number] :T;
    readonly [Symbol.toStringTag] :string;
}

export interface ExtendableArray<T> {
    new <T>(...items :Array<T>): ExtendableArrayInstance<T>;
    readonly prototype :ExtendableArrayInstance<T>;
    readonly [Symbol.species] :Function;
}

export class ExtendableArray<T> extends BaseExtendableArray<T> {

    static get [Symbol.species]() {
        return this;
    }

    get [Symbol.toStringTag]() {
        const Ctor = this.constructor[Symbol.species];
        const name = Ctor.name;
        return name;
    }

    constructor(...args :Array<T>) {
        super(...args);
    }

    public concat(...args :Array<(T | Array<T>)>) {
        const arr = this.toArray();
        const result = arr.concat(...args);
        const Ctor = this.constructor[Symbol.species];
        return new Ctor(...result);
    }

    public filter(callbackfn :(value :T, index :number, obj :this) => boolean, thisArg? :any) {
        const arr = this.toArray();
        const result = arr.filter(callbackfn, thisArg);
        const Ctor = this.constructor[Symbol.species];
        return new Ctor(...result);
    }

    public map<U>(callbackfn :(value :T, index :number, obj :this) => U, thisArg? :any) {
        const arr = this.toArray();
        const result = arr.map(callbackfn, thisArg);
        const Ctor = this.constructor[Symbol.species];
        return new Ctor(...result);
    }

    public slice(start? :number, end? :number) {
        const arr = this.toArray();
        const result = arr.slice(start, end);
        const Ctor = this.constructor[Symbol.species];
        return new Ctor(...result);
    }

    public splice(start :number, deleteCount? :number, ...items :Array<T>) {
        const result = super.splice(start, deleteCount, ...items);
        const Ctor = this.constructor[Symbol.species];
        return new Ctor(...result);
    }

    public toArray() :Array<T> {
        return Array.from<T>(this);
    }

}
