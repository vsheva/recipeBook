import {Injectable} from "@angular/core";

import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, Subject, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}


@Injectable({providedIn: "root"})

export class AuthService {
  user = new BehaviorSubject<User>(null);
  //token: string= null

  constructor(private http: HttpClient,
              private router: Router) {}

//pipe(catchError((errorRes) => {  //move logic form auth.component.ts to this observable (в пайп мы чуть подстраиваем данные)

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjUgwXfOgTJ1keWy3Iz0OJWR3tZDyU00E", {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError),
      tap(resData => {
        //!! call handleAuthentication
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      })
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjUgwXfOgTJ1keWy3Iz0OJWR3tZDyU00E", {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError), //!! взял снизу
      tap(resData => {
        //!! call handleAuthentication with all the data needs
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      })
    );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  //замена в signup/login
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    //current time stamp since 1970 in ms + ms(convert in sec) ===> back to date object
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate);

    this.user.next(user); // we emit currently loggedIn user !!!
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}



/*
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import { throwError} from 'rxjs';


export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjUgwXfOgTJ1keWy3Iz0OJWR3tZDyU00E',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjUgwXfOgTJ1keWy3Iz0OJWR3tZDyU00E',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError));
  }


  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}

*/

