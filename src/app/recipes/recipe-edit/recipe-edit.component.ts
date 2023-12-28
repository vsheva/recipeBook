import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
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

  private initForm() {
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      console.log('this.recipeService.getRecipe(this.id)',this.recipeService.getRecipe(this.id))//{name:"Schnitzel", description: "", imagePath:"", ingredients:[1,2,3] }
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName), //[formControlName]="'name'"   'name' goes in html on line 17
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription), //[formControlName] = "'description'"
    })
  }

}
