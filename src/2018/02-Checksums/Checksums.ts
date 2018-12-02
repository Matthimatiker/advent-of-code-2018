
export class LetterCount {
    public static from(id: string): LetterCount {
        return new LetterCount(true, true);
    }

    constructor(public readonly exactlyTwo : boolean, public readonly exactlyThree : boolean) {
    }
}