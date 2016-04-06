const hasOwnProperty = Object.prototype.hasOwnProperty;

export function hasOwn(obj? :any, key? :string) :boolean {
    if (obj === null || obj === undefined) {
        return false;
    }
    return hasOwnProperty.call(obj, key);
}
