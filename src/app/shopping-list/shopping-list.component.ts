import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {Observable, Subscription} from "rxjs";
import {LoggingService} from "../logging.service";
import {Store} from "@ngrx/store";
//import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';
import  * as fromApp from '../store/app.reducer'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private subscription: Subscription;


  constructor(private loggingService: LoggingService,
              private store: Store<fromApp.AppState>) {
  }


  ngOnInit() {
    this.ingredients = this.store.select("shoppingList");
    // this.ingredients = this.shoppingListService.getIngredients()
    // this.subscription = this.shoppingListService.ingredientChanged
    //   .subscribe((ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients
    //   });

    this.loggingService.printLog("Hello from Shopping List Component")
  }

  onEditItem(index: number) {
    //pass index to shoping-edit c. through the service (specificaly Subject in the service): emit new value
    //this.shoppingListService.startedEditing.next(index); //pass index to subject -> so we can listen in other place
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
  }

  ngOnDestroy() {
  }
}
