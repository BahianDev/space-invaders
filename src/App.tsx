import { useEffect, useRef } from 'react';
import { startGame } from './game';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      startGame({ canvas: canvasRef.current, autoPlay: true });
    }
  }, []);

  return <canvas ref={canvasRef} />;
}
