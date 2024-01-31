import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Login } from '../../interfaces/users';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    public userSevice: AuthService,
    private router: Router,
  ) {
  }
  public onLogin() {
    const inputPassword = document.querySelector("#input-password") as HTMLInputElement;
    const inputEmail = document.querySelector("#input-email") as HTMLInputElement;
    if (inputEmail) {
      const email = inputEmail.value;
      const password = inputPassword.value;
      let login: Login = {
        email: email,
        password: password,
      }
      // this.userSevice.login(login).subscribe(() => {
      //   alert("Login successfully !");
      //   this.router.navigate(['/main']);
      // });
      this.userSevice.login(login).subscribe({
        next: () => {
          alert("Login successfully !");
          this.router.navigate(['/main']);
        },
        error: () => {
          alert("Incorrect Email or Password");
        }
      });
    }
  }
}