import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params.id != null; //!!
      this.initForm(); //call function
      console.log("editMode",this.editMode);
    })
  }

  onSubmit() {
    console.log("recipeForm", this.recipeForm);
  }

  //fix
  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    //!!!
    (<FormArray>this.recipeForm.get("ingredients")).push(new FormGroup({
      "name": new FormControl(null, Validators.required),
      "amount": new FormControl(null, Validators.required)
    })) //!!!
  }

  private initForm() {
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      console.log('this.recipeService.getRecipe(this.id)',this.recipeService.getRecipe(this.id))//{name:"Schnitzel", description: "", imagePath:"", ingredients:[1,2,3] }
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      console.log("recipe", recipe)//{"name":"Burger", "description": "Delicious", "imagePath": "https//..", "ingredients":[{name:"french", amount:2}, {name:"souce", amount:"1"}]}


      if(recipe['ingredients'])  {

        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
            'name': new FormControl(ingredient.name),
            'amount': new FormControl(ingredient.amount)
          }))
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName), //[formControlName]="'name'"   'name' goes in html on line 17
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription), //[formControlName] = "'description'"
      'ingredients': recipeIngredients //[formArrayName]="'ingredients'"
    })
  }

}
