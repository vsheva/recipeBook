import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    //!!! принимаем через субект переменную recipeChanged через подписку на него subscribe

    this.subscription=this.recipeService.recipeChanged.subscribe(
      (recipes: Recipe[]) => {this.recipes = recipes}
    )

    this.recipes = this.recipeService.getRecipes()
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  ngOnDestroy() {
 this.subscription.unsubscribe();
  }

}
