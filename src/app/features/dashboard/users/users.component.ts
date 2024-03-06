import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddEditUserComponent } from '../../../shared/components/add-edit-user/add-edit-user.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../users.service';
import { AlertComponent } from '../../../shared/display-messages/alert/alert.component';
import { Messages } from '../../../shared/enums/enumLists';
import { User } from '../../../shared/models/common.model';
import { allUsersColumns, teacherStudentColumns } from '../../../shared/constants/tableColums';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    AddEditUserComponent,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() currentTab: string;
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  constructor(private usersService: UsersService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsers();
    this.usersService.dataSourceUpdated.subscribe(() => {
      this.loadUsers();
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentTab'] && !changes['currentTab'].firstChange) {
      this.loadUsers();
    }
  }

  loadUsers(): void {
    switch (this.currentTab) {
      case 'All Users':
        this.displayedColumns = allUsersColumns;
        this.loadAllUsers();
        break;
      case 'Teachers':
      case 'Students':
        this.displayedColumns = teacherStudentColumns;
        this.loadSpecificUsers(this.currentTab);
        break;
      default:
        this.displayedColumns = allUsersColumns;
        this.loadAllUsers();
        break;
    }
  }

  loadAllUsers(): void {
    this.usersService.getUsers().then(users => {
      this.dataSource.data = users;
    });
  }

  loadSpecificUsers(tab: string): void {
    const method = tab === 'Teachers' ? this.usersService.getTeachers() : this.usersService.getStudents();
    method.then(users => {
      this.dataSource.data = users;
    });
  }
  editUser(user: any): void {
    this.dialog.open(AddEditUserComponent, {
      width: '750px',
      height: '750px',
      data: { user, isEdit: true },
      disableClose: true
    });
  }

  deleteUser(user: any): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: 'auto',
      height: 'auto',
      disableClose: true
    });

    // Subscribes to the cancelClicked event of the AlertComponent
    dialogRef.componentInstance.cancelClicked.subscribe(() => {
      this.usersService.openSnackBar(Messages.UserNotDeleted);
    });

    // Subscribes to the confirmClicked event of the AlertComponent
    dialogRef.componentInstance.confirmClicked.subscribe(() => {
      this.usersService.deleteUser(user.id);
      this.usersService.openSnackBar(Messages.UserDeletedSuccess)
    });
  }
}
