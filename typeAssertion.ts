export {};

// type assertion - 타입 단언은 개발자가 해당 타입에 대해 확신이 있을 때 사용하는 타입 지정 방식입니다.
// 다른 언어의 타입 캐스팅과 비슷한 개념이며 타입스크립트를 컴파일 할 때 타입을 체크하지 않고,
// 데이터 구조도 신경쓰지 않습니다.

const name5: string = "capt";
// 타입 단언 적용
const name6 = "capt" as string;

// 타입 단언은 컴파일러보다 개발자가 더 해당 타입을 잘 알고 있을 때 사용해야 합니다.
// 혹은, 자바스크립트 기반 코드에 점진적으로 타입스크립트를 적용할 때도 자주 사용됩니다.
// 예를 들어, 다음과 같은 자바스크립트 코드가 있다고 가정해봅시다.

// app.js
const capt5 = {};
//capt5.name = "capt";  // Error
//capt5.age = 100;      // Error

interface Hero{
    name: string;
    age: number;
}

//const capt6: Hero = {}; // Error - capt6 변수가 정의되는 시점에서 name, age 등의 속성이 정의되지 않았기 때문에 에러가 발생합니다.
//capt6.name = "capt";  
//capt6.age = 100;      

// ==> 수정
interface Hero2{
    name: string;
    age: number;
}

const capt = {} as Hero2; // 오류 없음
capt.name = "capt"; // 오류 없음
capt.age = 100; // 오류 없음
