import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BinaryOperator } from '@angular/compiler';
import { Title } from '@angular/platform-browser';

/**
 *@Component decorator to tell Angular that the class right below is a component.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
/**
 * Receive and keep info from API calls
 * @movies - array of JSON objects (movies from database)
 * @favorites - array of user's favorite movies
 */
export class MovieCardComponent {
  movies: any[] = [];
  favorites: any[] = [];

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
  ) { }

  /**
   * This function calls specified methods automatically, straight after Component has mounted
   * @function getMovies
   * @function getFavorites
   */
  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  /**
   * This function makes API call to get the full list of movies
   * @function getMovies
   * @returns array of JSON objects of all movies in the database
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * This function makes API call to get list of user's favorite movies
   * @function getFavorites
   * @returns array of movies in user's list of favorites, with movie id
   */
  getFavorites(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      console.log(this.favorites);
      return this.favorites;
    })
  }

  /**
   * This function checks whether a movie is included in a user's list of favorite movies
   * @function isFavorite
   * @param id type of string - id of a specific movie
   * @returns boolean
   */
  isFavorite(id: string): boolean {
    return this.favorites.includes(id);
  }

  /**
   * This function makes API call to add a movie to a user's list of favorite movies
   * @function addToFavorites
   * @param id type of string - id of specifc movie
   */
  addToFavorites(id: string): void {
    console.log(id);
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
    console.log(id);
    this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  /**
   * This function opens a dialog with detailed information about a specific director
   * @function openDirectorDialog
   * @param name of specific director
   * @param bio of specific director
   * @param birthday birth year of specific director
   */
  openDirectorDialog(name: string, bio: string, birthday: string): void {
    this.dialog.open(DirectorComponent, {
      width: '400px',
      data: {
        Name: name,
        Bio: bio,
        Birth: birthday,
      }
    });
  }

  /**
   * This function opens a dialog with detailed information about a specific genre
   * @function openGenreDialog
   * @param name of specific genre
   * @param description of specific genre
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      width: '400px',
      data: {
        Name: name,
        Description: description
      }
    });
  }

  /**
   * This function opens a dialog with detailed information about a specific movie
   * @function openMovieDetailsDialog
   * @param title of specific movie
   * @param description of specific movie
   */
  openMovieDetailsDialog(title: string, description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      width: '400px',
      data: {
        Title: title,
        Description: description
      }
    });
  }
}
