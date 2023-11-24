import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient("Potatoes", 5),
    new Ingredient("Rice", 3),
    new Ingredient("Meat", 4),
  ]

  constructor() {}

  onIngredientAdd(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  ngOnInit() {}

}
