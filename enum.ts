export {};

enum Direction{
    Up = 1,
    Down,
    Left,
    Right
}
console.log(Direction.Up); // 1
console.log(Direction[1]); // Up
console.log(Direction.Down); // 2
console.log(Direction[2]); // Down
//-----------------------------------------------------------------
enum HttpResponse{
    No = 0,
    Yes = 1
}
function respond(recipient: string, message: HttpResponse): void{
    console.log("respond - recipient:" + recipient + ", message:" + message);
}

respond("dhlee", HttpResponse.Yes); // respond - recipient:dhlee message:1
//-----------------------------------------------------------------
enum Direction2{
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT"
}
console.log(Direction2.Up);
console.log(Direction2["Up"]);
//-----------------------------------------------------------------
enum BooleanLikeHeterogeneousEnum{
    No = 0,
    Yes = "YES"
}
console.log(BooleanLikeHeterogeneousEnum.No); // 0
console.log(BooleanLikeHeterogeneousEnum.Yes); // YES
//-----------------------------------------------------------------
enum Variables{
    X, Y, Z
}

function getX(obj: {X: number}){
    return obj.X;
}
function getY(obj: {Y: Variables}){
    return obj.Y;
}
console.log("getX():"+getX(Variables)); // 0
console.log("getY():"+getY(Variables)); // 1
//-----------------------------------------------------------------
enum LogLevel{
    ERROR, WARN, INFO, DEBUG
}
type LogLevelString = keyof typeof LogLevel;
function printImportant(key: LogLevelString, message: string){
    const num = LogLevel[key];
    if(num <= LogLevel.WARN){
        console.log("printImportant() LogLevel - key:" + key + ", num:" + num + ", message:" + message);
    }
    
}
printImportant("ERROR", "This is Error message!");
printImportant("WARN", "This is Warning message!");
printImportant("INFO", "This is Info message!"); // not print
//-----------------------------------------------------------------
enum Enum{
    A
}
console.log("value: "+Enum.A + ", keyName: " + Enum[Enum.A]);
//-----------------------------------------------------------------
const obj = {width: 10, height: 15};
const area = obj.width * obj.height;
console.log("area:"+area);