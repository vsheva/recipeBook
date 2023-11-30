import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shoppig-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[]


  constructor(private shoppingListService: ShoppingListService) {
  }

/*
  onIngredientAdd(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
*/

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients()
  }

}
