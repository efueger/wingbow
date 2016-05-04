export class IllegalOperatorError extends TypeError {
    public name :string = `IllegalOperatorError`;
    constructor(public message? :string) {
        super(message);
    }
}

export class NotImplementedError extends TypeError {
    public name :string = `NotImplementedError`;
    constructor(public message? :string) {
        super(message);
    }
}
