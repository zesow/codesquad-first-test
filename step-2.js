const readline = require('readline');
const CUBE_SIZE = 3;

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
      selectedRow[i] = cube[i][2];
    }
  }
  else if (command === "L" || command === "L'") {
    for (let i = 0 ; i < CUBE_SIZE; i++) {
      selectedRow[i] = cube[i][0];
    }
  }
  else if (command === "B" || command === "B'") {
    for (let i = 0 ; i < CUBE_SIZE; i++) {
      selectedRow[i] = cube[2][i];
    }
  }

  return selectedRow;
}

function pushRow(selectedRow, command) {
  const pushedRow = [];

  if (command === "U" || command === "R" || command === "L'" || command === "B'") {
    pushedRow[0] = selectedRow[1];
    pushedRow[1] = selectedRow[2];
    pushedRow[2] = selectedRow[0];
  }
  else {
    pushedRow[0] = selectedRow[2];
    pushedRow[1] = selectedRow[0];
    pushedRow[2] = selectedRow[1];
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
      cube[i][2] = pushedRow[i];
    }
  }
  else if (command === "L" || command === "L'") {
    for (let i = 0 ; i < CUBE_SIZE; i++) {
      cube[i][0] = pushedRow[i];
    }
  }
  else if (command === "B" || command === "B'") {
    for (let i = 0 ; i < CUBE_SIZE; i++) {
      cube[2][i] = pushedRow[i];
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
