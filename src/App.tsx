import { useRef, useState } from 'react';
import { useSpaceInvaders } from './hooks/useSpaceInvaders';
import { setSoundEnabled } from './sound';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useSpaceInvaders(canvasRef, { autoPlay: true });

  const [soundEnabled, setSoundEnabledState] = useState(true);

  const toggleSound = () => {
    const newEnabled = !soundEnabled;
    setSoundEnabledState(newEnabled);
    setSoundEnabled(newEnabled);
  };

  return (
    <>
      <canvas ref={canvasRef} />
      <button
        onClick={toggleSound}
        style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}
      >
        {soundEnabled ? 'Mute' : 'Unmute'}
      </button>
    </>
  );
}
