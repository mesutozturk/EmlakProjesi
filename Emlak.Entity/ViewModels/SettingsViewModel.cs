using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Emlak.Entity.ViewModels
{
    public class SettingsViewModel
    {
        public List<IlanViewModel> IlanTurleri { get; set; } = new List<IlanViewModel>();
        public List<KatTuruViewModel> KatTurleri { get; set; } = new List<KatTuruViewModel>();
        public List<IsitmaViewModel> IsitmaTurleri { get; set; } = new List<IsitmaViewModel>();
        public IlanViewModel YeniIlanTuru { get; set; }
        public KatTuruViewModel YeniKatTuru { get; set; }
        public IsitmaViewModel YeniIsitmaTuru { get; set; }
    }
    public class IlanViewModel
    {
        public int ID { get; set; }
        [StringLength(50)]
        [Required]
        [Display(Name = "İlan Türü")]
        public string Ad { get; set; }
    }
    public class KatTuruViewModel
    {
        public int ID { get; set; }
        [StringLength(15)]
        [Required]
        [Display(Name = "Kat Türü")]
        public string Tur { get; set; }
    }
    public class IsitmaViewModel
    {
        public int ID { get; set; }
        [StringLength(30)]
        [Required]
        [Display(Name = "Isıtma Türü")]
        public string Ad { get; set; }
    }
}
