using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Emlak.Entity.ApiModels
{
    public class JsonMessageViewModel
    {
        public bool success { get; set; } = false;
        public string message { get; set; }
        public DateTime messageTime { get; set; } = DateTime.Now;
    }
}
