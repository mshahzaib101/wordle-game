export const playNowSound = () => {
  const sound = new Audio("/audios/play-now.mp3");
  sound.play();
};

export const winSound = () => {
  const sound = new Audio("/audios/win-sound.mp3");
  sound.play();
};

export const gameOverSound = () => {
  const sound = new Audio("/audios/game-over.mp3");
  sound.play();
};

export const gameAlertSound = () => {
  const sound = new Audio("/audios/alert.mp3");
  sound.play();
};

export const gamePosMoveSound = () => {
  const sound = new Audio("/audios/pos-move.mp3");
  sound.play();
};
