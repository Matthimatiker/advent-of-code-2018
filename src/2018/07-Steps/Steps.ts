type StepName = string

export class Rule {
    public static from(ruleLine: string): Rule {
        throw new Error('Not implemented');
    }

    public constructor(public readonly step: StepName, public readonly required: StepName) {
    }
}

export class Step {
    public static fromRules(rules: Rule[]): Step[] {
        throw new Error('Not implemented');
    }

    public constructor(public readonly name: StepName, public readonly requirements: StepName[]) {

    }

    public requirementsFulfilledBy(alreadyCompleted: StepName[]) {
        return false;
    }
}
