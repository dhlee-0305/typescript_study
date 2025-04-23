export {};

// Mapped Type - 맵트 타입이란 기존에 정의되어 있는 타입을 새로운 타입을 변환해 주는 문법을 의미합니다.
// 마치 자바스크립트 map() API 함수를 타입에 적용한 것과 같은 효과를 가집니다.

// 자바스크립트의 map() 함수란?
// 자바스크립트의 map API는 배열을 다룰 때 유용한 자바스크립트 내장 API입니다.
// 맵드 타입은 자바스크립트의 map함수를 타입에 적용했다고 보시면됩니다.
var arr = [{id: 1, title: '함수'}, {id: 2, title: '변수'}, {id: 3, title: '인자'}];
var result = arr.map(function(item){
    return item.title;
});
console.log(result);
//-----------------------------------------------------------------
// 맵드 타입의 기본 문법
/*
{[P in K]: T}
{[P in K?: T]}
{readonly [P in K]} : T}
{readonly [P in K]}? : T}
*/
/*
    위와 같이 [P in K]: string 형태가 인덱스 시그니처를 의미합니다.
    인덱스 시그니처는 미리 정해지지 않은 객체의 속성 타입을 정의할 때 사용하면 좋습니다.
*/
interface Heroes{
    [key: string]: string
}
const hero: Heroes = {hulk: '헐크', ironman: '아이언맨'};
console.log(hero.hulk); // 헐크
console.log(hero['ironman']); // 아이언맨
//-----------------------------------------------------------------
// 맵드 타입 기본 예제
type Avengers = 'Hulk' | 'Ironman' | 'Thor' | 'CaptainAmerica';

// 이름에 각각 나이까지 붙인 객체를 만들고자 하는 경우
type AvengersProfiles = { [K in Avengers]: number };
const avengerInfo: AvengersProfiles = {
    Hulk: 40,
    Ironman: 50,
    Thor: 30,
    CaptainAmerica: 35
};
console.log(avengerInfo); // { Hulk: 40, Ironman: 50, Thor: 30, CaptainAmerica: 35 }
/*
    위 코드에서 [K in Avengers] 부분은 마치 자바스크립트의 for in 문법과 유사하게 동작합니다.
    앞에서 정의한 Avengers 타입의 4개의 문자열을 각각 순회하여 number 타입을 가지는 객체의 키로 정의가 됩니다.
    예를 들면 아래과 같이 말이죠.
    {Hulk : number}
    {Ironman: number}
    {Thor: number}
    {CaptainAmerica: number}

    따라서 위의 원리가 적용된 AvengersProfiles 타입은 다음과 같이 해석할 수 있습니다.
    type AvengersProfile = {
        Hulk: number, 
        Ironman: number, 
        Thor: number, 
        CaptainAmerica: number
    }
*/

//-----------------------------------------------------------------
// 맵드 타입 실용 예제 1
// 아래 코드는 키와 값이 있는 객체를 정의하는 타입을 받아 그 객체의 부분 집합을 만족하는 타입으로 변환해주는 문법입니다.
type Subset<T> = {
    [K in keyof T]?: T[K];
}
// 아래와 같은 인터페이스가 있다고 할 때
interface Person{
    age: number;
    name: string;
}
// 위 Subset 타입을 적용하면 아래와 같은 객체를 모두 정의할 수 있습니다.
const ageOnly: Subset<Person> = {age: 23};
const nameOnly: Subset<Person> = {name: 'Tony'};
const ironman: Subset<Person> = {age: 23, name: 'Tony'};
const empty: Subset<Person> = {};

//-----------------------------------------------------------------
// 맵드 타입 실용 예제 2
// 아래과 같이 사용자 프로필을 조회하는 API 함수가 있다고 했을 때
interface UserProfile{
    username: string;
    email: string;
    profilePhotoUrl: string;
}

function fetchUserProfile(): UserProfile{
    // ...
    return undefined as UserProfile;
}
// 이 프로파일 정보를 수정하는 API는 아마 아래와 같은 형태일 것입니다.
interface UserProfileUpdate{
    username?: string;
    email?: string;
    profilePhotoUrl?: string;
}
function updateUserProfile(profile: UserProfileUpdate): void{
    // ...
}
// 이 때 아래와 같이 동일한 타입에 대해서 반복해서 선언하는 것을 피해야 합니다.
/*
interface UserProfile{
    username: string;
    email: string;
    profilePhotoUrl: string;
}
interface UserProfileUpdate{
    username?: string;
    email?: string;
    profilePhotoUrl?: string;
}
*/
// 위의 인터페이스에서 반복되는 구조를 아래와 같은 방식으로 재활용할 수 있습니다.
type UserProfileUpdate2 = {
    username?: UserProfile['username'];
    email?: UserProfile['email'];
    profilePhotoUrl?: UserProfile['profilePhotoUrl'];
}
// 혹은 좀 더 줄여서 아래와 같이 정의할 수도 있습니다.
type UserProfileUpdate3 = {
    [p in 'username' | 'email' | 'profilePhotoUrl']? : UserProfile[p]
}
// 위 코드에서 keyof를 적용하면 아래와 같이 줄일 수 있습니다.
type UserProfileUpdate4 = {
    [p in keyof UserProfile]?: UserProfile[p]
}