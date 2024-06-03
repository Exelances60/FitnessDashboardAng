import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-signinform',
  templateUrl: './signinform.component.html',
  styleUrl: './signinform.component.css',
})
export class SigninformComponent {
  loading = false;
  signInForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  autoTip: Record<string, Record<string, string>> = {
    en: {
      required: 'This field is required',
      email: 'Please enter a valid email address',
      minlength: 'Password must be at least 6 characters long',
    },
  };
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  submitForm(): void {
    if (this.signInForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService
      .login(this.signInForm.value.email, this.signInForm.value.password)
      .subscribe({
        next: (result: any) => {
          this.loading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}
