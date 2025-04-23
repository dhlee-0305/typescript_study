export {};

// 타입스크립트 infer는 조건부 타입에서 미리 정의되지 않은 타입을 유연하게 정의할 수 있게 도와주는 문법입니다.
// 항상 조건부 타입 문법과 같이 사용되며 복잡한 타입 코드를 줄여줍니다.

//-----------------------------------------------------------------
// infer 예시
// infer의 역할을 이해하기 위해서 먼저 간단한 코들를 살펴보겠습니다.
// 배열의 요소 타입을 조건부 타입 문법과 infer로 꺼내보겠습니다.
type ElementType<T> = T extends (infer ArrayElement)[] ? ArrayElement : T;
// 위 코드는 ElementType 타입에 제네릭으로 넘기 배열 타입의 요소 타입을 반환합니다.
// 예를 들어, string[] 타입을 넘기면 string을 반환하고, number[] 타입을 넘기면 number 타입을 반환하죠.
// 배열 타입이 아닌 타입들은 건드리지 않고 그대로 통화됩니다.

// 배열 타입을 넘긴 경우
type Result1 = ElementType<string[]>; // string
type Result2 = ElementType<number[]>; // number

// 배열 형태가 아닌 타입을 넘긴 경우
type Result3 = ElementType<boolean>; // boolean

// ElementType 타입 코드로 돌아가서 infer를 보면 ArrayElement 이라는 타입 앞에 사용되었습니다.
// type ElementType<T> = T extends (infer ArrayElement)[] ? ArrayElement : T; // 10라인 동일 코드
// 이 ArrayElement은 조건부 타입 구문 안에서만 인식되는 타입 변수입니다.
// 조건문 밖에서는 인식할 수 없다고 나오죠.
// 이처럼 infer 키워드 뒤에 나오는 타입은 미리 정의되어 있지 않지만 마치 정의된 것처럼 사용할 수 있게 됩니다.
// 지정될 타입의 데이터 구조를 정확하게 알 순 없지만 대략 이런 형상일거다 라고 말한ㄴ 것과 같죠.
// 현재 ElementType 타입에서 infer는 마치 다음과 같이 정의된 타입 코드를 쓰는 것과 같습니다.
/*
type ElementType<T> = T extends string[] ? string : T;
type ElementType<T> = T extends number[] ? number : T;
type ElementType<T> = T extends boolean[] ? boolean : T;
type ElementType<T> = T extends never[] ? never : T;
*/
// "ElementType 타입의 제네릭으로 어떤 타입이 할당될진 모르겠지만 일단 배열 타입이다. 그러니 문자열(string), 숫자(number), 진위값(boolean) 등 어떤 배열 타입이 들어와도 취급해줘."
// 라는 의미와 같습니다. 이렇게 하는 이유는 제네릭 타입이 무수히 많고 다양한 타입이 들어올 수 있을텐데 그 타입에 대비해서 미리 다 정의해 둘 수 없기 때문입니다.
// "대략적으로 이런 형상의 데이터가 들어올 거니 취급해줘"가 바로 infer 키워드의 역할이다.

//-----------------------------------------------------------------
// infer의 유효범위
// 앞에서 infer 뒤에 나오는 타입은 조건부 안에서만 사용될 수 있다고 했는데요. 요걸 좀 더 체감할 수 있는 예제를 살펴보겠습니다.
type InferExample<T> = T extends infer Person ? Person : never;
// 이 코드는 InferExample에 어떤 타입을 넘기든 해당 타입으로 추론됩니다. 다음과 같이 말이죠.
type Result4 = InferExample<{name: '캡틴'}>; // {name: string}
// 위 코드만 봤을 때는 제네릭 타입의 형상이 {name: string}을 만족하면 되는 것 같습니다. 그럼 다음과 깉이 코드를 작성할 수 있을까요?
type InferExmaple2<T> = T extends infer Person ? Person : never;
type Result5 = InferExmaple2<{name: "캡팡"}>;

const capt: Person = {
    name: "캡아"
};
// 이 코드는 다음과 같이 Person 타입을 찾을 수 없다는 에러가 발생합니다.
// infer.ts(49,13): error TS2304: Cannot find name 'Person'.
// 이처럼 infer는 조건부 타입 구문 안에서만 인식될 수 있는 타입 변수를 정의할 수 있게 해줍니다.

//-----------------------------------------------------------------
// infer로 함수 반환 타입을 추론하는 커스텀 타입 만들기
// 이번엔 infer로 함수 타입을 추론해 주는 커스텀 타입을 만들어 보겠습니다.
type ReturnTypeOf<F> = F extends () => infer R ? R : never;
// 이 ReturnTypeOf 타입은 반환 타입이 지정된 함수를 제네릭 타입에 넘기면 반환 타입을 알 수 있습니다.
// 예를 들어, 다음 2개 코든 모두 함수의 반환 타입을 정상적으로 찾아줍니다.
type Result6 = ReturnTypeOf<() => boolean>; // booelan
type Result7 = ReturnTypeOf<() => string>; // string

// 반대로 함수에 파라미터가 있거나 함수가 아닌 타입에 대해서는 never 타입으로 간주합니다.
type Result8 = ReturnTypeOf<(a: string) => boolean>; // never
type Result9 = ReturnTypeOf<number>; // never

// ReturnTypeOf 타입 코드로 돌아가서 이번엔 코드의 구조를 다시 살펴보겠습ㄴ디ㅏ.
// type ReturnTypeOf<F> = F extends () => infer R ? R : never;
// () => infer // 함수 형상
// ? R // 함수 형상에서 infer로 정의된 반환 타입
// extends 뒤에 있는 () => infer R은 반환 타입이 뭔지 모르겠지만 일단 반환 타입이 있는 함수를 의미합니다.
// () => boolean, () => string 모두 다 여기에 해당하죠.
// 이처럼 반환 타입으로 어떤 타입이 올지 알 수 없기 때문에 infer 키워드를 사용했습니다.

// 그리고 infer R은 조건식이 참일 경우의 분기문에서 사용되고 있습니다. 조건식 ? R : never 처럼 말이죠.
// 함수 형상에서 infer로 정의된 반환 타입 R을 그대로 리턴해 줍니다. 그래서 아래 코드는 최종적으로 boolean이 되죠.
type Result10 = ReturnTypeOf<() => boolean>; // boolean