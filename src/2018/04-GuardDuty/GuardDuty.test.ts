import {expect} from "chai";
import {GuardEvent, GuardEventType, GuardShift} from "./GuardDuty";

describe('GuardEvent', () => {

    describe('#from()', () => {
        it('parses shift BEGIN event correctly', () => {
            const event = GuardEvent.from('[1518-11-01 00:00] Guard #10 begins shift');

            expect(event.date).to.equal('1518-11-01 00:00');
            expect(event.guard).to.equal(10);
            expect(event.type).to.equal(GuardEventType.BEGIN_SHIFT);
        });

        it('parses WAKEUP event correctly', () => {
            const event = GuardEvent.from('[1518-11-01 00:25] wakes up');

            expect(event.date).to.equal('1518-11-01 00:25');
            expect(event.guard).to.equal(null);
            expect(event.type).to.equal(GuardEventType.WAKE_UP);
        });

        it('parses ASLEEP event correctly', () => {
            const event = GuardEvent.from('[1518-11-01 00:05] falls asleep');

            expect(event.date).to.equal('1518-11-01 00:05');
            expect(event.guard).to.equal(null);
            expect(event.type).to.equal(GuardEventType.FALL_ASLEEP);
        });

        it('throws error if input is invalid', () => {
            expect(() => {
                GuardEvent.from('buhuhu');
            }).throws(Error);
        });
    });

    describe('constructor()', () => {
        it('rejects BEGIN event without guard', () => {
            expect(() => {
                new GuardEvent('1518-11-01 00:05', null, GuardEventType.BEGIN_SHIFT);
            }).throws(Error);
        });

        it('rejects date with invalid length', () => {
            expect(() => {
                new GuardEvent('15:05', null, GuardEventType.WAKE_UP);
            }).throws(Error);
        });
    });
});

describe('GuardShift', () => {

    describe('#fromEvents()', () => {
        it('creates correct shifts from ordered events of single guard', () => {
            const events = [
                GuardEvent.from('[1518-11-01 00:00] Guard #10 begins shift'),
                GuardEvent.from('[1518-11-01 00:05] falls asleep'),
                GuardEvent.from('[1518-11-01 00:25] wakes up'),
                GuardEvent.from('[1518-11-01 00:30] falls asleep'),
                GuardEvent.from('[1518-11-01 00:55] wakes up')
            ];

            const shifts = GuardShift.fromEvents(events);

            expect(shifts).to.have.lengthOf(1);
            const [shift] = shifts;
            expect(shift.guard).to.equal(10);
            expect(shift.events).to.have.lengthOf(5);
        });

        it('creates correct shifts from ordered events of multiple guards', () => {
            const events = [
                GuardEvent.from('[1518-11-01 00:00] Guard #10 begins shift'),
                GuardEvent.from('[1518-11-01 00:05] falls asleep'),
                GuardEvent.from('[1518-11-01 00:25] wakes up'),
                GuardEvent.from('[1518-11-01 00:30] falls asleep'),
                GuardEvent.from('[1518-11-01 00:55] wakes up'),

                GuardEvent.from('[1518-11-01 23:58] Guard #99 begins shift'),
                GuardEvent.from('[1518-11-02 00:40] falls asleep'),
                GuardEvent.from('[1518-11-02 00:50] wakes up')
            ];

            const shifts = GuardShift.fromEvents(events);

            expect(shifts).to.have.lengthOf(2);
            const [first, second] = shifts;
            expect(first.guard).to.equal(10);
            expect(first.events).to.have.lengthOf(5);
            expect(second.guard).to.equal(99);
            expect(second.events).to.have.lengthOf(3);
        });

        it('creates correct shifts from  unordered events of multiple guards', () => {
            // Same events as in previous test, but mixed up.
            const events = [
                GuardEvent.from('[1518-11-01 23:58] Guard #99 begins shift'),
                GuardEvent.from('[1518-11-02 00:40] falls asleep'),
                GuardEvent.from('[1518-11-01 00:30] falls asleep'),
                GuardEvent.from('[1518-11-01 00:00] Guard #10 begins shift'),
                GuardEvent.from('[1518-11-01 00:55] wakes up'),
                GuardEvent.from('[1518-11-02 00:50] wakes up'),
                GuardEvent.from('[1518-11-01 00:05] falls asleep'),
                GuardEvent.from('[1518-11-01 00:25] wakes up')
            ];

            const shifts = GuardShift.fromEvents(events);

            expect(shifts).to.have.lengthOf(2);
            const [first, second] = shifts;
            expect(first.guard).to.equal(10);
            expect(first.events).to.have.lengthOf(5);
            expect(second.guard).to.equal(99);
            expect(second.events).to.have.lengthOf(3);
        });
    });

    describe('constructor()', () => {
        it('rejects events from other guards', () => {
            expect(() => {
                new GuardShift(
                    7,
                    [new GuardEvent('1518-11-01 23:58', 42, GuardEventType.BEGIN_SHIFT)]
                )
            }).throws(Error);
        });

        it('rejects events that are not ordered', () => {
            expect(() => {
                new GuardShift(
                    42,
                    [
                        new GuardEvent('1518-11-01 23:58', 42, GuardEventType.BEGIN_SHIFT),
                        new GuardEvent('1518-11-02 00:05', 42, GuardEventType.WAKE_UP),
                        new GuardEvent('1518-11-01 23:59', 42, GuardEventType.FALL_ASLEEP)
                    ]
                )
            }).throws(Error);
        });

        it('throws error if last event is ASLEEP', () => {
            // If that's the case, we have an edge case that must be covered.
            expect(() => {
                new GuardShift(
                    42,
                    [
                        new GuardEvent('1518-11-01 23:58', 42, GuardEventType.BEGIN_SHIFT),
                        new GuardEvent('1518-11-02 00:05', 42, GuardEventType.FALL_ASLEEP)
                    ]
                )
            }).throws(Error);
        });
    });
});