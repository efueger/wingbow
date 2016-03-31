import { Extend } from 'src/wingbow/utils/extend';
import { hasOwn } from 'src/wingbow/utils/hasOwn';
import { isFunction } from 'src/wingbow/utils/is';

let ParentConstructor = null;
let parentCollisionMethodFn = null;
let parentCollisionPropObj = null;
let parentInstance = null;
let parentInstanceMethodFn = null;
let parentInstancePropObj = null;
let parentStaticMethodFn = null;
let parentStaticPropObj = null;
let parentProtoMethodFn = null;
let parentProtoPropObj = null;
let ChildConstructor = null;
let childInstance = null;
let childCollisionMethodFn = null;
let childCollisionPropObj = null;
let childStaticMethodFn = null;
let childStaticPropObj = null;
let childProtoMethodFn = null;
let childProtoPropObj = null;
let childProtos = null;
let childStatics = null;
let $SurrogateConstructor = null;
let surrogateInstanceMethodFn = null;
let surrogateInstancePropObj = null;
let surrogateCollisionMethodFn = null;
let surrogateCollisionPropObj = null;
let surrogateStaticMethodFn = null;
let surrogateStaticPropObj = null;
let surrogateProtoMethodFn = null;
let surrogateProtoPropObj = null;

describe(`extend`, () => {

    beforeEach(() => {
        parentCollisionMethodFn = function () {};
        parentCollisionPropObj = {};
        parentInstanceMethodFn = function () {};
        parentInstancePropObj = {};
        parentStaticMethodFn = function () {};
        parentStaticPropObj = {};
        parentProtoMethodFn = function () {};
        parentProtoPropObj = {};
        ParentConstructor = function () {
            this.parentInstanceMethod = parentInstanceMethodFn;
            this.parentInstanceProp = parentInstancePropObj;
        };
        ParentConstructor.parentStaticMethod = parentStaticMethodFn;
        ParentConstructor.parentStaticProp = parentStaticPropObj;
        ParentConstructor.prototype.collisionMethod = parentCollisionMethodFn;
        ParentConstructor.prototype.collisionProp = parentCollisionPropObj;
        ParentConstructor.prototype.parentProtoMethod = parentProtoMethodFn;
        ParentConstructor.prototype.parentProtoProp = parentProtoPropObj;
        Extend(ParentConstructor);
        parentInstance = new ParentConstructor();
    });

    describe(`when called as a decorator`, () => {

        it(`should be a Function`, function () {
            expect(isFunction(Extend)).toBe(true);
        });

        it(`should add the "extend" method to a constructor`, function () {
            expect(isFunction(ParentConstructor.extend)).toBe(true);
        });

    });

    describe(`when called as a Function`, () => {

        it(`should be callable without "protoProps"`, () => {
            expect(() => {
                ParentConstructor.extend();
            }).not.toThrow();
        });

        it(`should be callable without "staticProps"`, () => {
            expect(() => {
                ParentConstructor.extend({});
            }).not.toThrow();
        });

        it(`should return a constructor that can also be extended`, () => {
            expect(() => {
                const Child = ParentConstructor.extend();
                const GrandChild = Child.extend();
                const GreatGrandChild = GrandChild.extend();
            }).not.toThrow();
        });

        describe(`when a "$constructor" property is supplied`, () => {

            beforeEach(() => {
                childCollisionMethodFn = function () {};
                childCollisionPropObj = {};
                childStaticMethodFn = function () {};
                childStaticPropObj = {};
                childProtoMethodFn = function () {};
                childProtoPropObj = {};
                surrogateInstanceMethodFn = function () {};
                surrogateInstancePropObj = {};
                surrogateCollisionMethodFn = function () {};
                surrogateCollisionPropObj = {};
                surrogateStaticMethodFn = function () {};
                surrogateStaticPropObj = {};
                surrogateProtoMethodFn = function () {};
                surrogateProtoPropObj = {};
                $SurrogateConstructor = function (_super) {
                    const SurrogateConstructor :any = function () {
                        _super.apply(this, arguments);
                        this.surrogateInstanceMethod = surrogateInstanceMethodFn;
                        this.surrogateInstanceProp = surrogateInstancePropObj;
                    };
                    SurrogateConstructor.surrogateStaticMethod = surrogateStaticMethodFn;
                    SurrogateConstructor.surrogateStaticProp = surrogateStaticPropObj;
                    SurrogateConstructor.prototype.collisionMethod = surrogateCollisionMethodFn;
                    SurrogateConstructor.prototype.collisionProp = surrogateCollisionPropObj;
                    SurrogateConstructor.prototype.surrogateProtoMethod = surrogateProtoMethodFn;
                    SurrogateConstructor.prototype.surrogateProtoProp = surrogateProtoPropObj;
                    return SurrogateConstructor;
                };
                childStatics = {
                    childStaticMethod: childStaticMethodFn,
                    childStaticProp: childStaticPropObj,
                };
                childProtos = {
                    $constructor: $SurrogateConstructor,
                    collisionMethod: childCollisionMethodFn,
                    collisionProp: childCollisionPropObj,
                    childProtoMethod: childProtoMethodFn,
                    childProtoProp: childProtoPropObj,
                };
                ChildConstructor = ParentConstructor.extend(childProtos, childStatics);
                childInstance = new ChildConstructor;
            });

            describe(`methods and properties`, () => {

                it(`should reference the "collision" child methods`, ()=> {
                    expect(hasOwn(ChildConstructor.prototype, `collisionMethod`)).toBe(true);
                    expect(hasOwn(childInstance, `collisionMethod`)).toBe(false);
                    expect(ChildConstructor.prototype.collisionMethod).toBe(childCollisionMethodFn);
                    expect(childInstance.collisionMethod).toBe(childCollisionMethodFn);
                });

                it(`should reference the "collision" child properties`, ()=> {
                    expect(hasOwn(ChildConstructor.prototype, `collisionProp`)).toBe(true);
                    expect(hasOwn(childInstance, `collisionProp`)).toBe(false);
                    expect(ChildConstructor.prototype.collisionProp).toBe(childCollisionPropObj);
                    expect(childInstance.collisionProp).toBe(childCollisionPropObj);
                });

                it(`should reference the "instance" parent and surrogate methods`, () => {
                    expect(hasOwn(childInstance, `parentInstanceMethod`)).toBe(true);
                    expect(childInstance.parentInstanceMethod).toBe(parentInstanceMethodFn);
                    expect(hasOwn(childInstance, `surrogateInstanceMethod`)).toBe(true);
                    expect(childInstance.surrogateInstanceMethod).toBe(surrogateInstanceMethodFn);
                });

                it(`should reference the "instance" parent and surrogate properties`, ()=> {
                    expect(hasOwn(childInstance, `parentInstanceProp`)).toBe(true);
                    expect(childInstance.parentInstanceProp).toBe(parentInstancePropObj);
                    expect(hasOwn(childInstance, `surrogateInstanceProp`)).toBe(true);
                    expect(childInstance.surrogateInstanceProp).toBe(surrogateInstancePropObj);
                });

                it(`should reference the "static" parent, surrogate, and child methods`, () => {
                    expect(hasOwn(ChildConstructor, `parentStaticMethod`)).toBe(true);
                    expect(ChildConstructor.parentStaticMethod).toBe(parentStaticMethodFn);
                    expect(hasOwn(ChildConstructor, `surrogateStaticMethod`)).toBe(true);
                    expect(ChildConstructor.surrogateStaticMethod).toBe(surrogateStaticMethodFn);
                    expect(hasOwn(ChildConstructor, `childStaticMethod`)).toBe(true);
                    expect(ChildConstructor.childStaticMethod).toBe(childStaticMethodFn);
                });

                it(`should reference the "static" parent, surrogate, and child properties`, ()=> {
                    expect(hasOwn(ChildConstructor, `parentStaticProp`)).toBe(true);
                    expect(ChildConstructor.parentStaticProp).toBe(parentStaticPropObj);
                    expect(hasOwn(ChildConstructor, `surrogateStaticProp`)).toBe(true);
                    expect(ChildConstructor.surrogateStaticProp).toBe(surrogateStaticPropObj);
                    expect(hasOwn(ChildConstructor, `childStaticProp`)).toBe(true);
                    expect(ChildConstructor.childStaticProp).toBe(childStaticPropObj);
                });

                it(`should reference the "prototype" parent, surrogate, and child methods`, ()=> {
                    expect(hasOwn(ChildConstructor.prototype, `parentProtoMethod`)).toBe(false);
                    expect(hasOwn(childInstance, `parentProtoMethod`)).toBe(false);
                    expect(ChildConstructor.prototype.parentProtoMethod).toBe(parentProtoMethodFn);
                    expect(childInstance.parentProtoMethod).toBe(parentProtoMethodFn);
                    expect(hasOwn(ChildConstructor.prototype, `surrogateProtoMethod`)).toBe(false);
                    expect(hasOwn(childInstance, `surrogateProtoMethod`)).toBe(false);
                    expect(ChildConstructor.prototype.surrogateProtoMethod).toBe(surrogateProtoMethodFn);
                    expect(childInstance.surrogateProtoMethod).toBe(surrogateProtoMethodFn);
                    expect(hasOwn(ChildConstructor.prototype, `childProtoMethod`)).toBe(true);
                    expect(hasOwn(childInstance, `childProtoMethod`)).toBe(false);
                    expect(ChildConstructor.prototype.childProtoMethod).toBe(childProtoMethodFn);
                    expect(childInstance.childProtoMethod).toBe(childProtoMethodFn);
                });

                it(`should reference the "prototype" parent, surrogate, and child properties`, ()=> {
                    expect(hasOwn(ChildConstructor.prototype.parentProtoProp)).toBe(false);
                    expect(hasOwn(childInstance.parentProtoProp)).toBe(false);
                    expect(ChildConstructor.prototype.parentProtoProp).toBe(parentProtoPropObj);
                    expect(childInstance.parentProtoProp).toBe(parentProtoPropObj);
                    expect(hasOwn(ChildConstructor.prototype, `surrogateProtoProp`)).toBe(false);
                    expect(hasOwn(childInstance, `surrogateProtoProp`)).toBe(false);
                    expect(ChildConstructor.prototype.surrogateProtoProp).toBe(surrogateProtoPropObj);
                    expect(childInstance.surrogateProtoProp).toBe(surrogateProtoPropObj);
                    expect(hasOwn(ChildConstructor.prototype, `childProtoProp`)).toBe(true);
                    expect(hasOwn(childInstance, `childProtoProp`)).toBe(false);
                    expect(ChildConstructor.prototype.childProtoProp).toBe(childProtoPropObj);
                    expect(childInstance.childProtoProp).toBe(childProtoPropObj);
                });

            });

        });

        describe(`when a "$constructor" property is not supplied`, () => {

            beforeEach(() => {
                childCollisionMethodFn = function () {};
                childCollisionPropObj = {};
                childStaticMethodFn = function () {};
                childStaticPropObj = {};
                childProtoMethodFn = function () {};
                childProtoPropObj = {};
                childStatics = {
                    childStaticMethod: childStaticMethodFn,
                    childStaticProp: childStaticPropObj,
                };
                childProtos = {
                    collisionMethod: childCollisionMethodFn,
                    collisionProp: childCollisionPropObj,
                    childProtoMethod: childProtoMethodFn,
                    childProtoProp: childProtoPropObj,
                };
                ChildConstructor = ParentConstructor.extend(childProtos, childStatics);
                childInstance = new ChildConstructor;
            });


            describe(`methods and properties`, () => {

                it(`should reference the "collision" child methods`, ()=> {
                    expect(hasOwn(ChildConstructor.prototype, `collisionMethod`)).toBe(true);
                    expect(hasOwn(childInstance, `collisionMethod`)).toBe(false);
                    expect(ChildConstructor.prototype.collisionMethod).toBe(childCollisionMethodFn);
                    expect(childInstance.collisionMethod).toBe(childCollisionMethodFn);
                });

                it(`should reference the "collision" child properties`, ()=> {
                    expect(hasOwn(ChildConstructor.prototype, `collisionProp`)).toBe(true);
                    expect(hasOwn(childInstance, `collisionProp`)).toBe(false);
                    expect(ChildConstructor.prototype.collisionProp).toBe(childCollisionPropObj);
                    expect(childInstance.collisionProp).toBe(childCollisionPropObj);
                });

                it(`should reference the "instance" parent methods`, () => {
                    expect(hasOwn(childInstance, `parentInstanceMethod`)).toBe(true);
                    expect(childInstance.parentInstanceMethod).toBe(parentInstanceMethodFn);
                });

                it(`should reference the "instance" parent properties`, ()=> {
                    expect(hasOwn(childInstance, `parentInstanceProp`)).toBe(true);
                    expect(childInstance.parentInstanceProp).toBe(parentInstancePropObj);
                });

                it(`should reference the "static" parent and child methods`, () => {
                    expect(hasOwn(ChildConstructor, `parentStaticMethod`)).toBe(true);
                    expect(ChildConstructor.parentStaticMethod).toBe(parentStaticMethodFn);
                    expect(hasOwn(ChildConstructor, `childStaticMethod`)).toBe(true);
                    expect(ChildConstructor.childStaticMethod).toBe(childStaticMethodFn);
                });

                it(`should reference the "static" parent and child properties`, ()=> {
                    expect(hasOwn(ChildConstructor, `parentStaticProp`)).toBe(true);
                    expect(ChildConstructor.parentStaticProp).toBe(parentStaticPropObj);
                    expect(hasOwn(ChildConstructor, `childStaticProp`)).toBe(true);
                    expect(ChildConstructor.childStaticProp).toBe(childStaticPropObj);
                });

                it(`should reference the "prototype" parent and child methods`, ()=> {
                    expect(hasOwn(ChildConstructor.prototype, `parentProtoMethod`)).toBe(false);
                    expect(hasOwn(childInstance, `parentProtoMethod`)).toBe(false);
                    expect(ChildConstructor.prototype.parentProtoMethod).toBe(parentProtoMethodFn);
                    expect(childInstance.parentProtoMethod).toBe(parentProtoMethodFn);
                    expect(hasOwn(ChildConstructor.prototype, `childProtoMethod`)).toBe(true);
                    expect(hasOwn(childInstance, `childProtoMethod`)).toBe(false);
                    expect(ChildConstructor.prototype.childProtoMethod).toBe(childProtoMethodFn);
                    expect(childInstance.childProtoMethod).toBe(childProtoMethodFn);
                });

                it(`should reference the "prototype" parent and child properties`, ()=> {
                    expect(hasOwn(ChildConstructor.prototype.parentProtoProp)).toBe(false);
                    expect(hasOwn(childInstance.parentProtoProp)).toBe(false);
                    expect(ChildConstructor.prototype.parentProtoProp).toBe(parentProtoPropObj);
                    expect(childInstance.parentProtoProp).toBe(parentProtoPropObj);
                    expect(hasOwn(ChildConstructor.prototype, `childProtoProp`)).toBe(true);
                    expect(hasOwn(childInstance, `childProtoProp`)).toBe(false);
                    expect(ChildConstructor.prototype.childProtoProp).toBe(childProtoPropObj);
                    expect(childInstance.childProtoProp).toBe(childProtoPropObj);
                });

            });

        });

    });

});
