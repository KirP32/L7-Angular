import { Component, ViewChild } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatRipple, MatRippleModule} from '@angular/material/core';

interface NavList {
  id: string,
  label: string,
  icon: string
}

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatListModule, MatRippleModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  public MailList: NavList[] = [
    {
      id: "first",
      label: "Books",
      icon: "mail"
    }, 
    {
      id: "second",
      label: "Redact",
      icon: "outbox"
    }, 
    {
      id: "third",
      label: "Login",
      icon: "favorite"
    }, 
    {
      id: "fourth",
      label: "Sign up",
      icon: "delete"
    }, 
  ];
  public str: string= 'first';

  public PersonalList: NavList[] = [
    {
      id: "fifth",
      label: "Personal Images",
      icon: "folder"
    }, 
    {
      id: "sixth",
      label: "Family photos",
      icon: "folder"
    }
  ];
}
