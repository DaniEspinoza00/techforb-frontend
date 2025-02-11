import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn:BehaviorSubject<boolean>=new BehaviorSubject <boolean>(false);//para saber si esta logeado
  currentUserData:BehaviorSubject<String> = new BehaviorSubject<String>("");//para el token del user
  userData: BehaviorSubject<String> = new BehaviorSubject<String>(""); //para el username que viene del backend


  constructor(private http:HttpClient) {
    const token = sessionStorage.getItem("token");
    this.currentUserLoginOn=new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
    this.currentUserData=new BehaviorSubject<String>(sessionStorage.getItem("token")||"");
    const username = sessionStorage.getItem("username");
    this.userData=new BehaviorSubject<String>(username ? username : "");
   }

   login (credentials:LoginRequest):Observable<any>{
    return this.http.post<any>(environment.urlHost+"auth/login",credentials).pipe(
      tap((userData)=>{
        sessionStorage.setItem("token",userData.token);//guardo el token en S.S.
        this.currentUserData.next(userData.token);//archivo el token en el B.S.
        this.currentUserLoginOn.next(true);
        sessionStorage.setItem("user",userData.username.toString());
        this.userData.next(userData.username);
      }),
      map((userData)=>userData.token),
      catchError(this.handleError)
    );
   }

   get userCurrentData():Observable<String>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  get userToken():String{
    return this.currentUserData.value;
  }

   logout():void{
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    this.userData.next("");
    this.currentUserLoginOn.next(false);
  }


   private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('An error has ocurred ', error.error);
    }
    else{
      console.error('Backend sent status code', error);
    }
    return throwError(()=> new Error('Something happened, please try again'));
  }
}
