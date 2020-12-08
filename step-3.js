const readline = require('readline');
const CUBE_SIZE = 3;
const SIDE_NUMBER = 4;
const sideIndexes = {
  up    : [1, 2, 3, 4],
  left  : [0, 2, 4, 5],
  front : [0, 1, 3, 5],
  right : [0, 2, 4, 5],
  back  : [0, 1, 3, 5],
  down  : [1, 2, 3, 4],
}
const rowIndexes = {
  up    : [0, 1, 2],
  left  : [0, 3, 6],
  right : [2, 5, 8],
  down  : [6, 7, 8]
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
    else if (line.charAt(i) === "2") {
      i -= 1;
      commandStack.push(line.charAt(i));
      commandStack.push(line.charAt(i));
    }
    else {
      commandStack.push(line.charAt(i));
    }
  }
  return commandStack;
}

/**
 * @description printCube 메서드는 현재 큐브 상태를 출력한다.
 * @param {Array} cube 큐브
 */
function printCube(cube) {
  for (let i = 0 ; i < CUBE_SIZE; i++) {
    let row = "               ";
    for (let j = 0 ; j < CUBE_SIZE; j++) {
      row += `${cube[0][(i * CUBE_SIZE) + j] + " "}`;
    }
    console.log(row);
  }

  console.log();
  
  for (let j = 0 ; j < CUBE_SIZE; j++) {
    let row = "";
    for (let i = 1; i < 5; i++) {
      for (let k = 0 ; k < CUBE_SIZE; k++) {
        row += cube[i][j * CUBE_SIZE + k] + " ";
      }
      row.trimRight();
      row += "    ";
    }
    console.log(row);
  }

  console.log();

  for (let i = 0 ; i < CUBE_SIZE; i++) {
    let row = "               ";
    for (let j = 0 ; j < CUBE_SIZE; j++) {
      row += `${cube[5][(i * CUBE_SIZE) + j] + " "}`;
    }
    console.log(row);
  }
}

/**
 * @description getRow 메서드는 명령어의 종류에 따라 조작해야될 Row를 반환해준다.
 * @param {Array} cube 큐브
 * @param {string} command 커맨드 하나
 * @returns {Array} selectedRow 조작해야 할 Row
 */
function getFaceAndRows(cube, command) {
  const selectedFaceAndRows = {
    face : [],
    rows : []
  };

  if (command.charAt(0) === "U") {
    selectedFaceAndRows.face = [...cube[0]];

    for (let i = 0; i < SIDE_NUMBER; i++) {
      for (let j = 0; j < CUBE_SIZE; j++) {
        selectedFaceAndRows.rows.push(cube[sideIndexes.up[i]][rowIndexes.up[j]]);
      }
    }    
  }
  else if (command.charAt(0) === "L") {
    selectedFaceAndRows.face = [...cube[1]];

    for (let i = 0; i < SIDE_NUMBER; i++) {
      for (let j = 0; j < CUBE_SIZE; j++) {
        selectedFaceAndRows.rows.push(cube[sideIndexes.left[i]][rowIndexes.left[j]]);
      }
    }
  }
  else if (command.charAt(0) === "F") {
    selectedFaceAndRows.face = [...cube[2]];


  }
  else if (command.charAt(0) === "R") {
    selectedFaceAndRows.face = [...cube[3]];


  }
  else if (command.charAt(0) === "B") {
    selectedFaceAndRows.face = [...cube[4]];


  }
  else if (command.charAt(0) === "D") {
    selectedFaceAndRows.face = [...cube[5]];


  }

  return selectedFaceAndRows;
}

/**
 * @description rotateCube 메서드는 일련의 과정(한 줄 선택, 밀기, 큐브에 반영) 을 통해 명령어에 맞게 한 줄을 밀어준다.
 * @param {Array} cube 큐브
 * @param {string} command 커맨드 하나
 */
function rotateCube(cube, command) {
  const selectedFaceAndRows = getFaceAndRows(cube, command);
  console.log(selectedFaceAndRows);
  // const pushedFaceAndRows = pushFaceAndRows(selectedFaceAndRows, command);
}


function main() {
  const cube = [
    ["B", "B", "B", "B", "B", "B", "B", "B", "B"], // up
    ["W", "W", "W", "W", "W", "W", "W", "W", "W"], // left
    ["O", "O", "O", "O", "O", "O", "O", "O", "O"], // front
    ["G", "G", "G", "G", "G", "G", "G", "G", "G"], // right
    ["Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y"], // back
    ["R", "R", "R", "R", "R", "R", "R", "R", "R"]  // down
  ];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  printCube(cube);
  rl.setPrompt("CODE_CHILD> ");
  rl.prompt();
  rl.on("line", function(line) {
    // validateRawData(line);

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
