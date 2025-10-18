"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface SafeImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fill?: boolean
  placeholderText?: string
  priority?: boolean
  quality?: number
  sizes?: string
  style?: React.CSSProperties
}

export function SafeImage({
  src,
  alt,
  width,
  height,
  className,
  fill = false,
  placeholderText,
  priority = false,
  quality = 75,
  sizes,
  style
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  // Jika ada error, tampilkan placeholder inline
  if (hasError) {
    if (fill) {
      // Untuk fill=true, placeholder harus mengisi seluruh container
      return (
        <div 
          className={cn(
            "absolute inset-0 rounded-lg bg-gray-100 flex items-center justify-center",
            className
          )}
          style={style}
        >
          <div className="text-center p-4">
            <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm text-gray-500 font-medium">{placeholderText || alt}</p>
          </div>
        </div>
      )
    } else {
      // Untuk width/height yang ditentukan
      return (
        <div 
          className={cn(
            "rounded-lg bg-gray-100 flex items-center justify-center",
            className
          )}
          style={{ width, height, ...style }}
        >
          <div className="text-center p-2">
            <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-xs text-gray-500 font-medium">{placeholderText || alt}</p>
          </div>
        </div>
      )
    }
  }

  // Tampilkan loading placeholder saat gambar sedang dimuat
  if (isLoading) {
    if (fill) {
      return (
        <div 
          className={cn(
            "absolute inset-0 rounded-lg bg-gray-100 flex items-center justify-center animate-pulse",
            className
          )}
          style={style}
        >
          <div className="text-center p-4">
            <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm text-gray-400 font-medium">Loading...</p>
          </div>
        </div>
      )
    } else {
      return (
        <div 
          className={cn(
            "rounded-lg bg-gray-100 flex items-center justify-center animate-pulse",
            className
          )}
          style={{ width, height, ...style }}
        >
          <div className="text-center p-2">
            <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-xs text-gray-400 font-medium">Loading...</p>
          </div>
        </div>
      )
    }
  }

  // Render Next.js Image component
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        priority={priority}
        quality={quality}
        sizes={sizes}
        style={style}
        onError={handleError}
        onLoad={handleLoad}
        loading={priority ? "eager" : "lazy"}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      quality={quality}
      sizes={sizes}
      style={style}
      onError={handleError}
      onLoad={handleLoad}
      loading={priority ? "eager" : "lazy"}
    />
  )
}
