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
    public class EfSoftDeletePostCommand : EfUseCase, ISoftDeletePostUsingIntCommand
    {
        public EfSoftDeletePostCommand(BlogDbContext context) : base(context)
        {
        }

        public int Id => 8;

        public string Name => "Soft Delete of Post";

        public string Description => "Soft Delete by updating column isActive";

        public void Execute(int request)
        {
            var postToDeacivate = Context.Posts.Find(request);
            if (postToDeacivate == null || !postToDeacivate.IsActive)
            {
                throw new EntityNotFoundException(nameof(Post), request);
            }
            Context.Deactivate<Post>(postToDeacivate.Id);
            Context.SaveChanges();
        }
    }
}
