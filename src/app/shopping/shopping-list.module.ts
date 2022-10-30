import {NgModule} from "@angular/core";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {ShoppingListEditComponent} from "./shopping-list-edit/shopping-list-edit.component";
import {FormsModule} from "@angular/forms";
import {ShoppingListRoutesModule} from "./shopping-list-routes.module";
import {SharedModule} from "../shared/shared.module";
import {LoggingService} from "../logging.service";

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent,
  ],

  exports: [
    ShoppingListComponent,
    ShoppingListEditComponent,
  ],

  imports: [
    FormsModule,
    ShoppingListRoutesModule,
    SharedModule,
  ],

  // providers: [LoggingService],
})
export class ShoppingListModule{

}
