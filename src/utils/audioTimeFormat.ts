export function audioTimeFormat(time: number) {
  const calcHour = Math.floor(time / 3600);
  const calcSec = time % 3600;
  const calcMin = Math.floor(calcSec / 60);
  const calcFinalSec = calcSec % 60;
  const hour = `${calcHour <= 9 ? `0${calcHour}` : calcHour}`;
  const min = `${calcMin <= 9 ? `0${calcMin}` : calcMin}`;
  const sec = `${
    calcFinalSec <= 9 ? `0${calcFinalSec.toFixed(0)}` : calcFinalSec.toFixed(0)
  }`;

  if (time >= 3600) {
    return `${hour}:${min}:${sec}`;
  } else {
    return `${min}:${sec}`;
  }
}
