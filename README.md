# codesquad-first-test
코드스쿼드 마스터즈 코스 과정 1차 테스트 구현 Repository 입니다.

# Step1 : 단어 밀어내기 구현하기
![step-1](https://user-images.githubusercontent.com/14235802/101314957-fd42d000-389c-11eb-9720-467d81b2edb5.gif)
- 기본적인 입출력, 조건문 & 반복문 & 함수 구현 에 약간의 예외처리를 확인하는 과제였습니다.

- 함수는 3가지로 나누어 주었습니다.
  1. 실제 단어를 방향 및 횟수대로 밀어주는 함수 pushWord
  2. 입력이 문제 조건에 맞게 들어왔는지 확인하는 함수 validateRawData
  3. 들어온 입력을 각 값의 의미에 맞도록 K - V 형태의 객체로 만들어주는 함수 preprocessRawData
  
- 예외처리는 크게 2가지를 해 주었습니다. 
  1. 잘못된 Input값이 들어왔을 경우 => 에러 던지고 프로그램 종료
  2. 반복해야 할 숫자가 음수일 경우 => 양수로 바꿔주고 방향을 전환

# Step2 : 평면 큐브 구현하기
![step-2](https://user-images.githubusercontent.com/14235802/101349130-33e60e00-38d0-11eb-973d-7df6c03d542c.gif)
- side-effect를 일으킬 수 있는 전역변수 금지와 하나의 큰 일을 여러 개의 함수 단위로 나눈다(Divide And Conquer) 는 개념을 배우는 과제였습니다.
- 문제 조건에 L과 B는 미는 방향이 반대라, 정확히 조건을 파악하지 않으면 거꾸로 구현되는 함정이 있는 문제였습니다.
- 하나의 큰 일(주사위를 돌린다 = rotateCube) 에 3가지 작은 일이 딸려 있는 방식으로 구현했습니다. 작은 일은 다음과 같습니다.
  1. 조작할 줄을 가져온다 = getRow
  2. 명령어에 맞는 방향으로 줄을 밀어준다 = pushRow
  3. 밀어준 줄을 다시 큐브에 반영해 준다 = appendRowToCube

# Step3

# 후기
