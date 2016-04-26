export class IllegalOperatorError extends TypeError {
    public name :string = `IllegalOperatorError`;
    constructor(public message? :string) {
        super(message);
    }
}
