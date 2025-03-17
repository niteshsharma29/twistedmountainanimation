import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgFor, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor,TitleCasePipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  tableHeaders: string[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      if (this.users.length) {
        this.tableHeaders = Object.keys(this.users[0]);
      }
    });
  }

  navigateToDetails(id: string): void {
    this.router.navigate([`/user/${id}`]);
  }

  updateUser(user: any, header: string, event: any): void {
    // Update the user data on blur (when the user stops editing)
    user[header] = event.target.textContent;
  }
}
