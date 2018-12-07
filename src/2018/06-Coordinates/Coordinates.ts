export class Coordinate {
    public static from(commaSeparatedCoordinates: string): Coordinate {
        throw new Error("not implemented")
    }

    constructor(public readonly x: number, public readonly y: number) {
    }

    public manhattanDistance(anotherCoordinate: Coordinate): number {
        return Math.abs(this.x - anotherCoordinate.x) + Math.abs(this.y - anotherCoordinate.y);
    }
}

export class BoundedGrid {

    /**
     * Creates a grid that encloses the given coordinates.
     *
     * The grid is as small as possible.
     *
     * @param coordinates
     */
    public static createEnclosing(coordinates: Coordinate[]): BoundedGrid {
        throw new Error("not implemented")
    }

    public constructor(public readonly topLeft: Coordinate, public readonly bottomRight: Coordinate) {

    }

    public isOnEdge(coordinate: Coordinate): boolean {
        return false;
    }
}