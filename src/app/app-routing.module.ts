import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {RecipesComponent} from "./recipes/recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipeStartComponent} from "./recipes/recipe-start/recipe-start.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";
import {RecipesResolverService} from "./recipes/recipes-resolver.service";
import {AuthComponent} from "./auth/auth.component";


const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},

  {
    path: 'recipes', component: RecipesComponent,
    children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent}, //не менять местами с :id
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]}, //red!
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}, //red!

    ]
  },
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'auth', component: AuthComponent},


]


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}





