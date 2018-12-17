export class CellPosition {
    public constructor(public readonly x: number, public readonly y: number) {
    }

    public toString(): string {
        return `(${this.x},${this.y})`;
    }
}

export class Grid {

    public constructor(private gridSerialNumber: number, public readonly topLeft: CellPosition, private bottomRight: CellPosition) {

    }

    public getPowerLevelAt(position: CellPosition): number {
        throw new Error("not implemented");
    }

    public getTotalPower(): number {
        throw new Error("not implemented");
    }

    /**
     * Returns the 3x3 square with largest power in this grid.
     */
    public getSquareWithLargestTotalPower(): Grid {
        throw new Error("not implemented")
    }
}