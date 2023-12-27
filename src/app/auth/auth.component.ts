import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  private closeSub: Subscription;

  constructor(private authService: AuthService, 
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }

    let authObs: Observable<AuthResponseData>;

    const email = authForm.value.email;
    const password = authForm.value.password;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipe']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(this.error);
        this.isLoading = false;
      }
    );

    authForm.reset();
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  private showErrorAlert(message: string) {
      const cmpFactory  = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

      const hostViewContainerRef = this.alertHost.viewContainerRef;
      hostViewContainerRef.clear();

      const componentRef = hostViewContainerRef.createComponent(cmpFactory);
      componentRef.instance.message = message;

      this.closeSub = componentRef.instance.close.subscribe(() => {
        this.closeSub.unsubscribe();
        hostViewContainerRef.clear();
      });
  }
}
