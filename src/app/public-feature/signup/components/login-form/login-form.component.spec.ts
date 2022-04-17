import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RoutingPaths } from '../../../../app.routes';
import { AppRoutingModule } from '../../../../app-routing.module';
import { AuthService } from '../../../../core/auth/services/auth-service';

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

  it('should call the service on submit and navigate to learning log', async function () {
    // Given
    authServiceSpy.login.and.returnValue(of(true));

    // When
    await fillInUsername('testuser_63', fixture);
    await fillInPassword('secret', fixture);
    component.onSubmit();

    // Then
    expect(authServiceSpy.login.calls.count()).toBe(1);
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
    const usernameInputElement = getUsernameInputElement(fixture);
    // When
    const usernameValue = component.loginForm.get('username');
    // Then
    expect(usernameInputElement.value).toEqual(usernameValue!.value);
    expect(usernameValue?.errors).not.toBeNull();
    expect(usernameValue!.errors!['required']).toBeTruthy();
  });

  it('should have a required password error by default', function () {
    // Given
    const passwordInputElement = getPasswordInputElement(fixture);
    // When
    const passwordValue = component.loginForm.get('password');
    // Then
    expect(passwordInputElement.value).toEqual(passwordValue!.value);
    expect(passwordValue?.errors).not.toBeNull();
    expect(passwordValue!.errors!['required']).toBeTruthy();
  });

  it('should update the username in the formGroup when the input field changes', async function () {
    // Given
    const usernameInputElement = getUsernameInputElement(fixture);
    // When
    await fillInUsername('testuser_63', fixture);
    // Then
    const usernameGroupValue = component.loginForm.get('username');
    expect(usernameInputElement.value).toEqual(usernameGroupValue!.value);
    expect(usernameGroupValue?.errors).toBeNull();
  });

  it('should update the password in the formGroup when the input field changes', async function () {
    // Given
    const passwordInputElement = getPasswordInputElement(fixture);
    // When
    await fillInPassword('secret', fixture);
    // then
    const passwordGroupValue = component.loginForm.get('password');
    expect(passwordInputElement.value).toEqual(passwordGroupValue!.value);
    expect(passwordGroupValue?.errors).toBeNull();
  });

  it('should make the form valid when username and password are valid', async function () {
    // When
    await fillInUsername('testuser_63', fixture);
    await fillInPassword('secret', fixture);
    // Then
    expect(component.loginForm.valid).toBeTruthy();
  });
});

function getUsernameInputElement(
  fixture: ComponentFixture<LoginFormComponent>
): HTMLInputElement {
  return fixture.debugElement.nativeElement
    .querySelector('#loginForm')
    .querySelectorAll('input')[0];
}

function getPasswordInputElement(
  fixture: ComponentFixture<LoginFormComponent>
): HTMLInputElement {
  return fixture.debugElement.nativeElement
    .querySelector('#loginForm')
    .querySelectorAll('input')[1];
}

async function fillInUsername(
  newValue: any,
  fixture: ComponentFixture<LoginFormComponent>
) {
  const usernameInputElement = getUsernameInputElement(fixture);
  usernameInputElement.value = newValue;
  usernameInputElement.dispatchEvent(new Event('input'));
  fixture.detectChanges();
  await fixture.whenStable();
}

async function fillInPassword(
  newValue: any,
  fixture: ComponentFixture<LoginFormComponent>
) {
  const passwordInputElement = getPasswordInputElement(fixture);
  passwordInputElement.value = newValue;
  passwordInputElement.dispatchEvent(new Event('input'));
  fixture.detectChanges();
  await fixture.whenStable();
}
