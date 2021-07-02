import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean = false;
  buttonSubmit: boolean = false;
  errorMsg: string;
  eMsg: string;

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  constructor(private authService: AuthService, private router: Router,private route:ActivatedRoute) {
    this.authService.loggedIn().subscribe((result: boolean) => {            
      if (result) {        
        this.router.navigate(["../home"], { relativeTo: this.route });
      }
    });
  }

  ngOnInit(): void {
   
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  onSubmit(body: any) {
    this.buttonSubmit = true;
    this.authService.login(body).subscribe(
      (result: any) => {
        this.invalidLogin = false;
        localStorage.setItem('access_token', result.token);
        this.authService.getToken();
        this.router.navigate(["../home"], { relativeTo: this.route });
      },
      (e) => {
        this.eMsg = e.error.message;
        if (this.eMsg == 'USER_NOT_FOUND') {
          this.errorMsg = `${body.email} is not registered`;
          this.invalidLogin = true;
        } else if (this.eMsg == 'WRONG_PASSWORD') {
          this.errorMsg = `check your password and try again`;
          this.invalidLogin = true;
        }
        this.buttonSubmit = false;
      }
    );
  }
}
