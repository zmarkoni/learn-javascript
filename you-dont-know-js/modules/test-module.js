let testVariable = 1001;

function testFunc() {
  console.log('function test');
}
export { testVariable, testFunc };

let ab = 'test default -> ab';
export default ab; //can be only 1 default export
