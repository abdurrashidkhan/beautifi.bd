"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import image1 from "@/public/image1.jpg";
import image2 from "@/public/image2.jpg";
import image3 from "@/public/image3.jpg";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// Interface for image data
interface ImageData {
  src: StaticImageData;
}

// Image data array
const images: ImageData[] = [
  {
    src: image1,
  },
  {
    src: image2,
  },
  {
    src: image3,
  },
];

export default function MainSlider(): any {
  // State to keep track of the current image index
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // State to determine if the image is being hovered over
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Function to show the previous slide
  const prevSlide = (): void => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Function to show the next slide
  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // useEffect hook to handle automatic slide transition
  useEffect(() => {
    // Start interval for automatic slide change if not hovered
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);

      // Cleanup the interval on component unmount
      return () => {
        clearInterval(interval);
      };
    }
  }, [isHovered]);

  // Handle mouse over event
  const handleMouseOver = (): void => {
    setIsHovered(true);
  };

  // Handle mouse leave event
  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  return (
    <div className="relative w-full mx-auto mt-4">
      <div
        // Parent container for image and buttons. This defines the height for the buttons.
        className="relative h-[460px] mx-12" 
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <div className="group hover:-translate-y-2 h-full transition-all duration-500 ease-in-out">
          {/* <Image
            src={images[currentIndex].src}
            alt={`Slider Image ${currentIndex + 1}`}
            layout="fill"
            objectFit="cover"
            className="rounded-xl cursor-pointer"
          /> */}
        </div>
        
        {/* Previous Button - **Alignment Fixed** */}
        <button
          // Removed fixed height and -mt-[10px]. h-full makes it match the parent's height.
          // The padding (p-2) now correctly centers the icon vertically.
          className="absolute left-0 top-1/2 transform h-full rounded-xl hover:bg-[#1a222f] mx-1 -translate-y-1/2 bg-[#111927] text-white p-2 flex items-center group"
          onClick={prevSlide}
        >
          {/* <ChevronLeft className="text-gray-400 group-hover:text-white" /> */}
        </button>
        
        {/* Next Button - **Alignment Fixed** */}
        <button
          // Removed fixed height and -mt-[10px]. h-full makes it match the parent's height.
          // The padding (p-2) now correctly centers the icon vertically.
          className="absolute right-0 top-1/2 transform h-full rounded-xl hover:bg-[#1a222f] mx-1 -translate-y-1/2 bg-[#111927] text-white p-2 flex items-center group"
          onClick={nextSlide}
        >
          {/* <ChevronRight className="text-gray-400 group-hover:text-white" /> */}
        </button>
      </div>

      <div className="flex justify-center mt-4">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-1 w-10 mx-1 ${
              index === currentIndex
                ? "bg-[#beff46] rounded-xl"
                : "bg-gray-300 rounded-xl"
            } transition-all duration-500 ease-in-out`}
          ></div>
        ))}
      </div>
    </div>
  );
}