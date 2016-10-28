using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Emlak.Entity.ViewModels
{
    public class IlanListeleViewModel
    {
        public int KonutId { get; set; }
        public string IlanFotoPath { get; set; }
        public string IlanBaslik { get; set; }
        public string IlanDurum { get; set; }
        public decimal Fiyat { get; set; }
        public int OdaSayisi { get; set; }
        public string Adres { get; set; }
        public double MetreKare { get; set; }
    }
}
