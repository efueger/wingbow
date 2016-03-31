import {
    lcfirst,
    toCamelCase,
    toConstantCase,
    toDashCase,
    toLowerCase,
    toPascalCase,
    toSnakeCase,
    toUpperCase,
    trim,
    ucfirst,
} from 'src/wingbow/utils/str';

describe(`str`, () => {

    describe(`lcfirst`, () =>{

        it(`should do something`, () => {
           expect(lcfirst(`aaa-aaa_aaa`)).toBe(`aaa-aaa_aaa`);
           expect(lcfirst(`BBB-BBB_BBB`)).toBe(`bBB-BBB_BBB`);
        });

    });

    describe(`toCamelCase`, () =>{

        it(`should do something`, () => {
           expect(toCamelCase(`aaa-aaa_aaa`)).toBe(`aaaAaaAaa`);
           expect(toCamelCase(`BBB-BBB_BBB`)).toBe(`bbbBbbBbb`);
        });

    });

    describe(`toConstantCase`, () =>{

        it(`should do something`, () => {
           expect(toConstantCase(`aaa-aaa_aaa`)).toBe(`AAA_AAA_AAA`);
           expect(toConstantCase(`BBB-BBB_BBB`)).toBe(`BBB_BBB_BBB`);
        });

    });

    describe(`toDashCase`, () =>{

        it(`should do something`, () => {
           expect(toDashCase(`aaa-aaa_aaa`)).toBe(`aaa-aaa-aaa`);
           expect(toDashCase(`BBB-BBB_BBB`)).toBe(`bbb-bbb-bbb`);
        });

    });

    describe(`toLowerCase`, () =>{

        it(`should do something`, () => {
           expect(toLowerCase(`aaa-aaa_aaa`)).toBe(`aaa-aaa_aaa`);
           expect(toLowerCase(`BBB-BBB_BBB`)).toBe(`bbb-bbb_bbb`);
        });

    });

    describe(`toPascalCase`, () =>{

        it(`should do something`, () => {
           expect(toPascalCase(`aaa-aaa_aaa`)).toBe(`AaaAaaAaa`);
           expect(toPascalCase(`BBB-BBB_BBB`)).toBe(`BbbBbbBbb`);
        });

    });

    describe(`toSnakeCase`, () =>{

        it(`should do something`, () => {
           expect(toSnakeCase(`aaa-aaa_aaa`)).toBe(`aaa_aaa_aaa`);
           expect(toSnakeCase(`BBB-BBB_BBB`)).toBe(`bbb_bbb_bbb`);
        });

    });

    describe(`toUpperCase`, () =>{

        it(`should do something`, () => {
           expect(toUpperCase(`aaa-aaa_aaa`)).toBe(`AAA-AAA_AAA`);
           expect(toUpperCase(`BBB-BBB_BBB`)).toBe(`BBB-BBB_BBB`);
        });

    });

    describe(`trim`, () =>{

        it(`should do something`, () => {
           expect(trim(`aaa-aaa_aaa`)).toBe(`aaa-aaa_aaa`);
           expect(trim(`BBB-BBB_BBB`)).toBe(`BBB-BBB_BBB`);
        });

    });

    describe(`ucfirst`, () =>{

        it(`should do something`, () => {
           expect(ucfirst(`aaa-aaa_aaa`)).toBe(`Aaa-aaa_aaa`);
           expect(ucfirst(`BBB-BBB_BBB`)).toBe(`BBB-BBB_BBB`);
        });

    });

});
