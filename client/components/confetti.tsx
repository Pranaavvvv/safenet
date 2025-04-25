"use client"

import type React from "react"

import { useEffect, useState } from "react"

type ConfettiProps = {
  count?: number
  duration?: number
  colors?: string[]
}

export default function Confetti({
  count = 100,
  duration = 3000,
  colors = ["#f472b6", "#ec4899", "#fb7185", "#e11d48", "#be123c"],
}: ConfettiProps) {
  const [pieces, setPieces] = useState<Array<{ id: number; style: React.CSSProperties }>>([])

  useEffect(() => {
    const newPieces = []

    for (let i = 0; i < count; i++) {
      // Random position
      const left = Math.random() * 100

      // Random size
      const size = Math.random() * 8 + 5

      // Random rotation
      const rotation = Math.random() * 360

      // Random color
      const color = colors[Math.floor(Math.random() * colors.length)]

      // Random animation duration
      const animDuration = (Math.random() * 2 + 2) * 1000

      // Random animation delay
      const delay = Math.random() * 500

      newPieces.push({
        id: i,
        style: {
          position: "fixed",
          left: `${left}vw`,
          top: "-20px",
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
          borderRadius: "2px",
          transform: `rotate(${rotation}deg)`,
          animation: `confetti-fall ${animDuration}ms ease-in ${delay}ms forwards`,
        },
      })
    }

    setPieces(newPieces)

    // Clean up confetti after duration
    const timer = setTimeout(() => {
      setPieces([])
    }, duration)

    return () => clearTimeout(timer)
  }, [count, duration, colors])

  return (
    <>
      {pieces.map((piece) => (
        <div key={piece.id} style={piece.style} />
      ))}
    </>
  )
}
