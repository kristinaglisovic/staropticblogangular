using Blog.Application.UseCases.DTO.Post;
using Blog.Application.UseCases.DTO.Searches;
using Blog.Application.UseCases.Queries;
using Blog.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Blog.Application.Exeptions;
using Microsoft.EntityFrameworkCore;
using Blog.Domain.Entities;

namespace Blog.Implementation.UseCases.Queries.Ef
{
    public class EfGetPostQuery : EfUseCase, IGetPostQuery
    {
        public EfGetPostQuery(BlogDbContext context) : base(context)
        {
        }

        public int Id => 2;

        public string Name => "EF Find post";

        public string Description => "Get post by using an ID";

        public PostDTO Execute(int id)
        {

            var x = Context.Posts.Include(x => x.User).ThenInclude(x => x.Role)
                                    .Include(x => x.Tags)
                                    .ThenInclude(x => x.Tag)
                                    .Include(x => x.Categories)
                                    .ThenInclude(x => x.Category)
                                    .Include(x => x.Comments).ThenInclude(x=>x.User)
                                    .Include(x => x.Images)
                                    .ThenInclude(x => x.Image)
                                    .Include(x => x.Likes).FirstOrDefault(x => x.Id == id);


            if (x == null)
            {
                throw new EntityNotFoundException(nameof(Post), id);
            }

            return new PostDTO
            {
                Id = x.Id,
                IsActive = x.IsActive,
                Title = x.Title,
                Description = x.Description,
                Images = x.Images.Select(x => x.Image.Path),
                Author = $"{x.User.FirstName} {x.User.LastName} - {x.User.Username}",
                AuthorRole = x.User.Role.Name,
                CommentsCount = x.Comments.Where(y => y.IsActive).Count(),
                Comments = x.Comments.Where(y => y.IsActive).Select(x => new CommentDto
                {
                    Id = x.Id,
                    Comment = x.Text,
                    CommentedAt = x.CreatedAt.ToString("yyyy-MM-dd hh:mm:ss"),
                    User = x.User.Username
                }).ToList(),
                Tags = x.Tags.Select(x => x.Tag.Name),
                Categories = x.Categories.Select(x => x.Category.Name),
                Likes = x.Likes.Where(y => y.IsActive).Count(),
                CreatedAt = x.CreatedAt.ToString("yyyy-MM-dd hh:mm:ss"),
             
            };
        }


    }
}