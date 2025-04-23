// 타입스크립트에서는 함수의 인자를 모두 필수 값을 간주합니다.
// 따라서, 함수의 매개변수를 설정하면 undefined나 null 이라도 인자로 넘겨야하며, 컴파일러에서 정의된 매개변수 값이 넘어왔는지 확인합니다.
// 달리 말하면 정의된 매개변수 값만 받을 수 있고 추가로 인자를 받을 수 없다는 의미입니다.
function sum(a: number, b = 100): number {
  return a + b;
}
console.log(sum(10, 20));
//console.log(sum(10, 20, 30));
console.log(sum(10));
// ?를 이용해 매개변수를 생략할 수 있도록 설정할 수 있습니다.
//function sum(a: number, b? = 100): number {
// sum(10) // 에러 없음

function sum2(a: number, ...nums:number[]): number{
    let totalOfNums = 0;
    console.log("vargs:"+nums);
    for(let key in nums){
        totalOfNums += nums[key];
    }

    return a + totalOfNums;
}
console.log(sum2(10, 20, 30, 40, 50));

interface Vue{
  el: string;
  count: number;
  init(this: Vue): () => {};
}

let vm: Vue ={
  el: '#app',
  count: 10,
  init: function(this: Vue){
    return () => {
      return this.count;
    }
  }
}

let getCount = vm.init();
let count= getCount();
console.log("el:"+ vm.el+", count:" + count);


