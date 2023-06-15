import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';
import { mytoast } from 'src/app/_services/mytoastr.service';
import { SessionService } from 'src/app/_services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor
  (
    private session: SessionService,
    public router: Router,
    private route: ActivatedRoute,
    private toastr: mytoast,
    private sApi: ApiService
  ) { }
  
  loading: boolean = false;
  user: any  = {
    Usuario: "",
    Password: "",
  };


  loginform = true;

  ngOnInit(): void {
  }

  logIn(){

    console.log(this.user);
    this.loading = true;

    this.sApi.post("/Login/Autenticacion", this.user)
    .subscribe({
      next: (loginResult: any) => {
        
        this.loading = false;

        if (loginResult.estado == "Error")
          this.toastr.error(loginResult.mensaje);    
        
        else {                    
          this.session.saveSession(loginResult.data); 
          this.router.navigateByUrl('/sucursales/lista');            
        }
      },
      error: (error: any) => {
        this.loading = false;
        this.toastr.error("an error has occurred", error)
      }
    });
  }
}
