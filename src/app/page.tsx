"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import { useState, useEffect } from "react";
import { type Phases } from "@/utils/phase-utils";
import { assets } from "@/utils/asset-utils";
import Timer from "@/components/timer";

const poppins = Poppins({
  weight: "700",
  subsets: []
})

export default function Home() {
  const phaseList: Phases = [
    { name: "info_market", minute: 3, message: "찌라시 정보 경매시간입니다" },
    { name: "pre_market", minute: 5, message: "장외 거래 시간입니다" },
    { name: "main_market", minute: 5, message: "메인 거래 시간입니다" }
  ];

  const [phaseIndex, setPhaseIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(3);
  const [round, setRound] = useState(1);
  const [startTimer, setStartTimer] = useState(false);
  const [visible, setVisible] = useState(false);
  const [endGame, setEndGame] = useState(false);

  const ticking = () => {
    if (minutes == 0 && seconds == 0) {
      if (round == 4) {

      }
      const index = phaseIndex == 2 ? 0 : phaseIndex + 1
      setPhaseIndex(index);
      if (index == 0) {
        setRound((round) => round + 1);
      }
      setMinutes(phaseList[index].minute);
      setStartTimer(false);
      setVisible(false);
    } else if (seconds == 0) {
      setMinutes((minutes) => minutes - 1);
      setSeconds(3);
    } else {
      setSeconds((seconds) => seconds - 1);
    }
  }

  const startButtonAction = () => {
    setVisible(true);
    if (startTimer) {
      setStartTimer(false);
    } else {
      setStartTimer(true);
    }
  }

  const skipButtonAction = () => {
    if (round == 4) {

    }
    const index = phaseIndex == 2 ? 0 : phaseIndex + 1
    setPhaseIndex(index);
    if (index == 0) {
      setRound((round) => round + 1);
    }
    setMinutes(phaseList[index].minute);
    setStartTimer(false);
    setVisible(false);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (startTimer) {
        ticking();
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [seconds, startTimer]);

  return (
  <main>
    <Image
      width={1200}
      height={1200}
      role="presentation"
      alt="gradient background"
      className="fixed inset-0 w-screen"
      src={assets.gradient}
    />
    <div className="max-w-7xl mt-20 mx-auto">
      <div className="flex flex justify-center items-center relative z-10">
        <h1 className={`text-4xl max-w-3xl flex justify-center items-center text-yellow-600 text-center leading-snug mb-12 ${poppins.className}`}>
          <Image
            alt="big"
            className="center mr-8 mb-4"
            width={200}
            height={100} 
            src={assets.short}
          />
          테크본부<br/>타운홀
        </h1>
      </div>
      <Timer phase={ phaseList[phaseIndex] } round={round} minutes={minutes} seconds={seconds} visible={visible}/>
      <div className="flex flex justify-center items-center relative z-10">
        <button className="mr-5 px-16 py-2 font-bold text-2xl rounded-md bg-yellow-500 text-black" onClick={startButtonAction}>
          {startTimer ? "Pause" : "Start"}
        </button>
        <button className="px-16 py-2 font-bold text-2xl rounded-md bg-yellow-500 text-black" onClick={skipButtonAction}>
          Skip
        </button>
      </div>
    </div>
   </main>
  );
}
