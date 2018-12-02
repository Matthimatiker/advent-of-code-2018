
export class LetterCount {
    public static from(id: string): LetterCount {
        const countByCharacter : {[key: string]: number} = {};
        for (let char of id.split("")) {
            if (!(char in countByCharacter)) {
                countByCharacter[char] = 0;
            }
            countByCharacter[char]++;
        }
        const counts = Object.values(countByCharacter);
        return new LetterCount(counts.includes(2), counts.includes(3));
    }

    constructor(public readonly exactlyTwo : boolean, public readonly exactlyThree : boolean) {
    }
}

export class Checksum {
    public static checksum(letterCountPerId : LetterCount[]): number {
        return 0;
    }
}