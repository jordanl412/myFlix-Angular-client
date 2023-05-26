import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../user-registration.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

/**
 *@Component decorator to tell Angular that the class right below is a component.
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  /**
   * These variables receivee and keep info from API calls
   * @user - keeps info about specific user
   * @movies - keeps array of JSON  objects of all movies available in the database
   * @favorites - keeps array of user's favorite movies, by id
   */
  user: any = {};
  movies: any[] = [];
  initialInput: any = {};
  favorites: any = [];

  /**
   * The updatedUser object will then be passed into the API call in the registerUser function
   * @userData object contains: @Username (required), @Password (required), @Email (required), and @Birthday
   */
@Input() updatedUser = {
  Username: '',
  Password: '',
  Email: '',
  Birthday: ''
};

/**
 * @constructor arguments are then available through "this" method
 * @param fetchApiData  to use functions to make API calls
 * @param dialogRef to open the user profile component
 * @param snackBar to show message whether the user was successfully logged in or not
 * @param router to navigate the user to welcome screen
 */
constructor(
  public fetchApiData: UserRegistrationService,
  public dialogRef: MatDialogRef<UserProfileComponent>,
  public snackBar: MatSnackBar,
  private router: Router
) {}

/**
 * This function calls specified methods automatically, straight after component is mounted
 */
ngOnInit(): void {
  this.getUserInfo();
}

/**
 * This function makes an API call to get the user from the database
 * @function getUserInfo
 * @returns JSON object with user information
 */
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

  /**
   * This function makes an API call to update user data (username, password, email, and/or birthday)
   * @function updateUserInfo
   */
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

  /**
   * This function makes an API call to delete the user data for specific user
   * @function deleteAccount
   */
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


