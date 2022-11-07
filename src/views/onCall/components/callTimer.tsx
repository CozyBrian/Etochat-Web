import React, { useEffect, useRef, useState } from "react";

const minutesToMillis = (min: number) => min * 1000 * 60;
const formatTime = (time: number) => (time < 10 ? `0${time}` : time);

const CallTimer = ({ minutes = 0 }) => {
  const interval = useRef<any>(null);

  const [millis, setMillis] = useState<number>(0);

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  const countDown = () => {
    setMillis((time: number) => {
      const timeLeft = time + 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, []);

  const hour = Math.floor(millis / 1000 / 60 / 60) % 60;
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    <div className="text-black/80">
      {formatTime(hour) > 0 && `${formatTime(hour)}:`}
      {formatTime(minute)}:{formatTime(seconds)}
    </div>
  );
};

export default CallTimer;
