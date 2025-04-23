/*
    컴퓨터 과학에서 인터페이스는 상호 간에 정의한 약속 혹은 규칙을 의미합니다.
    타입스크립트에서 인터페이스는 객체 타입을 정의할 때 사용됩니다.
    인터페이스는 객체 타입 뿐만 아니라 다음 범주에 대해서도 타입을 정의할 수 있습니다.
    - 객체의 스팩(속성과 속성의 타입)
    - 함수의 파라미터
    - 함수의 스팩(파라미터, 반환 타입 등)
    - 배열과 객체를 접근하는 방식
    - 클래스
*/
//-----------------------------------------------------------------
let person = {name: 'Capt', age: 28};
function logAge(obj: {age: number}) {
    console.log("logAge - age:" + obj.age);
}
logAge(person);
//-----------------------------------------------------------------
// 타입 뿐만 아니라 객체의 속성 타입까지 정의할 수 있습니다.
interface personAge{
    age: number;
}
function logAge2(obj: personAge){
    console.log("logAge2 - age:" + obj.age);
}
let person2 = {name: 'Capt', age: 38};
logAge2(person2);
//-----------------------------------------------------------------
// ?로 속성을 생략하도록 설정할 수 있습니다. - 옵션 속성
interface CraftBeer{
    name: string;
    hop?: number;
}
let myBeer = {
    name: 'Heineken'
};
function brewBeer(beer: CraftBeer){
    console.log("brewBeer - name:" + beer.name);
}
brewBeer(myBeer);
//-----------------------------------------------------------------
// readonly 속성은 객체가 생성된 후에는 값을 변경할 수 없습니다.
interface CraftBeer2{
    readonly brand: string;
}
let myBeer2: CraftBeer2 = {
    brand: 'Belgian Monk'
};
//myBeer2.brand = 'Belgian Monk 2'; // Error: Cannot assign to 'brand' because it is a read-only property.
//-----------------------------------------------------------------
let arr: ReadonlyArray<number> = [1,2,3];
//arr.splice(0,1); // error
//arr.push(4); // error
//arr[0] = 100; // error
//-----------------------------------------------------------------
// 인터페이스는 함수의 타입을 정의할 때에도 사용할 수 있습니다.
interface login{
    (username: string, password: string): boolean;
}
let loginUser: login;
loginUser = function(id: string, pw: string){
    console.log("loginUser - id:" + id + " pw:" + pw+" 로그인 했습니다.");
    return true;
}
loginUser("dhlee", "1234");
//-----------------------------------------------------------------
interface craftBeer3{
    beerName: string;
    nameBeer(beer: string): void;
}
class myBeer3 implements craftBeer3{
    beerName: string = 'Baby Guinness';;
    nameBeer(b: string){
        console.log("myBeer3 - before beerName:" + this.beerName);
        this.beerName = b;
        console.log("myBeer3 - after beerName:" + this.beerName);
    }
    constructor(){}
}
let myBeer3Obj = new myBeer3();
myBeer3Obj.nameBeer("New Baby Guinness");
//-----------------------------------------------------------------
interface Person{
    name: string;
}
interface Drinker{
    drink: string;
}
interface Developer extends Person, Drinker{
    skill: string;
}
let fe = {} as Developer;
fe.name = "dhlee";
fe.skill = "java";
fe.drink = "beer";
console.log("fe - name:" + fe.name + " skill:" + fe.skill + " drink:" + fe.drink);
//-----------------------------------------------------------------
interface CraftBeer4{
    (beer: string): string;
    brand: string;
    brew(): void;
}
function myBeer4(): CraftBeer4{
    let my = (function(beer: string){}) as CraftBeer4;
    my.brand = 'Beer Kitchen';
    my.brew = function(){
        console.log("myBeer4 - brew():" + this.brand);
    }
    return my;
}
let brewedBeer = myBeer4();
brewedBeer('My First Beer');
brewedBeer.brew();
//-----------------------------------------------------------------