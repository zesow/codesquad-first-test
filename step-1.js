function pushWord({word, number, direction}) {
  
}

function validateRawData(rawData) {
  if (rawData.length !== 3) {
    throw new Error("문제 조건에 맞는 3개 파라미터를 입력하셔야 합니다.");
  }

  if (isNaN(parseInt(rawData[1]))) {
    throw new Error("두 번째 파라미터는 반드시 숫자여야 합니다.");
  }

  if (!(rawData[2].toLowerCase() === 'l' || rawData[2].toLowerCase() === 'r')) {
    throw new Error("세 번째 파라미터는 반드시 left나 right 중 하나여야 합니다.");
  }
}

function main() {
  const readline = require('readline');
  const data = {};
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on("line", function(line) {
    const rawData = line.split(" ");
    validateRawData(rawData);
    
    data.word = rawData[0];
    data.number = parseInt(rawData[1]);
    data.direction = rawData[2].toLowerCase();

    if (data.number < 0) {
      data.number *= (-1);
      data.direction = data.direction === 'l' ? 'r' : 'l';
    }
    
    const result = pushWord(data);
    console.log(result);
    
    rl.close();

  }).on("close", function() {
    process.exit();
  });
}

main();
