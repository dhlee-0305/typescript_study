export {};

interface StringArray{
    [index: number]: string; // 인덱스 시그니처 - 인덱스 타입
}

const arr: StringArray = ['capt', 'lee', 'kim'];
console.log(arr[0]); // capt


interface ReadonlyStringArray{
    readonly [index: number]: string; // 읽기 전용 인덱스 시그니처 - 읽기 전용 속성
}

const arr2: ReadonlyStringArray = ['huylk', 'tor', 'ironman'];
console.log(arr2[1]); // huylk
//arr2[1] = 'thor'; // Error: Cannot assign to '1' because it is a read-only property.