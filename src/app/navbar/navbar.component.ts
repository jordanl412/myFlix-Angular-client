import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  /**
   * @Constructor is used to set dependencies. Constructor arguments are then available through "this" method
   * @param router to navigate the user
   */
  constructor(public router: Router) {}

  /**
   * This function calls specified methods automatically, straight after Component is mounted
   */
  ngOnInit(): void {}

  /**
   * This function navigates to list of all movies, URL ends with '/movies'
   * @function toMovies
   */
  toMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * This function navigates to user's profile, URL ends with '/profile'
   * @function toProfile
   */
  toProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * This function navigates to the welcome page, URL ends with '/welcome', logs user out
   * @function logout
   */
  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}