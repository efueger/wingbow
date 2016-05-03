export class IllegalCastTypeError extends TypeError {
    public name :string = `IllegalCastTypeError`;
    constructor(public message? :string) {
        super(message);
    }
}

export class IllegalStoreTypeError extends TypeError {
    public name :string = `IllegalStoreTypeError`;
    constructor(public message? :string) {
        super(message);
    }
}

export class MassAssignmentError extends Error {
    public name :string = `MassAssignmentError`;
    constructor(public message? :string) {
        super(message);
    }
}

export class NotFillableError extends Error {
    public name :string = `NotFillableError`;
    constructor(public message? :string) {
        super(message);
    }
}
