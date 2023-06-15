import { DOCUMENT } from "@angular/common";
import { Component, OnInit, HostListener, Inject, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { SessionService } from "src/app/_services/session.service";

@Component({
  selector: "app-full-layout",
  templateUrl: "./full.component.html",
  styleUrls: ["./full.component.scss"],
})
export class FullComponent implements OnInit {
  
  constructor( 
    public router: Router, 
    private session: SessionService,
  ) {}

  ngOnInit() {
    
  }
 
  direccionar(url: string){

    this.router.navigateByUrl(url); 
  }

  logOut(){
    this.session.singOut();
    this.router.navigateByUrl("/authentication/login"); 

  }
}
