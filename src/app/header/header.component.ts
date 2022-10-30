import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy{

  userSubscription: Subscription;
  isAuthenticated = false;

  constructor(private router: Router,
              private dataService: DataStorageService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.userSubject.subscribe(
      (authUser) => {
        console.log(authUser);
          this.isAuthenticated = !authUser ? false : true;
      }
    )
  }

  onSaveData(){

    this.dataService.storeRecipes();
  }

  onFetchData(){
    this.dataService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();
    this.isAuthenticated = false;
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
