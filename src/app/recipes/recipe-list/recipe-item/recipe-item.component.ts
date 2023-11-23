import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Recipe} from "../../recipe.model";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
   //@Input() recipe: { description: string, name: string, imagePath: string }
  @Input() recipe: Recipe

  @Output() recipeSelected = new EventEmitter();


  constructor() {}

  onSelected() {
    this.recipeSelected.emit();
  }

  ngOnInit() {}

}
