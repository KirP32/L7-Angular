import { Component, ViewChild } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatRipple, MatRippleModule} from '@angular/material/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';

interface NavList {
  rlink: string;
  id: string,
  label: string,
  icon: string
}

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatListModule, MatRippleModule, RouterOutlet, RouterModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  constructor(
    public authService: AuthService
  ) {

  }
  public MailList: NavList[] = [
    {
      rlink: "main",
      id: "first",
      label: "Books",
      icon: "menu_book"
    }, 
    {
      rlink: "register",
      id: "second",
      label: "Sign Up",
      icon: "person_add"
    }, 
    {
      rlink: "login",
      id: "third",
      label: "Login",
      icon: "login"
    }, 
    {
      rlink: "logout",
      id: "fourth",
      label: "Logout",
      icon: "logout"
    }, 
  ];
  public str: string= 'first';

  public PersonalList: NavList[] = [
    {
      rlink: "",
      id: "fifth",
      label: "Personal Images",
      icon: "folder"
    }, 
    {
      rlink: "",
      id: "sixth",
      label: "Family photos",
      icon: "folder"
    }
  ];
}
