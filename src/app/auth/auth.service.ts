import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new Subject<User>();

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
      return this.http.post<AuthResponseData>
      ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZKAJH6NUepxbU7mPjkTxAcizuJyKWmhc', 
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      ).pipe(catchError(this.handleErrors), tap(resData => {
          this.handleAuth(
            resData.email, 
            resData.localId, 
            resData.idToken, 
            +resData.expiresIn);
      })   
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>
    ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZKAJH6NUepxbU7mPjkTxAcizuJyKWmhc',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleErrors), tap(resData => {
      this.handleAuth(
        resData.email, 
        resData.localId, 
        resData.idToken, 
        +resData.expiresIn);
      })
    );
  }

  private handleAuth(email: string, userId: string, token: string, expiration: number) {
    const expirationDate = new Date(
      +new Date().getTime + expiration * 1000);
    const user = new User(
      email, 
      userId,
      token, 
      expirationDate
    );
      this.user.next(user);
  }

  private handleErrors(errorRes: HttpErrorResponse) {
      let errorMessage = 'An error occured!';
      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }
      switch(errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email address already exists!';
          break;
        case 'INVALID_LOGIN_CREDENTIALS':
          errorMessage = 'The credentianls are not valid! Please check your email and password!';
          break;
      }
      return throwError(errorMessage);
    }
}