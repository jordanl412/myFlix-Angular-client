import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../user-registration.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule, Router } from '@angular/router';

/**
 *@Component decorator to tell Angular that the class right below is a component.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  /**
   * The @loginData object is passed into the API call in the registerUser function
   * @loginData object contains: @Username (required), @Password (required)
   */
  @Input() userData = { Username: '', Password: '' };

  /**
   * @Constructor is used to set dependencies. Constructor arguments are then available through "this" method
   * @param fetchApiData to use functions to make API calls
   * @param dialogRef to call dialog with login inputs
   * @param snackBar to show message whether user was successfully logged in or not
   * @param router to navigate the user to the welcome MovieCard after logging in successfully
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ){ }
  
  /**
   * This function calls specified methods automatically, straight after Component is mounted
   */
  ngOnInit(): void { }
    /**
     * This function is responsible for sending the form inputs to the backend API to log in the user
     * @function loginUser
     * If successful, logs in the user and sets localStorage with user and token
     * If unsuccessful, snackBar shows error message 
     */
    loginUser(): void {
      this.fetchApiData.userLogin(this.userData).subscribe((result) => {
        //Logic for successful user login goes here
        console.log(result);
        localStorage.setItem('user', result.user.Username);
        localStorage.setItem('token', result.token);
        this.dialogRef.close();//This will close the modal on success
        this.snackBar.open('User signed in successfully', 'OK', {
          duration: 2000
        });
        this.router.navigate(['movies']);
      }, (result) => {
        console.log(result);
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
      });
    }
  }

