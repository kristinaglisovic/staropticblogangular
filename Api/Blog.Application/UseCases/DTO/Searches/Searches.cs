namespace Blog.Application.UseCases.DTO.Searches
{
    public class BaseSearch
    {
        public string Keyword { get; set; }
    }



    public class PagedSearch
    {
        public int? PerPage { get; set; } = 5;
        public int? Page { get; set; } = 1;
    }

    public class BasePagedSearch : PagedSearch
    {
        public string Keyword { get; set; }
    }

    public class PostPagedSearch {
        public int? PerPage { get; set; } = 4;
        public int? Page { get; set; } = 1;
        public string Keyword { get; set; }
        public bool? HasComments { get; set; }
        public bool? HasLikes { get; set; }
    }

    public class ImagePagedSearch : BasePagedSearch
    {
    }

    public class TagPagedSearch : BasePagedSearch
    {
        public bool? HasPosts { get; set; }
    }


    public class CategoriesPagedSearch : BasePagedSearch
    {
        public bool? HasPosts { get; set; }
    }

    public class LikePagedSearch : BasePagedSearch
    { 
    }

    public class CommentsPagedSearch : BasePagedSearch
    {

    }

    public class UsersPagedSearch : BasePagedSearch
    {
        public bool? HasPosts { get; set; }
        public bool? HasLikes { get; set; }
        public bool? HasComments { get; set; }
        public bool? HasImage { get; set; }
    }
    public class PostTagsPagedSearch : BasePagedSearch
    { 
    }  
    
    public class PostImagesPagedSearch : BasePagedSearch
    { 
    }public class PostCategoryPagedSearch : BasePagedSearch
    { 
    }



}
