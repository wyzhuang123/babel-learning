class A {
    constructor(name) {
        this.name = name;
    }


    say() {
        // eslint-disabled 
        console.log(123);
    }
}


// eslint-disabled 
console.log(456);

function B() {
    // eslint-disabled 
    console.log(789);
}

let a = new A('123');

B();
a.say();


