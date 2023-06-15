using System;
using System.Collections.Generic;
using System.Text;

namespace QUALA.Logic.Tools
{
    public class HelperBLL
    {
        private int idUsuario;

        public HelperBLL(int _idUsuario)
        {
            this.idUsuario = _idUsuario;
        }

        public T UsuarioModificacion<T>(T obj)
        {
            if (obj.GetType().GetProperty("UsuarioModificacion") != null)
                obj.GetType().GetProperty("UsuarioModificacion").SetValue(obj, this.idUsuario);

            if (obj.GetType().GetProperty("FechaModificacion") != null)
                obj.GetType().GetProperty("FechaModificacion").SetValue(obj, DateTime.Now);

            return obj;
        }
        public T UsuarioCreacion<T>(T obj)
        {
            if (obj.GetType().GetProperty("UsuarioCreacion") != null)
                obj.GetType().GetProperty("UsuarioCreacion").SetValue(obj, this.idUsuario);

            if (obj.GetType().GetProperty("FechaCreacion") != null)
                obj.GetType().GetProperty("FechaCreacion").SetValue(obj, DateTime.Now);

            return UsuarioModificacion(obj);
        }
    }
}
