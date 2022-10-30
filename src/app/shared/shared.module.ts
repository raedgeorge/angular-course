import {NgModule} from "@angular/core";

import {AlertComponent} from "./alert/alert.component";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import {PlaceholderDirective} from "./placeHolder/placeholder.directive";
import {DropdownDirective} from "./dropdown.directive";
import {CommonModule} from "@angular/common";
import {LoggingService} from "../logging.service";

@NgModule({

  declarations: [
    AlertComponent,
    DropdownDirective,
    PlaceholderDirective,
    LoadingSpinnerComponent,
  ],

  imports: [
    CommonModule,
  ],

  exports: [
        CommonModule,
        AlertComponent,
        DropdownDirective,
        PlaceholderDirective,
        LoadingSpinnerComponent,
  ],

  providers: [LoggingService],

})
export class SharedModule {}
