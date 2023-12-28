import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shoppig-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm: NgForm; //!! get access to form , which in edit comp.
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {
  }

  onSubmit(form: NgForm) {
    //console.log("form", form.value) //{name: "..", amount: ".."}
    //const value= form.value;
    const newIngredient = new Ingredient(form.value.name, form.value.amount);

    //update item -if edit mode

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
    } else {
      this.shoppingListService.addIngredient(newIngredient)
    }
    this.editMode = false;
    this.slForm.reset();

  }

  //do listening the subject: subscribe to startedEditing subject
  ngOnInit() {
    this.subscription =
      this.shoppingListService.startedEditing.subscribe(
        (index: number) => {
          this.editMode = true;
          this.editedItemIndex = index;

//!! get item, we want to edit (from hard code) by index (that was passed from shopping-list to us via subject)
          this.editedItem = this.shoppingListService.getIngredient(index);
          console.log("editedItem", this.editedItem) //Ingredient{name:"Potatoes", amount:5} ---------this.editedItem.amount:5

//!! update our form if we in editMode
          console.log("slForm", this.slForm)
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          })
        });
    //!! whenewer select new item, we populate form with right values (that we get from our click by index
  }

  //1.кликаем в shopping-list
  //2. передаем этот id(точнее index) через servece(точнее subject) ---который ловим в shoppping-edit через subscribe
  //3. в subscribe - вызываем массив обьектов с кликнутым индексом (то что мы нажали) ---> что возврашает нам нужный обьект {name:"Potatoes", amount:0},
  //4.  заселяем форму name и amount (что сверху), куда записываем то, на что кликнули снизу (Например, Potatoes(5) --- в Name идет Potatoes, в Amount идет 5
  //5. форма заселена данными снизу


  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex)
    this.onClear();
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

