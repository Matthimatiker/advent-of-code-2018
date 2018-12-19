type HasPlant = boolean;

export class Pots {
    public static fromState(state: string): Pots {
        throw new Error("Not implemented");
    }

    public constructor(public readonly pots: HasPlant[], public readonly initialPotIndex: number = 0) {
    }

    public sumOfPotNumbersWithPlant(): number {
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

    public constructor(pattern: HasPlant[], result: HasPlant) {
    }
}

export class Rules {
    public constructor(private rules: Rule[]) {
    }

    public apply(pots: Pots): Pots {
        throw new Error("Not implemented");
    }
}