using Microsoft.EntityFrameworkCore;
using QUALA.ConectionDB.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace QUALA.ConectionDB.Conection
{
    public partial class ContextDB : DbContext
    {
        public ContextDB()
        { }
        public ContextDB(DbContextOptions<ContextDB> options) : base(options)
        { }


        public DbSet<PRU_Moneda> PRU_Moneda { get; set; }
        public DbSet<PRU_Sucursal> PRU_Sucursal { get; set; }
        public DbSet<PRU_Usuarios> PRU_Usuarios { get; set; }


    }
}
