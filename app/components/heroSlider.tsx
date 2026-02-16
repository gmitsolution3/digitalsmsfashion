"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface SliderContainer {
  id: string
  title?: string
  description?: string
  buttonText?: string
  buttonLink?: string
  images: string[]
}

export interface ProductSliderSectionProps {
  mainSlider: SliderContainer
  sideSliders: SliderContainer[]
}

const SingleSlider = ({
  slider,
  isMain = false,
}: {
  slider: SliderContainer
  isMain?: boolean
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<"left" | "right">("right")

  const handlePrev = () => {
    setDirection("left")
    setCurrentIndex((prev) => (prev === 0 ? slider.images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setDirection("right")
    setCurrentIndex((prev) => (prev === slider.images.length - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 5000)
    return () => clearInterval(interval)
  }, [currentIndex, slider.images.length])

  return (
    <div
      className={`relative w-full overflow-hidden rounded-md bg-gradient-to-br from-slate-900 to-slate-800 ${
        isMain ? "h-[25vh] md:h-[74vh]" : "h-[15vh] md:h-80"
      }`}
    >
      <div className="relative w-full h-full">
        {slider.images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              index === currentIndex
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${slider.title} - Image ${index + 1}`}
              className="w-full h-full object-contain"
              priority
              fetchPriority="high"
              fill
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <>
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300 flex items-center justify-center"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300 flex items-center justify-center"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </>
    </div>
  );
}

export default function ProductSliderSection({ mainSlider, sideSliders }: ProductSliderSectionProps) {
  return (
    <section className="w-full bg-white px-4 md:px-6 lg:px-8 pb-8 md:pb-12 lg:pb-16">
      <div className="max-w-full mx-auto">
        <div className="grid grid-cols-1">
          <div>
            <SingleSlider slider={mainSlider} isMain={true} />
          </div>
        </div>
      </div>
    </section>
  )
}