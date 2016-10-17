using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Emlak.MVC.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        #region PartialViewResults
        public PartialViewResult MenuPartial()
        {
            return PartialView("_menuPartial");
        }

        public PartialViewResult BreadCrumbsPartial()
        {
            return PartialView("_breadcrubsPartial");
        } 
        public PartialViewResult FooterPartial()
        {
            return PartialView("_footerPartial");
        }

        public PartialViewResult TopModal()
        {
            return PartialView("_topmodalPartial");
        }
        #endregion
    }
}