import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeHolder/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('authForm', { static: true }) inputForm: NgForm;
  isLoginMode = true;
  isLoading = false;
  isLoggedIn =false;
  error: string = null;
  loggedOut = false;

  closeSubscription: Subscription;

  @ViewChild(PlaceholderDirective, {static: true}) alertHost: PlaceholderDirective;

  logOutSub:Subscription;

  private email = '';
  private password = '';

  constructor(private authService: AuthService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    console.log('on init');
     this.logOutSub = this.authService.isLoggedOutSub.subscribe(
       (isLoggedOut: boolean) => {
         this.loggedOut = isLoggedOut;
       })
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onHandleError(){
    this.error = null;
  }

  onSubmit() {
    if (this.inputForm.valid) {
      this.email = this.inputForm.value.email;
      this.password = this.inputForm.value.password;

      this.isLoading = true;
      let authObservable: Observable<AuthResponseData>;

      if (this.isLoginMode) {
       authObservable = this.authService.login(this.email, this.password);
      }
      else {
        authObservable = this.authService.signUp(this.email, this.password);
      }

      authObservable.subscribe(
        (responseData) => {
          console.log(responseData);
          this.router.navigate(['/recipes']);
          this.isLoading = false;
        },

        (errorResponse) => {
          console.log(errorResponse);
          this.error = errorResponse;
          this.showErrorAlert(errorResponse)
          this.isLoading = false;
        }
      )
        this.inputForm.reset();
    }
    else return;
  }

  ngOnDestroy() {
    this.logOutSub.unsubscribe();

    if(this.closeSubscription){
      this.closeSubscription.unsubscribe();
    }
  }

  // showing alert using code
  private showErrorAlert(message: string){

     const alertComponentFactory = this.componentFactoryResolver
                                               .resolveComponentFactory(AlertComponent);

     const hostViewContainerRef = this.alertHost.viewContainerRef;
     hostViewContainerRef.clear();

     const alertComponentRef = hostViewContainerRef.createComponent(alertComponentFactory);

     alertComponentRef.instance.message = message;
     this.closeSubscription = alertComponentRef.instance.close.subscribe( () => {
       this.closeSubscription.unsubscribe();
       this.alertHost.viewContainerRef.clear();
     })
  }
}
