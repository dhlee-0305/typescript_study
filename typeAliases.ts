// type aliases
const ta_name: string = "kim";

type MyName = string; // 타입 별칭
const name3: MyName = "capt"; // 타입 별칭을 사용하여 변수를 선언할 수 있습니다.

type TA_Developer = {
    name: string;
    skill: string;
}
type TA_User<T> = {
    name: T;
}

// 타입 별칭은 새로운 타입 값을 하나 생성하는 것이 아니라 정의한 타입에 대해 나중에 쉽게 참고할 수 있게 이름을 부여하는 것과 같습니다.
interface I_Developer{
    name: string;
    skill: string;
}

let ta_capt: I_Developer;

// type vs interface
// 타입과 인터페이스의 가장 큰 차이점은 타입의 확장 가능/불가능 여부 입니다.
// 인터페이스는 확장이 가능한 데 반해 타입 별칭은 확장이 불가능합니다.
// 따라서, 가능한한 type 보다는 interface로 선언하여 사용하는 것을 추천합니다.
