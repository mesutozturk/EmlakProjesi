using Emlak.Entity.Entities;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Emlak.Entity.IdentityModels
{
    public class ApplicationUser : IdentityUser
    {
        [StringLength(25)]
        public string Name { get; set; }
        [StringLength(35)]
        public string Surname { get; set; }
        [Column(TypeName = "smalldatetime")]
        public DateTime RegisterDate { get; set; } = DateTime.Now;
        public string AvatarPath { get; set; }
        public string ActivationCode { get; set; }
        public string PreRole { get; set; }
        public virtual List<Konut> Konutlar { get; set; } = new List<Konut>();
        public virtual List<IlanBilgilendirme> Bilgilendirmeler { get; set; } = new List<IlanBilgilendirme>();
    }
}
