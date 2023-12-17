import { Cat, Cats } from "../model/cats.model";

export class CatRepository {
  constructor() {}

  public async getCats(page: number, limit: number) {
    return Cats.instance.cats.slice((page -1) * limit, (page + 1) * limit);
  }

  public async getCatById(id: number) {
    return Cats.instance.cats.find((cat) => cat.id === id);
  }

  public async createCat(name: string, age?: number, breed?: string) {
    const newCat = new Cat(Cats._instance.cats.length, name, age, breed);

    Cats.instance.cats.push(newCat);
    return newCat;
  }

  public async updateCat(
    id: number,
    name?: string,
    age?: number,
    breed?: string
  ) {
    const index = Cats.instance.cats.findIndex((c) => c.id === id);
    const cat = Cats.instance.cats[index];
    cat.name = cat.name ?? name;
    cat.age = cat.age ?? age;
    cat.breed = cat.breed ?? breed;
    Cats.instance.cats[index] = cat;
    return cat;
  }

  public async deleteCat(id: number): Promise<Cat> {
    const index = Cats.instance.cats.findIndex((c) => c.id === id);
    const cat = Cats.instance.cats[index];
    Cats.instance.cats.splice(index, 1);
    return cat;
  }
}
