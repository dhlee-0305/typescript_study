export {};

// conditional type - 조건부 타입은 조건에 따라 다른 타입을 선택할 수 있는 문법입니다.
// 마치 자바스크립트의 삼항 연산자처럼 조건을 확인 후 조건에 따라 다른 타입을 추론해 줍니다.

// 조건부 타입의 기본 문법은 다음과 같습니다.
// 조건 식 ? 첫번째타입 : 두번째타입
// 조건식이 참이면 첫번째 타입이 되고, 거짓이면 두번재타입이 됩니다.
// 조건식은 대부분 TypeA extends TypeB와 같이 extends로 구성됩니다.

interface Person{
    name: string;
    age: number;
}

interface Developer extends Person{
    skill: string;
}
type Result = Developer extends Person ? string : number;
// 위 코드에서 Result 타이은 string이 됩니다. 왜냐하면 앞의 조건식 Developer extends Person이 참이기 때문입니다.

type Result2 = Developer extends boolean[] ? string : number;
// Result2는 number 타입이 됩니다. 

//-----------------------------------------------------------------
// 조건부 타입이 유용한 경우
// 조건부 타입은 주로 제네릭을 사용할 때 유용합니다.
// 제네릭으로 받은 타입이 예상되는 범위 안에 있는지 확인할 때 사용하면 좋죠.
interface Person2{
    name: string;
    age: number;
}
interface Developer2{
    name: string;
    skill: string;
}
type SkillProperty<T> = T extends { skill: string } ? T['skill'] : never;
// 위 코드에서 SkillPrpperty<T> 타입은 제네릭으로 넘겨 받은 T 타입에 skill 속성이 있는지 확인하고,
// 있다면 해당 속성에 지정된 타입을 반환해 줍니다.
// 이 타입에 Person2, Developer2 인터페이스를 대입하면 각각 never와 string이 나옵니다.
type A = SkillProperty<Person2>; // never
type B = SkillProperty<Developer2>; // string
// 위 코드에서 A 타입은 Person 인터페이스에서 skill 속성이 없으므로 never가 됩니다.
// B 타입은 Developer 인터페이스에 skill 속성이 있고 string 타입이므로 string이 됩니다.

//-----------------------------------------------------------------
// 조건부 타입의 다른 예시들
type IsString<T> = T extends string ? string : never;
type a = IsString<string>; // string
type b = IsString<boolean>; // never

type Filter<Type, ManyTypes> = Type extends ManyTypes ? Type : never;
type c = Filter<string, string | number>; // string
type d = Filter<boolean, string | number | boolean>; // booelan;