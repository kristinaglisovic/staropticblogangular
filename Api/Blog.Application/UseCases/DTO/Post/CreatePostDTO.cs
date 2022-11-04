using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Application.UseCases.DTO.Post
{
    public class CreatePostDTO
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public int UserId { get; set; }

        public IEnumerable<int> CategoriesIds { get; set; }
        public IEnumerable<int> TagsIds { get; set; }
        public string ImageFileName { get; set; }

    }
}
