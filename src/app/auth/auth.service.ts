import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, Subject, throwError} from "rxjs";
import {tap} from 'rxjs/operators';
import {UserModel} from "./user.model";
import {Router} from "@angular/router";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  userSubject = new BehaviorSubject<UserModel>(null);
  isLoggedOutSub = new BehaviorSubject<boolean>(false);
  tokenExpirationTimer: any;

  url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAH0ue594fAoRRXnV6sQMZ44og2Pr_2Lnk';
  url2 = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAH0ue594fAoRRXnV6sQMZ44og2Pr_2Lnk';

  constructor(private http: HttpClient,
              private router: Router) {
  }

  signUp(email: string, password: string){
    return this.http.post<AuthResponseData>(this.url, {
      email: email,
      password: password,
      returnSecureToken: true,
    }).pipe(catchError (this.handleError),
       tap(responseData => {
         this.handleAuthentication(responseData.email,
                                   responseData.localId,
                                   responseData.idToken,
                                   +responseData.expiresIn);
       }));
  }

  login(email: string, password: string){

    return this.http.post<AuthResponseData>(this.url2, {
      email: email,
      password: password,
      returnSecureToken: true,
    }).pipe( catchError (this.handleError),
            tap(responseData => {
              this.handleAuthentication(responseData.email,
                responseData.localId,
                responseData.idToken,
                +responseData.expiresIn);
            }));
  }


  autoLogin(){

    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpiryDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData){
      return;
    }

    const loadedUser = new UserModel(userData.email,
                                     userData.id,
                                     userData._token,
                                     new Date(userData._tokenExpiryDate));

    if (loadedUser.token){
      this.userSubject.next(loadedUser);

      const expiryDuration = new Date(userData._tokenExpiryDate).getTime() - new Date().getTime();
      this.autoLogout(expiryDuration);
    }
  }

  private handleAuthentication(email: string, id: string, token: string, expiresIn: number){

    const expiryDate = new Date( new Date().getTime() + expiresIn * 1000 );
    const user = new UserModel(email, id, token, expiryDate);
    this.userSubject.next(user);

    this.autoLogout(expiresIn * 1000);

    localStorage.setItem('userData', JSON.stringify(user));

  }

  private handleError(errorResponse: HttpErrorResponse){

    let errorMessage = 'an unknown error occurred';
    if (!errorResponse.error || !errorResponse.error.error){
      return throwError(errorMessage);
    }

    switch (errorResponse.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists!';
        break;

      case 'EMAIL_NOT_FOUND':
        errorMessage = 'email is not registered!';
        break;

      case 'INVALID_PASSWORD':
        errorMessage = 'invalid password, please try again';
        break;
    }
      return throwError(errorMessage);
  }

  logout(){
    this.isLoggedOutSub.next(true);
    this.userSubject.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
  }

  autoLogout(expiryDuration: number){

    this.tokenExpirationTimer = setTimeout( () => {
      this.logout();
    }, expiryDuration);

  }
}
