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

    public constructor(public readonly name: StepName, public readonly requirements: StepName[] = []) {

    }

    public requirementsFulfilledBy(alreadyCompleted: StepName[]) {
        return this.requirements.every((requirement) => alreadyCompleted.includes(requirement));
    }

    public duration(baseDuration: number = 0): number {
        const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
        const stepDuration = alphabet.indexOf(this.name) + 1;
        return baseDuration + stepDuration;
    }
}

export function order(steps: Step[]): Step[] {
    let toDo = steps;
    const ordered: Step[] = [];
    while (toDo.length !== 0) {
        const alreadyDone = ordered.map((step) => step.name);
        const ready = toDo
            .filter((step) => step.requirementsFulfilledBy(alreadyDone))
            .sort((left, right) => left.name.localeCompare(right.name));
        if (ready.length === 0) {
            throw new Error(`Cannot order steps: No more steps ready. Done: ${alreadyDone.join(', ')}, ToDo: ${toDo.map(step => step.name).join(', ')}`);
        }
        const nextStep = ready[0];
        ordered.push(nextStep);
        toDo = toDo.filter((step) => step !== nextStep);
    }
    return ordered;
}

interface Progress {
    step: Step,
    finishedAt: number
}

interface ParallelOrderResult {
    steps: Step[],
    time: number
}

export function orderParallel(steps: Step[], numberOfWorkers: number, baseDuration: number): ParallelOrderResult {
    let toDo = steps;
    const ordered: Step[] = [];
    let inProgress: Progress[] = [];
    let time = -1;
    while (toDo.length !== 0 || inProgress.length > 0) {
        time++;
        const finished = inProgress.filter(progress => progress.finishedAt === time);
        if (finished.length > 0) {
            // Add finished steps to final list...
            ordered.push(...finished.map(progress => progress.step));
            // ... and remove them from the in-progress list.
            inProgress = inProgress.filter(progress => !finished.includes(progress));
        }
        if (inProgress.length >= numberOfWorkers) {
            // We do not have any capacity to process steps at this time.
            continue;
        }
        const alreadyDone = ordered.map((step) => step.name);
        const ready = toDo
            .filter((step) => step.requirementsFulfilledBy(alreadyDone))
            .sort((left, right) => left.name.localeCompare(right.name));
        // Select as many new steps as possible.
        const nextSteps = ready.slice(0, numberOfWorkers - inProgress.length);
        inProgress.push(...nextSteps.map(step => {
            return {step: step, finishedAt: time + step.duration(baseDuration)};
        }));
        toDo = toDo.filter((step) => !nextSteps.includes(step));
    }
    return {steps: ordered, time: time};
}