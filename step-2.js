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
  const commandNumMapper = {
    "U"  : 0,
    "U'" : 1,
    "R"  : 2,
    "R'" : 3,
    "L"  : 4,
    "L'" : 5,
    "B"  : 6,
    "B'" : 7,
    "Q"  : 8,
  }
  const commandStack = [];
  for (let i = line.length - 1 ; i >= 0; i--) {
    if (line.charAt(i) === "'") {
      i -= 1;
      commandStack.push(commandNumMapper[line.charAt(i) + "'"]);
    }
    else {
      commandStack.push(commandNumMapper[line.charAt(i)]);
    }
  }
  return commandStack;
}

function getRow(cube, commandNum) {
  const selectedRow = [];

  if (commandNum === 0 || commandNum === 1) {
    for (let i = 0 ; i < CUBE_SIZE; i++) {
      selectedRow[i] = cube[0][i];
    }
  }
  else if (commandNum === 2 || commandNum === 3) {
    for (let i = 0 ; i < CUBE_SIZE; i++) {
      selectedRow[i] = cube[i][2];
    }
  }
  else if (commandNum === 4 || commandNum === 5) {
    for (let i = 0 ; i < CUBE_SIZE; i++) {
      selectedRow[i] = cube[i][0];
    }
  }
  else if (commandNum === 6 || commandNum === 7) {
    for (let i = 0 ; i < CUBE_SIZE; i++) {
      selectedRow[i] = cube[2][i];
    }
  }

  return selectedRow;
}

function pushRow(selectedRow, commandNum) {

}

function appendRowToCube(cube, pushedRow) {

}

function rotateCube(commandStack, cube) {
  while (commandStack.length > 0) {
    const commandNum = commandStack.pop();
    const selectedRow = getRow(cube, commandNum);
    const pushedRow = pushRow(selectedRow, commandNum);
    appendRowToCube(cube, pushedRow);
    
    // switch (commandNum) {
    //   case 0 :
    //     const selectedRow = get;
    //     break;
    //   case 1 :
    //     break;
    //   case 2 :
    //     break;
    //   case 3 :
    //     break;
    //   case 4 :
    //     break;
    //   case 5 :
    //     break;
    //   case 6 :
    //     break;
    //   case 7 :
    //     break;
      
    // }

    printCube(cube);
  }
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
    rotateCube(commandStack, cube)
    
    rl.prompt();
  }).on("close", function() {
    process.exit();
  });
}

main();
