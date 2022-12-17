const parser = require('@babel/parser');

const code = `
    let a: number;
    a = '244';

`;

const ast = parser.parse(code, {
    plugins: ['typescript']
});

// function typeExam(ast) {
//     let exam = ast.program.body.filter((item) => {
//         return item.type === 'ExpressionStatement';
//     })

    
// }

const ysType = {
    
}

const typeObj = ast.program.body[1].expression;

function AssigmentExpression() {

}
// const leftBinding = parser.parseExpression(typeObj);
// console.log(leftBinding);
