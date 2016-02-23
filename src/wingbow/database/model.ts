/// <reference path="../support/ext.d.ts" />

import { Extend } from '../support/extend';
import { Jsonable } from '../contracts/jsonable';
import { Trait } from '../support/trait';

@Trait([
    Extend
])
export class Model implements Jsonable {

    protected connection() :string {
        return `memory`;
    }

    protected createdAt() :string {
        return `created_at`;
    }

    protected fillable() :Array<string> {
        return [];
    }

    protected hidden() :Array<string> {
        return [`password`];
    }

    protected primaryKey() :string {
        return `id`;
    }

    protected perPage() :number {
        return 20;
    }

    protected table() :string {
        return 'table';
    }

    protected timestamps() :boolean {
        return true;
    }

    public constructor() :void {
        console.log(1, this);
    }

    protected updatedAt() :string {
        return `updated_at`;
    }

    public toJSON() :any {
        return null;
    }

}
