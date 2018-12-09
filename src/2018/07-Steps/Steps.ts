type StepName = string

export class Rule {

    /**
     * Extracts a rule from a line like the following:
     *
     *     'Step N must be finished before step T can begin.'
     *
     * @param ruleLine
     */
    public static from(ruleLine: string): Rule {
        const words = ruleLine.split(' ');
        return new Rule(words[7], words[1]);
    }

    public constructor(public readonly step: StepName, public readonly required: StepName) {
    }
}

export class Step {
    public static fromRules(rules: Rule[]): Step[] {
        const allStepNames = new Set<StepName>();
        rules.forEach((rule) => {
            allStepNames.add(rule.step);
            allStepNames.add(rule.required);
        });
        const steps: Step[] = [];
        allStepNames.forEach((stepName) => {
            const requirements = rules
                .filter((rule) => rule.step === stepName)
                .map((rule) => rule.required);
            steps.push(new Step(stepName, requirements));
        });
        return steps;
    }

    public constructor(public readonly name: StepName, public readonly requirements: StepName[]) {

    }

    public requirementsFulfilledBy(alreadyCompleted: StepName[]) {
        return this.requirements.every((requirement) => alreadyCompleted.includes(requirement));
    }
}

export function order(steps: Step[]): Step[] {
    throw new Error('Not implemented');
}