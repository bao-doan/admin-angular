import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../view-models/book';
import { GenreService } from '../services/genre.service';
import { Genre } from '../view-models/genre';
import { Image } from '../view-models/image';
import { Size } from '../view-models/size';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  componentTitle: string = 'Products';
  genres: Genre[];
  genre: Genre;
  books: Book[];
  selectedBook: Book = new Book();
  // For Search/Filter
  title: string;
  // For Pagination
  books2: Book[];
  step: number;
  pages: number;
  selectedPage: number = 1;
  pageArray: Number[];
  option: number;
  checkPluralItems: string = '';
  checkPluralBooks: string = '';
  constructor(private bookService: BookService, private genreService: GenreService) { }

  ngOnInit() {
    this.getBooks();
    this.getGenres();
    this.step = 5;
  }
  // Select book when click
  onSelect(book: Book): void {
    this.selectedBook = book;
    if (this.selectedBook.pages == null) {
      this.selectedBook.pages = 0;
    }
    if (this.selectedBook.weight == null) {
      this.selectedBook.weight = 0;
    }
    if (this.selectedBook.releaseDate == null) {
      this.selectedBook.releaseDate = '';
    }
    if (this.selectedBook.sku == null) {
      this.selectedBook.sku = 'No SKU';
    }
    if (this.selectedBook.images == null) {
      this.selectedBook.images = new Image();
    }
    if (this.selectedBook.size == null) {
      this.selectedBook.size = new Size();
    }
  }
  // For sending HTTP requests to GET, PUT, DELETE data
  getBooks(): void {
    this.bookService.getBooks().subscribe(z => {
      this.books = z;
      this.books2 = z.slice(0, this.step);
      this.onCountPages(z, this.step);
      this.onPrintLabel();
      this.checkPluralHandler();
      this.onShowItems(this.selectedPage);
    });
  };
  getGenres(): void {
    this.genreService.getGenres().subscribe(_ => this.genres = _);
  };
  deleteBook(book: Book): void {
    this.books = this.books.filter(h => h !== book);
    this.bookService.deleteBook(book).subscribe();
  }
  updateBook(): void {
    this.bookService.updateBook(this.selectedBook)
      .subscribe();
  }
  // For Select genre of Selected book to Edit
  compareFn(optionOne: Genre, optionTwo: Genre): boolean {
    optionOne = new Genre();
    optionTwo = new Genre();
    return optionOne._id == optionTwo._id;
  }
  // For Pagination
  onCountPages(books: Book[], step: number): void {
    let items = this.books.length;
    let pages: number;
    if (items % step == 0) {
      pages = items / step;
    } else {
      pages = Math.floor(items / step) + 1;
    }
    this.pages = pages;
  }
  onPrintLabel(): void {
    this.pageArray = new Array(this.pages);
    for (let i = 0; i < this.pageArray.length; i++) {
      this.pageArray[i] = i + 1;
    }
  }
  onShowItems(i: number): void {
    this.selectedPage = i;
    let a: number = this.step * i - this.step;
    let b: number
    if (this.step * i >= this.books.length) {
      b = this.books.length;
    } else {
      b = this.step * i;
    }
    this.books2 = this.books.slice(a, b);
    this.checkPluralHandler();
  }
  onShowAll(): void {
    this.books2 = this.books;
    this.checkPluralHandler();
  }
  onShowOption(step: number): void {
    this.onCountPages(this.books, this.step);
    this.onPrintLabel();
    this.onShowItems(1);
  }
  onNextPage(selectedPage: number): void {
    this.selectedPage = (selectedPage < this.pages) ? (this.selectedPage = selectedPage + 1) : (this.selectedPage = selectedPage);
    this.onShowItems(this.selectedPage);
  }
  onPrevPage(selectedPage: number): void {
    this.selectedPage = (selectedPage > 1) ? (this.selectedPage = selectedPage - 1) : (this.selectedPage = 1);
    this.onShowItems(this.selectedPage);
  }
  // For Check Prural 'item' or 'items'
  checkPluralHandler(): void {
    this.checkPluralBooks = (this.books.length > 1) ? "items" : "item";
    this.checkPluralItems = (this.books2.length > 1) ? "items" : "item";
  }
  // For clear search button
  onClearSearch() {
    this.title = '';
  }
}
