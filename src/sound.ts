import shootSoundSrc from "./assets/shoot.wav";

let shootAudio: HTMLAudioElement | null = null;

export function playShootSound() {
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
