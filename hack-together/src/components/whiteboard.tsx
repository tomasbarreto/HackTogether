import React, { useRef, useState, useEffect } from 'react';
import { Paintbrush, Eraser, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import { cn } from '../lib/utils';
import { useStateTogether } from 'react-together';

interface Point {
  x: number;
  y: number;
}

interface Path {
  color: string;
  size: number;
  points: Point[];
}

export function Whiteboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [isEraser, setIsEraser] = useState(false);

  // Shared session state for paths across sessions
  const [paths, setPaths] = useStateTogether<Path[]>('sharedPaths', []);

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = 800
      canvas.height = 600
      const context = canvas.getContext('2d')
      if (context) {
        context.lineCap = 'round'
        context.lineWidth = 3
        contextRef.current = context
        renderCanvas()
      }
    }
  }, [currentPageIndex, actualZoomLevel, drawingsPerUser])

  const renderCanvas = () => {
    const context = contextRef.current
    const canvas = canvasRef.current
    if (context && canvas) {
      context.clearRect(0, 0, canvas.width, canvas.height)
      
      if (pdfImageUrls.length > 0 && pdfImageUrls[currentPageIndex]) {
        const background = new Image()
        background.src = pdfImageUrls[currentPageIndex]
        background.onload = () => {
          const scaledWidth = background.width * actualZoomLevel
          const scaledHeight = background.height * actualZoomLevel
          const x = (canvas.width - scaledWidth) / 2
          const y = (canvas.height - scaledHeight) / 2
          
          context.drawImage(background, x, y, scaledWidth, scaledHeight)
          drawUserLines(context)
        }
      } else {
        drawUserLines(context)
      }
    }
  }

  const drawUserLines = (context: CanvasRenderingContext2D) => {
    Object.values(drawingsPerUser || {}).forEach((userLines) => {
      userLines.forEach((line) => {
        if (line.length > 0) {
          context.beginPath()
          context.moveTo(line[0].x, line[0].y)
          line.forEach((point, index) => {
            if (index > 0) {
              context.lineTo(point.x, point.y)
            }
            context.strokeStyle = point.isEraser ? '#f9f9f9' : point.color
            context.stroke()
            context.beginPath()
            context.moveTo(point.x, point.y)
          })
        }
      })
    })
  }

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true
    const { offsetX, offsetY } = event.nativeEvent
    setLocalDrawing((current) => [
      ...current,
      [{ x: offsetX, y: offsetY, color, isEraser }]
    ])
  }

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return

    const now = Date.now()
    if (now - lastUpdateRef.current > 25) {
      lastUpdateRef.current = now
      const { offsetX, offsetY } = event.nativeEvent

      setLocalDrawing((current) => {
        const updatedDrawing = [...current]
        const lastLine = updatedDrawing[updatedDrawing.length - 1]
        lastLine.push({ x: offsetX, y: offsetY, color, isEraser })
        return updatedDrawing
      })
    }
  }

  const stopDrawing = () => {
    isDrawing.current = false
    setLocalDrawing((current) => [...current, []])
  }

  const handleColorChange = (newColor: string) => {
    setColor(newColor)
    setIsEraser(false)
  }

  const toggleEraser = () => {
    setIsEraser(!isEraser)
  }

  const clearLocalDrawings = () => {
    setLocalDrawing([])
    renderCanvas()
  }

  const clearPdfBackground = () => {
    setPdfImageUrls([])
    setCurrentPageIndex(0)
    renderCanvas()
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      convertPdfToImages(file)
    }
  }

  const goToNextPage = () => {
    setCurrentPageIndex((prevIndex) => (prevIndex + 1) % pdfImageUrls.length)
  }

  const goToPreviousPage = () => {
    setCurrentPageIndex((prevIndex) => (prevIndex - 1 + pdfImageUrls.length) % pdfImageUrls.length)
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar users={users} roomId={roomId} />
        <main>
          <SidebarTrigger className="flex flex-col items-left mb-5" />
          <div className="flex flex-col w-full items-center space-y-4 p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center space-x-4 mb-4">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 border-none"
              />
              <Button onClick={toggleEraser} variant={isEraser ? 'secondary' : 'outline'} size="icon">
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
        </main>
      </SidebarProvider>
    </>
  );
}

export default WhiteboardComponent