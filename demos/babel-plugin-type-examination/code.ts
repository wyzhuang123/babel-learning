let a: number;
a = 123;

function aaa<T>(p: T, q: T): T {
    return p + q;
}


aaa<number>(1, '2');