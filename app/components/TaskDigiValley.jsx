import { useState, useEffect, useRef } from "react";
import { MdPlayArrow } from "react-icons/md";
import { Parallax } from "react-scroll-parallax";
import gsap from "gsap";

const textList = [
  "PESO PLUMA AS",
  "KENDRICK LAMAR",
  "KENDRICK LAMAR FUN",
  "EVERYTHING ALWAYS TO",
  "RAUW ALEJANDRO AS",
  "RAUW ALEJANDRO",
  "TRAVIS SCOTT",
];

const TaskDigiValley = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
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
            rotationX: 0,
            opacity: 1,
            scale: 1.2,
            ease: "power2.out",
          });
        } else {
          gsap.to(ref, {
            duration: 1,
            rotationX: index < currentIndex ? -90 : 90,
            opacity: 0.5,
            scale: 0.8,
            ease: "power2.in",
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
          className="transition-transform duration-300 ease-in-out "
          style={{
            transform: `translateY(${(index - currentIndex) * -50}px)`,
          }}
        >
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl xl:text-6xl 2xl:text-8xl transition-transform duration-500 ease-out ${
              index === currentIndex
                ? "font-semibold text-black opacity-100"
                : "font-semibold text-gray-500 opacity-50"
            } p-4`}
            style={{
              transform: `rotateX(${
                index === currentIndex ? 0 : index < currentIndex ? -60 : 60
              }deg)`,
            }}
          >
            {text}
          </h2>
        </Parallax>
      ))}

      <div
        className={`fixed top-1/2 left-0 right-0 transform -translate-y-1/2 flex items-center justify-between`}
        style={{ zIndex: 10 }}
      >
        <MdPlayArrow className="text-4xl" />
        <MdPlayArrow className="rotate-180 text-4xl" />
      </div>
    </div>
  );
};

export default TaskDigiValley;
