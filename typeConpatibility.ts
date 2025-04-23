// Type Compatibility - 타입 호환
// 기본적으로 자바스크립트는 객체 리터럴이나 익명 함수 등을 사용하기 때문에
// 명시적으로 타입을 지정하는 것보다 코드의 구조 관점에서 타입을 지정하는 것이 더 잘 어울립니다.
interface Ironman{
    name: string;
}

class Avengers{
    name: string;
}

let i: Ironman;
i = new Avengers(); // OK, because class is a subtype of interface
i.name = "Ironman"; 
console.log(i.name); // Ironman
//-----------------------------------------------------------------
// structural typing - 구조적 타이핑 : 구조 관점에서 타입이 서로 호환되는지의 여부를 판단하는 것입니다.
interface Avengers2{
    name: string;
}

let hero: Avengers2;
// typescript가 추론한 y의 타입은 {name: string; location; string;} 입니다.
let capt = {name: "captain", location: "USA"}; // {name: string; location; string;}
hero = capt;
// capt가 hero 타입에 호환될 수 있는 이유는 capt의 속성 중에 name이 있기 때문입니다.
// Avengers2 인터페이스에서 name 속성을 갖고 있기 때문에 capt는 Avengers2 타입에 호환됩니다.
console.log("hero - name:"+hero.name+", location:"+capt.location); // hero - name:captain, location:USA

function assenble(a: Avengers2){
    console.log("assembling ~ " + a.name);
}
assenble(capt); // capt 변수에 이미 name 속성 뿐만 아니라 location 속성도 있기 때문에 assemble() 함수의 호출 인자로 넘길 수 있습니다.
//-----------------------------------------------------------------
// Soundness - 타입의 안전성 : 타입스크립트는 컴파일 시정에 추론할 수 없는 특정 타입에 대해서는 일단 안전하다고 보는 특성이 있습니다.
// 이걸 "들리지 않는다(it is said to not be sound)"라고 표현합니다.
//-----------------------------------------------------------------
// 이넘 타입은 number 타입과 호환되지만 이넘 타입끼지는 호환되지 않습니다.
enum Status{Ready, Waiting};
enum Color{Red, Green, Blue};

let status2 = Status.Ready;
//status2 = Color.Red; // Error
//-----------------------------------------------------------------
// 클래스 타입은 클래스 타입끼리 비교할 때 static member와 constructor를 제외하고 속성만 비교합니다.
class Hulk{
    handSize: number;
    name2: string;
    constructor(name: string, name2: string, numHand: number){}
}
class Caption{
    handSize: number;     
    name2: string;
    constructor(numHand: number, name2: string){}
}
let a: Hulk;
let b: Caption;
if(a == b){                    
    console.log("Hulk == Caption");
}else{
    console.log("Hulk != Caption");
}
if(a === b){
    console.log("Hulk === Caption");
}else{
    console.log("Hulk !== Caption");
}
//-----------------------------------------------------------------
// Generics - 제네릭 : 제네릭은 제네릭 타입 간의 호환 여부를 판단할 때 인자<T>가 속성에 할당 되었는지를 기준으로 합니다.
interface Empty<T>{}
let c: Empty<number>;
let d: Empty<string>;
if(c === d){
    console.log("Empty<number> === Empty<string>");
}else{
    console.log("Empty<number> != Empty<string>");
}
// 위 인터페이스는 속성이 없기 때문에 c, d는 같은 타입으로 간주됩니다.
// 하지만 아래와 같이 속성이 있는 인터페이스는 서로 다른 타입으로 간주됩니다.
interface NotEmpty<T>{
    data: T;
}
let x: NotEmpty<number>;
let y: NotEmpty<string>;
//x = y; // Error: Type 'NotEmpty<string>' is not assignable to type 'NotEmpty<number>'.
//-----------------------------------------------------------------
