import { useCallback, useEffect, useState } from "react";

export const useProgressiveNumber = (
  initialValue,
  duration = 1500,
  decimals = 0,
  delay = 5
) => {
  const [target, setTarget] = useState(initialValue);
  const [current, setCurrent] = useState(initialValue);
  const [steps, setSteps] = useState(1);
  const [currentStep, setCurrentStep] = useState(1);

  const initial =
    typeof initialValue === "function" ? initialValue() : initialValue;

  const setValue = useCallback(
    (value) => {
      const nextTarget = typeof value === "function" ? value(target) : value;
      const steps = Math.max(Math.floor(duration / delay), 1);

      setSteps(steps);
      setTarget(nextTarget);
      setCurrentStep(1);
      setCurrent(lerp(initial, nextTarget, easeOutCubic(1 / steps)));
    },
    [initial, delay, duration, target]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      const progress = currentStep / steps;
      if (progress === 1) {
        setCurrent(target);
      } else {
        setCurrent(lerp(initial, target, easeOutCubic(progress)));
        setCurrentStep(currentStep + 1);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [initial, steps, delay, currentStep, target]);

  const value = Number(current.toFixed(decimals));

  return [value, setValue];
};

const lerp = (a, b, alpha) => {
  return a + alpha * (b - a);
};

const easeOutCubic = (value) => {
  return 1 - Math.pow(1 - value, 3);
};
