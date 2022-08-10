/* 원시 값은 변경 불가능한 값이다. */
const variable = 1;
// variable = 2; // TypeError: Assignment to constant variable.

/* 객체는 변경 가능한 값이다. */
const objA = { a: 1, b: 2 };
objA.new = "new"; // 프로퍼티 생성
objA.a = 2; // 프로퍼티 수정
delete objA.b; // 프로퍼티 삭제
console.log(objA); // { a: 2, new: 'new' }

/* 객체에 불변성을 주고 싶어서 const로 선언했는데, 값이 변경된다..? 이를 막으려면? */

/* 1. freeze(동결): 새로운 속성 추가 불가, 기존 속성 삭제 불가, 기존 속성 수정 불가 */
const objB = { a: 1, b: 2 };
Object.freeze(objB);
console.log(Object.isFrozen(objB)); // true
objB.new = "new"; // 프로퍼티 생성(무시) -> strict mode일 경우 error
objB.a = 2; // 프로퍼티 수정(무시) -> strict mode일 경우 error
delete objB.b; // 프로퍼티 삭제(무시) -> strict mode일 경우 error
console.log(objB); // { a: 1, b: 2 }

/* 2. seal(봉인): 새로운 속성 추가 불가, 기존 속성 삭제 불가, 기존 속성 수정 가능 */
const objC = { a: 1, b: 2 };
Object.seal(objC);
console.log(Object.isSealed(objC)); // true
objC.new = "new"; // 프로퍼티 생성(무시) -> strict mode일 경우 error
objC.a = 2; // 프로퍼티 수정
delete objC.b; // 프로퍼티 삭제(무시) -> strict mode일 경우 error
console.log(objC); // { a: 2, b: 2 }

/* 3. preventExtensions(확장금지): 새로운 속성 추가 불가, 기존 속성 삭제 가능, 기존 속성 수정 가능 */
const objD = { a: 1, b: 2 };
Object.preventExtensions(objD);
console.log(Object.isExtensible(objD)); // false
objD.new = "new"; // 프로퍼티 생성(무시) -> strict mode일 경우 error
objD.a = 2; // 프로퍼티 수정
delete objD.b; // 프로퍼티 삭제
console.log(objD); //{ a: 2 }

/* 위 세가지 방법은 모두 얕은-동결, 얕은-봉인, 얕은-확장금지 */
const objE = { a: 1, b: 2, inner: { c: 3, d: 4 } };
Object.freeze(objE);
console.log(Object.isFrozen(objE)); // true
objE.inner.new = "new"; // 프로퍼티 생성
objE.inner.c = 10; // 프로퍼티 수정
delete objE.inner.d; // 프로퍼티 삭제
console.log(objE); // { a: 1, b: 2, inner: { c: 10, new: 'new' } }

/* 깊은-동결, 깊은-봉인, 깊은-확장금지 방법? -> 재귀 이용 */
const deepFreeze = (obj) => {
  Object.keys(obj).forEach((prop) => {
    if (typeof obj[prop] === "object") deepFreeze(obj[prop]);
  });
  return Object.freeze(obj);
};
const objF = { a: 1, b: 2, inner: { c: 3, innerInner: { d: 4 } } };
deepFreeze(objF);
objF.inner.new = "new"; // 프로퍼티 생성(무시) -> strict mode일 경우 error
objF.inner.c = 10; // 프로퍼티 수정(무시) -> strict mode일 경우 error
delete objF.inner.innerInner.d; // 프로퍼티 삭제(무시) -> strict mode일 경우 error
console.log(objF); // { a: 1, b: 2, inner: { c: 3, innerInner: { d: 4 } } }

/* 배열도 객체에 포함되므로??? */
const arr = [1, 2, 3, 4];
arr.pop();
console.log(arr);
Object.freeze(arr);
console.log(Object.isFrozen(arr)); // true
arr.pop(); // TypeError: Cannot delete property '2' of [object Array]

// 참고: https://www.freecodecamp.org/news/javascript-immutability-frozen-objects-with-examples/
