import generic from "./generic";

generic();

type MyDateConstructor = {
  new (dateStr: string): Date;
};

function makeDate(ctor: MyDateConstructor, dateStr: string) {
  return new ctor(dateStr);
}

console.log("1.  DATE ==== ", makeDate(Date, "2023-01-01"));

// 어레이::  1번 어레이 아이템 반환
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}

// 어레이:: 어레이 아이템 타입 읽고 해당 타입을 2번째 파라미터 함수의 매개변수 타입으로
function myMap<Input, Output>(
  arr: Input[],
  func: (arg: Input) => Output
): Output[] {
  return arr.map(func);
}

const parsed = myMap(["1", "2", "3"], (n) => parseInt(n));

// 어레이
function longest<Type extends { length: number }>(a: Type, b: Type): Type {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}

const longerArray = longest([1, 2], { length: 1 });

console.log("1.  DATE ==== ", longerArray);

// 타입 형태는 같으나 Sub 오브젝트이며 다르다고 오류발생

// function minimumLength<Type extends { length: number }>(
//   obj: Type,
//   minimum: number
// ): Type {
//   if (obj.length >= minimum) {
//     return obj;
//   } else {
//     return { legnth: minimum };
//   }
// }

// Good Generic Functions !!!!!!!!

// ===============================

// Push Type Parameters Down
// Rule1: When possible, use the type parameter itself rather than constraining it
function firstElement1<Type>(arr: Type[]) {
  return arr[0];
}

function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0];
}

// a: type number (good)
const a = firstElement1([1, 2, 3]);
// b: type any (bad)
const b = firstElement2([1, 2, 3]);

// Use Fewer Type Parameters
// Rule2: Always use as few type parameters as possible
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func);
}

function filter2<Type, Func extends (arg: Type) => boolean>(
  arr: Type[],
  func: Func
) {
  return arr.filter(func);
}

// Type Parameters Should Appear Twice
// Rule: If a type parameter only appears in one location, strongly reconsider if you actually need it
function greet<Str extends string>(str: Str) {
  console.log("Hello ", str);
}

// simplify upper function
function greet1(str: string) {
  console.log("Hello ", str);
}

greet("짹짹");

// Optional Parameters
function f(n: number) {
  console.log(n.toFixed()); // 0 arguments
  console.log(n.toFixed(3)); // 1 argument
}
// make it optional
function f1(n?: number) {
  console.log(n.toFixed(n)); // 0 arguments
  console.log(n.toFixed(3)); // 1 argument
}
function f2(n = 10) {
  console.log(n.toFixed()); // 0 arguments
  console.log(n.toFixed(3)); // 1 argument
}

f(10);

// Optional Parameters in Callbacks
//Rule: When writing a function type for a callback, never write an optional parameter unless you intend to call the function without passing that argument
function myForEach<Type>(
  arr: Type[],
  callback: (arg: Type, index?: number) => void
) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}

myForEach([11, 22, 33], (a, i) => console.log(a, i));

// Function Overloads
function makeDateInstance(timestamp: number): Date;
function makeDateInstance(yy: number, mm: number, dd: number): Date;
function makeDateInstance(
  yyOrTimestamp: number,
  mm?: number,
  dd?: number
): Date {
  if (mm !== undefined && dd !== undefined) {
    return new Date(yyOrTimestamp, mm, dd);
  } else {
    return new Date(yyOrTimestamp);
  }
}

console.log(
  "override func === 1 ",
  makeDateInstance(Date.now()).toLocaleDateString()
);
console.log(
  "override func === 2 ",
  makeDateInstance(2023, 6, 16).toLocaleDateString()
);
console.log("override func === 3 ", makeDateInstance(Date.now()));

// Override function :: Good

// function len(s: string): number;
// function len(arr: any[]): number;
// function len(x: any) {
//   return x.length;
// }

function len(x: any[] | string) {
  return x.length;
}

// this < 타입 정의
const user = {
  id: 123,
  admin: false,
  becomeAdmin: function () {
    this.admin = true;
  },
};

interface User {
  id: number;
  admin: boolean;
  becomeAdmin: () => void;
}

interface Db {
  filterUsers(filter: (this: User) => boolean): User[];
}

// multiple arguments ...arg

function multifly(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
