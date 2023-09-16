import { useEffect, useState } from "react";
import { resetFavicon, resetTitle, swapFavicon, swapTitle } from "tabky-js";

export const useCountdown = ({
  from,
  disableTimeout = false, // for debugging purposes
  onTimeout,
}: {
  from: number;
  disableTimeout?: boolean;
  onTimeout: () => void;
}) => {
  const [timer, setTimer] = useState(0);
  const [isTimerStarted, setIsTimerStarted] = useState(false); // TODO: use this to show a "Start" button
  const [isTimeout, setIsTimeout] = useState(false);

  /**
   * Start the timer from the initial value `from`.
   *
   * @return void
   */
  const startTimer = () => {
    swapFavicon({ favicon: "⏳" });
    setIsTimeout(false);
    setIsTimerStarted(true);
    setTimer(from);
  };

  /**
   * Stop the timer (stops the countdown interval).
   *
   * @return void
   */
  const stopTimer = () => {
    setIsTimerStarted(false);
    resetTitle();
    resetFavicon();
  };

  // Setup a clock interval that will run every second.
  useEffect(() => {
    if (isTimerStarted && timer <= 0) {
      setIsTimeout(true);
      return;
    }

    const clockInterval = setInterval(() => {
      if (!isTimerStarted) {
        return;
      }

      setTimer((prev) => prev - 1);
      swapTitle({ title: `${timer}s` });
    }, 1000);

    return () => clearInterval(clockInterval);
  }, [isTimerStarted, timer]);

  // If the timer is 0, we need to stop the timer and call the onTimeout callback.
  useEffect(() => {
    if (isTimeout) {
      stopTimer();

      if (!disableTimeout) {
        onTimeout();
      }
    }
  }, [isTimeout]);

  return {
    timer,
    isTimeout,
    startTimer,
    stopTimer,
  };
};
