import {EventEmitter, Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Ingredient} from "../shared/ingredient.model";

@Injectable()

export class ShoppingListService{

  //ingredientChanged= new EventEmitter<Ingredient[]>();
  ingredientChanged= new Subject<Ingredient[]>();

  ingredients: Ingredient[] = [
    new Ingredient("Potatoes", 5),
    new Ingredient("Rice", 3),
    new Ingredient("Meat", 4),
  ]

  getIngredients(){
    return this.ingredients.slice()
  }

  addIngredient(ingredient:Ingredient) {
    this.ingredients.push(ingredient);
    //this.ingredientChanged.emit(this.ingredients.slice())
    this.ingredientChanged.next(this.ingredients.slice()) //!!!
  }

  addIngredients(ingredients:Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient)
    // }

    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice())
  }

}
