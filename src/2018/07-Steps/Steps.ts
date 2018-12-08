export class Step {
    constructor(public readonly name: string, public readonly requirements: Step[]) {

    }

    public isReady(alreadyCompleted: Step[]) {
        return false;
    }
}