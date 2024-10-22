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

    // Calculate the current index based on scroll position and screen height
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
            scale: 1.3, // Slightly larger scale for the active item
            ease: "power3.out", // Smoother easing
          });
        } else {
          gsap.to(ref, {
            duration: 0.8,
            rotationX: index < currentIndex ? -70 : 70, // More consistent 3D rotation
            opacity: 0.3, // Lower opacity for inactive items
            scale: 0.9,
            ease: "power3.inOut", // Smoother transition for non-active items
          });
        }
      }
    });
  }, [currentIndex]);

  return (
    <div className="flex flex-col items-center justify-center h-[300vh] bg-gray-200 overflow-hidden p-0 m-0">
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
            className={`text-2xl sm:text-3xl md:text-4xl xl:text-6xl 2xl:text-8xl transition-all duration-500 ease-out font-bold ${
              index === currentIndex
                ? " text-black opacity-100"
                : "text-gray-500 opacity-30"
            }`}
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${
                index === currentIndex ? 0 : index < currentIndex ? -70 : 70
              }deg)`, // More logical and smoother 3D rotation
              margin: 0, // Ensure no extra margin
              padding: 0, // Ensure no extra padding
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
