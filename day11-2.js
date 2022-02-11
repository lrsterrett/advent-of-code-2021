const input = `8271653836
7567626775
2315713316
6542655315
2453637333
1247264328
2325146614
2115843171
6182376282
2384738675`
  .split("\n")
  .map((row) => {
    return row.split("").map((string) => parseInt(string));
  });

let round = 1;

while (true) {
  const fullEnergies = incrementAllAndGetFullEnergies();
  completeAllFlashesForStep(fullEnergies);
  const flashCount = getFlashCountAndResetFullEnergies();

  if (flashCount == 100) {
    break;
  }

  round++;
}

console.log(round);

function incrementAllAndGetFullEnergies() {
  const fullEnergies = [];

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      input[y][x]++;

      if (input[y][x] == 10) {
        fullEnergies.push([x, y]);
      }
    }
  }

  return fullEnergies;
}

function completeAllFlashesForStep(fullEnergies) {
  while (fullEnergies.length) {
    const [flasherX, flasherY] = fullEnergies.shift();

    for (let y = flasherY - 1; y <= flasherY + 1; y++) {
      for (let x = flasherX - 1; x <= flasherX + 1; x++) {
        if (input[y] && input[y][x] && input[y][x] < 10) {
          input[y][x]++;

          if (input[y][x] == 10) {
            fullEnergies.push([x, y]);
          }
        }
      }
    }
  }
}

function getFlashCountAndResetFullEnergies() {
  let flashCount = 0;

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (input[y][x] == 10) {
        flashCount++;
        input[y][x] = 0;
      }
    }
  }

  return flashCount;
}
