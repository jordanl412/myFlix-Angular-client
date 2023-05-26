import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../user-registration.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 *@Component decorator to tell Angular that the class right below is a component.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * The @userData object is then passed into the API call in the registerUser function
   * @userData object contains: @Username (required), @Password (required), @Email (required), @Birthday
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * @Constructor arguments are then available through "this" method
   * @param fetchApiData to use functions to make API calls
   * @param dialogRef to call dialogs
   * @param snackBar to show message whether the user has successfully registered or not
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  /**
   * This function calls specified methods automatically, straight after Component is mounted
   */
  ngOnInit(): void {
  }

  /**
   * This function is responsible for sending form inputs to the backend API
   * @function registerUser
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(() => {
      //Logic for a successful user registration goes here (to be implemented)
      this.dialogRef.close();//This will close the modal on success
      let welcomeString = 'Welcome, ' + this.userData.Username + '! You may now log in to your account.';
      this.snackBar.open(welcomeString, 'OK', {
        duration: 2000
      });
    }, () => {
      this.snackBar.open('Something went wrong, please try again', 'OK', {
        duration: 2000
      });
    });
  }
}
