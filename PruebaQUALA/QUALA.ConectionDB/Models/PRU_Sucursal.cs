using System;
using System.Collections.Generic;
using System.Text;

namespace QUALA.ConectionDB.Models
{
    public class PRU_Sucursal
	{
		public int ID { get; set; }
		public int IdMoneda { get; set; }
		public int Codigo { get; set; }
		public string Descripcion { get; set; }
		public string Direccion { get; set; }
		public string Identificacion { get; set; }
		public DateTime FechaCreacion { get; set; }
		public string UsuarioCreacion { get; set; }
		public DateTime? FechaModificacion { get; set; }
		public string UsuarioModificacion { get; set; }
	} 
}
