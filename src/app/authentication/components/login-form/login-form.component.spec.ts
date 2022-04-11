import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { of } from 'rxjs';
import { RoutingPaths } from '../../../app.routes';
import { AppRoutingModule } from '../../../app-routing.module';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [FormsModule, ReactiveFormsModule, AppRoutingModule],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call the service on submit', async function () {
    authServiceSpy.login.and.returnValue(of(true));

    const usernameInputElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#loginForm')
        .querySelectorAll('input')[0];
    // When
    usernameInputElement.value = 'testuser_63';
    usernameInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const passwordInputElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#loginForm')
        .querySelectorAll('input')[1];
    // When
    passwordInputElement.value = 'secret';
    passwordInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    component.onSubmit();

    expect(authServiceSpy.login.calls.count())
      .withContext('one call to login')
      .toBe(1);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledOnceWith(
      RoutingPaths.learningLogPath
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain two input fields', function () {
    // Given
    const formElement =
      fixture.debugElement.nativeElement.querySelector('#loginForm');
    // When
    const inputElements = formElement.querySelectorAll('input');
    // Then
    expect(inputElements.length).toEqual(3);
  });

  it('should have empty values by default', function () {
    // Given
    const loginFormGroup = component.loginForm;
    // When
    const loginFormValues = { username: '', password: '' };
    // Then
    expect(loginFormGroup.value).toEqual(loginFormValues);
  });

  it('should have a required username error by default', function () {
    // Given
    const usernameInputElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#loginForm')
        .querySelectorAll('input')[0];
    // When
    const usernameValue = component.loginForm.get('username');
    // Then
    expect(usernameInputElement.value).toEqual(usernameValue!.value);
    expect(usernameValue?.errors).not.toBeNull();
    expect(usernameValue!.errors!['required']).toBeTruthy();
  });

  it('should have a required password error by default', function () {
    // Given
    const passwordInputElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#loginForm')
        .querySelectorAll('input')[1];
    // When
    const passwordValue = component.loginForm.get('password');
    // Then
    expect(passwordInputElement.value).toEqual(passwordValue!.value);
    expect(passwordValue?.errors).not.toBeNull();
    expect(passwordValue!.errors!['required']).toBeTruthy();
  });

  it('should update the username in the formGroup when the input field changes', async function () {
    // Given
    const usernameInputElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#loginForm')
        .querySelectorAll('input')[0];
    // When
    usernameInputElement.value = 'testuser_63';
    usernameInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    const usernameGroupValue = component.loginForm.get('username');
    // Then
    expect(usernameInputElement.value).toEqual(usernameGroupValue!.value);
    expect(usernameGroupValue?.errors).toBeNull();
  });

  it('should update the password in the formGroup when the input field changes', async function () {
    // Given
    const passwordInputElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#loginForm')
        .querySelectorAll('input')[1];
    // When
    passwordInputElement.value = 'secret';
    passwordInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    const passwordGroupValue = component.loginForm.get('password');
    // then
    expect(passwordInputElement.value).toEqual(passwordGroupValue!.value);
    expect(passwordGroupValue?.errors).toBeNull();
  });

  it('should make the form valid when username and password are valid', async function () {
    // Given
    const usernameInputElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#loginForm')
        .querySelectorAll('input')[0];
    const passwordInputElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#loginForm')
        .querySelectorAll('input')[1];
    // When
    usernameInputElement.value = 'testuser_63';
    passwordInputElement.value = 'secret';
    usernameInputElement.dispatchEvent(new Event('input'));
    passwordInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    // Then
    expect(component.loginForm.valid).toBeTruthy();
  });
});
