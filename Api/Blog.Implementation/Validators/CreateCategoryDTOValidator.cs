using Blog.Application.UseCases.DTO.Category;
using Blog.DataAccess;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Implementation.Validators
{
    public class CreateCategoryDTOValidator:AbstractValidator<CreateCategoryDTO>
    {
        private BlogDbContext _context;

        public CreateCategoryDTOValidator(BlogDbContext context)
        {
            _context = context;

            RuleFor(x => x.Name).Cascade(CascadeMode.Stop).NotEmpty().WithMessage("Name is required.")
                              .MinimumLength(3).WithMessage("Name must have at least 3 characters.");
                             // .Must(NameNotInUse).WithMessage("Category with name '{PropertyValue}' already exists");

            RuleFor(x => x.Description).Cascade(CascadeMode.Stop).NotEmpty().WithMessage("Description is required.")
                       .MinimumLength(3).WithMessage("Description must have at least 3 characters.");
                      // .Must(DescriptionNotInUse).WithMessage("Category with description '{PropertyValue}' already exists");

        }


        private bool DescriptionNotInUse(string name)
        {
            return !_context.Categories.Any(x => x.Desciption == name);
        }

        private bool NameNotInUse(string name)
        {
            return !_context.Categories.Any(x => x.Name == name);
        }

    }
}
