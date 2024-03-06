import { Component, EventEmitter, Output } from '@angular/core';
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Messages } from '../../enums/enumLists';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  alertMessage = Messages.DeleteAlert;
  @Output() cancelClicked = new EventEmitter();
  @Output() confirmClicked = new EventEmitter();

  constructor(private dialogRef: MatDialogRef<AlertComponent>) { }

  cancelDelete(): void {
    this.cancelClicked.emit();
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.confirmClicked.emit();
    this.dialogRef.close();
  }
}
