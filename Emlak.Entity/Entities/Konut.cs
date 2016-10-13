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
    [Table("Konutlar")]
    public class Konut
    {
        [Key]
        public int ID { get; set; }
        public short OdaSayisi { get; set; } = 1;
        public short SalonSayisi { get; set; } = 1;
        public short BanyoSayisi { get; set; } = 1;
        public string Adres { get; set; }
        [Column(TypeName = "date")]
        public DateTime EklenmeTarihi { get; set; } = DateTime.Now;
        public short BinaYasi { get; set; } = 0;
        public decimal Fiyat { get; set; }
        public double Metrekare { get; set; }
        public string Aciklama { get; set; }
        public string Enlem { get; set; }
        public string Boylam { get; set; }
        [StringLength(66)]
        public string Baslik { get; set; }
        public bool YayindaMi { get; set; } = false;
        public DateTime? OnaylanmaTarihi { get; set; }
        public string KullaniciID { get; set; }

        [ForeignKey("KullaniciID")]
        public virtual ApplicationUser Sahibi { get; set; }
    }
}
