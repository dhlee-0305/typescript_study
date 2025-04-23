export {};

function getAge(age: number | string){
    if(typeof age === 'number'){
        age.toFixed();
        return age;
    }
    if(typeof age === 'string'){
        return age;
    }

    return new TypeError('age must be a number or string');
}

console.log('getAge(): '+ getAge(10)); // 10
console.log('getAge(): '+ getAge('20')); // 20
//-----------------------------------------------------------------
interface Person{
    name: string;
    age: number;
}
interface Developer{
    name: string;
    skill: string;
}

type captInter = Person & Developer; 
const captDev: captInter = {
    name: 'dhlee',
    age: 30,
    skill: 'java'
}
console.log('capt - name:' + captDev.name + ', age:' + captDev.age + ', skill:' + captDev.skill);
//-----------------------------------------------------------------
interface Person2 {
    name: string;
    age: number;
}
interface Developer2 {
    name: string;
    skill: string;
}
function introduce(someone: Person2 | Developer2) {
    someone.name; // O 정상 동작
    //someone.age; // X 타입 오류
    //someone.skill; // X 타입 오류
}
//-----------------------------------------------------------------
