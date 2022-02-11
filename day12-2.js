const input = `xx-xh
vx-qc
cu-wf
ny-LO
cu-DR
start-xx
LO-vx
cu-LO
xx-cu
cu-ny
xh-start
qc-DR
vx-AP
end-LO
ny-DR
vx-end
DR-xx
start-DR
end-ny
ny-xx
xh-DR
cu-xh`
  .split("\n")
  .map((row) => row.split("-"));

const pathMap = getPathMap();

const pathCount = search("start", { start: true }, 0, false, null);

console.log(pathCount);

function getPathMap() {
  const paths = {};

  for (const path of input) {
    const cave1 = path[0];
    const cave2 = path[1];

    if (!paths[cave1]) {
      paths[cave1] = [];
    }

    if (!paths[cave2]) {
      paths[cave2] = [];
    }

    paths[cave1].push(cave2);
    paths[cave2].push(cave1);
  }

  return paths;
}

function search(currentCave, visited, pathCount, smallCaveToVisitTwice) {
  const nextCaves = getNextCaves(currentCave, visited, smallCaveToVisitTwice);

  for (const cave of nextCaves) {
    if (cave == "end") {
      if (smallCaveToVisitTwice) {
        if (visited[smallCaveToVisitTwice]) {
          pathCount++;
        }
      } else {
        pathCount++;
      }
    } else {
      pathCount = search(
        cave,
        { ...visited, [cave]: true },
        pathCount,
        smallCaveToVisitTwice
      );
    }
  }

  if (!smallCaveToVisitTwice) {
    const nextSmallCaves = getNextSmallCaves(currentCave, visited);

    for (const cave of nextSmallCaves) {
      pathCount = search(cave, { ...visited }, pathCount, cave);
    }
  }

  return pathCount;
}

function getNextCaves(currentCave, visited) {
  return pathMap[currentCave].filter((cave) => {
    return cave[0].toUpperCase() == cave[0] || !visited[cave];
  });
}

function getNextSmallCaves(currentCave, visited) {
  return pathMap[currentCave].filter((cave) => {
    return cave[0].toLowerCase() == cave[0] && !visited[cave] && cave != "end";
  });
}
