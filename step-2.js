const readline = require('readline');
const CUBE_SIZE = 3;

/**
 * @description validateRawData 메서드는 입력받은 데이터가 문제 조건에 맞는지 검사한다.
 * @param {Array} rawData 입력받은 Input 값
 */
function validateRawData(rawData) {
  for (let i = 0 ; i < rawData.length; i++) {
    const c = rawData.charAt(i);
    if(!(c === "'" || c === "U" || c === "R" || c === "L" || c === "B" || c === "Q")) {
      throw new Error("게임 규칙에 맞는 문자만 입력 가능합니다.");
    }
  }
}

function printCube(cube) {
  for (let i = 0 ; i < CUBE_SIZE; i++) {
    let row = "";
    for (let j = 0 ; j < CUBE_SIZE; j++) {
      row += `${cube[i][j] + " "}`
    }
    console.log(row.trim());
  }
  console.log();
}

function makeCommandStack(line) {
  const commandStack = [];
  for (let i = line.length - 1 ; i >= 0; i--) {
    if (line.charAt(i) === "'") {
      i -= 1;
      commandStack.push(line.charAt(i) + "'");
    }
    else {
      commandStack.push(line.charAt(i));
    }
  }
  return commandStack;
}

function getRow(cube, command) {
  const selectedRow = [];

  if (command === "U" || command === "U'") {
    for (let i = 0 ; i < CUBE_SIZE; i++) {
      selectedRow[i] = cube[0][i];
    }
  }
  else if (command === "R" || command === "R'") {
    for (let i = 0 ; i < CUBE_SIZE; i++) {
      selectedRow[i] = cube[i][CUBE_SIZE - 1];
    }
  }
  else if (command === "L" || command === "L'") {
    for (let i = 0 ; i < CUBE_SIZE; i++) {
      selectedRow[i] = cube[i][0];
    }
  }
  else if (command === "B" || command === "B'") {
    for (let i = 0 ; i < CUBE_SIZE; i++) {
      selectedRow[i] = cube[CUBE_SIZE - 1][i];
    }
  }

  return selectedRow;
}

function pushRow(selectedRow, command) {
  const pushedRow = [];

  if (command === "U" || command === "R" || command === "L'" || command === "B'") {
    for (var i = 0 ; i < CUBE_SIZE - 1; i++) {
      pushedRow[i] = selectedRow[i + 1];
    }
    pushedRow[i] = selectedRow[0];
  }
  else {
    for (var i = 0 ; i < CUBE_SIZE - 1; i++) {
      pushedRow[i + 1] = selectedRow[i];
    }
    pushedRow[0] = selectedRow[i];
  }

  return pushedRow;
}

function appendRowToCube(cube, pushedRow, command) {
  if (command === "U" || command === "U'") {
    for (let i = 0 ; i < CUBE_SIZE; i++) {
      cube[0][i] = pushedRow[i];
    }
  }
  else if (command === "R" || command === "R'") {
    for (let i = 0 ; i < CUBE_SIZE; i++) {
      cube[i][CUBE_SIZE - 1] = pushedRow[i];
    }
  }
  else if (command === "L" || command === "L'") {
    for (let i = 0 ; i < CUBE_SIZE; i++) {
      cube[i][0] = pushedRow[i];
    }
  }
  else if (command === "B" || command === "B'") {
    for (let i = 0 ; i < CUBE_SIZE; i++) {
      cube[CUBE_SIZE - 1][i] = pushedRow[i];
    }
  }
}

function rotateCube(cube, command) {
  const selectedRow = getRow(cube, command);
  const pushedRow = pushRow(selectedRow, command);
  appendRowToCube(cube, pushedRow, command);
}

function main() {
  const cube = [["R", "R", "W"], ["G", "C", "W"], ["G", "B", "B"]];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  printCube(cube);
  rl.setPrompt("CODE_CHILD> ");
  rl.prompt();
  rl.on("line", function(line) {
    validateRawData(line);

    if (line === "Q") {
      console.log("Bye~");
      rl.close();
    }

    const commandStack = makeCommandStack(line);
    while (commandStack.length > 0) {
      const command = commandStack.pop();
      rotateCube(cube, command);
      console.log(command);
      printCube(cube);
    }
    
    rl.prompt();
  }).on("close", function() {
    process.exit();
  });
}

main();
