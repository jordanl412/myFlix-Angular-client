import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 *@Component decorator to tell Angular that the class right below is a component.
 */
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
   /**
   * @param fetchApiData to use functions to make API call
   * @param data specific Movie data, received through @MAT_DIALOG_DATA from MovieCard
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string;
      Description: string;
    }
  ) {}

  /**
   * This function calls specified methods automatically, straight after Component is mounted
   */
  ngOnInit(): void {}

}
