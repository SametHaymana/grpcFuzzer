export class Cat {
  public id: number;
  public name: string;
  public age?: number;
  public breed?: string;

  constructor(id: number, name: string, age?: number, breed?: string) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.breed = breed;
  }
}

export class Cats {
  public cats: Cat[];
  static _instance: Cats;

  constructor() {
    this.cats = [];
    this.cats.push(new Cat(1, "Garfield", 5, "Persian"));
    this.cats.push(new Cat(2, "Tom", 3, "Bengal"));
    this.cats.push(new Cat(3, "Kitty", 2, "British Shorthair"));
  }

  static get instance() {
    if (!this._instance) {
      this._instance = new Cats();
    }
    return this._instance;
  }
}
