export function lcfirst(str :string) :string {
    return toLowerCase(str.charAt(0)) + str.substr(1);
}

export function simplifySymbols(str :string) :string {
    return str.replace(/(_|\-)+/g, `_`);
}

export function toCamelCase(str :string) :string {
    return toSnakeCase(str).replace(/_\w/g, m => `${toUpperCase(m[1])}`);
}

export function toConstantCase(str :string) :string {
    return toUpperCase(toSnakeCase(str));
}

export function toDashCase(str :string) :string {
    return toSnakeCase(str).replace(/_/g, `-`);
}

export function toLowerCase(str :string) :string {
    return str.toLowerCase();
}

export function toPascalCase(str :string) :string {
    return ucfirst(toCamelCase(str));
}

export function toUpperCase(str :string) :string {
    return str.toUpperCase();
}

export function toSnakeCase(str :string) :string {
    return toLowerCase(
        lcfirst(trimSymbols(simplifySymbols(str)))
        .replace(/[A-Z]/g, m => `_${m}`)
        .replace(/_+/g, `_`)
    );
}

export function trim(str :string) :string {
    return str.trim();
}

export function trimSymbols(str :string) :string {
    return trim(str).replace(/^(_|\-)+/g, ``).replace(/(_|\-)+$/g, ``);
}

export function ucfirst(str :string) :string {
    return toUpperCase(str.charAt(0)) + str.substr(1);
}
