import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shoppig-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput', {static: true}) nameInputReference: ElementRef;
  @ViewChild('amountInput', {static: true}) amountInputReference: ElementRef;


  constructor(private shoppingListService: ShoppingListService) {
  }

  onAddIngredient() {
    const newIngredient = new Ingredient(this.nameInputReference.nativeElement.value, this.amountInputReference.nativeElement.value);
    //this.ingredientAdded.emit(newIngredient)
    this.shoppingListService.addIngredient(newIngredient)
  }

  ngOnInit() {
  }
}
