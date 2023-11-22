import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('First Test recipe', 'Description of each recipe',
      'https://therecipecritic.com/wp-content/uploads/2020/03/Poke-Bowls-2-1.jpg'
      ),
    new Recipe('Second Test recipe', 'Description of each recipe',
      'https://therecipecritic.com/wp-content/uploads/2020/03/Poke-Bowls-2-1.jpg'
    )
  ]

  constructor() {}

  ngOnInit() {}
}
