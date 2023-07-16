function identify<InPut>(arg: InPut): InPut {
  return arg;
}

let myIdentify: <Type>(arg: Type) => Type = identify;
let myIdentify1: { <Type>(arg: Type): Type } = identify;

interface GenericIdentifyFn {
  <Type>(arg: Type): Type;
}
interface GenericIdentifyFnTypeFixed<Type> {
  (arg: Type): Type;
}

let myIdentify2: GenericIdentifyFn = identify;
let myIdentify3: GenericIdentifyFnTypeFixed<number> = identify;

console.log("제네릭 ==== ", myIdentify("제네릭"));
console.log("제네릭 ==== ", myIdentify1("제네릭1"));
console.log("제네릭 ==== ", myIdentify2("제네릭2"));
console.log("제네릭 ==== ", myIdentify3(2));

// Classes
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

let myGenericClass = new GenericNumber<number>();

myGenericClass.zeroValue = 1;
myGenericClass.add = function (x, y) {
  return this.zeroValue + x + y;
};

console.log("제네릭 클래스 ==== ", myGenericClass.add(1, 2));

interface IGenericTyped {
  zeroValues: number;
}
// constrainted class type
class GenericTyped<Type extends IGenericTyped> {
  zerovalues: Type["zeroValues"];
  add: (x: Type) => Type;
}

const myGenericTypedClass = new GenericTyped();

myGenericTypedClass.zerovalues = 10;
myGenericTypedClass.add = function (x) {
  console.log("add func === ", typeof this.zerovalues, typeof x.zeroValues);
  return { zeroValues: this.zerovalues + x.zeroValues };
};

console.log("제네릭 클래스 ==== ", myGenericTypedClass.add({ zeroValues: 11 }));

//============================================================
// Using class types in Generics

class BeeKeeper {
  hasMask: boolean = true;
}

class ZooKeeper {
  nametag: string = "Mike";
}

class Animal {
  numLegs: number = 4;
}

class Bee extends Animal {
  numLegs = 6;
  keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animal>(ctor: { new (): A }): A {
  return new ctor();
}

console.log("클래스 타입 사용하기 ==== ", createInstance(Lion));

console.log("클래스 타입 사용하기 ==== ", createInstance(Bee));

//============================================================
// Conditional Type
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}

const method = "POST" as const;

type Example1 = Dog extends Animal ? number : string;

//============================================================
interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}

type TReturnLable<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;
function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
// function createLabel(nameOrId: string | number): IdLabel | NameLabel {
//   throw "un";
// }
function createLabel<T extends number | string>(nameOrId: T): TReturnLable<T> {
  throw "";
}

//============================================================
type MessageOf<T extends { content: string }> = T["content"];

type MessageOfOf<T> = T extends { message: string } ? T["message"] : never;

interface Email {
  content: string;
  //   message: string;
}

type EmailMessageContents = MessageOf<Email>;
type EmailMessageContents1 = MessageOfOf<Email>;

//============================================================
// array type 추론 infer

type GetArrReturnType<Type> = Type extends (...arg: never[]) => infer ReturnType
  ? ReturnType
  : never;

type Num = GetArrReturnType<() => number>;

type Str = GetArrReturnType<(x: string) => string>;

type Bools = GetArrReturnType<(x: boolean, b: boolean) => boolean[]>;

//============================================================
declare function stringOrNum(x: string): number;
declare function stringOrNum(x: number): string;
declare function stringOrNum(x: string | number): string | number;

type T1 = ReturnType<typeof stringOrNum>;
//============================================================

type ToArray<Type> = Type extends any ? Type[] : never;

type SttArrOrNumArr = ToArray<string | number>; //string[] | number[];

type ToArray1<Type> = [Type] extends [any] ? Type[] : never;

type SttArrOrNumArr1 = ToArray1<string | number>; //(string | number)[]

//============================================================

const db = { Vendor: "aa", Emplyee: "bb", Email: "cc" };
type Kyes = keyof typeof db;

type IDB<T> = {
  [props in keyof T]: T[props];
};

const _DB: IDB<typeof db> = { Email: "", Emplyee: "", Vendor: "" };
export default () => {};
