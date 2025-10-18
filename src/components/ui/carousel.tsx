"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CarouselProps {
  children: React.ReactNode
  className?: string
  showArrows?: boolean
  showDots?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number
  defaultCenterIndex?: number
}

export function Carousel({
  children,
  className,
  showArrows = true,
  showDots = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  defaultCenterIndex = 1
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(defaultCenterIndex)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const snapTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  const childrenArray = React.Children.toArray(children)
  const totalSlides = childrenArray.length

  const scrollToSlide = React.useCallback((index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const slideWidth = container.clientWidth
      const scrollLeft = index * slideWidth
      
      // Clear any pending snap timeouts
      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current)
        snapTimeoutRef.current = null
      }
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      })
    }
    setCurrentIndex(index)
  }, [])

  const nextSlide = React.useCallback(() => {
    const nextIndex = (currentIndex + 1) % totalSlides
    scrollToSlide(nextIndex)
  }, [currentIndex, totalSlides, scrollToSlide])

  const prevSlide = () => {
    const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides
    scrollToSlide(prevIndex)
  }

  // Initialize scroll position to default center index
  React.useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const slideWidth = container.clientWidth
      container.scrollLeft = defaultCenterIndex * slideWidth
    }
  }, [defaultCenterIndex])

  // Auto play effect
  React.useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      nextSlide()
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, currentIndex, nextSlide])

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current)
      }
    }
  }, [])

  // Handle scroll events to update current index
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const slideWidth = container.clientWidth
      const scrollLeft = container.scrollLeft
      const newIndex = Math.round(scrollLeft / slideWidth)
      
      // Update current index immediately for responsive UI
      setCurrentIndex(newIndex)
      
      // Only snap if user has stopped scrolling for a moment
      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current)
      }
      
      snapTimeoutRef.current = setTimeout(() => {
        if (scrollContainerRef.current) {
          const container = scrollContainerRef.current
          const currentScrollLeft = container.scrollLeft
          const slideWidth = container.clientWidth
          const newIndex = Math.round(currentScrollLeft / slideWidth)
          const expectedScrollLeft = newIndex * slideWidth
          
          // Only snap if significantly off-center (more than 30% of slide width)
          const threshold = slideWidth * 0.3
          if (Math.abs(currentScrollLeft - expectedScrollLeft) > threshold) {
            container.scrollTo({
              left: expectedScrollLeft,
              behavior: 'smooth'
            })
          }
        }
      }, 200) // Wait 200ms after user stops scrolling
    }
  }

  return (
    <div className={cn("relative", className)}>
      {/* Carousel Container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory py-4"
        onScroll={handleScroll}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollBehavior: 'smooth'
        }}
      >
        {childrenArray.map((child, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full snap-center px-2 flex justify-center items-start"
          >
            <div className="w-full max-w-sm">
              {child}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && totalSlides > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && totalSlides > 1 && (
        <div className="flex justify-center mt-12 mb-6 space-x-2">
          {childrenArray.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                index === currentIndex
                  ? "bg-primary w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              )}
              onClick={() => scrollToSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
