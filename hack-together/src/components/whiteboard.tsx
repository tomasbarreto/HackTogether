import React, { useRef, useEffect, useState } from 'react'
import { useStateTogether, useStateTogetherWithPerUserValues } from 'react-together'
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { Button } from "../components/ui/button"
import { Separator } from "../components/ui/separator"
import { Slider } from "../components/ui/slider"
import { Eraser, RotateCcw, FileUp, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from "../lib/utils"
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar"
import { AppSidebar } from "../components/AppSidebar"
import { User } from "../Schemas/Schemas"

interface WhiteboardProps {
  users: User[];
  roomId: number;
}

interface DrawingPoint {
  x: number
  y: number
  color: string
  isEraser: boolean
}

export const WhiteboardComponent: React.FC<WhiteboardProps> = ({ users, roomId }) => {
  const [localDrawing, setLocalDrawing, drawingsPerUser] = useStateTogetherWithPerUserValues<DrawingPoint[][]>('canvas-drawing', [])
  const [color, setColor] = useState('#000000')
  const [isEraser, setIsEraser] = useState(false)
  const [pdfImageUrls, setPdfImageUrls] = useStateTogether<string[]>('pdf-backgrounds', [])
  const [currentPageIndex, setCurrentPageIndex] = useStateTogether<number>('current-page-index', 0)
  const [zoomLevel, setZoomLevel] = useState(50) // Default to middle of the range

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const isDrawing = useRef(false)
  const lastUpdateRef = useRef<number>(0)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Convert slider value (0-100) to actual zoom (0.25 to 2.0)
  const actualZoomLevel = (zoomLevel / 50) * 1.125 // This gives us a range of 0.25x to 2.25x

  // Rest of the component remains exactly the same until the zoom slider UI
  const convertPdfToImages = async (file: File) => {
    const base64File = await fileToBase64(file)
    const response = await fetch("https://uk-v2.convertapi.com/convert/pdf/to/jpg", {
      method: "POST",
      headers: {
        Authorization: "Bearer secret_6YntiVNKSSN1fte1",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Parameters: [
          {
            Name: "File",
            FileValue: {
              Name: file.name,
              Data: base64File.split(",")[1]
            }
          },
          { Name: "StoreFile", Value: true }
        ]
      })
    })
    const data = await response.json()
    if (data.Files && data.Files.length > 0) {
      const imageUrls = data.Files.map((file: any) => file.Url)
      setPdfImageUrls(imageUrls)
      setCurrentPageIndex(0)
    }
  }

  const fileToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }

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
        <main className='overflow-x-hidden'>
        <SidebarTrigger className="flex flex-col items-left mb-5" />
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-[80px] h-[40px] border-2", isEraser && "opacity-50")}
                style={{ backgroundColor: color }}
                disabled={isEraser}
              />
            </PopoverTrigger>
            <PopoverContent className="w-[280px]">
              <div className="flex flex-wrap gap-1">
                {['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'].map((presetColor) => (
                  <div
                    key={presetColor}
                    className="w-8 h-8 rounded-md cursor-pointer border border-gray-300"
                    style={{ backgroundColor: presetColor }}
                    onClick={() => handleColorChange(presetColor)}
                  />
                ))}
              </div>
              <Separator className="my-2" />
              <input
                type="color"
                value={color}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-full h-10"
              />
            </PopoverContent>
          </Popover>

          <Button
            variant={isEraser ? "secondary" : "outline"}
            size="icon"
            onClick={toggleEraser}
            className={cn(isEraser && "bg-gray-200")}
          >
            <Eraser className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={clearLocalDrawings}
            title="Clear drawings"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-8" />

        <div className="flex items-center space-x-2">
          {pdfImageUrls.length > 0 ? (
            <Button 
              variant="destructive" 
              size="icon" 
              onClick={clearPdfBackground}
              className="hover:bg-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="flex items-center space-x-2"
              onClick={handleUploadClick}
            >
              <FileUp className="h-4 w-4" />
              <span>Upload PDF</span>
            </Button>
          )}
          
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePdfUpload}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
        </div>

        <Separator orientation="vertical" className="h-8" />

        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-gray-500" />
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {Math.round(actualZoomLevel * 100)}%
            </span>
            <Slider
              value={[zoomLevel]}
              onValueChange={(value) => setZoomLevel(value[0])}
              min={0}
              max={100}
              step={1}
              className="w-[100px]"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center overflow-hidden" style={{ width: "80vw", height: "80vh" }}>
        <div className="relative">
          <canvas
            ref={canvasRef}
            style={{
              resize: "both",
              overflow: "auto",
              minWidth: "400px",
              minHeight: "300px",
            }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className={cn(
              "border border-gray-300 bg-white rounded-lg shadow-md",
              isEraser ? "cursor-cell" : "cursor-crosshair"
            )}
          />
        </div>
      </div>

      {pdfImageUrls.length > 1 && (
        <div className="flex items-center space-x-4 mt-4">
          <Button variant="outline" size="icon" onClick={goToPreviousPage}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            Page {currentPageIndex + 1} of {pdfImageUrls.length}
          </span>
          <Button variant="outline" size="icon" onClick={goToNextPage}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
    </main>
    
    </SidebarProvider>
    </>
  )
}