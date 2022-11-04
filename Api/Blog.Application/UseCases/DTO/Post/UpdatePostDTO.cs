using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Application.UseCases.DTO.Post
{
    public class UpdatePostDTO
    {
        public string Title { get; set; }

        public string Description { get; set; }

        //public int UserId { get; set; }
        public bool IsActive { get; set; }

        public IEnumerable<int> CategoriesIds { get; set; }
        public IEnumerable<int> TagsIds { get; set; }
        public IEnumerable<int> ImagesIds { get; set; }
    }
}
