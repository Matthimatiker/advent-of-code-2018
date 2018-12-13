
export class Marble {
    public constructor(public readonly value: number) {
    }
}

declare type MarbleIndex = number;

export class MarbleCircle {

    public marbles: Marble[];

    private currentMarbleIndex: MarbleIndex;

    private turn: number = 0;

    public constructor() {
        this.marbles = [new Marble(0)];
        this.currentMarbleIndex = 0;
    }

    public getCurrentMarble(): Marble {
        return this.marbles[this.currentMarbleIndex];
    }

    public place(marble: Marble): Marble[] {
        this.turn++;
        if (marble.value % 23 === 0) {
            this.currentMarbleIndex = this.counterClockwise(7);
            const removedMarble = this.marbles[this.currentMarbleIndex];
            this.marbles = [...this.marbles.slice(0, this.currentMarbleIndex), ...this.marbles.slice(this.currentMarbleIndex + 1)];
            return [removedMarble, marble];
        }
        this.currentMarbleIndex = this.clockwise(2);
        this.marbles = [...this.marbles.slice(0, this.currentMarbleIndex), marble, ...this.marbles.slice(this.currentMarbleIndex)];
        return [];
    }

    public getTurn(): number {
        return this.turn;
    }

    private clockwise(steps: number): MarbleIndex {
        return (this.currentMarbleIndex + steps) % this.marbles.length;
    }

    private counterClockwise(steps: number): MarbleIndex {
        let index = this.currentMarbleIndex - steps;
        if (index >= 0) {
            return index;
        }
        while (index < 0) {
            index += this.marbles.length;
        }
        return index;
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
            const activePlayer = this.players[circle.getTurn() % this.players.length];
            circle.place(marble).forEach(receivedMarble => activePlayer.keep(receivedMarble));
        }
        return this.players.sort((left, right) => left.getScore() - right.getScore()).reverse()[0];
    }
}