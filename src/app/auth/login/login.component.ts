import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required]})
    });
  }

  onSubmit() {
    this.authService.login( {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }).subscribe({
      next: (res) => {
        this.authService.authSuccessful();
        let resObj = {...res};
        console.log( `Respone = ${JSON.stringify(resObj)}`);
        console.log( `User id = ${resObj.user}`);
      },
      error: (e) => console.log(e),
      complete: () => {
        console.log("Login complete");
      }
    });
  }

}
