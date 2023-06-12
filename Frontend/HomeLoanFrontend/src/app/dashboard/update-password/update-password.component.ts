import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UpdatePasswordService } from './update-password.service';
import UpdatePasswordDTO from 'app/interfaces/update-password-DTO';
import { EndpointsService } from 'app/services/endpoints.service';
import { InitializerService } from 'app/services/initializer.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {
  changePasswordForm: FormGroup;
  showProgressBar: boolean;
  hideOld: boolean = true;
  hideNew: boolean = true;
  hideConfirmNew: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private updatePasswordService: UpdatePasswordService,
    private route: Router,
    private dialogRef: MatDialogRef<UpdatePasswordComponent>,
    private snackBar: MatSnackBar,
    private endpoints: EndpointsService,
    private initializer: InitializerService
  ) {
    this.changePasswordForm = new FormGroup({});
    this.showProgressBar = false;
  }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&]).{8,}$'
          ),
        ],
      ],
      confirmPassword: [
        '',
        [Validators.required, this.comparePasswords.bind(this)],
      ],
    });
  }

  submitForm() {
    this.showProgressBar = true;
    if (this.changePasswordForm.valid) {
      setTimeout(() => {
        this.apiCall();
        this.showProgressBar = false;
        this.closeDialog();
      }, 2000);
    } else {
      this.showProgressBar = false;
    }
  }
  private comparePasswords(control: AbstractControl): ValidationErrors | null {
    const confirmPassword = control.value;
    const newPassword = this.changePasswordForm.get('newPassword')?.value;
    return newPassword === confirmPassword ? null : { compareWith: true };
  }
  private apiCall() {
    let changePasswordDto: UpdatePasswordDTO = this.initializer.updatePasswordDTO
    changePasswordDto.password = this.changePasswordForm.value.oldPassword;
    changePasswordDto.newPassword = this.changePasswordForm.value.newPassword;
    if (localStorage.getItem('role') == "user") {
      this.updatePasswordService.changePasswordApi(changePasswordDto, this.endpoints.updateUserPassword).subscribe({
        next: (response) => {
          this.showMessage('Password changed successfully!', 3000);
        },
        error: (err) => {
          this.showMessage('Failed to change password. Please try again.', 3000);
          if (err.status == 401) {
          }
        },
      });
    }
    else {
      this.updatePasswordService.changePasswordApi(changePasswordDto, this.endpoints.updateAdvisorPassword).subscribe({
        next: (response) => {
          this.showMessage('Password changed successfully!', 3000);
        },
        error: (err) => {
          this.showMessage('Failed to change password. Please try again.', 3000);
          if (err.status == 401) {
          }
        },
      });
    }


  }

  private closeDialog(): void {
    this.dialogRef.close();
  }
  private showMessage(message: string, duration: number): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: duration,
    });
  }

}
