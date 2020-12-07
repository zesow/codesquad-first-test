const readline = require('readline');

/**
 * @description pushWord 메서드는 문제 조건대로 문자열을 밀어준다.
 * @param {string} word 밀어야 하는 단어
 * @param {number} number 밀어야 하는 횟수
 * @param {string} direction 밀어야 하는 방향
 * @returns {string} result 밀린 문자열
 */
function pushWord({word, number, direction}) {
  let result = word;
  for (let i = 0 ; i < number ; i++) {
    if (direction === 'l') {
      result = result.substring(1) + result.substring(0, 1);
    }
    else {
      result = result.substring(result.length - 1) + result.substring(0, result.length - 1);
    }
  }
  return result;
}

/**
 * @description validateRawData 메서드는 입력받은 데이터가 문제 조건에 맞는지 검사한다.
 * @param {Array} rawData 입력받은 Input 값
 */
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

/**
 * @description preprocessRawData 메서드는 입력받은 횟수 수가 음수일 경우 방향을 바꿔주고, 입력받은 데이터를 객체로 변환시켜 준다.
 * @param {Array} rawData 입력받은 Input 값
 * @returns {Object} data 각 Input값의 의미를 Key로 갖도록 변환된 객체
 */
function preprocessRawData(rawData) {
  const data = {};

  data.word = rawData[0];
  data.number = parseInt(rawData[1]);
  data.direction = rawData[2].toLowerCase();

  if (data.number < 0) {
    data.number *= (-1);
    data.direction = data.direction === 'l' ? 'r' : 'l';
  }

  return data;
}

function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on("line", function(line) {
    const rawData = line.split(" ");
    validateRawData(rawData);
    
    const processedData = preprocessRawData(rawData);

    const result = pushWord(processedData);
    console.log(result);
    
    rl.close();
  }).on("close", function() {
    process.exit();
  });
}

main();
