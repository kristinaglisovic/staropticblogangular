using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Application.UseCases.DTO.Tag
{
    public class UpdateTagDTO
    {
        public string Name { get; set; }


        public bool IsActive { get; set; }
    }
}
