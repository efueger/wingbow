import { hasOwn } from './has-own';
import { isString } from './is';

function mapValueForDescriptor(values) {
    return Object.keys(values).reduce((previous, current) => {
        previous[current] = {
            configurable: true,
            enumerable: true,
            value: values[current],
            writable: true,
        };
        return previous;
    }, {});
}

export interface RawProtoPropsInterface {
    $constructor? :Function;
}

export function Extend (Target) {

    Target.extend = (rawProtoProps :RawProtoPropsInterface = {}, staticProps :Object = {}, name? :string) :Function => {

        let Child = null;
        const protoProps = mapValueForDescriptor(rawProtoProps);

        if (isString(name)) {
            try {
                /* eslint no-new-func: ["off"] */
                Child = new Function(`
                    return function ${name}(_super) {
                        return _super.apply(this, arguments);
                    };
                `)(Target);
            } catch (err) { /* Do nothing */ }
        }

        if (!Child) {
            if (hasOwn(rawProtoProps, `$constructor`)) {
                Child = rawProtoProps.$constructor(Target);
            } else {
                Child = function Child() { return Target.apply(this, arguments); };
            }
        }

        Object.assign(Child, Target, staticProps);
        const proto = Object.assign({}, Target.prototype, Child.prototype);

        Child.prototype = Object.create(proto, protoProps);
        Child.prototype.constructor = Child;

        return Child;

    };

}
