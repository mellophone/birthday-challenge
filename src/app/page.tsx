"use client";

import Image from "next/image";
import Cup from "../Cup";
import Ball from "../Ball";
import FullscreenCenter from "../FullscreenCenter";
import { useEffect, useState } from "react";

export default function Home() {
  const [ballPos, setBallPos] = useState(1);
  const [cupY, setCupY] = useState(0);
  const [cupA, setCupA] = useState(0);
  const [cupB, setCupB] = useState(0);
  const [cupC, setCupC] = useState(0);
  const [title, setTitle] = useState("Kelsey's Birthday Challenge!");
  const [phase, setPhase] = useState(0);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    setZoom(window.innerWidth < 650 ? 0.5 : 1);
  }, []);

  const swap = (a: number, b: number) => {
    return new Promise((resolve) => {
      let isSwapped = false;
      let last = new Date();

      const swapper = setInterval(() => {
        let cur = new Date();
        let tdif = (cur.getTime() - last.getTime()) / 1.5;

        const setSwap = (old: number, dif: number) => {
          if (Math.abs(old / dif) >= 230) {
            isSwapped = true;
            return 0;
          }

          if (old === 0 && isSwapped) {
            clearInterval(swapper);
            setCupA(0);
            setCupB(0);
            setCupC(0);
            resolve(1);
            return 0;
          }

          return old + tdif * dif;
        };

        if (a == 1) {
          setCupA((old) => setSwap(old, b - a));
        } else if (a == 2) {
          setCupB((old) => setSwap(old, b - a));
        } else if (a == 3) {
          setCupC((old) => setSwap(old, b - a));
        }

        if (b == 1) {
          setCupA((old) => setSwap(old, a - b));
        } else if (b == 2) {
          setCupB((old) => setSwap(old, a - b));
        } else if (b == 3) {
          setCupC((old) => setSwap(old, a - b));
        }

        last = cur;
      }, 1);
    });
  };

  const lower = () => {
    return new Promise((resolve) => {
      let isDown = false;
      let last = new Date();

      const lowering = setInterval(() => {
        let cur = new Date();
        let tdif = (cur.getTime() - last.getTime()) / 3;

        setCupY((old) => {
          if (old >= 120) {
            isDown = true;
            clearInterval(lowering);
            resolve(1);
            setBallPos(0);
            return 120;
          }

          return old + tdif;
        });
        last = cur;
      }, 1);
    });
  };

  const raise = () => {
    return new Promise((resolve) => {
      let isUp = false;
      let last = new Date();

      const raising = setInterval(() => {
        let cur = new Date();
        let tdif = (cur.getTime() - last.getTime()) / 3;

        setCupY((old) => {
          if (old <= 0) {
            isUp = true;
            clearInterval(raising);
            resolve(1);
            return 0;
          }

          return old - tdif;
        });
        last = cur;
      }, 1);
    });
  };

  const decelerated = (input: number, a: number) => {
    return (-1 / a) * Math.pow(input - a, 2) + a;
  };

  const onCupClick = async (clickNum: number) => {
    if (phase === 8) {
      setPhase(9);
      setBallPos(clickNum);
      setTitle("Congratulations! You did it!");
      await raise();
      return;
    }

    setPhase(phase + 1);
    if (clickNum === 1) {
      setBallPos([2, 3][Math.floor(Math.random() * 2)]);
    }
    if (clickNum === 2) {
      setBallPos([1, 3][Math.floor(Math.random() * 2)]);
    }
    if (clickNum === 3) {
      setBallPos([1, 2][Math.floor(Math.random() * 2)]);
    }
    setTitle("Incorrect! Click Start to try again!");
    await raise();
  };

  return (
    <FullscreenCenter>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          zoom,
        }}
      >
        <h1 style={{ fontFamily: "sans-serif" }}>{title}</h1>
        <div
          style={{
            // border: "1px solid green",
            display: "grid",
            gridTemplateColumns: "repeat(3, min-content)",
            gap: 30,
          }}
        >
          <Cup
            hasBall={(() => ballPos == 1)()}
            cupY={cupY}
            cupX={cupA}
            onClick={() => onCupClick(1)}
            canClick={(() => phase % 3 === 2)()}
          />
          <Cup
            hasBall={(() => ballPos == 2)()}
            cupY={cupY}
            cupX={cupB}
            onClick={() => onCupClick(2)}
            canClick={(() => phase % 3 === 2)()}
          />
          <Cup
            hasBall={(() => ballPos == 3)()}
            cupY={cupY}
            cupX={cupC}
            onClick={() => onCupClick(3)}
            canClick={(() => phase % 3 === 2)()}
          />
        </div>
        <button
          style={{
            fontSize: 30,
            fontFamily: "sans-serif",
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            background: "gray",
            borderRadius: 15,
            border: "none",
            cursor: phase % 3 === 0 ? "pointer" : "default",
            color: "black",
            opacity: phase % 3 === 0 ? 1 : 0,
          }}
          onClick={async () => {
            if (phase % 9 === 0) {
              setPhase(1);
              setTitle("Shuffling...");
              await lower();
              await swap(2, 3);
              await swap(1, 2);
              await swap(3, 2);
              await swap(3, 2);
              await swap(1, 3);
              await swap(1, 2);
              await swap(2, 3);
              await swap(1, 3);
              setPhase(2);
              setTitle("Pick a cup!");
            }
            if (phase === 3) {
              setPhase(4);
              setTitle("Shuffling...");
              await lower();
              await swap(2, 3);
              await swap(1, 2);
              await swap(3, 2);
              await swap(3, 2);
              await swap(1, 3);
              await swap(1, 2);
              await swap(2, 3);
              await swap(1, 3);
              setPhase(5);
              setTitle("Pick a cup!");
            }
            if (phase === 6) {
              setPhase(7);
              setTitle("Shuffling...");
              await lower();
              await swap(2, 3);
              await swap(1, 2);
              await swap(3, 2);
              await swap(3, 2);
              await swap(1, 3);
              await swap(1, 2);
              await swap(2, 3);
              await swap(1, 3);
              setPhase(8);
              setTitle("Pick a cup!");
            }
          }}
        >
          Start
        </button>
      </div>
    </FullscreenCenter>
  );
}
