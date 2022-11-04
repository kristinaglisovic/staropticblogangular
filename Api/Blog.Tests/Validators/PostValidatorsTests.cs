using Blog.Application.UseCases.DTO.Post;
using Blog.DataAccess;
using Blog.Implementation.Validators;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Blog.Tests.Validators
{
    public class PostValidatorsTests
    {
        [Fact]
        public void CreatePostTests()
        {
           
            var validator = new CreatePostDTOValidator(Context);

            var dto = new CreatePostDTO{
                Title="a"
            };

            var result = validator.Validate(dto);

        }

        private BlogDbContext Context
        {
            get
            {
                var conString = "Data Source=KIMIX.\\SQLEXPRESS;Initial Catalog=Blog;Integrated Security=True";

                var optionsBuilder = new DbContextOptionsBuilder().UseSqlServer(conString);


                var options = optionsBuilder.Options;
                return null;// new BlogDbContext(options);
            }
        }
    }
}
