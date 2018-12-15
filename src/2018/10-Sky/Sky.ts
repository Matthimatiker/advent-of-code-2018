export class Position {
    public constructor(public readonly x: number, public readonly y: number) {
    }

    public moveBy(velocity: Velocity): Position {
        return new Position(this.x + velocity.x, this.y + velocity.y);
    }

    public distanceTo(anotherPosition: Position): number {
        return Math.sqrt(Math.pow(this.x - anotherPosition.x, 2) + Math.pow(this.y - anotherPosition.y, 2));
    }
}

export class Velocity {
    public constructor(public readonly x: number, public readonly y: number) {
    }

    public multiplyBy(factor: number): Velocity {
        return new Velocity(this.x * factor, this.y * factor);
    }
}

export class Light {

    /**
     * Parses a point and velocity from a string like the following:
     *
     *     position=< 7,  0> velocity=<-1,  0>
     *
     * @param definition
     */
    public static fromText(definition: string): Light {
        const regExp = /=<[ ]?([\-]?\d+), [ ]?([\-]?\d+)>/g;
        const position = regExp.exec(definition);
        const velocity = regExp.exec(definition);
        if (position === null || velocity === null) {
            throw new Error('No position and/or velocity found.');
        }
        return new Light(
            new Position(parseInt(position[1], 10), parseInt(position[2], 10)),
            new Velocity(parseInt(velocity[1], 10), parseInt(velocity[2], 10))
        );
    }

    public constructor(public readonly initialPosition: Position, public readonly velocity: Velocity) {
    }
}

export class Observer {

    public constructor(public readonly lights: Light[]) {
    }

    public after(seconds: number): Sky {
        return new Sky(this.lights.map(light => light.initialPosition.moveBy(light.velocity.multiplyBy(seconds))));
    }

    public static sortByWordProbability(skies: Sky[]): Sky[] {
        return skies.sort((left, right) => left.sumOfDistances() - right.sumOfDistances());
    }
}

export class Sky {

    public constructor(public readonly pointsOfLight: Position[]) {
    }

    /**
     * Some of distances between *all* pointsOfLight.
     */
    public sumOfDistances(): number {
        let sum = 0;
        for (let pointA of this.pointsOfLight) {
            for (let pointB of this.pointsOfLight) {
                sum += pointA.distanceTo(pointB);
            }
        }
        return sum;
    }

    public toString(): string {
        if (this.pointsOfLight.length === 0) {
            return '.';
        }
        let minX: number = Number.POSITIVE_INFINITY;
        let maxX: number = Number.NEGATIVE_INFINITY;
        let minY: number = Number.POSITIVE_INFINITY;
        let maxY: number = Number.NEGATIVE_INFINITY;
        const lightAt: {[key: string]: boolean} = {};
        this.pointsOfLight.forEach(position => {
            minX = Math.min(minX, position.x);
            maxX = Math.max(maxX, position.x);
            minY = Math.min(minY, position.y);
            maxY = Math.max(maxY, position.y);
            lightAt[`${position.x},${position.y}`] = true;
        });
        let representationParts = [];
        for (let y = minY; y <= maxY; y++) {
            for (let x = minX; x <= maxX; x++) {
                representationParts.push((`${x},${y}` in lightAt) ? '#' : '.');
            }
            representationParts.push("\n");
        }
        return representationParts.join('');
    }


}