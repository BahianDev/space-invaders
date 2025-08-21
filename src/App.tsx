import { useRef } from 'react';
import { useSpaceInvaders } from './hooks/useSpaceInvaders';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useSpaceInvaders(canvasRef, { autoPlay: true });
  return <canvas ref={canvasRef} />;
}
