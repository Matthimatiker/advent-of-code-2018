declare type Guard = number;

export enum GuardEventType {
    BEGIN_SHIFT,
    FALL_ASLEEP,
    WAKE_UP
}

export class GuardEvent {

    public static from(eventLine: string) : GuardEvent {
        throw new Error("not implemented");
    }

    public constructor(
        public readonly date: string,
        public readonly guard: Guard|null,
        public readonly type: GuardEventType
    ) {
    }
}

export class GuardShift {

    public static fromEvents(events: GuardEvent[]): GuardShift[] {
        throw new Error("not implemented");
    }

    public constructor(
        public readonly guard: Guard,
        public readonly events: GuardEvent[]
    ) {

    }
}

export class GuardProfile {
    public constructor(
        public readonly shifts: GuardShift[]
    ) {

    }
}

