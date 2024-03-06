import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../core/components/header/header.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _snackBar: MatSnackBar, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }

  //To provide user a notification
  openSnackBar(errorMessage: string): void {
    this._snackBar.open(errorMessage, 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4000,
    });
  }

  async onSubmit(): Promise<void> {
    const loginResponse = await this.authService.login(this.signInForm.value); //It tells if login was successful or failed
    if (loginResponse === true) {
      if (this._snackBar) {
        this._snackBar.dismiss();
      }
      this.router.navigate(['/dashboard']);
      this.signInForm.reset();
    } else {
      this.openSnackBar(loginResponse as string);
      this.signInForm.get('password').reset();
    }
  }
}
