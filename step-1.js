const readline = require('readline');

function pushWord({word, number, direction}) {
  return "";
}

function validateRawData(rawData) {
  if (rawData.length !== 3) {
    throw new Error("문제 조건에 맞는 3개 파라미터를 입력하셔야 합니다.");
  }
}

function main() {
  const data = {};
  const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  readLine.on("line", function(line) {
    readLine.close();
    const rawData = line.split(" ");
    validateRawData(rawData);

    data.word = rawData[0];
    data.number = parseInt(rawData[1]);
    data.direction = rawData[2];
    
    const result = pushWord(data);
    console.log(result);


  }).on("close", function() {
    process.exit();
  });
}

main();
