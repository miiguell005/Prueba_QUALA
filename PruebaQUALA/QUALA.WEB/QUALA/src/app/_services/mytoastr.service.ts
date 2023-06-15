import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { SessionService } from "./session.service";

@Injectable({
  providedIn: 'root'
})
export class mytoast {

  constructor(
    private toastr: ToastrService,
    private sSesion: SessionService
  ) {}
  
  public success(text: string): void {
    this.toastr.success(text);
  }

  public error(text: string, error?: any): void {
    
    if (text)
        this.toastr.error(text);      

    console.error(text, error);    
  }

}
