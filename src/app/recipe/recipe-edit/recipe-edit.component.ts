import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];

        // used to check editMode
        this.editMode = params['id'] != null;
        this.initForm();
      });
  }

  private initForm() {

    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode){
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe['ingredients']){
        for (let ingredient of recipe.ingredients){
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount,
              [Validators.required,
                           Validators.pattern(/^[1-9]+[0-9]*$/)]),
          }))
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients,
    });
  }

  onSubmit() {

    //one way to pass the recipe object value
    // const recipe = new Recipe(
    //   this.recipeForm.get('name').value,
    //   this.recipeForm.get('description').value,
    //   this.recipeForm.get('imagePath').value,
    //   this.recipeForm.get('ingredients').value
    // );

    if (this.editMode){
      this.recipeService.updateRecipe(this.recipeForm.value, this.id);
    }
    else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  get controls(){
    return (<FormArray> this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){

    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
    }))
  }

  onCancel(){

    //one way
    // this.router.navigate(['../']);

    //another way - best
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(ingredientId: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(ingredientId);
  }
}
