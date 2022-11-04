using Blog.Application.UseCases.Commands;
using Blog.Application.UseCases.DTO.Category;
using Blog.Application.UseCases.DTO.Post;
using Blog.Application.UseCases.DTO.Searches;
using Blog.Application.UseCases.Queries;
using Blog.DataAccess;
using Blog.Implementation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Blog.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CategoriesController : ControllerBase
    {

        private UseCaseHandler _handler;

        //angular
        private BlogDbContext _context;

        public CategoriesController(UseCaseHandler handler, BlogDbContext context)
        {
            _handler = handler;
            _context = context;
        }

        /// <summary>
        /// Get all categories with pagination.
        /// </summary>
        /// <param name="search"></param> 
        /// <param name="query"></param>
        /// <returns>All categories</returns>
        /// 
        /// <response code="200">Categories are returned.</response>
        /// <response code="500">Unexpected server error.</response>
        /// 

        // GET: api/<CategoriesController>
        [HttpGet]
        [AllowAnonymous]
        public IActionResult Get([FromQuery] CategoriesPagedSearch search, [FromServices] IGetCategoriesQuery query)
        {
            return Ok(_handler.HandleQuery(query, search));
        }


        /// <summary>
        /// Get one category.
        /// </summary>
        /// <param name="id"></param> 
        /// <param name="query"></param>
        /// <returns>One category</returns>
        /// 
        /// <response code="200">Category is found.</response>
        /// <response code="404">Category is not found.</response>
        /// <response code="500">Unexpected server error.</response>

        // GET api/<CategoriesController>/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult Get(int id, [FromServices] IGetCategoryQuery query)
        {
            return Ok(_handler.HandleQuery(query, id));
        }



        /// <summary>
        /// Creates new category.
        /// </summary>
        /// <param name="dto"></param> 
        /// <param name="command"></param>
        /// <returns>A newly created Category</returns>
        /// /// <remarks>
        /// Sample request:
        ///
        ///     POST / api/Categories
        ///     {
        ///        "name": "New name",
        ///        "description": "New Desc",
        ///     }
        /// </remarks> 
        /// <response code="201">Successfull creation.</response> 
        /// <response code="401">Unauthorized.</response>
        /// <response code="422">Validation failure.</response>
        /// <response code="500">Unexpected server error.</response>



        // POST api/<CategoriesController>
        [HttpPost]
        public IActionResult Post([FromBody] CreateCategoryDTO dto,
                         [FromServices] ICreateCategoryCommand command)
        {
            _handler.HandleCommand(command, dto);
            return StatusCode(201);
        }


        /// <summary>
        /// Category deactivation
        /// </summary>
        /// <param name="id"></param> 
        /// <param name="command"></param>
        /// <returns>Category is deactivated</returns>
        /// 
        /// <response code="204">No content.</response>
        /// <response code="401">Unauthorized.</response>
        /// <response code="404">Category to deactivate is not found.</response>
        /// <response code="409">Conflict.</response>
        /// <response code="500">Unexpected server error.</response>



        // PATCH api/<CategoriesController>/5
        [HttpPatch("{id}")]
        public IActionResult Patch(int id, [FromServices] ISoftDeleteCategoryUsingIntCommand command)
        {
            _handler.HandleCommand(command, id);
            return NoContent();
        }




        //ZA POTREBE ANGULARA
        // PUT api/<CategoriesController>/5
        [HttpPut("{id}")]
        public IActionResult Put([FromRoute] int id, UpdateCategoryDTO dto)
        {
            var category = _context.Categories.Find(id);
          

            if (category != null)
            {
                category.Name = dto.Name;
                category.Desciption = dto.Description;
                category.IsActive = dto.IsActive;
               
                category.UpdatedAt = DateTime.UtcNow;
            }
            _context.SaveChanges();
            return Ok(category);
        }
        /// <summary>
        /// Category delete
        /// </summary>
        /// <param name="id"></param> 
        /// <param name="command"></param>
        /// <returns>Category is deleted</returns>
        /// 
        /// <response code="204">No content.</response>
        /// <response code="401">Unauthorized.</response>
        /// <response code="404">Category to delete is not found.</response>
        /// <response code="409">Conflict.</response>
        /// <response code="500">Unexpected server error.</response>
        /// 

        // DELETE api/<CategoriesController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id, [FromServices] IDeleteCategoryUsingIntCommand command)
        {
            _handler.HandleCommand(command, id);
            return NoContent();
        }
    }
}
