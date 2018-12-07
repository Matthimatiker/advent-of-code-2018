export class Coordinate {

    /**
     * Extracts a coordinate from a string in form "x, y", e.g. "5, 7".
     *
     * @param commaSeparatedCoordinates
     */
    public static from(commaSeparatedCoordinates: string): Coordinate {
        const [x, y] = commaSeparatedCoordinates.split(',').map((coordinateValue) => parseInt(coordinateValue.trim(), 10));
        return new Coordinate(x, y);
    }

    constructor(public readonly x: number, public readonly y: number) {
        if (!Number.isInteger(x)) {
            throw new Error(`Invalid x coordinate value: Expected integer, but got: ${x}`);
        }
        if (!Number.isInteger(y)) {
            throw new Error(`Invalid y coordinate value: Expected integer, but got: ${y}`);
        }
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