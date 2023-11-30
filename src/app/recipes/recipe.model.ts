import {Ingredient} from "../shared/ingredient.model";

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  //assign arguments, we receive, to the properties of our object- our class
  constructor(name:string, desc:string, imagePath:string, ingredients: Ingredient[]) {
    this.name=name;
    this.description=desc;
    this.imagePath=imagePath;
    this.ingredients= ingredients
  }
}
