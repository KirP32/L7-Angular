import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Users, UsersNew } from '../../interfaces/users';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  constructor(
    public userSevice: AuthService,
    private router: Router,
  ) {
  }
  public onFinish() {
    const inputName = document.querySelector("#input-name") as HTMLInputElement;
    const inputSecondName = document.querySelector("#input-second") as HTMLInputElement;
    const inputPassword = document.querySelector("#input-password") as HTMLInputElement;
    const inputEmail = document.querySelector("#input-email") as HTMLInputElement;
    //const inputBirthday = document.querySelector("#input-birthday") as HTMLInputElement;
    if (inputName) {
      const name = inputName.value.trim();
      const se_name = inputSecondName.value.trim();
      const password = inputPassword.value.trim();
      const email = inputEmail.value.trim();
      //const date = inputBirthday.value;
      let ar_user: UsersNew = {
        name: name + " " + se_name,
        password: password,
        email: email,
      }
      const eRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let error_box = document.querySelector("#email__errors") as HTMLInputElement;
      if (!eRegex.test(email)) {
        error_box.innerHTML = "Invalid Email Format";
      }
      else {
        this.userSevice.register(ar_user).subscribe(() => {
          alert("Sign Up sucessfuly!");
          this.router.navigate(['/login']);
        });
      }
    }
  }
}