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

    /**
     * From the given coordinates, this method returns the one that is nearest to this coordinate.
     *
     * Returns null when the two nearest coordinates have the same distance, then null is returned.
     *
     * @param coordinates
     */
    public nearest(coordinates: Coordinate[]): Coordinate|null {
        if (coordinates.length === 0) {
            return null;
        }
        if (coordinates.length === 1) {
            return coordinates[0];
        }
        const sortedByDistance = coordinates.sort((left, right) => this.manhattanDistance(left) - this.manhattanDistance(right));
        if (this.manhattanDistance(sortedByDistance[0]) === this.manhattanDistance(sortedByDistance[1])) {
            // Returns null as it is not clear, which coordinate is the nearest.
            return null;
        }
        return sortedByDistance[0];
    }

    public toString() {
        return `(${this.x},${this.y})`;
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
        if (coordinates.length === 0) {
            throw new Error('Given coordinate list must not be empty.');
        }
        let topX = Number.POSITIVE_INFINITY;
        let leftY = Number.POSITIVE_INFINITY;
        let bottomX = Number.NEGATIVE_INFINITY;
        let rightY = Number.NEGATIVE_INFINITY;
        for (let coordinate of coordinates) {
            topX = Math.min(topX, coordinate.x);
            leftY = Math.min(leftY, coordinate.y);
            bottomX = Math.max(bottomX, coordinate.x);
            rightY = Math.max(rightY, coordinate.y);
        }
        return new BoundedGrid(new Coordinate(topX, leftY), new Coordinate(bottomX, rightY));
    }

    public constructor(public readonly topLeft: Coordinate, public readonly bottomRight: Coordinate) {
        if (topLeft.x > bottomRight.x || topLeft.y > bottomRight.y) {
            throw new Error(`Given top left ${topLeft} has invalid coordinate position when compared to bottom right ${bottomRight}.`)
        }
    }

    public isOnEdge(coordinate: Coordinate): boolean {
        return coordinate.x === this.topLeft.x || coordinate.x === this.bottomRight.x || coordinate.y === this.topLeft.y || coordinate.y === this.bottomRight.y;
    }

    /**
     * Returns all coordinates within the grid.
     */
    public getCoordinates(): Coordinate[] {
        const coordinates = [];
        for (let x = this.topLeft.x; x <= this.bottomRight.x; x++) {
            for (let y = this.topLeft.y; y <= this.bottomRight.y; y++) {
                coordinates.push(new Coordinate(x, y));
            }
        }
        return coordinates;
    }
}