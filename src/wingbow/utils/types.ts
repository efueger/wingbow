export type Jsonable = Array<any> | Object | boolean | number | string;
export interface JsonableObject {
    [key :string] :Jsonable;
}
