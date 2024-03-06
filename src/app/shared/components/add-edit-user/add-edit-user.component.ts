import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { hobbiesData } from '../../../shared/constants/hobbies';
import { rolesData } from '../../../shared/constants/userRoles';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from '../../../features/dashboard/users.service';
import { Messages } from '../../enums/enumLists';

@Component({
  selector: 'app-add-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-edit-user.component.html',
  styleUrl: './add-edit-user.component.css'
})
export class AddEditUserComponent implements OnInit {
  userForm: FormGroup
  isEditMode = this.data.isEdit;
  genders = ['Male', 'Female'];
  hobbies = hobbiesData;
  roles = rolesData;
  maxDate = new Date();
  originalFormData: any;

  constructor(
    private usersService: UsersService,
    private dialogRef: MatDialogRef<AddEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) { }

  ngOnInit(): void {

    this.userForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.pattern(/^\s*\S.*$/)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null),
      'dob': new FormControl(null, Validators.required),
      'gender': new FormControl('Male', Validators.required),
      'role': new FormControl({ value: 3, disabled: this.isEditMode }, Validators.required),
    })

    this.addHobbyCheckboxes();
    this.editPreFilledForm();
  }

  //To dynamicaaly add form controls to reactive form
  addHobbyCheckboxes(): void {
    const hobbyControls = this.hobbies.map(() => new FormControl(false));
    this.userForm.setControl('hobbies', new FormArray(hobbyControls));
  }

  // Retrieves the 'hobbies' FormArray from the userForm FormGroup,and returns its controls.
  getControls(): AbstractControl<any, any>[] {
    return (<FormArray>this.userForm.get('hobbies')).controls;
  }

  //To pre-fil the form with user details when editing
  async editPreFilledForm(): Promise<void> {
    if (this.isEditMode === true) {
      const hobbies = await this.usersService.getUserHobbies(this.data.user.id);
      const mappedHobbies = hobbies.map((hobby) => {
        // Example assuming `hobbyId` property:
        const targetHobbyId = hobby.hobbyId - 1; // Adjust -1 if needed

        // Check for valid ID and handle edge cases:
        return targetHobbyId >= 0 && targetHobbyId < this.hobbies.length
          ? targetHobbyId
          : null;
      });
      this.userForm.patchValue({
        name: this.data.user.name,
        email: this.data.user.email,
        dob: this.data.user.dob,
        gender: this.data.user.gender,
        role: this.data.user.role === 'Teacher' ? 2 : 3,
      })
      mappedHobbies.forEach((adjustedHobbyId, index) => {
        if (adjustedHobbyId !== null) {
          (<FormArray>this.userForm.get('hobbies')).controls[adjustedHobbyId].patchValue(true)
        }
      });
    } else {
      return;
    }
  }

  async onSubmit(): Promise<void> {
    const userData = this.userForm.value;
    if (this.userForm.valid) {
      if (this.isEditMode) {
        console.log(userData);
        this.usersService.updateUser(this.data.user.id, userData);
        this.dialogRef.close();
        this.usersService.openSnackBar(Messages.UserEditSuccess);
        this.userForm.reset();
        this.isEditMode = this.data.isEdit;
      } else {
        await this.usersService.addUser(userData);
        this.dialogRef.close();
        this.userForm.reset();
        this.isEditMode = this.data.isEdit;
      }
    } else {
    }
  }

  onCancel(): void {
    this.dialogRef.close();
    this.userForm.reset();
    this.isEditMode = this.data.isEdit;
  }
}
