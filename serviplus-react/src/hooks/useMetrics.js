import { getMetricsFromFetch } from "../utils/getCounterMetrics";
import { useEffect, useRef, useState } from "react";

const data = await getMetricsFromFetch();

export const useMetrics = () => {
  const [metrics, setMetrics] = useState({
    usuarios: 0,
    provedores: 0,
    trabajos: 0,
  });

  const [isIntersecting, setIsIntersecting] = useState(false);
  const numerosRef = useRef(null);

  useEffect(() => {
    if (!isIntersecting) return;
    data;
    setMetrics(data);
  }, [isIntersecting]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio > 0) {
        setIsIntersecting(true);
      }
    });

    if (!numerosRef.current) return;
    observer.observe(numerosRef.current);

    return () => {
      if (!numerosRef.current) return;
      observer.unobserve(numerosRef.current);
    };
  }, []);

  return { metrics, numerosRef };
};
