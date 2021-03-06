import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../view-models/user';
import { Users } from '../view-models/users';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  componentTitle: string = 'Dashboard';
  user_email: string;
  user: User = new User();
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
    this.user_email = JSON.parse(localStorage.currentUser).email;
  }
  getUsers(): void {
    this.userService.getUsers().subscribe(_ => this.user = _.user)
  }
}
