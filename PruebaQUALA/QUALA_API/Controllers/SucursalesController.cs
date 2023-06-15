using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using QUALA.ConectionDB.Conection;
using QUALA.ConectionDB.Models;
using QUALA.Logic.Sucursales;
using System.Collections.Generic;

namespace QUALA_API.Controllers
{

    [ApiController]
    [Route("Sucursales")]
    public class SucursalesController : ControllerBase
    {

        private readonly ILogger<SucursalesController> _logger;
        private readonly IConfiguration _config;
        private readonly ContextDB _context;
        public SucursalesController(ContextDB context, ILogger<SucursalesController> logger, IConfiguration config)
        {
            _context = context;
            _logger = logger;
            _config = config;
        }



        [HttpGet("GetSucursal")]
        public IActionResult GetSucursal()
        {
            try
            {
                var userId = Request.Headers.ContainsKey("userId") ? int.Parse(Request.Headers["userId"]) : 0;
                var model = new SucursalesBLL(_context, userId);
                var lSuc = model.GetSucursal();
                return Ok(new { Estado = "Success", Data = lSuc });
            }
            catch (System.Exception ex)
            {
                return Ok(new { Estado = "Error", Mensaje = ex.Message });
            }
        }

        [HttpGet("GetSucursal/{id}")]
        public IActionResult GetSucursal(int id)
        {
            try
            {
                var userId = Request.Headers.ContainsKey("userId") ? int.Parse(Request.Headers["userId"]) : 0;
                var model = new SucursalesBLL(_context, userId);
                var lSuc = model.GetSucursal(id);
                return Ok(new { Estado = "Success", Data = lSuc });
            }
            catch (System.Exception ex)
            {
                return Ok(new { Estado = "Error", Mensaje = ex.Message });
            }
        }

        [HttpPost("PostSucursal")]
        public IActionResult PostSucursal(PRU_Sucursal sucursal)
        {
            try
            {
                var userId = Request.Headers.ContainsKey("userId") ? int.Parse(Request.Headers["userId"]) : 0;
                var model = new SucursalesBLL(_context, userId);
                var guardo = true;
                if (sucursal.ID > 0)                
                    guardo = model.PostSucursal(sucursal);
                else
                    guardo = model.PutSucursal(sucursal);

                if (guardo)
                    return Ok(new { Estado = "Success" });

                return Ok(new { Estado = "Error", Mensaje = "Error al guardar la sucursal" });
            }
            catch (System.Exception ex)
            {
                return Ok(new { Estado = "Error", Mensaje = ex.Message });
            }
        }

        [HttpDelete("DeleteSucursal/{id}")]
        public IActionResult DeleteSucursal(int id)
        {
            try
            {
                var userId = Request.Headers.ContainsKey("userId") ? int.Parse(Request.Headers["userId"]) : 0;
                var model = new SucursalesBLL(_context, userId);
                var guardo = model.DeleteSucursal(id);

                if (guardo)
                    return Ok(new { Estado = "Success" });

                return Ok(new { Estado = "Error", Mensaje = "Error al eliminar la sucursal" });
            }
            catch (System.Exception ex)
            {
                return Ok(new { Estado = "Error", Mensaje = ex.Message });
            }
        }
    }
}
