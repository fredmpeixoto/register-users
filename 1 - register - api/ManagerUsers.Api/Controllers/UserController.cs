using ManagerUsers.Domain.Interfaces;
using ManagerUsers.Domain.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;

namespace ManagerUsers.Api.Controllers
{

    [Produces("application/json")]
    [Route("api/User")]
    [AllowAnonymous]
    [EnableCors("_myCorsPolicy")]
    public class UserController : Controller
    {
        private IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        // GET: api/User
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_userService.getAll());
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        // GET: api/User/5
        [HttpGet("{id}", Name = "GetUser")]
        public IActionResult GetUser(string id)
        {
            try
            {
                return Ok(_userService.GetById(id));
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        // POST: api/User
        [HttpPost]
        public IActionResult Post([FromBody] UserVM value)
        {
            try
            {
                if (ModelState.IsValid)
                    return Ok(_userService.Add(value));
                else
                    return BadRequest(ModelState);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody] UserVM value)
        {
            try
            {
                if (ModelState.IsValid)
                    return Ok(_userService.Update(id, value));
                else
                    return BadRequest(ModelState);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            try
            {
                return Ok(_userService.Delete(id));
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}
