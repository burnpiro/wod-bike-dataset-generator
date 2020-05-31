import { useCallback, useEffect, useState } from "react";

const useTimer = ({
  initialTime = 0,
  interval = 2000,
  step = 1,
  timerType = "INCREMENTAL",
  endTime,
  onTimeOver,
}) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isTimeOver, setIsTimeOver] = useState(false);

  const reset = useCallback((newTime) => {
    setIsRunning(false);
    setIsTimeOver(false);
    setTime(newTime ? newTime : initialTime);
  }, [initialTime]);

  const start = useCallback((time) => {
    if (isTimeOver) {
      reset();
    }
    if (time) {
      reset(time)
    }

    setIsRunning(true);
  }, [reset, isTimeOver]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (isRunning && time === endTime) {
      setIsRunning(false);
      setIsTimeOver(true);

      if (typeof onTimeOver === "function") {
        onTimeOver();
      }
    }
  }, [endTime, onTimeOver, time, isRunning]);

  useEffect(() => {
    let intervalId = null;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((previousTime) =>
          timerType === "DECREMENTAL"
            ? previousTime - step
            : previousTime + step
        );
      }, interval);
    } else if (intervalId) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, step, timerType, interval]);

  return { isRunning, pause, reset, start, time };
};

export default useTimer