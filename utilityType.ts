export

// 유틸리티 타입은 이미 정해놓은 타입을 변환할 때 사용하기 좋은 타입 문법입니다.
// 유틸리티 타입을 꼭 쓰지 않더라도 기존의 인터페이스, 제네릭 등의 기본 문법으로 충분히 타입 변환할 수 있지만,
// 유틸리티 타입을 쓰면 훨씬 더 간결한 문법으로 타입을 정의할 수 있습니다.

// 1. Partial - 모든 프로퍼티를 선택적으로 만듭니다.
interface Address{
    email: string;
    address: string;
}
type MayHaveEamil = Partial<Address>; // 모든 프로퍼티를 선택적으로 만듭니다.
const me: MayHaveEamil = {}; // {} - 모든 프로퍼티가 선택적이므로 빈 객체도 가능합니다.
const you: MayHaveEamil = {email: 'test@abc.com'}; // 가능
const all: MayHaveEamil = {email: 'capt@abc.com', address: 'seoul'}; // 가능

// 2. Pick - 특정 타입에서 몇 개의 속성을 선택하여 타입을 정의할 수 있다.
interface Hero{
    name: string;
    skill: string;    
}

const human: Pick<Hero, 'name'>={
    name: '스킬이 없는 사람',
}

type HasThen<T> = Pick<Promise<T>, 'then' | 'catch'>;
let hasThen: HasThen<number> = Promise.resolve(4);
// hashThen.th // 위에서 'then'만 선택하면 'then'만 제공, 'catch' 선택하면 'catch'만 제공
// hasThen.then((res) => console.log(res)); // 가능

// 3. Omit - 특정 타입에서 몇 개의 속성을 제외하여 타입을 정의할 수 있다.
interface AddressBook{
    name: string;
    phone: number;
    address: string;
    company: string;
}

const phoneBook: Omit<AddressBook, 'address'>={
    //address: '서울시 강남구', //Error - address 속성 생략
    name: '재택근무',
    phone: 1234567890,
    company: '내방',
}
const chingtao: Omit<AddressBook, 'address' | 'company'>={
    name: '중국집',
    phone: 1234567890,
}
