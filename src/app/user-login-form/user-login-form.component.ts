import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public snackBar: MatSnackBar
  ){ }
  
  ngOnInit(): void { }
    //Function responsible for sending the form inputs to the backend
    loginUser(): void {
      this.fetchApiData.userLogin(this.userData).subscribe((result) => {
        //Logic for successful user login goes here
        this.dialogRef.close();//This will close the modal on success
        console.log(result);
        this.snackBar.open('User signed in successfully', 'OK', {
          duration: 2000
        });
      }, (result) => {
        console.log(result);
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
      });
    }
  }

