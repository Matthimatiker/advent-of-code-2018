
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
        const numberOfIdsWithTwoLetters = letterCountPerId.filter((letterCount) => letterCount.exactlyTwo).length;
        const numberOfIdsWithThreeLetters = letterCountPerId.filter((letterCount) => letterCount.exactlyThree).length;
        return numberOfIdsWithTwoLetters * numberOfIdsWithThreeLetters;
    }
}

export class IdAnalysis {

    /**
     * Checks if 2 IDs differ by exactly one character at the same position.
     *
     * @param leftId
     * @param rightId
     */
    public static differByExactlyOneCharacter(leftId: string, rightId: string) : boolean {
        return false;
    }

    /**
     * Returns the common letters (at the same position) from both IDs.
     *
     * The letters are ordered as they are encountered in the IDs.
     *
     * @param leftId
     * @param rightId
     */
    public static commonLetters(leftId: string, rightId: string) : string {
        return "";
    }
}