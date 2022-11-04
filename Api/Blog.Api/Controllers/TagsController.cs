using Blog.Application.UseCases.Commands;
using Blog.Application.UseCases.DTO.Searches;
using Blog.Application.UseCases.DTO.Tag;
using Blog.Application.UseCases.Queries;
using Blog.DataAccess;
using Blog.Implementation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Blog.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]

    public class TagsController : ControllerBase
    {

        private UseCaseHandler _handler;

        //angular
        private BlogDbContext _context;

        public TagsController(UseCaseHandler handler, BlogDbContext context)
        {
            _handler = handler;
            _context = context;
        }
        /// <summary>
        /// Get all tags with pagination.
        /// </summary>
        /// <param name="search"></param> 
        /// <param name="query"></param>
        /// <returns>All tags</returns>
        /// 
        /// <response code="200">Tags are returned.</response>
        /// <response code="500">Unexpected server error.</response>


        // GET: api/<TagsController>
        [AllowAnonymous]
        [HttpGet]
        public IActionResult Get([FromQuery] TagPagedSearch search, [FromServices] IGetTagsQuery query)
        {
            return Ok(_handler.HandleQuery(query, search));
        }


        /// <summary>
        /// Get one tag.
        /// </summary>
        /// <param name="id"></param> 
        /// <param name="query"></param>
        /// <returns>One tag</returns>
        /// 
        /// <response code="200">Tag is found.</response>
        /// <response code="404">Tag is not found.</response>
        /// <response code="500">Unexpected server error.</response>



        // GET api/<TagsController>/5
        [AllowAnonymous]

        [HttpGet("{id}")]
        public IActionResult Get(int id, [FromServices] IGetTagQuery query)
        {
            return Ok(_handler.HandleQuery(query, id));
        }


        /// <summary>
        /// Creates new tag.
        /// </summary>
        /// <param name="dto"></param> 
        /// <param name="command"></param>
        /// <returns>A newly created Tag</returns>
        /// /// <remarks>
        /// Sample request:
        ///
        ///     POST / api/Tags
        ///     {
        ///        "name": "New Name"
        ///     }
        /// </remarks> 
        /// <response code="201">Successfull creation.</response> 
        /// <response code="401">Unauthorized.</response>
        /// <response code="422">Validation failure.</response>
        /// <response code="500">Unexpected server error.</response>


        // POST api/<TagsController>
        [HttpPost]
        public IActionResult Post([FromBody] CreateTagDTO dto,
                         [FromServices] ICreateTagCommand command)
        {
            _handler.HandleCommand(command, dto);
            return StatusCode(201);
        }

        //ZA POTREBE ANGULARA
        // PUT api/<TagsController>/5
        [HttpPut("{id}")]
        public IActionResult Put([FromRoute] int id, UpdateTagDTO dto)
        {
            var tag= _context.Tags.Find(id);


            if (tag != null)
            {
                tag.Name = dto.Name;
                tag.IsActive = dto.IsActive;

                tag.UpdatedAt = DateTime.UtcNow;
            }
            _context.SaveChanges();
            return Ok(tag);
        }

        /// <summary>
        /// Tag deactivation
        /// </summary>
        /// <param name="id"></param> 
        /// <param name="command"></param>
        /// <returns>Tag is deactivated</returns>
        /// 
        /// <response code="204">No content.</response>
        /// <response code="401">Unauthorized.</response>
        /// <response code="404">Tag to deactivate is not found.</response>
        /// <response code="409">Conflict.</response>
        /// <response code="500">Unexpected server error.</response>

        // PATCH api/<TagsController>/5
        [HttpPatch("{id}")]
        public IActionResult Patch(int id, [FromServices] ISoftDeleteTagUsingIntCommand command)
        {
            _handler.HandleCommand(command, id);
            return NoContent();
        }


        /// <summary>
        /// Tag delete
        /// </summary>
        /// <param name="id"></param> 
        /// <param name="command"></param>
        /// <returns>Tag is deleted</returns>
        /// 
        /// <response code="204">No content.</response>
        /// <response code="401">Unauthorized.</response>
        /// <response code="404">Tag to delete is not found.</response>
        /// <response code="409">Conflict.</response>
        /// <response code="500">Unexpected server error.</response>

        // DELETE api/<TagsController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id, [FromServices] IDeleteTagUsingIntCommand command)
        {
            _handler.HandleCommand(command, id);
            return NoContent();
        }
    }
}
