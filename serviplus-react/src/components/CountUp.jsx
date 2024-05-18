import { useProgressiveNumber } from "../hooks/useProgressiveNumber";
import { useEffect } from "react";

export const CountUp = ({ initial, final, decimals, duration }) => {
  const [count, setCount] = useProgressiveNumber(initial, duration, decimals);

  useEffect(() => {
    // Solo establecer el valor final cuando cambia el valor final prop
    setCount(final);
  }, [final]);

  return <span>{count}</span>;
};
