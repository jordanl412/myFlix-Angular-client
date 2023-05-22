import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 *@Component decorator to tell Angular that the class right below is a component.
 */
@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent implements OnInit {
  /**
   * @param fetchApiData to use functions to make API call
   * @param data specific Director data, received through @MAT_DIALOG_DATA from MovieCard
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
      Birth: string;
    }
  ) {}

  /**
   * This function calls specified methods automatically, straight after Component is mounted
   */
  ngOnInit(): void {}
}
