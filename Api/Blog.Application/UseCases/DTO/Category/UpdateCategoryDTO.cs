﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Application.UseCases.DTO.Category
{
    public class UpdateCategoryDTO
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public bool IsActive { get; set; }

    }
}
