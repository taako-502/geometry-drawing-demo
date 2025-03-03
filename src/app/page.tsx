'use client';

import { useRef, useState, MouseEvent } from 'react';

export default function Home() {
  // Canvas の参照と描画状態の管理
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // マウスダウン: 中心点を設定し、描画状態にする
  const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x: number = e.clientX - rect.left;
    const y: number = e.clientY - rect.top;
    setStartPos({ x, y });
    setIsDrawing(true);
  };

  // マウスムーブ: 現在のカーソル位置から半径を計算して円を再描画
  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>): void => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const currentX: number = e.clientX - rect.left;
    const currentY: number = e.clientY - rect.top;
    drawCircle(startPos, { x: currentX, y: currentY });
  };

  // マウスアップ: 描画終了
  const handleMouseUp = (): void => {
    setIsDrawing(false);
  };

  // 円を描画する関数
  const drawCircle = (
    center: { x: number; y: number },
    current: { x: number; y: number }
  ): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // キャンバスをクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 中心点と現在位置から半径を計算
    const dx: number = current.x - center.x;
    const dy: number = current.y - center.y;
    const radius: number = Math.sqrt(dx * dx + dy * dy);

    // 円を描画
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>コンパス作図ツール（サンプル）</h1>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        style={{ border: '1px solid #000' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <p>
        キャンバス上でクリックして中心点を決め、ドラッグして半径を調整することで円を描きます。
      </p>
    </div>
  );
}
