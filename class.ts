export {};

class Developer{
    readonly name: string;
    constructor(theName: string){
        this.name = theName;
    }
}
let john = new Developer("john");
// john.name = "kim"; // Error: Cannot assign to 'name' because it is a read-only property.
console.log("john - name:" + john.name);
//-----------------------------------------------------------------
class Developer2{
    readonly name: string;
    constructor(readonly theName: string){
        this.name = theName;
    }
}
let john8 = new Developer2("john8");
console.log("john8 - name:" + john8.name);
//-----------------------------------------------------------------
class Developer3{
    private _name: string = "defaultName";

    get name(): string{
        return this._name;
    }

    set name(newValue: string){
        if(newValue && newValue.length > 5){
            throw new Error("name is too long");
        }
        this._name = newValue;
    }
}

const josh10 = new Developer3();
console.log("Developer3 - name:" + josh10.name); // defaultName
josh10.name = "josh"; // OK
console.log("Developer3 - name:" + josh10.name); // defaultName
//josh10.name = "josh10josh10"; // Error: name is too long
//-----------------------------------------------------------------
abstract class Developer4{
    abstract coding(): void;
    drink(): void{
        console.log("Developer4.drink() - drink coffee");
    }
}

class FrontendDeveloper extends Developer4{
    coding(): void{
        console.log("Developer4.coding() - frontend coding");
    }
    design(): void{
        console.log("Developer4.design() - frontend design");
    }
}

//const dev = new Developer11(); // Error: Cannot create an instance of an abstract class.
const dhlee = new FrontendDeveloper();
dhlee.coding(); // coding() - frontend coding
dhlee.drink(); // drink() - drink coffee
dhlee.design(); // design() - frontend design
