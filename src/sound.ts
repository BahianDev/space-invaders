import shootSoundSrc from "./assets/shoot.wav";

let shootAudio: HTMLAudioElement | null = null;
let soundEnabled = true;

export function setSoundEnabled(enabled: boolean) {
  soundEnabled = enabled;
  if (enabled) {
    unlockAudio();
  } else if (shootAudio) {
    shootAudio.pause();
    shootAudio.currentTime = 0;
  }
}

export function isSoundEnabled() {
  return soundEnabled;
}

export function playShootSound() {
  if (!soundEnabled) {
    return;
  }
  if (!shootAudio) {
    shootAudio = new Audio(shootSoundSrc);
  }

  shootAudio.currentTime = 0;
  shootAudio.play();
}

export function unlockAudio() {
  if (!shootAudio) {
    shootAudio = new Audio(shootSoundSrc);
    shootAudio.load();
  }
}
