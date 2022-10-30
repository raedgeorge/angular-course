import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list-edit/shopping-list.service";
import {Subscription} from "rxjs";
import {LoggingService} from "../../logging.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy{

  ingredients: Ingredient[];
  private activeSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService,
              private loggingService: LoggingService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.activeSubscription = this.shoppingListService.changedIngredients.subscribe(
      (ingredients: Ingredient[]) => (this.ingredients = ingredients)
    );
    this.loggingService.printLog('Shopping List Component Log');
  }

  ngOnDestroy(): void {
    this.activeSubscription.unsubscribe();
  }

  editItem(index: number){
    this.shoppingListService.startedEditing.next(index);
  }

}
