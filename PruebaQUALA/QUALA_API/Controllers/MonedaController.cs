using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using QUALA.ConectionDB.Conection;
using QUALA.Logic.Monedas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QUALA_API.Controllers
{

    [ApiController]
    [Route("Moneda<")]
    public class MonedaController : ControllerBase
    {

        private readonly ILogger<MonedaController> _logger;
        private readonly IConfiguration _config;
        private readonly ContextDB _context;
        public MonedaController(ContextDB context, ILogger<MonedaController> logger, IConfiguration config)
        {
            _context = context;
            _logger = logger;
            _config = config;
        }
        [HttpGet("GetMoneda")]
        public IActionResult GetMoneda()
        {
            try
            {
                var model = new MonedasBLL(_context);
                var resul = model.GetMonedas();
                return Ok(new { Estado = "Success", Data = resul });
            }
            catch (System.Exception ex)
            {
                return Ok(new { Estado = "Error", Mensaje = ex.Message });
            }
        }

    }
}
