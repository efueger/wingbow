import { hasOwn } from './hasOwn';

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

    Target.extend = (rawProtoProps :RawProtoPropsInterface = {}, staticProps :Object = {}) :Function => {

        let Surrogate = null;
        const protoProps = mapValueForDescriptor(rawProtoProps);

        if (hasOwn(rawProtoProps, `$constructor`)) {
            Surrogate = rawProtoProps.$constructor(Target);
        } else {
            Surrogate = function () { return Target.apply(this, arguments); };
        }

        Object.assign(Surrogate, Target, staticProps);
        const proto = Object.assign({}, Target.prototype, Surrogate.prototype);

        Surrogate.prototype = Object.create(proto, protoProps);
        Surrogate.prototype.constructor = Surrogate;

        return Surrogate;

    };

}
