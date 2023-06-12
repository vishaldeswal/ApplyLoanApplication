import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EndpointsService } from 'app/services/endpoints.service';
import { InitializerService } from 'app/services/initializer.service';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { of , throwError} from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let formBuilder: FormBuilder;
  let snackBar: MatSnackBar;
  let loginService: LoginService;
  let router: Router;
  let endpoints: EndpointsService;
  let initializer: InitializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientModule,
        FormsModule, //for template driven approach
        ReactiveFormsModule, //for reactive forms
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatIconModule,
        BrowserAnimationsModule

      ],
      providers:[
        FormBuilder,
        MatSnackBar,
        LoginService,
        { provide: Router, useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl') } },
        EndpointsService,
        InitializerService,
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    formBuilder = TestBed.inject(FormBuilder);
    snackBar = TestBed.inject(MatSnackBar);
    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
    endpoints = TestBed.inject(EndpointsService);
    initializer = TestBed.inject(InitializerService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form', () => {
    component.ngOnInit();
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('email')).toBeDefined();
    expect(component.loginForm.get('password')).toBeDefined();
  });

  it('should call loginAPICall method when login form is valid', () => {
    spyOn(component, 'loginAPICall');
    
    component.loginForm = formBuilder.group({
      email: ['test@example.com'],
      password: ['password123'],
    });
    component.login();
    expect(component.loginAPICall).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(component.loginAPICall).toHaveBeenCalledTimes(1);
  });

  it('should call login service with advisorLogin endpoint if role is "advisor" and advisor exist', () => {
    spyOn(localStorage, 'getItem').and.returnValue('advisor');
    spyOn(loginService, 'login').and.returnValue(of('dummyAuthToken')); //expected result

    component.loginAPICall('test@example.com', 'password123');
    expect(loginService.login).toHaveBeenCalledWith(jasmine.objectContaining({
      emailId: 'test@example.com',
      password: 'password123',
    }), endpoints.advisorLogin);
  });

  it('should call login service with advisorLogin endpoint if role is "advisor" and advisor does not exist', () => {
    spyOn(localStorage, 'getItem').and.returnValue('advisor');
    spyOn(loginService, 'login').and.returnValue(throwError('Advisor not exist'));
    spyOn(component,'showMessage');
  
    component.loginAPICall('test@example.com', 'password123');
  
    expect(loginService.login).toHaveBeenCalledWith(jasmine.objectContaining({
      emailId: 'test@example.com',
      password: 'password123',
    }), endpoints.advisorLogin);
  
    expect(component.showMessage).toHaveBeenCalledWith('Failed to login. Please try again.', 3000);
  });
  

  it('should call login service with userLogin endpoint if role is "user"', () => {
    spyOn(localStorage, 'getItem').and.returnValue('user');
    spyOn(loginService, 'login').and.returnValue(of('dummyAuthToken'));

    component.loginAPICall('test@example.com', 'password123');
    expect(loginService.login).toHaveBeenCalledWith(jasmine.objectContaining({
      emailId: 'test@example.com',
      password: 'password123',
    }), endpoints.userLogin);
  });


  it('should call login service with userLogin endpoint if role is "user" and user not exist', () => {
    spyOn(localStorage, 'getItem').and.returnValue('user');
    spyOn(loginService, 'login').and.returnValue(throwError('User not exist'));
    spyOn(component,'showMessage');

    component.loginAPICall('test@example.com', 'password123');
    
    expect(loginService.login).toHaveBeenCalledWith(jasmine.objectContaining({
      emailId: 'test@example.com',
      password: 'password123',
    }), endpoints.userLogin);

    expect(component.showMessage).toHaveBeenCalledWith('Failed to login. Please try again.', 3000);
  });

  it('should set authToken and emailId in localStorage, show success message, and navigate to Dashboard on successful login', () => {
    spyOn(localStorage, 'getItem').and.returnValue('advisor');
    spyOn(loginService, 'login').and.returnValue(of('dummyAuthToken'));
    spyOn(localStorage, 'setItem');
  
    spyOn(component, 'showMessage');
  
    component.loginAPICall('test@example.com', 'password123');
  
    expect(loginService.login).toHaveBeenCalledWith(jasmine.objectContaining({
      emailId: 'test@example.com',
      password: 'password123',
    }), endpoints.advisorLogin);

  
    expect(localStorage.setItem).toHaveBeenCalledWith('authToken', 'dummyAuthToken');
    expect(localStorage.setItem).toHaveBeenCalledWith('emailId', 'test@example.com');
    
    expect(component.showMessage).toHaveBeenCalledWith('Login successfully!', 3000);
    expect(router.navigateByUrl).toHaveBeenCalledWith('Dashboard');
  });

  });
