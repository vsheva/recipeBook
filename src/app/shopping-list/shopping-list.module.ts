import {NgModule} from "@angular/core";
import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {LoggingService} from "../logging.service";

@NgModule({
declarations: [
  ShoppingListComponent,
  ShoppingEditComponent,
],
  imports:[
    FormsModule,
    RouterModule.forChild([
      {path: '', component: ShoppingListComponent},//new вложенный модуль (как в recipes)
    ]),
    SharedModule
  ],
  //providers:[LoggingService]
})
export class ShoppingListModule {}
