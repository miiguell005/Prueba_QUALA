using QUALA.ConectionDB.Conection;
using QUALA.ConectionDB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QUALA.Logic.Usuarios
{
    public class UsuariosBLL: IDisposable
    {
        private ContextDB db;

        public UsuariosBLL(ContextDB context)
        {
            db = context;

        }

        public PRU_Usuarios? Login(string usuario, string contrasenia)
        {
            var u = db.PRU_Usuarios.Where(x => x.Usuario == usuario && x.Contrasenia == contrasenia).FirstOrDefault();
            if (u != null)
                return u;
            return null;
        }

        public void Dispose()
        {
            db.Dispose();
        }
    }
}
