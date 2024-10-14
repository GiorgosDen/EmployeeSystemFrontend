import { useEffect, useState } from "react";

interface Props {
  timePro: number;
}

interface State {
  time: number;
  minutes: number;
  seconds: number;
}

function Timer({ timePro }: Props) {
  const [state, setState] = useState<State>({
    time: timePro <= 0 ? 0 : timePro, //if have pass 2 mins (timePro<=0), set time as 0
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setTimeout(() => {
      if (state.time === 0) return;
      setState({
        time: state.time - 1,
        minutes: Math.floor((state.time - 1) / 60),
        seconds: Math.floor((state.time - 1) % 60),
      });
    }, 1000);
  }, [state.time]);
  return (
    <nav>{`0${state.minutes}: ${
      state.seconds < 10 ? `0${state.seconds}` : state.seconds
    }`}</nav>
  );
}

export default Timer;
