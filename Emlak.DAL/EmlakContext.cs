using Emlak.Entity.Entities;
using Emlak.Entity.IdentityModels;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Emlak.DAL
{
    public class EmlakContext:IdentityDbContext<ApplicationUser>
    {
        public EmlakContext()
            :base("name=EmlakCon")
        {
        }
        public virtual DbSet<Konut> Konutlar{ get; set; }
        public virtual DbSet<Fotograf> Fotograflar{ get; set; }
        public virtual DbSet<IlanTuru> IlanTurleri{ get; set; }
        public virtual DbSet<IsitmaSistemi> IsitmaSistemleri { get; set; }
        public virtual DbSet<Kattur> KatTurleri { get; set; }
        public virtual DbSet<IlanBilgilendirme> IlanBilgilendirmeler { get; set; }
    }
}
