import {Component, ComponentFactoryResolver} from '@angular/core';
import {NgForm} from '@angular/forms'
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AlertComponent} from "../shared/alert/alert.component";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})


export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver
              ) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObservable: Observable<AuthResponseData>; //from type

    this.isLoading = true;
    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password)
    } else {
      authObservable = this.authService.signup(email, password)
    }
//!!subscribe
    authObservable.subscribe(resData => {
        console.log(resData)
        this.isLoading = false;
        this.router.navigate(["/recipes"]);//click button,loging done, routing
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      })
    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
  //const alertCmp = new AlertComponent()
   const alertCmpFactory= this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
  }
}



