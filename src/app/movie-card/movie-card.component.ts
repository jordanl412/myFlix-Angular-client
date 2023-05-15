import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BinaryOperator } from '@angular/compiler';
import { Title } from '@angular/platform-browser';


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
   * Calls methods after component is mounted
   */
  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }


  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getFavorites(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      console.log(this.favorites);
      return this.favorites;
    })
  }

  isFavorite(id: string): boolean {
    return this.favorites.includes(id);
  }

  addToFavorites(id: string): void {
    console.log(id);
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  removeFromFavorites(id: string): void {
    console.log(id);
    this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

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

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      width: '400px',
      data: {
        Name: name,
        Description: description
      }
    });
  }

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
