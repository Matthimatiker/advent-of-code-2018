
export class Marble {
    public constructor(public readonly value: number) {
    }
}

declare type MarbleIndex = number;

export class MarbleCircle {

    public readonly marbles: Marble[];

    private currentMarbleIndex: MarbleIndex;

    public constructor() {
        this.marbles = [new Marble(0)];
        this.currentMarbleIndex = 0;
    }

    public getCurrentMarble(): Marble {
        throw new Error("not implemented")
    }

    public place(marble: Marble): Marble[] {
        throw new Error("not implemented")
    }

    private clockwise(steps: number): MarbleIndex {
        throw new Error("not implemented");
    }

    private counterClockwise(steps: number): MarbleIndex {
        throw new Error("not implemented");
    }
}

export class Player {

    public readonly marbles: Marble[] = [];

    public keep(marble: Marble) {
        this.marbles.push(marble);
    }

    public getScore(): number {
        throw new Error("not implemented")
    }
}

export class Game {
    public static setUpFor(numberOfPlayers: number, highestMarbleNumber: number): Game {
        throw new Error("not implemented");
    }

    public constructor(
        public readonly players: Player,
        public readonly marbles: Marble[]
    ) {
    }

    /**
     * Plays the game to the end and returns the winner.
     */
    public play(): Player {
        throw new Error("not implemented");
    }
}