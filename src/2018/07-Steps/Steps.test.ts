import {expect} from "chai";
import {order, orderParallel, Rule, Step} from "./Steps";

describe('Rule', () => {
    describe('#from()', () => {
        it('returns correct object', () => {
            const rule = Rule.from('Step N must be finished before step T can begin.');

            expect(rule.step).to.equal('T');
            expect(rule.required).to.equal('N');
        });
    });
});

describe('Step', () => {
    describe('#requirementsFulfilledBy()', () => {
        it('returns true if step has no requirements', () => {
            const step = new Step('A', []);

            expect(step.requirementsFulfilledBy([])).to.equal(true);
        });

        it('returns true if all requirements are fulfilled', () => {
            const step = new Step('A', ['B', 'C']);

            expect(step.requirementsFulfilledBy(['C', 'B'])).to.equal(true);
        });

        it('returns true if more than the required steps are fulfilled', () => {
            const step = new Step('A', ['B', 'C']);

            expect(step.requirementsFulfilledBy(['C', 'E', 'B'])).to.equal(true);
        });

        it('returns false if requirements are only partially fulfilled', () => {
            const step = new Step('A', ['B', 'C']);

            expect(step.requirementsFulfilledBy(['C'])).to.equal(false);
        });

        it('returns false if only unrelated requirements are fulfilled', () => {
            const step = new Step('A', ['B', 'C']);

            expect(step.requirementsFulfilledBy(['X', 'Y'])).to.equal(false);
        });

        it('returns false if no requirements are fulfilled', () => {
            const step = new Step('A', ['B', 'C']);

            expect(step.requirementsFulfilledBy([])).to.equal(false);
        });
    });

    describe('#duration()', () => {
        it ('returns value depending on step name', () => {
            expect(new Step('A').duration()).to.equal(1);
            expect(new Step('Z').duration()).to.equal(26);
        });

        it('adds base duration', () => {
            expect(new Step('A').duration(30)).to.equal(31);
        });
    });

    describe('#fromRules()', () => {
        it('returns steps without requirements', () => {
            const rules = [
                new Rule('A', 'B')
            ];

            const steps = Step.fromRules(rules);

            expect(steps).to.have.lengthOf(2);
            const [stepB] = steps.filter((step) => step.name === 'B');
            expect(stepB.requirements).to.have.lengthOf(0);
        });

        it('returns steps with aggregated requirements', () => {
            const rules = [
                new Rule('A', 'B'),
                new Rule('A', 'C'),
                new Rule('D', 'E')
            ];

            const steps = Step.fromRules(rules);

            expect(steps).to.have.lengthOf(5);
            const [stepA] = steps.filter((step) => step.name === 'A');
            expect(stepA.requirements).to.have.lengthOf(2).and.to.have.members(['B', 'C']);
        });
    });
});

describe('#order()', () => {
    it('solves example scenario correctly', () => {
        const rules = [
            'Step C must be finished before step A can begin.',
            'Step C must be finished before step F can begin.',
            'Step A must be finished before step B can begin.',
            'Step A must be finished before step D can begin.',
            'Step B must be finished before step E can begin.',
            'Step D must be finished before step E can begin.',
            'Step F must be finished before step E can begin.'
        ].map((ruleDescription) => Rule.from(ruleDescription));
        const steps = Step.fromRules(rules);

        const ordered = order(steps);

        const output = ordered.map((step) => step.name).join('');
        expect(output).to.equal('CABDFE');
    });
});

describe('#orderParallel()', () => {
    it('solves example scenario correctly', () => {
        const rules = [
            'Step C must be finished before step A can begin.',
            'Step C must be finished before step F can begin.',
            'Step A must be finished before step B can begin.',
            'Step A must be finished before step D can begin.',
            'Step B must be finished before step E can begin.',
            'Step D must be finished before step E can begin.',
            'Step F must be finished before step E can begin.'
        ].map((ruleDescription) => Rule.from(ruleDescription));
        const steps = Step.fromRules(rules);

        const ordered = orderParallel(steps, 2, 0);

        const output = ordered.steps.map((step) => step.name).join('');
        expect(output).to.equal('CABFDE');
    });

    it('returns correct time for example scenario', () => {
        const rules = [
            'Step C must be finished before step A can begin.',
            'Step C must be finished before step F can begin.',
            'Step A must be finished before step B can begin.',
            'Step A must be finished before step D can begin.',
            'Step B must be finished before step E can begin.',
            'Step D must be finished before step E can begin.',
            'Step F must be finished before step E can begin.'
        ].map((ruleDescription) => Rule.from(ruleDescription));
        const steps = Step.fromRules(rules);

        const ordered = orderParallel(steps, 2, 0);

        expect(ordered.time).to.equal(15);
    });

    it('returns same value as order() when single worker is used', () => {
        const rules = [
            'Step C must be finished before step A can begin.',
            'Step C must be finished before step F can begin.',
            'Step A must be finished before step B can begin.',
            'Step A must be finished before step D can begin.',
            'Step B must be finished before step E can begin.',
            'Step D must be finished before step E can begin.',
            'Step F must be finished before step E can begin.'
        ].map((ruleDescription) => Rule.from(ruleDescription));
        const steps = Step.fromRules(rules);

        const orderedParallel = orderParallel(steps, 1, 0);
        const ordered = order(steps);

        const output = orderedParallel.steps.map((step) => step.name).join('');
        expect(output).to.equal(ordered.map((step) => step.name).join(''));
    });
});