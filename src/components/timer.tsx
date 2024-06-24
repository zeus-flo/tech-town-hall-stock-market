import { type PhaseUnit } from "@/utils/phase-utils";
import { useEffect } from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    weight: "700",
    subsets: []
  })

const Timer = ({ phase, round, minutes, seconds, visible } : { phase: PhaseUnit, round: number, minutes: number, seconds: number, visible: boolean }) => {
    return (
    <div className="relative z-0 mb-10 flex flex-col justify-center justify-items-center item-center">
        <h2 className="mb-5 text-center text-6xl font-bold select-none m-0 text-yellow-600">
          {round} Phase
        </h2>
        <h3 className={`text-center text-7xl text-yellow-400 mb-5 ${poppins.className} ${visible ? "visible" : "invisible"}`}>
          {phase.message}
        </h3>
        <h1 className={`text-center text-9xl font-bold select-none m-0 text-red-500 ${visible ? "visible" : "invisible"}`}>
            {minutes.toString().padStart(2, "0")}:{ seconds.toString().padStart(2, "0") }
        </h1>
    </div>
    );
}

export default Timer;