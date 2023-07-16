class Human {
  public name: string;
  private age: number;
  public gender: string;
  constructor(name: string, age: number, gender: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }

  getAge() {
    return this.age;
  }
  setAge(age: number) {
    this.age = age;
  }
}

const lynn = new Human("lynn", 22, "female");

const sayHi = (person: Human): string => {
  console.log(person.name, person.getAge(), person.gender);

  return person.name + person.getAge() + person.gender;
};

lynn.setAge(88);
console.log(
  "1============================================================================="
);
console.log(sayHi(lynn));

export {};
