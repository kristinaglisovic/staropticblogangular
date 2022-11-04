using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Application.UseCases.DTO.Category
{
    public class CategoryDTO:BaseDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public int PostsCount { get; set; }
        public bool IsActive { get; set; }

        public string CreatedAt { get; set; }
        public string UpdatedAt { get; set; }
    }
}
