export function Trait (traits :Array<Function>) :ClassDecorator {
    return (target) => {
        traits.forEach(trait => trait(target));
    };
}
