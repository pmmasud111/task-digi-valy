import { useState, useEffect, useRef } from "react";
import { MdPlayArrow } from "react-icons/md";
import { Parallax } from "react-scroll-parallax";
import gsap from "gsap";

const textList = [
  "LINKIN PARK",
  "PESO PLUMA",
  "KENDRICK LAMAR",
  "EVERYTHING ALWAYS",
  "RAUW ALEJANDRO",
  "TRAVIS SCOTT",
  "BABY KEEM",
];

const TaskDigiValley = () => {
  const [currentIndex, setCurrentIndex] = useState(2);
  const textRefs = useRef([]);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const screenHeight = window.innerHeight;

    const index = Math.min(
      Math.floor(scrollPosition / (screenHeight / 4)),
      textList.length - 1
    );
    setCurrentIndex(index);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    textRefs.current.forEach((ref, index) => {
      if (ref) {
        if (index === currentIndex) {
          gsap.to(ref, {
            duration: 1,
            rotation: 180,
            opacity: 1,
            ease: "sine.inOut",
          });
        } else {
          gsap.to(ref, {
            duration: 1,
            rotation: 0,
            opacity: 0.5,
            ease: "sine.inOut",
          });
        }
      }
    });
  }, [currentIndex]);

  return (
    <div className="flex flex-col items-center justify-center h-[300vh] bg-gray-200 overflow-hidden">
      {textList.map((text, index) => (
        <Parallax
          ref={(el) => (textRefs.current[index] = el)}
          key={text}
          speed={(index - currentIndex) * 5}
          className="transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateY(${(index - currentIndex) * -50}px)`,
          }}
        >
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl xl:text-6xl 2xl:text-8xl ${
              index === currentIndex
                ? "font-semibold text-black opacity-100"
                : "font-semibold text-gray-500 opacity-50"
            } p-4`}
          >
            {text}
          </h2>
        </Parallax>
      ))}

      <div
        className="fixed top-1/2 left-0 right-0 transform -translate-y-1/2 flex items-center justify-between"
        style={{ zIndex: 10 }}
      >
        <MdPlayArrow className="text-4xl" />
        <MdPlayArrow className="rotate-180 text-4xl" />
      </div>
    </div>
  );
};

export default TaskDigiValley;
