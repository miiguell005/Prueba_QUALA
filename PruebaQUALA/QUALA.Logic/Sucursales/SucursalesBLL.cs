using QUALA.ConectionDB.Conection;
using QUALA.ConectionDB.Models;
using QUALA.Logic.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QUALA.Logic.Sucursales
{
    public class SucursalesBLL: IDisposable
    {
        private ContextDB db;
        private HelperBLL helperBll;

        public SucursalesBLL(ContextDB context, int idUsuario)
        {
            db = context;
            helperBll = new HelperBLL(idUsuario);

        }
        public PRU_Sucursal GetSucursal(int id)
        {
            return db.PRU_Sucursal.Where(x => x.ID == id).FirstOrDefault();
        }

        public List<PRU_Sucursal> GetSucursal()
        {
            return db.PRU_Sucursal.ToList();
        }

        public bool PutSucursal(PRU_Sucursal sucursal)
        {
            var s = db.PRU_Sucursal.Where(x => x.ID == sucursal.ID).FirstOrDefault();

            s.Descripcion = sucursal.Descripcion;
            s.Direccion = sucursal.Direccion;
            s.Identificacion = sucursal.Identificacion;
            s.IdMoneda = sucursal.IdMoneda;

            s = helperBll.UsuarioModificacion(s);
            db.SaveChanges();

            return true;
        }

        public bool PostSucursal(PRU_Sucursal sucursal)
        {
            sucursal = helperBll.UsuarioCreacion(sucursal);
            db.PRU_Sucursal.Add(sucursal);
            db.SaveChanges();

            return true;
        }

        public bool DeleteSucursal(int id)
        {
            var suc = db.PRU_Sucursal.Where(x => x.ID == id).FirstOrDefault();

            if (suc == null)
                throw new Exception($"Error, no se encontro la sucursal con Id: {id}");

            db.PRU_Sucursal.Remove(suc);
            db.SaveChanges();

            return true;
        }
        public void Dispose()
        {
            db.Dispose();
        }
    }
}
