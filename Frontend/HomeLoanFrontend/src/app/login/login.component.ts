import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EndpointsService } from 'app/services/endpoints.service';
import { InitializerService } from 'app/services/initializer.service';
import { LoginService } from './login.service';
import LoginDTO from 'app/interfaces/login-DTO';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [], //loginService is at root level so all compennets have one instance.
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  loginData: LoginDTO = this.initializer.loginDTO;
  hide : boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private loginService: LoginService,
    private router: Router,
    private endpoints: EndpointsService,
    private initializer: InitializerService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('authToken') != undefined) {
      this.router.navigateByUrl('Dashboard');
    }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&]).{8,}$'
          ),
        ],
      ],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      this.loginAPICall(email, password);
    }
  }
  public loginAPICall(email: string, password: string): void {
    this.loginData = {
      emailId: email,
      password: password,
    };
    if (localStorage.getItem('role') == 'advisor') {
      this.loginService
        .login(this.loginData, this.endpoints.advisorLogin)
        .subscribe({
          next: (response) => {
            localStorage.setItem('authToken', response);
            localStorage.setItem('emailId', this.loginData.emailId);
            this.showMessage('Login successfully!', 3000);
            this.router.navigateByUrl('Dashboard');
          },
          error: (err) => {
            this.showMessage(
              'Failed to login. Please try again.',
              3000
            );
          },
        });
    } else {
      this.loginService
        .login(this.loginData, this.endpoints.userLogin)
        .subscribe({
          next: (response) => {
            localStorage.setItem('authToken', response);
            localStorage.setItem('emailId', this.loginData.emailId);
            this.showMessage('Login successfully!', 3000);
            this.router.navigateByUrl('Dashboard');
          },
          error: (err) => {
            this.showMessage(
              'Failed to login. Please try again.',
              3000
            );
          },
        });
    }
  }
  public showMessage(message: string, duration: number): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: duration,
    });
  }
}
