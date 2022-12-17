/**
 * say 你好
 * @param name 名字
 */
function sayHi (name: string, age: number, a: boolean) {
    console.log(`hi, ${name}`);
    return `hi, ${name}`;
}

/**
 * 类测试
 */
class Guang {
    name: string; // name 属性
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    /**
     * 方法测试
     */
    sayHi (a: string): string {
        return `hi, I'm ${this.name} ${a}`;
    }
}


function abc(a: string): string {
    return a + '123';
}