const readline = require('readline');
const CUBE_SIZE = 3;

/**
 * @description validateRawData 메서드는 입력받은 데이터가 문제 조건에 맞는지 검사한다.
 * @param {string} rawData 입력받은 Input 값
 */
function validateRawData(rawData) {
  for (let i = 0 ; i < rawData.length; i++) {
    const c = rawData.charAt(i);
    if(!(c === "'" || c === "U" || c === "R" || c === "L" || c === "B" || c === "Q")) {
      throw new Error("게임 규칙에 맞는 문자만 입력 가능합니다.");
    }
  }
}

/**
 * @description printCube 메서드는 현재 큐브 상태를 출력한다.
 * @param {Array} cube 큐브
 */
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

/**
 * @description makeCommandStack 메서드는 이후에 손쉽게 순서대로 명령들을 꺼내기 위해, 받은 커맨드들을 하나씩 Stack 에 넣어준다.
 * @param {string} line 입력받는 커맨드들
 * @returns {Array} commandStack 커맨드들이 들어간 Stack
 */
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

/**
 * @description getRow 메서드는 명령어의 종류에 따라 조작해야될 Row를 반환해준다.
 * @param {Array} cube 큐브
 * @param {string} command 커맨드 하나
 * @returns {Array} selectedRow 조작해야 할 Row
 */
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

/**
 * @description pushRow 메서드는 명령어에 따라 왼쪽이나 오른쪽으로 한 칸 밀어준다.
 * @param {Array} selectedRow 조작해야 할 Row
 * @param {string} command 커맨드 하나
 * @returns {Array} pushedRow 조작된 Row
 */
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

/**
 * @description appendRowToCube 메서드는 최종적으로 조작된 Row를 원래 큐브에 반영해준다.
 * @param {Array} cube 큐브
 * @param {Array} pushedRow 조작된 Row
 * @param {string} command 커맨드 하나
 */
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

/**
 * @description rotateCube 메서드는 일련의 과정(한 줄 선택, 밀기, 큐브에 반영) 을 통해 명령어에 맞게 한 줄을 밀어준다.
 * @param {Array} cube 큐브
 * @param {string} command 커맨드 하나
 */
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
