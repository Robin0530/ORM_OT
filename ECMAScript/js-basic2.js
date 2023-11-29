// 1.변수 할당 재선언 데이터 타입 기본 이론 설명
var name2 = "우성우" // 문자열
var age = 30;       // 정수
var remain = 0.5;   // 실수
var bool = true;    // 참과 거짓 자료형

// js 에서 출력문
console.log(name2);
console.log(age);
console.log(remain);
console.log(bool);

// ---------------------------------- 11월 24일 JS 학습 ----------------------------------- //

// 변수
// 1. 변수는 문자와 숫자, $와 _만 사용
// 2. 첫글자는 숫자가 될 수 없다.
// 3. 예약어는 사용할 수 없다.
// 4. 가급적 상수는 대문자로 작성
// 5. 변수명은 읽기 쉽고 이해할 수 있게 선언

// var name = "Mike";
// var age = 30;
// console.log(name,age)

// ------------------------------------------------------- //

// const age = 30;
// const PI = 3.14;

// console.log(1 + 2);     // 3
// console.log(10 - 3);    // 7
// console.log(3 * 2);     // 6
// console.log(6 / 3);     // 2
// console.log(6 % 4);     // 2

// ------------------------------------------------------- //

// Boolean
// const a = true;
// const b = false;

// const name = "mike";
// const age = 30;

// console.log(name == "mike");    // true
// console.log(age > 40);          // false

// ------------------------------------------------------- //

// typeof 연산자
// const name = "mike";

// console.log(typeof 3)           // number
// console.log(typeof name)        // string
// console.log(typeof true)        // boolean
// console.log(typeof "xxx")       // string
// console.log(typeof null)        // object
// console.log(typeof undefined)   // undefined

// ------------------------------------------------------- //

// const name = "mike";

// const message = `my name is ${name}`;
// const message2 = "my name is ${name}"

// console.log(message);   // my name is mike
// console.log(message2);  // my name is ${name}

// ------------------------------------------------------- //

// const name = "mike";

// const a = "나는 ";
// const b = " 입니다.";

// console.log(a + name + b);          // 나는 mike 입니다.

// const age = 30;
// console.log(a + age + "살" + b);    // 나는 30살 입니다.

// ------------------------------------------------------- //

// // 자동 형변환
// // prompt로 입력받은 값는 문자형으로 입력받음

// const mathScore = prompt("수학 몇점?"); // 90
// const engScore = prompt("영어 몇점?");  // 80
// const result = (mathScore + engScore) / 2;

// console.log(result)
// // 문자로 받아와서 mathScore + engScore 는 "9080"으로 받아옴
// // 문자형이여도 /2를 하면 숫자로 자동 형변환 되어 "9080"/2 = 4540 으로 계산됨

// ------------------------------------------------------- //

// 명시적 형변환
// String()     // 문자형으로 형변환
// Number()     // 숫자형으로 형변환 ==> Number("문자") // 문자형 포함되어 있으면 NaN
// Boolean()    // 불린형으로 형변환 ==> 숫자0, 빈문자열", null, undefined, NaN

// console.log(    // true true true
//     Boolean(1),
//     Boolean(123),
//     Boolean("javascript")
// )

// console.log(    // false false false false false
//     Boolean(0),
//     Boolean(""),
//     Boolean(null),
//     Boolean(undefined),
//     Boolean(NaN),
// )

// 주의사항
// Number(null) // 0
// Number(undefiend) // NaN

// Number(0)    // false
// Number('0')  // true
// Number("")   // false
// Number(' ')  // true

// ------------------------------------------------------- //

// // 연산자
// // 연산자 우선순위 *, /  >  +, -

// // 연산자 줄여서 쓰기
// // let num = 10;
// // // num = num + 5;
// // num += 5;
// // console.log(num);   // 15

// // 증가 연산자, 감소 연산자
// let num = 10;

// // let result = num++;  // 10
// let result = ++num;     // 11

// console.log(result);

// ------------------------------------------------------- //

// 비교 연산자(왼쪽편 기준으로 오른쪽을 비교) <, >, <=, >=, ==, !=

// a != 3   // true or false

// console.log(10 > 5);    // true
// console.log(10 == 5);   // false // 동등연산자
// console.log(10 != 5);   // true

// // 동등 연산자
// const a = 1;
// const b = "1";
// console.log(a === b);   // false // 일치 연산자(데이터타입까지 비교)

// ------------------------------------------------------- //

// 조건문
// const age = 19;

// if (age > 19) {
//     console.log("환영 합니다.");
// } else if (age === 19) {
//     console.log("수능 잘 치세요.");
// } else {
//     console.log("안녕히 가세요.")
// }

// ------------------------------------------------------- //

// 논리 연산자 ||(OR), && (AND), !(NOT)
// OR

// const name = "mike";
// const age = 10;

// // if (name === 'tom' || age > 19 ) {
// // console.log('통과'); 
// // }

// if(name === 'mike' && age > 19) {
//     console.log('통과');
// } else {
//     console.log('돌아가');
// }

// 영화티켓 구매
// const male = "남자";
// const age = 20;
// const people = 1;

// if (people === 1 && age >= 20  && male == '남자') {
//     console.log("10000원");
// } else {
//     console.log("전부무료")
// }

// ------------------------------------------------------- //

// 우선순위
// 성별이 여자이고 , 나이가 30살이거나 사는곳이 인천이면 통과
// const gender = "F";
// const age = 30;
// const place = "인천";

// if (gender === "F" && (age === 32 || place === "인천")) {
//     console.log("통과");
// } else {
//     console.log("불가");
// }

// ------------------------------------------------------- //

// 반복문
// for (let i = 1; i < 11; i++) {
//     console.log(i+1)
// }

// // 짝수 홀수를 나누어서 출력
// for (let i = 0; i < 10; i++) {
//     if (i === 0) {
//         console.log(`${i}인 숫자는 짝수가 아닙니다`)
//     } else {
//         if (i % 2 === 0) {
//             console.log(i)
//         }
//     }
// }

// // 0~20 숫자 중 홀수만 출력을 하고 0은 홀수가 아니라고 안내를 하고, 3의 배수면 박수를 출력.
// for (let i = 0; i < 20; i++) {
//     if (i === 0){
//         console.log(`${i}은 홀수가 아닙니다.`)
//     } else {
//         if( i % 2 === 1) {
//             console.log(i)
//         }
//         if (i % 3 === 0) {
//             console.log ("박수 3")
//         }
//     }
    
// }

// ** while
// let i = 0;
// while (i < 10) {
//     console.log(i);
//     i++;
// }

// ** do.. while
// break : 멈추고 빠져나옴
// continue : 멈추고 다음 반복으로 진행

// while(true) {       // 특정 조건에서 break
//     let answer = confirm('계속 할까요?');
//     if(!answer) {
//         break;
//     }
// }

// continue
// for (let i = 0; i < 10; i++) {
//     if (i%2) {
//         continue;
//     }
//     console.log(i);
// }

// ** switch (평가) {
//     case A: 
//     // A일때 코드
//     case B:
//     // B일때 코드
// }

// let fruis = prompt('무슨 과일을 사고 싶나요?');

// switch(fruis) {
//     case '사과' :
//         console.log('100원 입니다.');
//     case '바나나':
//         console.log('200원 입니다.')
//     case '키위':
//         console.log('300원 입니다.')
//     default : 
//     console.log('그런 과일은 없습니다.');
// }

// ------------------------------------------------------- //

// 함수 작성
// function showError(){
//     alert('에러가 발생했습니다. 다시 시도해주세요. ');
// }

// showError();

// return 으로 값 반환
// function add(num1, num2) {
//     return num1 + num2;
// }

// const result = add(2,3);
// console.log(result);

// function showError () {
//     alert('에러가 발생했습니다.');
//     return;
//     alert('이 코드는 절대 실행되지 않습니다.');
// }

// const result = showError();
// console.log(result);

// 한번에 한작업에 집중
// 읽기 쉽고 어떤동작인지 알 수 있게 네이밍


// ------------------------------------------------------- //

// 함수 선언문 : 어디서든 호출 가능 (호이스팅)
// 함수 표현식 : 코드에 도달하면 생성

// let sayHello = function() {
//     console.log('hello');
// }   // 함수 표현식

// 화살표 함수 : 아래처럼 쓰면 에러
// showError();

// let showError = function() {
//     console.log('error');
// }

// 함수 선언문
// showError();

// function showError() {
//     console.log('error');
// }
// 화살표 함수로 변경 1
// let showError = () => {
//     console.log('error')
// }

// 화살표 함수로 변경 2
const sayHello = (name) => {
    const msg = `hello, ${name}`;
    console.log(msg);
}
// 화살표 함수로 변경 3
const add = (num1, num2) => {
    const result = num1 + num2;
    return result;
}