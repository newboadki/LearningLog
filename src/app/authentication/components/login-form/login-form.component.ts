import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass'],
})
export class LoginFormComponent implements OnInit {
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(private formBuilder: FormBuilder) {}

  isSubmitted: boolean = false;

  ngOnInit(): void {}

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      this.loginForm.reset();
      return;
    }
  }

  isUsernameInvalid(): boolean {
    return this.isFieldInvalid('username');
  }

  isUsernameRequiredError(): string | null {
    return this.isFieldRequiredError('username');
  }

  isPasswordInvalid(): boolean {
    return this.isFieldInvalid('username');
  }

  isPasswordRequiredError(): string | null {
    return this.isFieldRequiredError('username');
  }

  private isFieldInvalid(key: string): boolean {
    return this.isSubmitted && this.loginForm.controls[key].errors != null;
  }

  private isFieldRequiredError(key: string): string | null {
    let errors = this.loginForm.controls[key].errors;

    if (errors) {
      return errors['required'];
    } else {
      return null;
    }
  }
}
