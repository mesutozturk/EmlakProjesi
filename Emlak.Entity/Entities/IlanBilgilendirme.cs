using Emlak.Entity.IdentityModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Emlak.Entity.Entities
{
    [Table("IlanBilgilendirmeler")]
    public class IlanBilgilendirme
    {
        [Key]
        public int ID { get; set; }
        public string Aciklama { get; set; }
        [Column(TypeName ="smalldatetime")]
        public DateTime AciklamaZamani { get; set; } = DateTime.Now;
        public bool OlumluMu { get; set; }
        public string YoneticiID { get; set; }
        public int KonutID { get; set; }


        [ForeignKey("KonutID")]
        public virtual Konut Konutu { get; set; }
        [ForeignKey("YoneticiID")]
        public virtual ApplicationUser Yoneticisi { get; set; }
    }
}
