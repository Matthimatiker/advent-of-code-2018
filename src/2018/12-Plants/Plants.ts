type HasPlant = boolean;

export const PLANT = true;
export const NO_PLANT = false;

export class Pots {
    public static fromState(state: string): Pots {
        throw new Error("Not implemented");
    }

    public constructor(public readonly pots: HasPlant[], public readonly initialPotIndex: number = 0) {
    }

    public sumOfPotNumbersWithPlant(): number {
        throw new Error("Not implemented");
    }

    /**
     * Removes empty pots from the left and right.
     */
    public trim(): Pots {
        throw new Error("Not implemented");
    }

    public toString(): string {
        throw new Error("Not implemented");
    }
}

export class Rule {
    public static fromDefinition(definition: string): Rule {
        throw new Error("Not implemented");
    }

    public constructor(public readonly pattern: HasPlant[], public readonly result: HasPlant) {
    }
}

export class Rules {
    public constructor(private rules: Rule[]) {
    }

    public apply(pots: Pots, generations: number = 1): Pots {
        throw new Error("Not implemented");
    }
}