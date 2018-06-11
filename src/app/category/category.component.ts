import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GenreService } from '../services/genre.service';
import { Genre } from '../view-models/genre';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  genres: Genre[];
  name: string;
  selectedGenre: Genre;
  selectedDelete: Genre;
  updatingGenre = this.selectedDelete;
  objectGenre = new Genre(name);
  // objectGenre: Genre;
  // updatingGenre= new Genre(this.selectedGenre.name);
  constructor(private genreService: GenreService, private location: Location, private route:ActivatedRoute) { }

  ngOnInit() {
    this.getGenres();
  }
  onSelect(genre):void {
    this.selectedGenre = genre;
  }
  onSelectDelete(genre):void {
    this.selectedDelete = genre;
  }
  getGenres(): void {
    this.genreService.getGenres().subscribe(z => this.genres = z);
  };
  addGenre(): void {
    if (this.objectGenre.name.length > 0) {
      // let genre = new Genre(name);
      this.genreService.addGenre(this.objectGenre).subscribe(_ => {
        this.objectGenre.name = "";
        this.genres.push(_);
      });
    }
  }
  deleteGenre(genre: Genre): void {
    this.genres = this.genres.filter(h => h !== genre);
    this.genreService.deleteGenre(genre).subscribe(
      
    );
  }
  updateGenre(): void {
    this.genreService.updateGenre(this.selectedGenre)
      .subscribe();
  }
  // onType(name): boolean {
  //   return this.genreService.onType(name);
  // }
}
