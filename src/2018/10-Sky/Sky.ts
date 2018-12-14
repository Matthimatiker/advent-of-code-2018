export class Position {
    public constructor(public readonly x: number, public readonly y: number) {

    }

    public moveBy(velocity: Velocity): Position {
        throw new Error("not implemented");
    }
}

export class Velocity {
    public constructor(public readonly x: number, public readonly y: number) {
    }

    public multiplyBy(factor: number): Velocity {
        throw new Error("not implemented");
    }
}

export class Light {
    public constructor(public readonly initialPosition: Position, public readonly velocity: Velocity) {
    }
}

export class Observer {

    public constructor(public readonly lights: Light[]) {

    }

    public after(seconds: number): Sky {
        throw new Error("not implemented")
    }
}

export class Sky {
    public toString(): string {
        throw new Error("not implemented")
    }
}