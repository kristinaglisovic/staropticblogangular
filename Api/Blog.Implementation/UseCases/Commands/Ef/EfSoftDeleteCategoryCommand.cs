using Blog.Application.Exeptions;
using Blog.Application.UseCases.Commands;
using Blog.DataAccess;
using Blog.DataAccess.Extensions;
using Blog.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Implementation.UseCases.Commands.Ef
{
    public class EfSoftDeleteCategoryCommand : EfUseCase, ISoftDeleteCategoryUsingIntCommand
    {
        public EfSoftDeleteCategoryCommand(BlogDbContext context) : base(context)
        {
        }

        public int Id => 25;

        public string Name => "Category Soft Delete";

        public string Description => "Ef Soft Delete Category by using deactivation";

        public void Execute(int id)
        {
            var c = Context.Categories.Include(x => x.Posts).ThenInclude(x => x.Post).FirstOrDefault(x => x.Id == id);


            if (c == null || !c.IsActive)
            {
                throw new EntityNotFoundException(nameof(Category), id);
            }
            if (c.Posts.Any())
            {
                throw new UseCaseConflictException("Can't deactivate category because of it's link to post/s: "
                                                  + string.Join(", ", c.Posts.Select(x => x.Post.Title)));
            }

            Context.Deactivate<Category>(c.Id);
            Context.SaveChanges();


        }
    }
}
