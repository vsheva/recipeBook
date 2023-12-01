import {EventEmitter, Injectable} from "@angular/core";
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shoppig-list.service";

@Injectable()

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>()

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'Super tasty!',
      'https://images.pexels.com/photos/1352270/pexels-photo-1352270.jpeg',
      [
        new Ingredient("Meat", 1),
        new Ingredient("Cheese",5),
        new Ingredient("Tomatoes",2),
        ]
    ),
    new Recipe(
      'Big Burger',
      'Delicious!',
      'https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=3768&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      [
        new Ingredient("Buns", 2),
        new Ingredient("French Fries",10),
        new Ingredient("Souse",1),
      ]
    )
  ]

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients)
  }

}




