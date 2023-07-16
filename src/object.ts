interface ReadOnlyProps {
  readonly name: string;
}

interface Box<Type> {
  contents: Type;
}

// 타입 정의
type OrNull<Type> = Type | null;
type OneOrMany<Type> = Type | Type[];
type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;
type OneOrManyOrNullOrStrings = OneOrManyOrNull<string>;

export function changeReadonlyProps(obj: ReadOnlyProps) {
  // obj.name = 11; // unchangeable
}
export function setContents<Type>(box: Box<Type>, newContents: Type) {
  box.contents = newContents;
}

export default {};
