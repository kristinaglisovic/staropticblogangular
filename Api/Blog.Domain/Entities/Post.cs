using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Domain.Entities
{
    public class Post : Entity
    {
        public string Title { get; set; }
        public string Description { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

        public ICollection<PostCategory> Categories { get; set; } = new List<PostCategory>();

        public ICollection<PostTag> Tags { get; set; } = new List<PostTag>();
  
        public ICollection<PostImage> Images { get; set; } = new List<PostImage>();

        public ICollection<Comment> Comments { get; set; }= new List<Comment>();

        public ICollection<Like> Likes { get; set; } = new List<Like>();

    }
}
