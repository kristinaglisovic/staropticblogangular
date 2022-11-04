using Blog.Application.UseCases.DTO.Post;
using Blog.Application.UseCases.DTO.Searches;
using Blog.Application.UseCases.Queries;
using Blog.DataAccess;
using Microsoft.EntityFrameworkCore;
using System.Linq;


namespace Blog.Implementation.UseCases.Queries.Ef
{
    public class EfGetPostsQuery :EfUseCase, IGetPostsQuery
    {
        public EfGetPostsQuery(BlogDbContext context) : base(context)
        {
        }

        public int Id => 1;

        public string Name => "Search Posts";

        public string Description => "Search Posts using Entity Framework";

        public PagedResponse<PostDTO> Execute(PostPagedSearch search)
        {
            var query = Context.Posts.Include(x => x.User).ThenInclude(x => x.Role)
                                     .Include(x => x.Tags)
                                     .ThenInclude(x => x.Tag)
                                     .Include(x => x.Categories)
                                     .ThenInclude(x => x.Category)
                                     .Include(x => x.Comments)
                                     .Include(x => x.Images)
                                     .ThenInclude(x => x.Image)
                                     .Include(x => x.Likes).AsQueryable();


            if (search.HasComments.HasValue)
            {
                if (search.HasComments.Value)
                {
                    query = query.Where(p => p.Comments.Any());

                }
                else
                {
                    query = query.Where(p => !p.Comments.Any());
                }
            }
            if (search.HasLikes.HasValue)
            {
                if (search.HasLikes.Value)
                {
                    query = query.Where(p => p.Likes.Any());

                }
                else
                {
                    query = query.Where(p => !p.Likes.Any());
                }
            }

            var kw = search.Keyword;


            if (!string.IsNullOrEmpty(kw))
            {
                query = query.Where(x => x.User.Username.Contains(kw) ||
                                        x.User.LastName.Contains(kw) ||
                                        x.User.FirstName.Contains(kw) ||
                                        x.Tags.Any(x => x.Tag.Name.Contains(kw)) ||
                                        x.Categories.Any(x => x.Category.Name.Contains(kw)) ||
                                        x.Images.Any(x => x.Image.Path.Contains(kw)) ||
                                        x.Title.Contains(kw) || x.Description.Contains(kw));
            }


            if (search.PerPage == null || search.PerPage < 1)
            {
                search.PerPage = 5;
            }

            if(search.Page ==null || search.Page < 1)
            {
                search.Page = 1;
            }


            var toSkip=(search.Page.Value-1)*search.PerPage.Value;

            var response = new PagedResponse<PostDTO>();
            response.TotalCount = query.Count();
            response.Data=query.Skip(toSkip).Take(search.PerPage.Value).Select(x => new PostDTO
            {
                Id = x.Id,
                Title = x.Title,
                IsActive=x.IsActive,
                Description = x.Description,
                Images = x.Images.Select(x => x.Image.Path),
                Author = $"{x.User.FirstName} {x.User.LastName} - {x.User.Username}",
                AuthorUsername=x.User.Username,
                AuthorRole = x.User.Role.Name,
                CommentsCount = x.Comments.Where(y => y.IsActive).Count(),
                Comments = x.Comments.Where(y => y.IsActive).Select(x => new CommentDto
                {
                    Id = x.Id,
                    Comment = x.Text,
                    CommentedAt = x.CreatedAt.ToString("yyyy-MM-dd hh:mm:ss"),
                    User = x.User.Username
                }).ToList(),
                Tags = x.Tags.Select(x => x.Tag.Name),
                Categories = x.Categories.Select(x => x.Category.Name),
                Likes = x.Likes.Where(y=>y.IsActive).Count(),
                CreatedAt = x.CreatedAt.ToString("yyyy-MM-dd hh:mm:ss"),
                UpdatedAt = x.UpdatedAt !=null ? x.UpdatedAt.Value.ToString("yyyy-MM-dd hh:mm:ss") : "",
               
            }).ToList();

            response.CurrentPage = search.Page.Value;
            response.ItemsPerPage=search.PerPage.Value;
            

            return response;

            
        }
    }
}
