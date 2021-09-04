export const music = new Audio('../assets/Repair_main_loop.mp3')
export const button1 = new Audio('../assets/button1.mp3')
export const voice1 = new Audio('../assets/voice1.mp3')
music.currentTime = 0
music.volume = 0
button1.volume  = 1;
voice1.volume = 0.5



music.addEventListener("ended", function() {
    this.currentTime = 0;
    this.play();
  }, false);