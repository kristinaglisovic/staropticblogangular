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
    public class EfSoftDeleteCommentCommand : EfUseCase, ISoftDeleteCommentUsingIntCommand
    {
        public EfSoftDeleteCommentCommand(BlogDbContext context) : base(context)
        {
        }

        public int Id =>36;

        public string Name => "Soft delete comment";

        public string Description => "Ef Soft delete comment";

        public void Execute(int id)
        {
            var comment = Context.Comments.Include(x => x.Post).Include(x => x.User).FirstOrDefault(x => x.Id == id);

            if (comment == null || !comment.IsActive)
            {
                throw new EntityNotFoundException(nameof(Comment), id);
            }
            Context.Deactivate<Comment>(comment.Id);
            Context.SaveChanges();


        }
    }
}
