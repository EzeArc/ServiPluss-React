//import { useEffect } from "react";
import NumberItem from "./NumerosItem";
import { CountUp } from "./CountUp";
import { useMetrics } from "../hooks/useMetrics";

export const Numbers = () => {
  const { metrics, numerosRef } = useMetrics();

  return (
    <section className="max-w-6xl mx-auto py-20 px-20">
      <h2 className="text-4xl lg:text-6xl font-tomaso text-center text-balance mb-10 lg:mb-20">
        {"ServiPluss en números"}
      </h2>
      <div
        ref={numerosRef}
        className={`grid grid-cols-1 lg:grid-cols-3 gap-y-10`}
      >
        <NumberItem title={"Usuarios activos"}>
          <CountUp
            initial={0}
            final={metrics.responseUsers ?? 0}
            decimals={1}
          />
        </NumberItem>
        <NumberItem title={"Proveedores activos"}>
          <CountUp initial={0} final={metrics.responseProviders ?? 0} />
        </NumberItem>
        <NumberItem title={"Trabajos realizados"}>
          <CountUp initial={0} final={metrics.responseJobs ?? 0} decimals={1} />
        </NumberItem>
      </div>
    </section>
  );
};
