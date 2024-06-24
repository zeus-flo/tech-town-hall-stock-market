export type PhaseUnit = {
    name: string;
    minute: number;
    message: string;
};

export type Phases = PhaseUnit[];

// export const phases: [PhaseUnit] = [
//     PhaseUnit("info_market", minute)
// ] as const;

// export type Phase = (typeof phases)[number];

// "info_marget",
//     "pre_market",
//     "main_market"