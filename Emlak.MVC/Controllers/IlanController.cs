using Emlak.BLL.Account;
using Emlak.BLL.Repository;
using Emlak.BLL.Settings;
using Emlak.Entity.Entities;
using Emlak.Entity.ViewModels;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;

namespace Emlak.MVC.Controllers
{
    public class IlanController : Controller
    {
        // GET: Ilan
        public ActionResult Index()
        {
            return View();
        }
        [Authorize]
        public ActionResult Ekle()
        {
            var userManager = MembershipTools.NewUserManager();
            var user = userManager.FindById(HttpContext.User.Identity.GetUserId());
            if (userManager.IsInRole(user.Id, "Passive") || userManager.IsInRole(user.Id, "Banned"))
            {
                ModelState.AddModelError(string.Empty, "Profiliniz Yeni ilan açmak için uygun değildir.");
                return RedirectToAction("Profile", "Account");
            }
            var model = new KonutViewModel();
            var ilanturleri = new List<SelectListItem>();
            var katturleri = new List<SelectListItem>();
            var isinmaturleri = new List<SelectListItem>();
            new IlanTuruRepo().GetAll().OrderBy(x => x.Ad).ToList().ForEach(x =>
            ilanturleri.Add(new SelectListItem()
            {
                Text = x.Ad,
                Value = x.ID.ToString()
            }));
            new KatTurRepo().GetAll().ForEach(x => katturleri.Add(new SelectListItem
            {
                Text = x.Tur,
                Value = x.ID.ToString()
            }));
            new IsitmaSistemiRepo().GetAll().ForEach(x => isinmaturleri.Add(new SelectListItem
            {
                Text = x.Ad,
                Value = x.ID.ToString()
            }));
            ViewBag.ilanturleri = ilanturleri;
            ViewBag.katturleri = katturleri;
            ViewBag.isinmaturleri = isinmaturleri;

            return View(model);
        }
        [HttpPost, ValidateInput(false)]
        [Authorize]
        public async Task<ActionResult> Ekle(KonutViewModel model)
        {
            if (!ModelState.IsValid)
            {
                ModelState.AddModelError("", "Errör");
                return View();
            }
            Konut yeniKonut = new Konut()
            {
                Aciklama = model.Aciklama,
                Adres = model.Adres,
                Baslik = model.Baslik,
                BinaYasi = model.BinaYasi,
                Boylam = model.Boylam,
                Enlem = model.Enlem,
                Fiyat = model.Fiyat,
                IlanTuruID = model.IlanTuruID,
                IsitmaSistemiID = model.IsitmaTuruID,
                KatturID = model.KatTuruID,
                KullaniciID = HttpContext.User.Identity.GetUserId(),
                Metrekare = model.Metrekare,
                OdaSayisi = model.OdaSayisi
            };
            new KonutRepo().Insert(yeniKonut);
            if (model.Dosyalar.Count > 0)
            {
                model.Dosyalar.ForEach(file =>
                {
                    if (file != null && file.ContentLength > 0)
                    {
                        string fileName = Path.GetFileNameWithoutExtension(file.FileName);
                        string extName = Path.GetExtension(file.FileName);
                        fileName = fileName.Replace(" ", "");
                        fileName += Guid.NewGuid().ToString().Replace("-", "");
                        fileName = SiteSettings.UrlFormatConverter(fileName);
                        var klasoryolu = Server.MapPath("~/Upload/" + yeniKonut.ID);
                        var dosyayolu = Server.MapPath("~/Upload/" + yeniKonut.ID + "/") + fileName + extName;
                        if (!Directory.Exists(klasoryolu))
                            Directory.CreateDirectory(klasoryolu);
                        file.SaveAs(dosyayolu);
                        WebImage img = new WebImage(dosyayolu);
                        img.Resize(870, 480, false);
                        img.AddTextWatermark("Wissen", "RoyalBlue", opacity: 75, fontSize: 25, fontFamily: "Verdana");
                        img.Save(dosyayolu);
                        new FotografRepo().Insert(new Fotograf()
                        {
                            KonutID = yeniKonut.ID,
                            Yol = @"Upload/" + yeniKonut.ID + "/" + fileName + extName
                        });
                    }
                });
            }
            string SiteUrl = Request.Url.Scheme + System.Uri.SchemeDelimiter + Request.Url.Host +
(Request.Url.IsDefaultPort ? "" : ":" + Request.Url.Port);

            var roleManager = MembershipTools.NewRoleManager();
            var users = roleManager.FindByName("Admin").Users;

            var userManager = MembershipTools.NewUserManager();
            List<string> mailler = new List<string>();

            foreach (var item in users)
            {
                mailler.Add(userManager.FindById(item.UserId).Email);
            }

            foreach (var mail in mailler)
            {
                await SiteSettings.SendMail(new MailModel
                {
                    Subject = "Yeni İlan Eklendi",
                    Message = $"Sayın Admin,<br/>Sitenize bir ilan eklendi, siz de bi zahmet onaylayın.<br/><a href='{SiteUrl}/Admin/IlanDetay/{yeniKonut.ID}'>Haydi Onayla</a><p>İyi Çalışmalar<br/>Sitenin Nöbetçisi</p>",
                    To = mail
                });
            }
            return RedirectToAction("Index", "Home");
        }

        [Authorize]
        public ActionResult IlanListele()
        {
            var userManager = MembershipTools.NewUserManager();

            var user = userManager.FindById(HttpContext.User.Identity.GetUserId());
            List<KonutViewModel> model = new KonutRepo().GetAll().Where(x => x.KullaniciID == user.Id).Select(x => new KonutViewModel()
            {
                Aciklama = x.Aciklama,
                YayindaMi = x.YayindaMi,
                Adres = x.Adres,
                Baslik = x.Baslik,
                BinaYasi = x.BinaYasi,
                Boylam = x.Boylam,
                EklenmeTarihi = x.EklenmeTarihi,
                Enlem = x.Enlem,
                Fiyat = x.Fiyat,
                FotografYollari = (x.Fotograflar.Count > 0 ? x.Fotograflar.Select(y => y.Yol).ToList() : new List<string>()),
                ID = x.ID,
                IlanTuruID = x.IlanTuruID,
                IsitmaTuruID = x.IsitmaSistemiID,
                KatTuruID = x.KatturID,
                KullaniciID = x.KullaniciID,
                Metrekare = x.Metrekare,
                OdaSayisi = x.OdaSayisi,
                OnaylanmaTarihi = x.OnaylanmaTarihi
            }).ToList();

            return View(model);
        }

        [Authorize]
        public ActionResult IlanDetay(int? id)
        {

            return View();
        }
    }
}