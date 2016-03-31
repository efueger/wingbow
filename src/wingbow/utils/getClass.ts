const fallback = 'object';
const nativeToString = Object.prototype.toString;
const classMap = {
    '[object Array]': `array`,
    '[object Boolean]': `boolean`,
    '[object Date]': `date`,
    '[object Error]': `error`,
    '[object Function]': `function`,
    '[object Number]': `number`,
    '[object Object]': `object`,
    '[object RegExp]': `regexp`,
    '[object String]': `string`
};

export function getClass(item) {

    if (item === null || item === undefined) {
        return String(item);
    }

    if (item instanceof Error) {
        return `error`;
    }

    const itemType = typeof item;

    if (itemType === `object` || itemType === `function`) {

        const constructorString = nativeToString.call(item);

        if (constructorString in classMap) {
            return classMap[constructorString];
        }

        return fallback;
    }

    return itemType;

};
