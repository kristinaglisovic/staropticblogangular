using Blog.Api.DTO;
using Blog.Api.Extensions;
    using Blog.Application.Exeptions;
    using Blog.Application.Logging;
    using Blog.Application.UseCases.Commands;
using Blog.Application.UseCases.DTO.Category;
using Blog.Application.UseCases.DTO.Post;
    using Blog.Application.UseCases.DTO.Searches;
    using Blog.Application.UseCases.Queries;
using Blog.DataAccess;
using Blog.Domain.Entities;
    using Blog.Implementation;
    using Blog.Implementation.Validators;
    using FluentValidation;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
using System.IO;
using System.Linq;
    using static Blog.Api.Extensions.StringExtensions;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Blog.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class PostsController : ControllerBase
    {
        private UseCaseHandler _handler;

        public static IEnumerable<string> AllowedExtensions => new List<string> { ".jpg", ".png", ".jpeg", ".gif", ".JPG", ".PNG", ".JPEG", ".GIF" };
        //angular
        private BlogDbContext _context;

        public PostsController(UseCaseHandler handler,BlogDbContext context)
        {
            _context = context;
            _handler = handler;
        }


        /// <summary>
        /// Get all posts with pagination.
        /// </summary>
        /// <param name="search"></param> 
        /// <param name="query"></param>
        /// <returns>All posts</returns>
        /// 
        /// <response code="200">Posts are returned.</response>
        /// <response code="500">Unexpected server error.</response>
       

        // GET: api/<PostsController>

        [AllowAnonymous]
        [HttpGet]
        public IActionResult Get([FromQuery] PostPagedSearch search,
            [FromServices] IGetPostsQuery query)
        {

            return Ok(_handler.HandleQuery(query, search));

        }

        /// <summary>
        /// Get one post.
        /// </summary>
        /// <param name="id"></param> 
        /// <param name="query"></param>
        /// <returns>One post</returns>
        /// 
        /// <response code="200">Post is found.</response>
        /// <response code="404">Post is not found.</response>
        /// <response code="500">Unexpected server error.</response>


        [AllowAnonymous]

        // GET api/<PostsController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id, [FromServices] IGetPostQuery query)
        {

            return Ok(_handler.HandleQuery(query, id));


        }


        /// <summary>
        /// Creates new post.
        /// </summary>
        /// <param name="dto"></param> 
        /// <param name="command"></param>
        /// <returns>A newly created Post</returns>
        /// /// <remarks>
        /// Sample request:
        ///
        ///     POST / api/Posts
        ///     {
        ///        "title": "New Title",
        ///        "description": "New Desc",
        ///        "userId": 1,
        ///        "categoriesIds": [
        ///                  1,2   
        ///              ],
        ///        "tagsIds": [
        ///                  1
        ///              ],
        ///        "imagesIds": [
        ///                  2,4
        ///              ]
        ///     }
        /// </remarks> 
        /// <response code="201">Successfull creation.</response> 
        /// <response code="401">Unauthorized.</response>
        /// <response code="422">Validation failure.</response>
        /// <response code="500">Unexpected server error.</response>




        // POST api/<PostsController>
        [HttpPost]
        public IActionResult Post([FromForm] CreatePostWithImageDTO dto,
                                      [FromServices] ICreatePostCommand command)
        {
            if (dto.Image != null)
            {
                var guid = Guid.NewGuid();
                var extension = Path.GetExtension(dto.Image.FileName);

                if (!AllowedExtensions.Contains(extension))
                {
                    throw new InvalidOperationException("Unsupported file type.");
                }

                var fileName = guid + extension;

                var filePath = Path.Combine("wwwroot", "images", fileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    dto.Image.CopyTo(fileStream);
                };

                dto.ImageFileName = fileName;

            }
            _handler.HandleCommand(command, dto);
            return StatusCode(201);
        }


        /// <summary>
        /// Post deactivation
        /// </summary>
        /// <param name="id"></param> 
        /// <param name="command"></param>
        /// <returns>Post is deactivated</returns>
        /// 
        /// <response code="204">No content.</response>
        /// <response code="401">Unauthorized.</response>
        /// <response code="404">Post to deactivate is not found.</response>
        /// <response code="500">Unexpected server error.</response>

        // PATCH api/<PostsController>/5
        [HttpPatch("{id}")]
        public IActionResult Patch(int id, [FromServices] ISoftDeletePostUsingIntCommand command)
        {
            _handler.HandleCommand(command, id);
            return NoContent();
        }


        //ZA POTREBE ANGULARA
        // PUT api/<PostsController>/5
        [HttpPut("{id}")]
        public IActionResult Put([FromRoute] int id,UpdatePostDTO dto)
        {
            var post = _context.Posts.Find(id);
            
            if(post != null)
            {
                post.Title = dto.Title;
                post.Description = dto.Description;
                post.IsActive= dto.IsActive;
                post.UpdatedAt = DateTime.UtcNow;
            }
            //_context.PostCategories.AddRange(categories);
            //_context.PostTags.AddRange(tags);
            _context.SaveChanges();
            return Ok(post);
        }



        /// <summary>
        /// Delete a post
        /// </summary>
        /// <param name="id"></param> 
        /// <param name="command"></param>
        /// <returns>Post is deleted</returns>
        /// 
        /// <response code="204">No content.</response>
        /// <response code="401">Unauthorized.</response>
        /// <response code="404">Post to delete is not found.</response>
        /// <response code="500">Unexpected server error.</response>

        // DELETE api/<PostsController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id, [FromServices] IDeletePostUsingIntCommand command)
        {
            _handler.HandleCommand(command, id);
            return NoContent();
        }

    }
}
