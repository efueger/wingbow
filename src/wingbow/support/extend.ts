import { assign, create, hasOwn } from './obj';

export function Extend (target) {

    target.extend = (protoProps, staticProps) => {

        const Parent = target;
        let Child = null;

        if (hasOwn(protoProps, 'constructor')) {
            Child = protoProps.constructor;
        } else {
            Child = function () { return Parent.apply(this, arguments); };
        }

        assign(Child, Parent, staticProps);

        Child.prototype = create(Parent.prototype, protoProps);
        Child.prototype.constructor = Child;

        return Child;

    }

}
