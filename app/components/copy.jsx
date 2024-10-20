import { useState, useEffect, useRef } from "react";
import { Parallax } from "react-scroll-parallax";
import { MdPlayArrow } from "react-icons/md";

const textList = [
  "Peso Pluma y Pluma",
  "Kendrick Lamar and Scott",
  "Everything is always fine to me",
  "Rauw Alejandro bmalla lasis",
  "Rashedul Islm ansu",
  "Linkin Park is",
];

const ParallaxText = () => {
  const [currentIndex, setCurrentIndex] = useState(4);
  const textRefs = useRef([]);

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    textRefs.current.forEach((ref, index) => {
      if (ref) {
        const { top, bottom } = ref.getBoundingClientRect();
        if (top <= scrollPosition && bottom >= scrollPosition) {
          setCurrentIndex(index);
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[200vh] bg-gray-100 overflow-hidden">
      {textList.map((text, index) => (
        <Parallax
          key={text}
          speed={index === currentIndex ? 0 : (index - currentIndex) * 10}
          className="transition-opacity duration-300 ease-in-out space-y-0 flex items-center justify-center"
        >
          <h2
            ref={(el) => (textRefs.current[index] = el)}
            className={
              index === currentIndex
                ? "text-[7rem] font-semibold text-black opacity-100 rotate-y-0 transition-opacity duration-500 ease-in-out py-0 my-0"
                : "text-[7rem] font-semibold text-gray-500 opacity-50 transition-opacity duration-300 ease-in-out rotate-y-[-90deg] py-0 my-0"
            }
          >
            {text}
          </h2>
        </Parallax>
      ))}
      <div className="fixed top-1/2 -translate-y-1/2 left-0 right-0">
        <div className="flex items-center justify-between">
          <MdPlayArrow className="text-4xl" />
          <MdPlayArrow className="rotate-180 text-4xl" />
        </div>
      </div>
    </div>
  );
};

export default ParallaxText;
