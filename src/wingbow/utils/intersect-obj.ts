export function intersectWithObj<T>(obj :T, keys :Array<string>) :T {
    const result = {} as T;
    Object.keys(obj).forEach(key => {
        if (keys.includes(key)) {
            result[key] = obj[key];
        }
    });
    return result;
}

export function intersectWithoutObj<T>(obj :T, keys :Array<string>) :T {
    const result = {} as T;
    Object.keys(obj).forEach(key => {
        if (!keys.includes(key)) {
            result[key] = obj[key];
        }
    });
    return result;
}
