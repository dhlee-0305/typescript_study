function getText<T>(text: T): T{
    return text;
}

console.log("getText<T>(): " + getText("Hello World!"));
console.log("getText<T>(): " + getText(100));
console.log("getText<T>(): " + getText(true));
//-----------------------------------------------------------------
interface GenericLogTextFn{
    <T>(text: T): T;
}
function logText<T>(text: T): T{
    return text;
}
let myString: GenericLogTextFn = logText;
console.log("GenericLogTextFn - myString(): " + myString("Hello World!"));
//-----------------------------------------------------------------
class GenericMath<T>{
    pi?: T;
    sum?: (x: T, y: T) => T;
}
let math = new GenericMath<number>();
math.pi = 3.14;
math.sum = function(x: number, y: number): number{
    return x + y;
}
console.log("GenericMath - math.pi: " + math.pi); // 3.14
console.log("GenericMath - math.sum(10, 20): " + math.sum(10, 20)); // 30
//-----------------------------------------------------------------