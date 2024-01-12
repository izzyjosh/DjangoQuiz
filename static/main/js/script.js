let time = document.querySelector(".time");
function countdownTimer(durationInSeconds) {
  let timer = durationInSeconds;
  const interval = setInterval(() => {
    const minutes = Math.floor(timer / 60);
    let seconds = timer % 60;

    seconds = seconds < 10 ? '0' + seconds: seconds;
    time.innerHTML = `${minutes}:${seconds}`;
    if (--timer < 0) {
      clearInterval(interval);
    }
  },
    1000);
}
countdownTimer(20);

