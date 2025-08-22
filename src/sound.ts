let audioCtx: AudioContext | null = null;

export function playShootSound() {
  if (!audioCtx) {
    const AudioContext =
      window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContext();
  }
  const ctx = audioCtx;
  if (!ctx) return;

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = "square";
  oscillator.frequency.value = 800;

  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start();
  oscillator.stop(ctx.currentTime + 0.1);
}

export function unlockAudio() {
  if (!audioCtx) {
    const AudioContext =
      window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContext();
  } else if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}
