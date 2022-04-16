import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutingPaths } from '../../../app.routes';
import { AuthService } from '../../../core/auth/services/auth-service';

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
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  isSubmitted: boolean = false;

  ngOnInit(): void {}

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      this.loginForm.reset();
      return;
    }

    this.authService.login(this.loginForm.value).subscribe((result) => {
      this.router.navigateByUrl(RoutingPaths.learningLogPath);
    });
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
