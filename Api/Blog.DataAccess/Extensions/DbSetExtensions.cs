using Blog.DataAccess.Exceptions;
using Blog.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.DataAccess.Extensions
{
    public static class DbSetExtensions
    {
        //deaktivacija
        public static void Deactivate<T>(this DbContext context, int id)
           where T : Entity
        {
         
            var itemToDeactivate = context.Set<T>().Find(id);

            if (itemToDeactivate == null)
            {
                throw new EntityNotFoundException();
            }

            itemToDeactivate.IsActive = false;

            //primer upotrebe: 

            //context.Deactivate<Image>(5);
        }
        public static void DeactivateIds<T>(this DbContext context, IEnumerable<int> ids)
                    where T : Entity
        {
        
           var toDeactivate = context.Set<T>().Where(x => ids.Contains(x.Id));

           foreach (var d in toDeactivate)
           {
               d.IsActive = false;
           }

        }
        //context.Deactivate<Image>(imageIds);

    }
}
