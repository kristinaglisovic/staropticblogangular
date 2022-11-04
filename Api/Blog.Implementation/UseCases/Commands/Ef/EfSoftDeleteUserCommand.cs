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
    public class EfSoftDeleteUserCommand : EfUseCase, ISoftDeleteUserUsingIntCommand
    {
        public EfSoftDeleteUserCommand(BlogDbContext context) : base(context)
        {
        }

        public int Id => 41;

        public string Name => "Soft Delete User";

        public string Description => "User Deactivation EF";

        public void Execute(int id)
        {

            var u = Context.Users.Include(x => x.Posts)
                                 .Include(x => x.Comments)
                                 .Include(x => x.Likes)
                                 .Include(x => x.Image).FirstOrDefault(x => x.Id == id);


           

            if (u == null || !u.IsActive)
            {
                throw new EntityNotFoundException(nameof(User), id);
            }


 

            var likesToDeactivate=Context.Likes.Where(x=>x.UserId==u.Id && x.IsActive).Select(x=>x.Id);
            var commentsToDeactivate=Context.Comments.Where(x=>x.UserId==u.Id && x.IsActive).Select(x => x.Id);


            if (likesToDeactivate.Any())
            {
                Context.DeactivateIds<Like>(likesToDeactivate);
            }
            if (commentsToDeactivate.Any())
            { 
              Context.DeactivateIds<Comment>(commentsToDeactivate);
            }
            if (u.Image != null)
            {
              Context.Deactivate<Image>(u.Image.Id);
            }

         
            Context.Deactivate<User>(u.Id);
            Context.SaveChanges();
           
        }
    }
}
