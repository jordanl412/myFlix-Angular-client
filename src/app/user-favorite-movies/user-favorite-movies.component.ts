import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../user-registration.service';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @Component decorator to tell Angular that the class below is a component
 */
@Component({
  selector: 'app-user-favorite-movies',
  templateUrl: './user-favorite-movies.component.html',
  styleUrls: ['./user-favorite-movies.component.scss']
})

export class UserFavoriteMoviesComponent {
  /**
   * Receive and keep info from API calls
   * @mfavoriteMovies - array of favorite movie ids from user's list of favorite movies
   * @user - JSON object of the specific user
   */
  favoriteMovies: any[] = [];
  user: any = {};

  /**
   * @constructor - sets dependencies
   * @param fetchApiData - use functions to make API calls
   * @param dialog - call dialog with Genre, Director, Synopsis buttons
   * @param snackBar - show message that function was successful or an error
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  /**
   * This function calls specified methods automatically, straight after Component has mounted
   * @function getFavoriteMovies
   */
  ngOnInit(): void {
    this.getFavoriteMovies();
    console.log(this.favoriteMovies)
  }

  /**
   * This function makes API call to get list of movies on user's list of favorite movies
   * @function getFavoriteMovies
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((user: any) => {
      this.user = user;
      this.fetchApiData.getAllMovies().subscribe((movies: any) => {
        this.favoriteMovies = movies.filter((movie: any) => user.FavoriteMovies.includes(movie._id))
      });
    });
  }

  /**
   * This function checks whether a movie is included in a user's list of favorite movies
   * @function isFavorite
   * @param id type of string - id of a specific movie
   * @returns boolean
   */
  isFavorite(id: string): boolean {
    return this.user.FavortieMovies.includes(id);
  }

  /**
   * This function makes API call to add a movie to a user's list of favorite movies
   * @function addToFavorites
   * @param id type of string - id of specifc movie
   */
  addToFavorites(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  /**
   * This function makes API call to delete a specific movie from a user's list of favorite movies
   * @function removeFromFavorites
   * @param id type of string - id of specific movie
   */
  removeFromFavorites(id: string): void {
    this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  /**
   * This function opens a dialog with detailed information about a specific genre
   * @function openGenreDialog
   * @param name of specific genre
   * @param description of specific genre
   */
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: '400px'
    });
  }

  /**
   * This function opens a dialog with detailed information about a specific director
   * @function openDirectorDialog
   * @param name of specific director
   * @param bio of specific director
   * @param birthday birth year of specific director
   */
  openDirector(name: string, bio: string, birthday: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birthday
      },
      width: '400px'
    });
  }

  /**
   * This function opens a dialog with detailed information about a specific movie
   * @function openSummary
   * @param title of specific movie
   * @param description of specific movie
   */
  openSummary(title: string, description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        Title: title,
        Description: description
      },
      width: '400px'
    });
  }
}
