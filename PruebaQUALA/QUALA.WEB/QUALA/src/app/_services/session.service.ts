import { Injectable } from '@angular/core';

const TOKEN = 'token';
const USER_ID = 'user-id';
const USER = 'user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  public isLoged(): boolean{
    if(window.sessionStorage.getItem(TOKEN))
      return true;
    return false;
  }

  public saveSession(resultAut: any): void {
    
    window.sessionStorage.removeItem(TOKEN);
    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.removeItem(USER);

    if(resultAut.token && resultAut.userDetails){
      
      window.sessionStorage.setItem(TOKEN, resultAut.token); 
      window.sessionStorage.setItem(USER_ID, resultAut.userDetails.id);       
      window.sessionStorage.setItem(USER, resultAut.userDetails.usuario); 
    }    
  }
  
  public getToken(): string{
    
    const token = window.sessionStorage.getItem(TOKEN);
    if (token)
      return token;
    return "";
  }

  public getUserId(): string{
    
    const userId = window.sessionStorage.getItem(USER_ID);
    if (userId)
      return userId;
    return "";
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER);
    const userId = window.sessionStorage.getItem(USER_ID);
    if (user && userId)
    {
      return {
        user: user,
        userId: userId
      };
    }
    return {
      user: null,
      userId: null
    };
  }

  public userAutenticado(): boolean {
    if (this.getUser().user)
      return true;
    return false;
  }

  public singOut(): void{
    window.sessionStorage.clear();
  }
  
}
