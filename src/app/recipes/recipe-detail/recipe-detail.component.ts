import {Component} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    //version 1 - if no change
    // const id =+this.route.snapshot.params.id
    // this.recipe=this.recipeService.getRecipe(id)

    this.route.params.subscribe((params:Params) => {
      this.id = +params.id;
      this.recipe=this.recipeService.getRecipe(this.id) //fetch data
    })
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }

}
