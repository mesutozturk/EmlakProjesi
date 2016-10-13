using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Emlak.Entity.Entities
{
    [Table("Fotograflar")]
    public class Fotograf
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Yol { get; set; }
        public int KonutID { get; set; }
        [ForeignKey("KonutID")]
        public virtual Konut Konutu { get; set; }
    }
}
