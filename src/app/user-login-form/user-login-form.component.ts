import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ){ }
  
  ngOnInit(): void { }
    //Function responsible for sending the form inputs to the backend
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

