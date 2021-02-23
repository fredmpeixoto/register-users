using ManagerUsers.Api.Commons;
using ManagerUsers.Domain.Interfaces;
using ManagerUsers.Domain.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;

namespace ManagerUsers.Api.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {

        private IUserService _userService;
        public LoginController(IUserService userService)
        {
            _userService = userService;
        }

        [EnableCors("_myCorsPolicy")]
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Post([FromBody] UserLoginVM bodyUser, [FromServices] SigningConfigurations signingConfigurations, [FromServices] TokenConfigurations tokenConfigurations)
        {
            UserVM user = _userService.Login(bodyUser.Email, bodyUser.Password);

            if (user != null)
            {
                ClaimsIdentity identity = new ClaimsIdentity(
                    new GenericIdentity(user.Id, "Login"),
                    new[] {
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
                        new Claim(JwtRegisteredClaimNames.UniqueName, user.Id)
                    }
                );

                DateTime dateCreate = DateTime.Now;
                DateTime dateExpire = dateCreate +
                    TimeSpan.FromSeconds(tokenConfigurations.Seconds);

                var handler = new JwtSecurityTokenHandler();
                var securityToken = handler.CreateToken(new SecurityTokenDescriptor
                {
                    Issuer = tokenConfigurations.Issuer,
                    Audience = tokenConfigurations.Audience,
                    SigningCredentials = signingConfigurations.SigningCredentials,
                    Subject = identity,
                    NotBefore = dateCreate,
                    Expires = dateExpire
                });
                var token = handler.WriteToken(securityToken);

                return Ok(new
                {
                    authenticated = true,
                    created = dateCreate.ToString("yyyy-MM-dd HH:mm:ss"),
                    expiration = dateExpire.ToString("yyyy-MM-dd HH:mm:ss"),
                    accessToken = token,
                    user = user,
                    message = "OK"
                });
            }
            else
            {
                return BadRequest(new
                {
                    authenticated = false,
                    message = "Auth fail"
                });
            }
        }

    }
}