import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Ingredient} from "../shared/ingredient.model";

@Injectable()

export class ShoppingListService {

  ingredientChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>(); //!!! Subject

  ingredients: Ingredient[] = [
    new Ingredient("Potatoes", 5),
    new Ingredient("Rice", 3),
    new Ingredient("Meat", 4),
  ]

  getIngredients() {
    return this.ingredients.slice()
  }

  //get index by click
  getIngredient(index: number) {
    return this.ingredients[index]
  }


  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    //this.ingredientChanged.emit(this.ingredients.slice())
    this.ingredientChanged.next(this.ingredients.slice()) //!!!
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient)
    // }

    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice())
  }


  updateIngredient(index: number, myNewIngredient: Ingredient) {
    this.ingredients[index] = myNewIngredient; ////get the one ingredient, we are looking for by index
    this.ingredientChanged.next(this.ingredients.slice()) //emit apdated ingredient from previous lane - simply change value by click update
  }


}
