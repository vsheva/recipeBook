import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe.model";

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
              private recipeService: RecipeService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params.id != null; //!!
      this.initForm(); //call function
      console.log("editMode", this.editMode);
    })
  }

  onSubmit() {
    //console.log("recipeForm", this.recipeForm);
    //value берем внизу из формы

    //since value of the form has exactly format of  recipe.model and same names
    /** const newRecipe = new Recipe(
     this.recipeForm.value["name"],
     this.recipeForm.value['imagePath'],
     this.recipeForm.value['description'],
     this.recipeForm.value['ingredients'],
     )*/

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel()//the same for submit button

  }

  //fix
  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    //!!!
    (<FormArray>this.recipeForm.get("ingredients")).push(new FormGroup({
      "name": new FormControl(null, Validators.required),
      "amount": new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    })) //!!!
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index); //!!
    //(<FormArray>this.recipeForm.get("ingredients")).clear(); //!!
  }

  onCancel() {
    this.router.navigate(["../"], {relativeTo: this.route}); //navigating up for 1 level; we neet to tell what our curent route is
  }

  private initForm() {
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      console.log('this.recipeService.getRecipe(this.id)', this.recipeService.getRecipe(this.id))//{name:"Schnitzel", description: "", imagePath:"", ingredients:[1,2,3] }
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      //console.log("recipe", recipe)//{"name":"Burger", "description": "Delicious", "imagePath": "https//..", "ingredients":[{name:"french", amount:2}, {name:"souce", amount:"1"}]}


      if (recipe['ingredients']) {

        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            }))
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required), //[formControlName]="'name'"   'name' goes in html on line 17
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required), //[formControlName] = "'description'"
      'ingredients': recipeIngredients //[formArrayName]="'ingredients'"
    })
    console.log(" this.recipeForm ", this.recipeForm)// FormGroup{controls: {name: FormControl}, value:{"name":"", "imagePath":"", "description":"", "ingredients":[]} }

  }

}
