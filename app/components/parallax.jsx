import { useState, useEffect, useRef } from "react";
import { MdPlayArrow } from "react-icons/md";
import { Parallax } from "react-scroll-parallax";

const textList = [
  "LINKIN PARK",
  "PESO PLUMA",
  "KENDRICK LAMAR",
  "EVERYTHING ALWAYS",
  "RAUW ALEJANDRO",
  "TRAVIS SCOTT",
  "BABY KEEM",
];

const ParallaxText = () => {
  const [currentIndex, setCurrentIndex] = useState(3); // Start with 'EVERYTHING ALWAYS'
  const ref = useRef(null);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const screenHeight = window.innerHeight;

    // Calculate which text should be highlighted based on scroll position
    const index = Math.min(
      Math.floor(scrollPosition / (screenHeight / 6)), // Adjust for better spacing
      textList.length - 1 // Ensure index does not exceed textList length
    );
    setCurrentIndex(index);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[200vh] bg-gray-200 overflow-hidden">
      {textList.map((text, index) => (
        <Parallax
          key={text}
          speed={(index - currentIndex) * 5} // Reduce speed for smoother effect
          className="transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateY(${(index - currentIndex) * 100}px)`, // Rolling effect based on index
          }}
        >
          <h2
            className={`text-8xl transition-opacity duration-500 ease-in-out ${
              index === currentIndex
                ? "font-semibold text-black opacity-100 transform scale-125" // highlightedText with rounded and shadow
                : "font-semibold text-gray-500 opacity-30 rounded-full" // smallText with rounded
            } p-4`} // Added padding for better appearance
          >
            {text}
          </h2>
        </Parallax>
      ))}
      {/* Fixed play button section */}
      <div
        ref={ref}
        className="fixed top-1/2 left-0 right-0 transform -translate-y-1/2 flex items-center justify-between p-4"
        style={{ zIndex: 10 }} // Ensures the play buttons are above other elements
      >
        <MdPlayArrow className="text-4xl" />
        <MdPlayArrow className="rotate-180 text-4xl" />
      </div>
    </div>
  );
};

export default ParallaxText;
