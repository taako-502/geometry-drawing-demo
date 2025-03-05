'use client'

import { useEffect, useRef } from 'react'
import paper from 'paper'

export default function PaperCircle() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    paper.setup(canvasRef.current)

    let circle: paper.Path.Circle | null = null
    let centerPoint: paper.Point | null = null

    const tool = new paper.Tool()

    tool.onMouseDown = (event: paper.MouseEvent) => {
      centerPoint = event.point
      circle = new paper.Path.Circle({
        center: centerPoint,
        radius: 0,
        strokeColor: 'black',
        strokeWidth: 2,
      })
    }

    tool.onMouseDrag = (event: paper.MouseEvent) => {
      if (centerPoint && circle) {
        const radius = centerPoint.getDistance(event.point)
        circle.remove()
        circle = new paper.Path.Circle({
          center: centerPoint,
          radius,
          strokeColor: 'black',
          strokeWidth: 2,
        })
      }
    }

    return () => {
      paper.project.clear()
      tool.remove()
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Paper.js で円を描画</h1>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border border-gray-400"
      />
    </div>
  )
}
