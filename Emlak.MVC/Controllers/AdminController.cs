using Emlak.BLL.Repository;
using Emlak.Entity.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Emlak.MVC.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {
        // GET: Admin
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Settings()
        {
            var model = new SettingsViewModel()
            {
                IlanTurleri = new IlanTuruRepo().GetAll().Select(x => new IlanViewModel()
                {
                    ID = x.ID,
                    Ad = x.Ad
                }).ToList(),
                IsitmaTurleri = new IsitmaSistemiRepo().GetAll().Select(x => new IsitmaViewModel()
                {
                    ID = x.ID,
                    Ad = x.Ad
                }).ToList(),
                KatTurleri = new KatTurRepo().GetAll().Select(x => new KatTuruViewModel()
                {
                    ID = x.ID,
                    Tur = x.Tur
                }).ToList()
            };
            return View(model);
        }

        #region PartialViews
        public PartialViewResult AdminMenu()
        {
            return PartialView("_adminMenuPartial");
        }
        #endregion
    }
}