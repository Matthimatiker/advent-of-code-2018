
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

    public getTurn(): number {
        return -1;
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
        return this.marbles.map(marble => marble.value).reduce((previous, current) => previous + current, 0);
    }
}

export class Game {
    public static setUpFor(numberOfPlayers: number, highestMarbleNumber: number): Game {
        const players = [];
        for (let i = 0; i < numberOfPlayers; i++) {
            players.push(new Player());
        }
        const marbles = [];
        for (let i = 1; i <= highestMarbleNumber; i++) {
            marbles.push(new Marble(i));
        }
        return new Game(players, marbles);
    }

    public constructor(
        public readonly players: Player[],
        public readonly marbles: Marble[]
    ) {
    }

    /**
     * Plays the game to the end and returns the winner.
     */
    public play(): Player {
        const circle = new MarbleCircle();
        for (let marble of this.marbles) {

        }
        throw new Error("not implemented");
    }
}