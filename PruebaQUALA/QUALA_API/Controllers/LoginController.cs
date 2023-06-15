using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using QUALA.ConectionDB.Conection;
using QUALA.ConectionDB.Models;
using QUALA.Logic.Usuarios;
using QUALA_API.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace QUALA_API.Controllers
{
    [ApiController]
    [Route("Login")]
    public class LoginController : ControllerBase
    {
        private readonly ILogger<LoginController> _logger;
        private readonly IConfiguration _config;
        private readonly ContextDB _context;
        public LoginController(ContextDB context, ILogger<LoginController> logger, IConfiguration config)
        {
            _context = context;
            _logger = logger;
            _config = config;
        }

        [HttpPost("Autenticacion")]
        [AllowAnonymous]
        public IActionResult Autenticacion(Autenticacion usuario)
        {
            try
            {
                var model = new UsuariosBLL(_context);
                var user = model.Login(usuario.Usuario, usuario.Password);

                if (user != null)
                {
                    var tokenString = GenerateJWTToken(user);
                    return Ok(new
                    {
                        Estado = "Success",
                        Data = new
                        {
                            token = tokenString,
                            userDetails = new { Usuario = user.Usuario, Id = user.Id }
                        }
                    });
                }
            }
            catch (Exception ex)
            {
                return Ok(new { Estado = "Error", Mensaje = ex.Message });
            }
            return Ok(new { Estado = "Error", Mensaje = "Usuario o contraseña incorrecto" });
        }


        string GenerateJWTToken(PRU_Usuarios user)
        {
            var a = _config["Jwt:SecretKey"];
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Usuario),
                new Claim("Id", user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(1000),
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
