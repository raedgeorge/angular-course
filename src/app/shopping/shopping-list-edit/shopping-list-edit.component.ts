import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit, OnDestroy{

  @ViewChild('f', {static: true}) itemForm: NgForm;
  private formSubscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {

    this.formSubscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
            this.editMode = true;
            this.editItemIndex = index;
            this.editedItem = this.shoppingListService.getIngredientById(index);
            this.itemForm.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount,
            })
      }
    )
  }

  onSubmit(form: NgForm) {

      const ingName = form.value.name;
      const ingAmount = form.value.amount;
      const newIngredient = new Ingredient(ingName, ingAmount);
      if (this.editMode){
        this.shoppingListService.updateItem(newIngredient, this.editItemIndex);
      }
      else {
        this.shoppingListService.addIngredient(newIngredient);
      }
      form.reset();
      this.editMode = false;
  }

  clearForm() {
    this.itemForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.editMode = false;
    this.itemForm.reset();
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }
}
