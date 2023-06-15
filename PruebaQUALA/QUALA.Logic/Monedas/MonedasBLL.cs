using QUALA.ConectionDB.Conection;
using QUALA.ConectionDB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QUALA.Logic.Monedas
{
    public class MonedasBLL : IDisposable
    {
        private ContextDB db;

        public MonedasBLL(ContextDB context)
        {
            db = context;

        }

        public List<PRU_Moneda> GetMonedas()
        {
            return db.PRU_Moneda.ToList();
        }
        public void Dispose()
        {
            db.Dispose();
        }
    }
}
