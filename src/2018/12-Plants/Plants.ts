type HasPlant = boolean;

export const PLANT = true;
export const NO_PLANT = false;

export class Pots {
    public static fromState(state: string): Pots {
        return new Pots(state.split('').map((character) => (character === '#') ? PLANT : NO_PLANT));
    }

    public constructor(public readonly pots: HasPlant[], public readonly initialPotIndex: number = 0) {
    }

    public sumOfPotNumbersWithPlant(): number {
        return this.pots.reduce((previous, current, index) => {
            if (!current) {
                return previous;
            }
            return previous + index + this.initialPotIndex
        }, 0);
    }

    /**
     * Removes empty pots from the left and right.
     */
    public trim(): Pots {
        const firstIndexWithPlant = this.pots.indexOf(PLANT);
        if (firstIndexWithPlant === -1) {
            // No plants in list.
            return new Pots([], this.initialPotIndex + this.pots.length);
        }
        const lastIndexWithPlant = this.pots.lastIndexOf(PLANT);
        return new Pots(this.pots.slice(firstIndexWithPlant, lastIndexWithPlant + 1), this.initialPotIndex + firstIndexWithPlant);
    }

    public toString(): string {
        return this.pots.map((hasPlant) => (hasPlant) ? '#' : '.').join('');
    }
}

export class Rule {

    /**
     * Extracts a rule from a definition string like:
     *
     *     "..#.. => #"
     *
     * @param definition
     */
    public static fromDefinition(definition: string): Rule {
        const [pattern, result] = definition.split(' => ');
        return new Rule(pattern.split('').map((character) => character === '#'), result === '#');
    }

    public constructor(public readonly pattern: HasPlant[], public readonly result: HasPlant) {
    }

    public matches(slice: HasPlant[]): boolean {
        if (this.pattern.length !== slice.length) {
            throw new Error(`Pattern has length of ${this.pattern.length}, but slice to compare has length of ${slice.length}. Length must be equal.`);
        }
        for (const index in this.pattern) {
            if (this.pattern[index] !== slice[index]) {
                return false;
            }
        }
        return true;
    }
}

export class Rules {

    private static readonly EMPTY_PLANT_SLICE: HasPlant[] = [NO_PLANT, NO_PLANT, NO_PLANT, NO_PLANT, NO_PLANT];

    public constructor(private rules: Rule[]) {
    }

    public apply(pots: Pots, generations: number = 1): Pots {
        let nextGeneration = pots;
        for (let generation = 1; generation <= generations; generation++) {
            nextGeneration = this.nextGeneration(nextGeneration);
        }
        return nextGeneration;
    }

    private nextGeneration(pots: Pots): Pots {
        const expandedCurrentGeneration = [...Rules.EMPTY_PLANT_SLICE, ...pots.pots, ...Rules.EMPTY_PLANT_SLICE];
        const nextGeneration: HasPlant[] = [];
        for (let index = 2; index < expandedCurrentGeneration.length - 2; index++) {
            const sliceToCompare = expandedCurrentGeneration.slice(index - 2, index + 3);
            nextGeneration.push(this.applyRules(sliceToCompare));
        }
        return (new Pots(nextGeneration, pots.initialPotIndex - Rules.EMPTY_PLANT_SLICE.length + 2)).trim();
    }

    private applyRules(slice: HasPlant[]): HasPlant {
        for (const rule of this.rules) {
            if (rule.matches(slice)) {
                return rule.result;
            }
        }
        return NO_PLANT;
    }
}