import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tableHeader } from 'src/app/_model/my-table';
import { ApiService } from 'src/app/_services/api.service';
import { mytoast } from 'src/app/_services/mytoastr.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(
    private sApi: ApiService,
    public router: Router,
    private route: ActivatedRoute,
    private toastr: mytoast,
  ) { }

  
  public head: tableHeader[] = [
    {label: "Moneda", property: "nombreMoneda"},
    {label: "Descripcion Moneda", property: "descripcionMoneda"},
    {label: "Codigo", property: "codigo"},
    {label: "Descripción", property: "descripcion"},
    {label: "Dirección", property: "direccion"},
    {label: "Identificación", property: "identificacion"},
    {label: "Creación", property: "fechaCreacion", type:"Date"},
    {label: "Usuario", property: "usuarioCreacion"},
    {label: "Modificación", property: "fechaModificacion", type:'Date'},
    {label: "Usuario", property: "usuarioModificacion"},
  ];

  public sucursalesList: any = [];
  public monedasList: any = [];

  ngOnInit(): void {
    this.cargarMonedas();
  }

  cargarSucursales(): void {
    this.sApi.get("/Sucursales/GetSucursal")
    .subscribe({
      next: (result: any) => {
        
        if (result.estado == "Error")
          this.toastr.error(result.mensaje);    
        
        else {                    
          this.sucursalesList = result.data;
          this.sucursalesList = this.sucursalesList.map((s: any) => {
            var moneda = this.monedasList.find((m: any) => { return m.id == s.idMoneda; });
            s.nombreMoneda =  moneda.codigo;
            s.descripcionMoneda =  moneda.descripcion;
            return s;
          });
        }
      },
      error: (error: any) => {
        this.toastr.error("an error has occurred", error)
      }
    });
  }

  cargarMonedas(): void{
    this.sApi.get("/Moneda/GetMoneda")
    .subscribe({
      next: (result: any) => {
        
        if (result.estado == "Error")
          this.toastr.error(result.mensaje);    
        
        else {                    
          this.monedasList = result.data;
          this.cargarSucursales();
        }
      },
      error: (error: any) => {
        this.toastr.error("an error has occurred", error)
      }
    });
  }

  crearSucursal(){
    this.router.navigateByUrl('/sucursales/editar/0'); 

  }
  editarSucursal(obj: any): void{
    this.router.navigateByUrl('/sucursales/editar/' + obj.id); 
  }

  eliminarSucursal(obj: any): void{

    this.sApi.Delete("/Sucursales/DeleteSucursal/" + obj.id)
    .subscribe({
      next: (result: any) => {
        
        if (result.estado == "Error")
          this.toastr.error(result.mensaje);    
        
        else {                              
          this.toastr.success("La sucursal ha sido eliminada");
          this.sucursalesList = this.sucursalesList.filter((s: any) => { return s.id != obj.id});
        }
      },
      error: (error: any) => {
        this.toastr.error("an error has occurred", error)
      }
    });
  }
}
