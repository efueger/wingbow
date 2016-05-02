export function rnd(min :number, max :number) :number;
export function rnd(max :number) :number;
export function rnd() :number;
export function rnd() {
    let min :number;
    let max :number;
    switch (arguments.length) {
        case 0:
            min = 1;
            max = 100;
            break;
        case 1:
            min = 1;
            max = arguments[0];
            break;
        default:
            min = arguments[0];
            max = arguments[1];
            break;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
