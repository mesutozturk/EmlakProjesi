using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Emlak.Entity.ViewModels
{
    public class BilgilendirmeViewModel
    {
        public int ID { get; set; }
        [Display(Name ="Açıklama")]
        public string Aciklama { get; set; }
        [Display(Name = "Açıklama Zamanı")]
        public DateTime AciklamaZamani { get; set; } = DateTime.Now;
        [Display(Name = "Olumlu Mu")]
        public bool OlumluMu { get; set; }
        public string YoneticiID { get; set; }
        public int KonutID { get; set; }
    }
}
