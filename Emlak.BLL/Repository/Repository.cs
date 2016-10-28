using Emlak.Entity.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Emlak.BLL.Repository
{
    public class KonutRepo : RepositoryBase<Konut, int>
    {
        public List<Konut> GetAllActive()=>this.GetAll().Where(x => x.YayindaMi == true).ToList();
        
    }
    public class FotografRepo : RepositoryBase<Fotograf, int> { }
    public class IlanTuruRepo : RepositoryBase<IlanTuru, int> { }
    public class KatTurRepo : RepositoryBase<Kattur, int> { }
    public class IsitmaSistemiRepo : RepositoryBase<IsitmaSistemi, int> { }
    public class BilgilendirmeRepo : RepositoryBase<IlanBilgilendirme, int> { }
}
