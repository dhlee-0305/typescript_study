export {};
// type guard - 타입 가드는 여러 개의 타입 중 원하는 타입으로 타입을 걸러내는 걸 말합니다.
// 여기서 걸러낸다는 말은 여러 개의 타입 중 하나의 타입으로 타입을 좁힌다는 의미와 같습니다.

// Age의 타입이 문자열 또는 숫자가 될 수 있다는 의미입니다.
type Age = 'string' | 'number';

function getAge(age: Age){
    // age.length;  // 에러 발생
    if(typeof age === 'string'){
        console.log(age.length); // OK - age는 string 타입으로 좁혀짐
    }
}

// typeof, instanceof, is를 이용해서 타입 가드 역할을 하는 함수를 만들 수 있습니다.

function isString(age: string | number): age is string{
    return typeof age === 'string'; // age가 string 타입인지 확인하는 함수
}

function getAge2(age: string | number){
    if(isString(age)){
        console.log("getAgeTG2("+age+") is string, length : " + age.length); // OK - age는 string 타입으로 좁혀짐
    }else{
        console.log("getAgeTG2("+age+") is number, value : " + age.toString()); // OK - age는 number 타입으로 좁혀짐
    }
}

getAge2("capt"); // OK - age는 string 타입으로 좁혀짐
getAge2(100); // OK - age는 number 타입으로 좁혀짐