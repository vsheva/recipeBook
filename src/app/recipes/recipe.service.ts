import {Injectable} from "@angular/core";
import {Recipe} from "./recipe.model";

@Injectable()

export class RecipeService{
  //Emitter  recipeSelected

  private recipes: Recipe[] = [
    new Recipe('First Test recipe', 'Description of each recipe',
      'https://therecipecritic.com/wp-content/uploads/2020/03/Poke-Bowls-2-1.jpg'
    ),
    new Recipe('Second Test recipe', 'Description of each recipe',
      'https://therecipecritic.com/wp-content/uploads/2020/03/Poke-Bowls-2-1.jpg'
    )
  ]

  getRecipes() {
    return this.recipes.slice();
  }

}
