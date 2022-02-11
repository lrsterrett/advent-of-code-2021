const input =
  `1,4,3,3,1,3,1,1,1,2,1,1,1,4,4,1,5,5,3,1,3,5,2,1,5,2,4,1,4,5,4,1,5,1,5,5,1,1,1,4,1,5,1,1,1,1,1,4,1,2,5,1,4,1,2,1,1,5,1,1,1,1,4,1,5,1,1,2,1,4,5,1,2,1,2,2,1,1,1,1,1,5,5,3,1,1,1,1,1,4,2,4,1,2,1,4,2,3,1,4,5,3,3,2,1,1,5,4,1,1,1,2,1,1,5,4,5,1,3,1,1,1,1,1,1,2,1,3,1,2,1,1,1,1,1,1,1,2,1,1,1,1,2,1,1,1,1,1,1,4,5,1,3,1,4,4,2,3,4,1,1,1,5,1,1,1,4,1,5,4,3,1,5,1,1,1,1,1,5,4,1,1,1,4,3,1,3,3,1,3,2,1,1,3,1,1,4,5,1,1,1,1,1,3,1,4,1,3,1,5,4,5,1,1,5,1,1,4,1,1,1,3,1,1,4,2,3,1,1,1,1,2,4,1,1,1,1,1,2,3,1,5,5,1,4,1,1,1,1,3,3,1,4,1,2,1,3,1,1,1,3,2,2,1,5,1,1,3,2,1,1,5,1,1,1,1,1,1,1,1,1,1,2,5,1,1,1,1,3,1,1,1,1,1,1,1,1,5,5,1`
    .split(",")
    .map((string) => parseInt(string));

let timerCount = getNewTimerCount();

for (const timer of input) {
  timerCount[timer]++;
}

let daysLeft = 256;

while (daysLeft-- > 0) {
  const newTimerCount = getNewTimerCount();

  newTimerCount[8] = timerCount[0];
  newTimerCount[6] = timerCount[0];

  for (let i = 1; i <= 8; i++) {
    newTimerCount[i - 1] += timerCount[i];
  }

  timerCount = newTimerCount;
}

const totalFish = Object.values(timerCount).reduce((sum, num) => sum + num, 0);
console.log(totalFish);

function getNewTimerCount() {
  const timerCount = {};

  for (let i = 0; i < 9; i++) {
    timerCount[i] = 0;
  }

  return timerCount;
}
