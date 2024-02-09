import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HeaderComponent} from "./header/header.component";
import {ShoppingListService} from "./shopping-list/shoppig-list.service";
import {AppRoutingModule} from "./app-routing.module";
import {RecipeService} from "./recipes/recipe.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthComponent} from './auth/auth.component';
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import {RecipesModule} from "./recipes/recipes.module";
import {ShoppingListModule} from "./shopping-list/shopping-list.module";
import {SharedModule} from "./shared/shared.module";
import {AlertComponent} from "./shared/alert/alert.component";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    // DropdownDirective, //!!!no dublicate - we have it in shared.module
    //LoadingSpinnerComponent,
    // AlertComponent,
    // PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,//we created!!
    HttpClientModule,
    RecipesModule, //!! import RecipesModule
    ShoppingListModule,
    SharedModule
  ],
  providers: [ShoppingListService, RecipeService,
    {
      provide: HTTP_INTERCEPTORS,//!!
      useClass: AuthInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
