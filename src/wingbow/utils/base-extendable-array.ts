import { hasOwn } from './has-own';
import { MAX_ARRAY_LENGTH } from './max-array-length';

export function ToUint32(value :any) :number {
    return value >>> 0;
}

export interface BaseExtendableArrayInstance<T> extends Array<T> {
    length :number;
    [n :number] :T;
}

export interface BaseExtendableArray<T> {
    new <T>(...items :Array<T>): BaseExtendableArrayInstance<T>;
    prototype :BaseExtendableArrayInstance<T>;
}

export const BaseExtendableArray :BaseExtendableArray<any> = BaseExtendableArrayFn as any;

function BaseExtendableArrayFn<T>(...args :Array<T>) :void {

    this.push.apply(this, args);
    let _length = 0;

    Object.defineProperty(this, 'length', {
        get: function () :number {
            let result = -1;
            for (let key in this) {
                if (hasOwn(this, key)) {
                    const index = ToUint32(key);
                    if (String(index) !== key) {
                        continue;
                    }
                    if (index >= MAX_ARRAY_LENGTH) {
                        continue;
                    }
                    // Can't target this in Chrome because it sorts the keys
                    // into numeric order for us. This if check is used to
                    // capture keys that are out of sequence; eg [0, 2, 1];
                    // istanbul ignore next
                    if (index > result) {
                        result = index;
                    }
                }
            }
            return Math.max(_length, result + 1);
        },
        set: function (value :any) :void {
            let index = ToUint32(value);
            if (index !== Number(value)) {
                throw new RangeError();
            }
            const len = this.length;
            while (index < len) {
                delete this[index++];
            }
            _length = index;
        },
    });

}

BaseExtendableArray.prototype = Object.create(Array.prototype);
BaseExtendableArray.prototype.constructor = BaseExtendableArray;
