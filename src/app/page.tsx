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
    { name: "info_market", minute: 2, message: "찌라시 정보 경매시간입니다" },
    { name: "main_market", minute: 5, message: "메인 장중 거래 시간입니다" },
    { name: "post_market", minute: 3, message: "장외 거래 시간입니다" }
  ];

  const [phaseIndex, setPhaseIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(2);
  const [round, setRound] = useState(1);
  const [startTimer, setStartTimer] = useState(false);
  const [visible, setVisible] = useState(false);
  const [endGame, setEndGame] = useState(false);
  const [startGame, setStartGame] = useState(false);

  const ticking = () => {
    if (minutes == 0 && seconds == 0) {
      if (round == 4) {
        setEndGame(true);
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
      setSeconds(59);
    } else {
      setSeconds((seconds) => seconds - 1);
    }
  }

  const startButtonAction = () => {
    setVisible(true);
    setStartGame(true);
    if (startTimer) {
      setStartTimer(false);
    } else {
      setStartTimer(true);
    }
  }

  const skipButtonAction = () => {
    if (round == 4) {
      setEndGame(true);
    }
    const index = phaseIndex == 2 ? 0 : phaseIndex + 1
    setPhaseIndex(index);
    if (index == 0) {
      setRound((round) => round + 1);
    }
    setMinutes(phaseList[index].minute);
    setSeconds(0);
    setStartTimer(false);
    setVisible(false);
    setStartGame(true);
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
      {startGame ? endGame ? <h1 className="leading-normal mb-10 text-center text-7xl font-bold select-none m-0 text-red-500">
          모든 거래가 종료되었습니다 
          <br/>
          최종 우승팀을 가려주세요
        </h1> : 
       <Timer phase={ phaseList[phaseIndex] } round={round} minutes={minutes} seconds={seconds} visible={visible}/> 
       : <h1 className="mb-10 text-center text-9xl font-bold select-none m-0 text-red-500">
          Townhall 
          <br/>
          Stock Market
        </h1>
      }
      
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
