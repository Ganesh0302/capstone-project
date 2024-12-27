import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor() {}

  // Method to save token received from login
  saveToken(token: string) {
 
  }
  saveUserId(userId: string) {
    //todo: Complete missing code
  }
  
   SetRole(role:any)
  {
    //todo: Complete missing code
  }
  get getRole ():string|null
  {
    //todo: Complete missing code
  }
  // Method to retrieve login status
  get getLoginStatus(): boolean {
  
      //todo: Complete missing code
   
  }
  getToken(): string | null {
   //todo: Complete missing code
  }
  get getUserId ():string|null
  {
    //todo: Complete missing code
  }
  logout(){
    //todo: Complete missing code
   }
}
