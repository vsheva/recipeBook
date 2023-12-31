import {Ingredient} from "../shared/ingredient.model";

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  //assign arguments, we receive, to the properties of our object- our class
  constructor(name:string, desc:string, imagePth:string, ingredts: Ingredient[]) {
    this.name=name;
    this.description=desc;
    this.imagePath=imagePth;
    this.ingredients= ingredts
  }
}
