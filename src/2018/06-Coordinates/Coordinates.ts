export class Coordinate {
    constructor(public readonly x: number, public readonly y: number) {
    }

    public manhattanDistance(anotherCoordinate: Coordinate): number {
        return Math.abs(this.x - anotherCoordinate.x) + Math.abs(this.y - anotherCoordinate.y);
    }
}

