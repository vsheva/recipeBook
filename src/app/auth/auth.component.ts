import {Component} from '@angular/core';
import {NgForm} from '@angular/forms'
import {AuthResponse, AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  //styleUrls: ['./auth.component.css']
})

export class AuthComponent {
  isLogin = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {
  }

  onSwitchMode() {
    this.isLogin = !this.isLogin
  }

  onSubmit(forma: NgForm) {
    if (!forma.valid) {
      return;
    }
    const email = forma.value.email;
    const password = forma.value.password;
    let authObservable: Observable<AuthResponse>;

    this.isLoading = true;
    if (this.isLogin) {
      authObservable = this.authService.login(email, password)
      // .subscribe(resData => {
      //   console.log(resData)
      //   this.isLoading = false;
      // },
      // errorMessage => {//we subscribe to the observable  -that  moved logic to service in pipe (в пайп мы чуть подстраиваем данные)
      //   console.log(errorMessage);
      //   this.error = errorMessage;
      //   this.isLoading = false;
      // })
    } else {
      authObservable = this.authService.signup(email, password)
      // .subscribe(resData => {
      //     console.log(resData)
      //     this.isLoading = false;
      //   },
      //   errorMessage => {//we subscribe to the observable  -that  moved logic to service in pipe (в пайп мы чуть подстраиваем данные)
      //     console.log(errorMessage);
      //     this.error = errorMessage;
      //     this.isLoading = false;
      //   })
    }

    authObservable.subscribe(resData => {
        console.log(resData)
        this.isLoading = false;
      },
      errorMessage => {//we subscribe to the observable  -that  moved logic to service in pipe (в пайп мы чуть подстраиваем данные)
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      })
    forma.reset();
  }
}

//!!!we suscribe to observable (that is message) -> and throw it through throwError(errorMessage)
