import React, { useRef, useState, useEffect } from 'react';
import { Paintbrush, Eraser, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import { cn } from '../lib/utils';
import { useStateTogether } from 'react-together';

import { SidebarProvider, SidebarTrigger } from "./ui/sidebar"
import { AppSidebar } from "../components/AppSidebar"

interface Point {
  x: number;
  y: number;
}

interface Path {
  color: string;
  size: number;
  points: Point[];
}

export function WhiteboardComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [isEraser, setIsEraser] = useState(false);

  // Shared session state for paths across sessions
  const [paths, setPaths] = useStateTogether<Path[]>('sharedPaths', []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.lineCap = 'round';
        context.lineJoin = 'round';
      }
    }
    // Redraw paths on canvas whenever `paths` changes
    redrawCanvas(paths);
  }, [paths]);

  const redrawCanvas = (paths: Path[]) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        paths.forEach((path: Path) => {
          context.lineWidth = path.size;
          context.strokeStyle = path.color;
          context.beginPath();
          path.points.forEach((point: Point, index: number) => {
            if (index === 0) {
              context.moveTo(point.x, point.y);
            } else {
              context.lineTo(point.x, point.y);
            }
          });
          context.stroke();
        });
      }
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const newPath: Path = {
      color: isEraser ? '#FFFFFF' : color,
      size: brushSize,
      points: [{ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }]
    };
    setPaths([...paths, newPath]);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const updatedPaths = [...paths];
    const currentPath = updatedPaths[updatedPaths.length - 1];
    currentPath.points.push({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    setPaths(updatedPaths);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    setPaths([]); // Clear paths across all sessions
  };

  const toggleEraser = () => {
    setIsEraser(!isEraser);
  };

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
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
