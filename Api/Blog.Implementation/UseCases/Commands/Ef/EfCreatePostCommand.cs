using Blog.Application.UseCases.Commands;
using Blog.Application.UseCases.DTO.Post;
using Blog.DataAccess;
using Blog.Domain.Entities;
using Blog.Implementation.Validators;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Implementation.UseCases.Commands.Ef
{
    public class EfCreatePostCommand : EfUseCase, ICreatePostCommand
    {
        private CreatePostDTOValidator _validator;
        public EfCreatePostCommand(BlogDbContext context, CreatePostDTOValidator validator) : base(context)
        {
            _validator = validator;
        }

        public int Id => 3;

        public string Name => "Create Post (EF)";

        public string Description => "Create post using entity framework ";

        public void Execute(CreatePostDTO request)
        {

                _validator.ValidateAndThrow(request);

                var image = new Image
                {
                    Path = request.ImageFileName,
                };

                var newPost = new Post
                {

                    Title = request.Title,
                    Description = request.Description,
                    UserId = request.UserId,
                    Categories = request.CategoriesIds.Select(x => new PostCategory
                    {
                        CategoryId = x
                    }).ToList(),
                    Tags = request.TagsIds.Select(x => new PostTag
                    {
                        TagId = x
                    }).ToList(),
                };
                newPost.Images.Add(new PostImage
                {
                    Image=image,
                });

                Context.Posts.Add(newPost);
                Context.SaveChanges();
             
        }
    }
}
