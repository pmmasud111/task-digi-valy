import { useState, useEffect, useRef } from "react";
import { Parallax } from "react-scroll-parallax";
import { MdPlayArrow } from "react-icons/md";

const textList = [
  "Peso Pluma y Pluma",
  "Kendrick Lamar ands ",
  "Everything is always fine ",
  "Rauw Alejandro bmas",
  "Rashedul Islm ansu",
  "Linkin Park is",
];

const ParallaxText = () => {
  const [currentIndex, setCurrentIndex] = useState(2); // Start with the first text
  const [rotation, setRotation] = useState(0); // State to track rotation
  const textRefs = useRef([]);

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 6;

    textRefs.current.forEach((ref, index) => {
      if (ref) {
        const { top, bottom } = ref.getBoundingClientRect();
        if (top <= scrollPosition && bottom >= scrollPosition) {
          setCurrentIndex(index);
        }
      }
    });

    // Calculate rotation based on scroll position
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollPercentage = window.scrollY / maxScroll;
    const newRotation = scrollPercentage * 90; // Max rotation of 90 degrees
    setRotation(newRotation);
  };

  useEffect(() => {
    const throttle = (callback, delay) => {
      let lastCall = 0;
      return (...args) => {
        const now = new Date().getTime();
        if (now - lastCall >= delay) {
          lastCall = now;
          callback(...args);
        }
      };
    };

    const throttledScroll = throttle(handleScroll, 10);
    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[200vh] bg-gray-100 overflow-hidden">
      {textList.map((text, index) => (
        <Parallax
          key={text}
          setCurrentIndex={setCurrentIndex}
          speed={index === currentIndex ? 0 : (index - currentIndex) * 4}
          className="transition-all duration-200 ease-in-out space-y-0 flex items-center justify-center whitespace-normal"
        >
          <h2
            ref={(el) => (textRefs.current[index] = el)}
            className={`text-[7rem] font-semibold transition-all duration-200 ease-in-out py-0 my-0 ${
              index === currentIndex
                ? "text-black opacity-100 "
                : "text-gray-500 opacity-50"
            }`}
          >
            {text}
          </h2>
        </Parallax>
      ))}
      <div className="fixed top-1/2 -translate-y-1/2 left-0 right-0">
        <div className="flex items-center justify-between">
          <MdPlayArrow
            className="text-4xl"
            style={{ transform: `rotate(${rotation}deg)` }} // Dynamic rotation
          />
          <MdPlayArrow
            className="rotate-180 text-4xl"
            style={{ transform: `rotate(-${rotation}deg)` }} // Dynamic opposite rotation
          />
        </div>
      </div>
    </div>
  );
};

export default ParallaxText;
