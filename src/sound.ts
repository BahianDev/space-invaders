import shootSoundSrc from "./assets/shoot.wav";
import invaderKilledSoundSrc from "./assets/invaderkilled.wav";

let shootAudio: HTMLAudioElement | null = null;
let invaderKilledAudio: HTMLAudioElement | null = null;

let soundEnabled = true;

export function setSoundEnabled(enabled: boolean) {
  soundEnabled = enabled;
  if (enabled) {
    unlockAudio();
  } else if (shootAudio) {
    shootAudio.pause();
    shootAudio.currentTime = 0;
  } else if (invaderKilledAudio) {
    invaderKilledAudio.pause();
    invaderKilledAudio.currentTime = 0;
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

export function playInvaderKilledSound() {
  if (!soundEnabled) {
    return;
  }
  if (!invaderKilledAudio) {
    invaderKilledAudio = new Audio(invaderKilledSoundSrc);
  }

  invaderKilledAudio.currentTime = 0;
  invaderKilledAudio.play();
}

export function unlockAudio() {
  if (!shootAudio) {
    shootAudio = new Audio(shootSoundSrc);
    shootAudio.load();
  }

  if (!invaderKilledAudio) {
    invaderKilledAudio = new Audio(invaderKilledSoundSrc);
    invaderKilledAudio.load();
  }
}
