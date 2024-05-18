import { useState, useEffect, useRef } from "react";
import { categoryData } from "../utils/fetchCategory";
import "./styles/CategorySlider.css";

export const CategorySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const categories = categoryData;
  const sliderRef = useRef(null);

  useEffect(() => {
    const sliderWidth = sliderRef.current.offsetWidth;
    const itemsPerSlide = Math.floor(sliderWidth / 250); // Ancho aproximado de cada elemento
    const totalItems = categories.length;
    const clonedCategories = [
      ...categories,
      ...categories.slice(0, itemsPerSlide),
    ]; // Para el efecto de bucle infinito

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === totalItems - 1 ? 0 : prevIndex + 1
      );
    }, 7000);

    return () => clearInterval(intervalId);
  }, [categories.length]);

  return (
    <section className="flex justify-center w-full bg-[#1a2149] text-white">
      <div className="logos" ref={sliderRef}>
        <div className="logos-wrapper">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`logos-slide ${
                index === currentIndex ? "current" : ""
              }`}
            >
              <span className="flex flex-col items-center">
                <img
                  src={`data:image/svg+xml;base64,${category.content}`}
                  className="size-9"
                />
                <h3>{category.name}</h3>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
