const readline = require('readline');
const CUBE_SIZE = 3;
const SIDE_NUMBER = 4;

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
      row += `${cube.up[i][j] + " "}`;
    }
    console.log(row);
  }

  console.log();

  for (let i = 0 ; i < CUBE_SIZE; i++) {
    let row = "";
    for (let j = 0 ; j < CUBE_SIZE; j++) {
      row += `${cube.left[i][j] + " "}`;
    }
    row.trimRight();
    row += "    ";

    for (let j = 0 ; j < CUBE_SIZE; j++) {
      row += `${cube.front[i][j] + " "}`;
    }
    row.trimRight();
    row += "    ";

    for (let j = 0 ; j < CUBE_SIZE; j++) {
      row += `${cube.right[i][j] + " "}`;
    }
    row.trimRight();
    row += "    ";

    for (let j = 0 ; j < CUBE_SIZE; j++) {
      row += `${cube.back[i][j] + " "}`;
    }
    row.trimRight();

    console.log(row);
  }

  console.log();

  for (let i = 0 ; i < CUBE_SIZE; i++) {
    let row = "               ";
    for (let j = 0 ; j < CUBE_SIZE; j++) {
      row += `${cube.down[i][j] + " "}`;
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

  let temp = [];
  if (command.charAt(0) === "U") {
    for (let i = 0 ; i < CUBE_SIZE; i++) {
      temp = [];
      for (let j = 0; j < CUBE_SIZE; j++) {
        temp.push(cube.up[i][j]);
      }
      selectedFaceAndRows.face.push(temp);
    }

    temp = [];
    for (let i = 0; i < CUBE_SIZE; i++) {
      temp.push(cube.left[0][i]);
    }
    selectedFaceAndRows.rows.push(temp);

    temp = [];
    for (let i = 0; i < CUBE_SIZE; i++) {
      temp.push(cube.front[0][i]);
    }
    selectedFaceAndRows.rows.push(temp);

    temp = [];
    for (let i = 0; i < CUBE_SIZE; i++) {
      temp.push(cube.right[0][i]);
    }
    selectedFaceAndRows.rows.push(temp);

    temp = [];
    for (let i = 0; i < CUBE_SIZE; i++) {
      temp.push(cube.back[0][i]);
    }
    selectedFaceAndRows.rows.push(temp);
    
  }
  else if (command.charAt(0) === "L") {
    
  }
  else if (command.charAt(0) === "F") {
    
  }
  else if (command.charAt(0) === "R") {
    
  }
  else if (command.charAt(0) === "B") {
    
  }
  else if (command.charAt(0) === "D") {
    
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
  const cube = {
    up : [["B", "B", "B"], ["B", "B", "B"], ["B", "B", "B"]],
    left : [["W", "W", "W"], ["W", "W", "W"], ["W", "W", "W"]],
    front : [["O", "O", "O"], ["O", "O", "O"], ["O", "O", "O"]],
    right : [["G", "G", "G"], ["G", "G", "G"], ["G", "G", "G"]],
    back : [["Y", "Y", "Y"], ["Y", "Y", "Y"], ["Y", "Y", "Y"]],
    down : [["R", "R", "R"], ["R", "R", "R"], ["R", "R", "R"]]
  };

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
