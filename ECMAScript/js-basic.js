console.log("자바스크립트 세계에 오신것을 환영합니다");

//scope of var (var 생명 주기)

// var fruits = "apple";

// var count = 5;

// let message = "사과의 갯수는 ?";
// console.log(message);

// if (count > 4) {
//     let message = "사과의 갯수는 5개 입니다.";
//     console.log(message);
// }

// console.log(message);   // 사과의 갯수는 5개 입니다. 출력

// 객체의 경우 객체의 '속성'은 업데이트 가능
const fruits = {
    fruits: "apple",
    count: 5,
    message: "사과 5개",
};

console.log(fruits)
console.log("-------------------------------");
fruits.count = 4;
fruits.fruits = "banana";
fruits.message = "사과 4개";
console.log(fruits);

// 변수 : 하나의 값을 저장할 수 있는 저장공간
// var, let : 변할 수 있는 값 (단, let은 호이스팅 발생 안함)
// const 절대로 바뀌지 않는 상수

// 변수 호이스팅 : 괄호안에서만 사용,  let, const는 호이스팅 발생 안함