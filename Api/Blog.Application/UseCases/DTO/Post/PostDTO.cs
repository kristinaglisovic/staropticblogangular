using Blog.Application.UseCases.DTO;
using System;
using System.Collections.Generic;

namespace Blog.Application.UseCases.DTO.Post
{
    public class PostDTO : BaseDTO
    { 
        public string Title { get; set; }
        public string Description { get; set; }
        public IEnumerable<string> Images { get; set; }
        public string Author { get; set; }
        public string AuthorUsername { get; set; }
        public bool IsActive { get; set; }
        public string AuthorRole { get; set; }

        public IEnumerable<CommentDto> Comments { get; set; }
        public IEnumerable<string> Tags { get; set; }
        public IEnumerable<string> Categories { get; set; }

        public int Likes { get; set; }
        public int CommentsCount { get; set; }

        public string CreatedAt { get; set; }
        public string UpdatedAt { get; set; }
    }

    public class CommentDto:BaseDTO
    {
        public string Comment { get; set; }
        public string User { get; set; }
        public string CommentedAt { get; set; }
    }



}
