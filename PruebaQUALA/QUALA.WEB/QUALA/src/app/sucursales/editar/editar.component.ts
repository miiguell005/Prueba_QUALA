import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';
import { mytoast } from 'src/app/_services/mytoastr.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  constructor(
    private sApi: ApiService,
    public router: Router,
    private route: ActivatedRoute,
    private toastr: mytoast,
  ) { }

  titulo: string = "Crear sucursal";


  monedasList:  any = [];

  sucurlsa: any = {
    idMoneda: "",
    descripcion: "",
    direccion: "",
    identificacion: "",
    codigo: ""
  };
  idSucursal: any = "0";

  ngOnInit(): void {    
    this.idSucursal = this.route.snapshot?.paramMap?.get('id'); 
    this.cargarMonedas();
    this.cargarSucursales();
  }
  
  cargarSucursales(): void {

    if(this.idSucursal !== null && this.idSucursal != "0") {
      this.sApi.get("/Sucursales/GetSucursal/"+ this.idSucursal)
      .subscribe({
        next: (result: any) => {
          
          if (result.estado == "Error")
            this.toastr.error(result.mensaje);    
          
          else {                    
            this.sucurlsa = result.data;
          }
        },
        error: (error: any) => {
          this.toastr.error("an error has occurred", error)
        }
      });
    }
  }

  cargarMonedas(): void{
    this.sApi.get("/Moneda/GetMoneda")
    .subscribe({
      next: (result: any) => {
        
        if (result.estado == "Error")
          this.toastr.error(result.mensaje);    
        
        else {                    
          this.monedasList = result.data;
          console.log(this.monedasList);
        }
      },
      error: (error: any) => {
        this.toastr.error("an error has occurred", error)
      }
    });
  }

  changeValue(){
    
  }

  editar(){

    console.log(this.sucurlsa);
    var camposObligatorios = ["idMoneda", "descripcion", "direccion", "identificacion", "codigo"];
    for(var i = 0; i < camposObligatorios.length; i++){
      if (!this.sucurlsa[camposObligatorios[i]]){
        this.toastr.error("El campo '" + camposObligatorios[i] + "' debe contener informacion");
        return;
      }
    }

    this.sApi.post("/Sucursales/PostSucursal", this.sucurlsa)
    .subscribe({
      next: (result: any) => {
        
        if (result.estado == "Error")
          this.toastr.error(result.mensaje);    
        
        else {                    
          this.toastr.success( `Se ha ${(this.idSucursal != '0' ? "editardo" : "creado")} la socursal`);
          this.regresar();
        }
      },
      error: (error: any) => {
        this.toastr.error("an error has occurred", error)
      }
    });

    
  }

  regresar(){
    this.router.navigateByUrl('/sucursales/lista');      
  }
}
