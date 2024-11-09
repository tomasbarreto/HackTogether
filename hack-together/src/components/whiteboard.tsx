import React, { useRef, useState, useEffect } from 'react'
import { Paintbrush, Eraser, Trash2 } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Slider } from '../components/ui/slider'
import { cn } from '../lib/utils'

export function WhiteboardComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState(5)
  const [isEraser, setIsEraser] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext('2d')
      if (context) {
        context.lineCap = 'round'
        context.lineJoin = 'round'
      }
    }
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext('2d')
      if (context) {
        context.beginPath()
        context.moveTo(
          e.nativeEvent.offsetX,
          e.nativeEvent.offsetY
        )
        setIsDrawing(true)
      }
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext('2d')
      if (context) {
        context.lineWidth = brushSize
        context.strokeStyle = isEraser ? '#FFFFFF' : color
        context.lineTo(
          e.nativeEvent.offsetX,
          e.nativeEvent.offsetY
        )
        context.stroke()
      }
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext('2d')
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
  }

  const toggleEraser = () => {
    setIsEraser(!isEraser)
  }

  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-gray-100 rounded-lg">
      <div className="flex space-x-4 mb-4">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-10 h-10 border-none"
        />
        <Button
          onClick={toggleEraser}
          variant={isEraser ? 'secondary' : 'outline'}
          size="icon"
        >
          <Eraser className="h-4 w-4" />
        </Button>
        <Button onClick={clearCanvas} variant="outline" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <Paintbrush className="h-4 w-4" />
        <Slider
          value={[brushSize]}
          onValueChange={(value) => setBrushSize(value[0])}
          max={20}
          step={1}
          className="w-[200px]"
        />
        <span className="text-sm font-medium">{brushSize}px</span>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        className={cn(
          "border border-gray-300 rounded-lg cursor-crosshair",
          isEraser && "cursor-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABVSURBVDhPY2AYBcMNMEJpnODJ/9uOIHEGJgZGRpCYAQ7FWABIjgkqhBNgU4gPYFOMrpAQwKYYWRFegCGJTSFWgE0xukKCgBhFGIpwKcYKhq9CAPmwFalzTqm6AAAAAElFTkSuQmCC'),auto]"
        )}
      />
    </div>
  )
}