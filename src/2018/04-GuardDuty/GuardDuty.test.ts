import {expect} from "chai";
import {GuardEvent, GuardEventType, GuardProfile, GuardShift} from "./GuardDuty";

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

        it('rejects empty event list', () => {
            expect(() => {
                new GuardShift(
                    42,
                    []
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

    describe('#getMinutesAsleep()', () => {
        it('returns zero if guard did not sleep', () => {
            const events = [
                GuardEvent.from('[1518-11-01 00:00] Guard #10 begins shift')
            ];

            const shift = new GuardShift(10, events);

            expect(shift.getMinutesAsleep()).to.equal(0);
        });

        it('returns correct value for single sleep interval', () => {
            const events = [
                GuardEvent.from('[1518-11-01 00:00] Guard #10 begins shift'),
                GuardEvent.from('[1518-11-01 00:05] falls asleep'),
                GuardEvent.from('[1518-11-01 00:25] wakes up')
            ];

            const shift = new GuardShift(10, events);

            expect(shift.getMinutesAsleep()).to.equal(20);
        });

        it('returns correct value for multiple sleep intervals', () => {
            const events = [
                GuardEvent.from('[1518-11-01 00:00] Guard #10 begins shift'),
                GuardEvent.from('[1518-11-01 00:05] falls asleep'),
                GuardEvent.from('[1518-11-01 00:25] wakes up'),
                GuardEvent.from('[1518-11-01 00:30] falls asleep'),
                GuardEvent.from('[1518-11-01 00:55] wakes up')
            ];

            const shift = new GuardShift(10, events);

            expect(shift.getMinutesAsleep()).to.equal(20 + 25);
        });

        it('returns correct value for sleep interval that starts at previous day', () => {
            const events = [
                GuardEvent.from('[1518-11-01 23:50] Guard #10 begins shift'),
                GuardEvent.from('[1518-11-01 23:55] falls asleep'),
                GuardEvent.from('[1518-11-02 00:05] wakes up')
            ];

            const shift = new GuardShift(10, events);

            expect(shift.getMinutesAsleep()).to.equal(10);
        });
    });

    describe('#getSleepingMinutes()', () => {
        it('returns empty list if guard was not asleep', () => {
            const events = [
                GuardEvent.from('[1518-11-01 23:50] Guard #10 begins shift')
            ];

            const shift = new GuardShift(10, events);

            expect(shift.getSleepingMinutes()).to.have.lengthOf(0);
        });

        it('returns correct minutes', () => {
            const events = [
                GuardEvent.from('[1518-11-01 23:50] Guard #10 begins shift'),
                GuardEvent.from('[1518-11-01 23:55] falls asleep'),
                GuardEvent.from('[1518-11-01 23:59] wakes up')
            ];

            const shift = new GuardShift(10, events);

            expect(shift.getSleepingMinutes().sort()).to.deep.equal([55, 56, 57, 58]);
        });

        it('contains minute twice if guard was asleep in that minute multiple times', () => {
            const events = [
                GuardEvent.from('[1518-11-01 23:50] Guard #10 begins shift'),
                GuardEvent.from('[1518-11-01 23:55] falls asleep'),
                GuardEvent.from('[1518-11-01 23:59] wakes up'),
                GuardEvent.from('[1518-11-02 00:54] falls asleep'),
                GuardEvent.from('[1518-11-02 00:57] wakes up')
            ];

            const shift = new GuardShift(10, events);

            expect(shift.getSleepingMinutes().sort()).to.deep.equal([55, 56, 57, 58, 54, 55, 56].sort());
        });
    });
});

describe('GuardProfile', () => {
    describe('constructor()', () => {
        it('rejects shifts from multiple guards', () => {
            const shifts = [
                new GuardShift(
                    10,
                    [
                        GuardEvent.from('[1518-11-01 23:50] Guard #10 begins shift'),
                    ]
                ),
                new GuardShift(
                    42,
                    [
                        GuardEvent.from('[1518-11-01 23:50] Guard #42 begins shift')
                    ]
                )
            ];

            expect(() => {
                new GuardProfile(shifts);
            }).throws(Error);
        });

        it('rejects empty shift list', () => {
            expect(() => {
                new GuardProfile([]);
            }).throws(Error);
        });
    });

    describe('#fromShifts()', () => {
        it('creates profiles from shifts', () => {
            const shifts = [
                new GuardShift(
                    10,
                    [
                        GuardEvent.from('[1518-11-01 23:50] Guard #10 begins shift'),
                    ]
                ),
                new GuardShift(
                    42,
                    [
                        GuardEvent.from('[1518-11-01 23:50] Guard #42 begins shift')
                    ]
                ),
                new GuardShift(
                    10,
                    [
                        GuardEvent.from('[1518-11-01 23:50] Guard #10 begins shift')
                    ]
                )
            ];

            const profiles = GuardProfile.fromShifts(shifts);

            expect(profiles).to.have.lengthOf(2);
        });
    });

    describe('#getMinutesAsleep()', () => {
        it('returns minutes asleep from all shifts', () => {
            const shifts = [
                new GuardShift(
                    10,
                    [
                        GuardEvent.from('[1518-11-01 23:50] Guard #10 begins shift'),
                        GuardEvent.from('[1518-11-01 23:55] falls asleep'),
                        GuardEvent.from('[1518-11-02 00:05] wakes up')
                    ]
                ),
                new GuardShift(
                    10,
                    [
                        GuardEvent.from('[1518-11-01 23:50] Guard #10 begins shift'),
                        GuardEvent.from('[1518-11-01 23:55] falls asleep'),
                        GuardEvent.from('[1518-11-02 00:05] wakes up')
                    ]
                )
            ];

            const profile = new GuardProfile(shifts);

            expect(profile.getMinutesAsleep()).to.equal(10 + 10);
        });
    });

    describe('#getGuard()', () => {
        it('returns correct value', () => {
            const shifts = [
                new GuardShift(
                    10,
                    [
                        GuardEvent.from('[1518-11-01 23:50] Guard #10 begins shift')
                    ]
                )
            ];

            const profile = new GuardProfile(shifts);

            expect(profile.getGuard()).to.equal(10);
        });
    });

    describe('#getMaxSleepingMinute()', () => {
        it('returns null if guard did not sleep', () => {
            const shifts = [
                new GuardShift(
                    10,
                    [
                        GuardEvent.from('[1518-11-01 23:50] Guard #10 begins shift')
                    ]
                )
            ];

            const profile = new GuardProfile(shifts);

            expect(profile.getMaxSleepingMinute()).to.equal(null);
        });

        it('returns correct value', () => {
            const shifts = [
                new GuardShift(
                    10,
                    [
                        GuardEvent.from('[1518-11-01 23:50] Guard #10 begins shift'),
                        GuardEvent.from('[1518-11-01 23:59] falls asleep'),
                        GuardEvent.from('[1518-11-02 00:03] wakes up')
                    ]
                ),
                new GuardShift(
                    10,
                    [
                        GuardEvent.from('[1518-11-03 00:00] Guard #10 begins shift'),
                        GuardEvent.from('[1518-11-03 00:02] falls asleep'),
                        GuardEvent.from('[1518-11-03 00:05] wakes up')
                    ]
                )
            ];

            const profile = new GuardProfile(shifts);

            expect(profile.getMaxSleepingMinute()).to.equal(2);
        });
    });

    describe('#getSleepingByMinute()', () => {
        it('returns map with zero entries if guard did not sleep', () => {
            const shifts = [
                new GuardShift(
                    10,
                    [
                        GuardEvent.from('[1518-11-01 23:50] Guard #10 begins shift')
                    ]
                )
            ];

            const sleepingByMinute = new GuardProfile(shifts).getSleepingByMinute();

            expect(sleepingByMinute[0]).to.equal(0);
            expect(sleepingByMinute[30]).to.equal(0);
            expect(sleepingByMinute[59]).to.equal(0);
        });

        it('returns map with correct values', () => {
            const shifts = [
                new GuardShift(
                    10,
                    [
                        GuardEvent.from('[1518-11-01 23:50] Guard #10 begins shift'),
                        GuardEvent.from('[1518-11-01 23:59] falls asleep'),
                        GuardEvent.from('[1518-11-02 00:03] wakes up')
                    ]
                ),
                new GuardShift(
                    10,
                    [
                        GuardEvent.from('[1518-11-03 00:00] Guard #10 begins shift'),
                        GuardEvent.from('[1518-11-03 00:02] falls asleep'),
                        GuardEvent.from('[1518-11-03 00:05] wakes up')
                    ]
                )
            ];

            const sleepingByMinute = new GuardProfile(shifts).getSleepingByMinute();

            expect(sleepingByMinute[2]).to.equal(2);
            expect(sleepingByMinute[59]).to.equal(1);
            expect(sleepingByMinute[4]).to.equal(1);
            expect(sleepingByMinute[50]).to.equal(0);
        });
    });
});
