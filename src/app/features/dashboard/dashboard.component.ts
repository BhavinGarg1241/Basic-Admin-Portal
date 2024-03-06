import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderComponent } from '../../core/components/header/header.component';
import { AddEditUserComponent } from '../../shared/components/add-edit-user/add-edit-user.component';
import { UsersComponent } from './users/users.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MatTabsModule,
    MatIconModule,
    AddEditUserComponent,
    MatTooltipModule,
    UsersComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent{
  tabs = ['All Users', 'Teachers', 'Students'];
  currentTab = 'All Users';

  constructor(private dialog: MatDialog) { }

  //This will open a dialog box made using angular material which holds a form for adding user
  openAddUserForm(): void {
    this.dialog.open(AddEditUserComponent, {
      width: '750px',
      height: '750px',
      data: { isEdit: false },
      disableClose: true
    });
  }

  updateTab(tab: string): void {
    this.currentTab = tab;
  }
}
