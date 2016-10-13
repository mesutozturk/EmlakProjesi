using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Emlak.Entity.Entities
{
    [Table("IsitmaSistemleri")]
    public class IsitmaSistemi
    {
        [Key]
        public int ID { get; set; }
        [StringLength(30)]
        [Required]
        public string Ad { get; set; }

        public virtual List<Konut> Konutlar { get; set; } = new List<Konut>();
    }
}
