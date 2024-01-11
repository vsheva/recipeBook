import {EventEmitter, Injectable} from "@angular/core";
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shoppig-list.service";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {Subject} from "rxjs";

@Injectable()

export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();  //Event because this recipe difer with recipe in component--> and we should pass this event
  //recipeSelected = new EventEmitter<Recipe>()
  //recipeSelected = new Subject<Recipe>();???

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'Super tasty!',
      'https://images.pexels.com/photos/1352270/pexels-photo-1352270.jpeg',
      [
        new Ingredient("Meat", 1),
        new Ingredient("Cheese", 5),
        new Ingredient("Tomatoes", 2),
      ]
    ),
    new Recipe(
      'Big Burger',
      'Delicious!',
      'https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=3768&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      [
        new Ingredient("Buns", 2),
        new Ingredient("French Fries", 10),
        new Ingredient("Souse", 1),
      ]
    )
  ]

  constructor(private shoppingListService: ShoppingListService) {
  }
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice()) //!!!!! передаем recipes через субьект в компонет recipe-list через переменную recipeChanged, точнее копию его !!!

  }

  getRecipes() {
    return this.recipes.slice();
    console.log("recipes", this.recipes)
  }

  getRecipe(index: number) {
    return this.recipes[index]
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients)
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice()) //!!!!! передаем recipes через субьект в компонет recipe-list через переменную recipeChanged, точнее копию его !!!
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice()) //!!!!! передаем recipes через субьект в компонет recipe-list через переменную recipeChanged, точнее копию его !!!
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice()) //!!! отправляем удаление в компонент и испускаем событие в recipe-detail component.html и следовательно ...recipe-detail.componet.ts.
  }

}




