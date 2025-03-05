'use client';

import { useRef, useState, useEffect, MouseEvent } from 'react';

export default function SamplePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const startPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  useEffect(() => {
    const handleWindowMouseUp = () => {
      if (isDrawing) {
        setIsDrawing(false);
      }
    };
    window.addEventListener('mouseup', handleWindowMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleWindowMouseUp);
    };
  }, [isDrawing]);

  const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    startPosRef.current = { x, y };
    setIsDrawing(true);
  };

  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>): void => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const currentPos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    drawCircle(startPosRef.current, currentPos);
  };

  const handleMouseUp = (): void => {
    setIsDrawing(false);
  };

  const drawCircle = (
    center: { x: number; y: number },
    current: { x: number; y: number }
  ): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const dx = current.x - center.x;
    const dy = current.y - center.y;
    const radius = Math.sqrt(dx * dx + dy * dy);

    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  return (
    <div className="text-center mt-5">
      <h1 className="text-xl font-bold mb-4">コンパス作図ツール（サンプル）</h1>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="mx-auto bg-gray-800 border border-gray-600"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <p className="mt-4">
        キャンバス上でクリックして中心点を決め、ドラッグして半径を調整することで円を描きます。
      </p>
    </div>
  );
}