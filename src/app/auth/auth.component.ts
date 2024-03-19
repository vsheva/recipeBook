import {Component, OnDestroy, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms'
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AlertComponent} from "../shared/alert/alert.component";//!
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})


export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  //add Placeholder as type
  //we get access to that directive PlaceHolder and we store it in variable alertHost
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective; //for placeholder

  private closeSub: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
  ) {
  }

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

  ngOnDestroy() {
    if(this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  private showErrorAlert(message: string) {
    const hostViewContainerRef = this.alertHost.viewContainerRef;//!! we create helper directive Placeholder и помещаем его в auth.html  - which automatically gives us access to reference to a pounter at the place where this directive is then used
   //this allow us to get info about the place where we use that directive: not just coordinates, but ViewContainerRef can create component in that place, where it sits
   //get access to the place where derective is added to and can add component
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(AlertComponent);

    componentRef.instance.message = message;
    this.closeSub= componentRef.instance.close.subscribe(()=>{
     this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

}



