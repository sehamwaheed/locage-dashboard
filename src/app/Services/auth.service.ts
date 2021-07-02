import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable } from "rxjs";
import { UserModel } from "../Models/User";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private uri: String = "https://locage.herokuapp.com/api/v1/users/";
  tokenUser!: any;
  private currentUser!: BehaviorSubject<UserModel>;
  private isLogin: BehaviorSubject<boolean>;
  init() {
    let token = this.getToken();
  }
  constructor(private http: HttpClient, private router: Router) {
    this.isLogin = new BehaviorSubject<boolean>(false);
    this.currentUser = new BehaviorSubject<UserModel>(null);
  }

  public loggedIn(): Observable<boolean> {
    return this.isLogin.asObservable();
  }
  public returnUserDetails(): Observable<UserModel> {
    return this.currentUser.asObservable();
  }

  logout() {
    localStorage.removeItem("access_token");
    this.currentUser.next(null);
    this.tokenUser = null;
    this.isLogin.next(false);
    this.router.navigate(["../auth"]);
  }

  public getToken() {
    let token = localStorage.getItem("access_token");
    if (!token) {
      this.currentUser.next(null);
      this.tokenUser = null;
      this.isLogin.next(false);
    } else {
      let jwt = new JwtHelperService();
      const isExpired = jwt.isTokenExpired(token);
      if (isExpired) this.logout();
      else {
        this.tokenUser = jwt.decodeToken(token);
        this.currentUserDetails();
        this.isLogin.next(true);
      }
    }

    return token;
  }
  currentUserDetails() {
    this.getUser(this.tokenUser.id).subscribe(
      (result: any) => {
        this.currentUser.next(result.user);
      },
      () => {
        this.logout();
      }
    );
  }
  getUser(id: any) {
    return this.http.get(`${this.uri}${id}`);
  }
  login(user: any) {
    return this.http.post(`${this.uri}login`, user);
  }
}
