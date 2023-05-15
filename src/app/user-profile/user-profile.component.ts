import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  initialInput: any = {};
  favorites: any = [];

@Input() updatedUser = {
  Username: '',
  Password: '',
  Email: '',
  Birthday: ''
};

constructor(
  public fetchApiData: UserRegistrationService,
  public dialogRef: MatDialogRef<UserProfileComponent>,
  public snackBar: MatSnackBar,
  private router: Router
) {}

ngOnInit(): void {
  this.getUserInfo();
}

getUserInfo(): void {
  this.fetchApiData.getUser().subscribe((resp: any) => {
    this.user = resp;
    this.updatedUser.Username = this.user.Username;
    this.updatedUser.Password = this.user.Password;
    this.updatedUser.Email = this.user.Email;
    this.updatedUser.Birthday = formatDate(this.user.Birthday, 'yyyy-MM-dd', 'en-US', 'UTC+0');
    this.favorites = this.user.FavoriteMovies;
    return this.user;
  });
}

  updateUserInfo(): void {
    this.fetchApiData.editUser(this.updatedUser).subscribe((result) => {
      console.log(result);
      if(this.user.Username !== result.Username || this.user.Password !== result.Password) {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open(
          'Account updated. Please log in using your new credentials.', 'OK', {
            duration: 2000
          }
        );
      } else {
        this.snackBar.open(
          'User information has been updated.', 'OK', {
            duration: 2000
          }
        );
      }
    }); 
  }

  deleteAccount(): void {
    if (confirm('All your data will be lost - this action cannot be undone.')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open(
          'You have successfully deleted your account.', 'OK', {
            duration: 2000
          }
        );
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }
}


