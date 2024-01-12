import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "./recipe.model";
import {DataStorageService} from "../shared/data-storage.service";
import {RecipeService} from "./recipe.service";

@Injectable({providedIn: "root"}) //!!!if inject service here
export class RecipesResolverService implements ResolveFn<Recipe[]> {

  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService
              ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();//!!! есть

    if(recipes.length=== 0) {
      return this.dataStorageService.fetchRecipes(); //!!!fetch
    } else {
      return recipes;
    }

  }
}