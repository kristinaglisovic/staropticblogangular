using Blog.Application.UseCases.DTO.Searches;
using Blog.Application.UseCases.DTO.Tag;
using Blog.Application.UseCases.Queries;
using Blog.DataAccess;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Implementation.UseCases.Queries.Ef
{
    public class EfGetTagsQuery : EfUseCase, IGetTagsQuery
    {
        public EfGetTagsQuery(BlogDbContext context) : base(context)
        {
        }

        public int Id => 18;

        public string Name => "Get all tags";

        public string Description => "Get all tags with pagination";

        public PagedResponse<TagDTO> Execute(TagPagedSearch search)
        {
            var query = Context.Tags.Include(x => x.Posts).ThenInclude(x => x.Post).AsQueryable();


            var kw = search.Keyword;

            if (!string.IsNullOrEmpty(kw))
            {
                query = query.Where(x => x.Name.Contains(kw));

            }

            if (search.HasPosts.HasValue)
            {
                if (search.HasPosts.Value)
                {
                    query = query.Where(p => p.Posts.Any());

                }
                else
                {
                    query = query.Where(p => !p.Posts.Any());
                }
            }

            if (search.PerPage == null || search.PerPage < 1)
            {
                search.PerPage = 5;
            }

            if (search.Page == null || search.Page < 1)
            {
                search.Page = 1;
            }

            var toSkip = (search.Page.Value - 1) * search.PerPage.Value;

            var response = new PagedResponse<TagDTO>();
            response.TotalCount = query.Count();
            response.Data = query.Skip(toSkip).Take(search.PerPage.Value).Select(x => new TagDTO
            {
                Name=x.Name,
                CreatedAt = x.CreatedAt.ToString("yyyy-MM-dd hh:mm:ss"),
                UpdatedAt = x.UpdatedAt.HasValue ? x.UpdatedAt.Value.ToString("yyyy-MM-dd hh:mm:ss") : "",
                IsActive=x.IsActive,
                Id=x.Id,
                PostsCount=x.Posts.Count(),
            }).ToList();

            response.CurrentPage = search.Page.Value;
            response.ItemsPerPage = search.PerPage.Value;


            return response;
        }
    }
}
