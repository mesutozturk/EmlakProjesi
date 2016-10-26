using Emlak.BLL.Repository;
using Emlak.Entity.Entities;
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
        //[AllowAnonymous]
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
        public ActionResult IlanYonetimi()
        {
            List<KonutViewModel> ilanlar = new KonutRepo().GetAll().OrderByDescending(x => x.EklenmeTarihi).Select(x =>
            new KonutViewModel()
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

            return View(ilanlar);
        }


        #region JsonResults
        [HttpPost]
        public JsonResult YeniIlanTuru(string ilanturuadi)
        {
            if (string.IsNullOrEmpty(ilanturuadi.Trim()))
                return Json(new
                {
                    success = false,
                    message = "Boş geçme"
                }, JsonRequestBehavior.AllowGet);
            var ilanTuru = new IlanTuruRepo().GetAll().Where(x => x.Ad.ToLower() == ilanturuadi.ToLower()).FirstOrDefault();

            if (ilanTuru != null)
                return Json(new
                {
                    success = false,
                    message = $"Zaten {ilanTuru.Ad} adında bir kayıt var"
                }, JsonRequestBehavior.AllowGet);
            try
            {
                new IlanTuruRepo().Insert(new IlanTuru()
                {
                    Ad = ilanturuadi
                });
                return Json(new
                {
                    success = true,
                    message = $"{ilanturuadi} Kaydı Eklenmiştir"
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = $"{ilanturuadi} Kaydı Eklenemedi=> {ex.Message}"
                }, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult IlanTuruGetir(int? id)
        {
            if (id == null)
                return Json(new
                {
                    success = false,
                    message = "Boş geçme"
                }, JsonRequestBehavior.AllowGet);

            var ilanturu = new IlanTuruRepo().GetByID(id.Value);

            return Json(new
            {
                success = true,
                message = ilanturu.Ad
            }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult IlanGuncelle(int? ilanid, string ad)
        {
            if (ilanid == null || string.IsNullOrEmpty(ad.Trim()))
                return Json(new
                {
                    success = false,
                    message = "Boş Geçme"
                }, JsonRequestBehavior.AllowGet);

            try
            {
                var ilanturu = new IlanTuruRepo().GetByID(ilanid.Value);
                ilanturu.Ad = ad;
                new IlanTuruRepo().Update();
                return Json(new
                {
                    success = true,
                    message = "Güncelleme Başarılı"
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = $"Güncelleme Başarısız:> {ex.Message}"
                }, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public JsonResult YeniKatTuru(string katturuadi)
        {
            if (string.IsNullOrEmpty(katturuadi.Trim()))
                return Json(new
                {
                    success = false,
                    message = "Boş geçme"
                }, JsonRequestBehavior.AllowGet);

            var katturu = new KatTurRepo().GetAll().Where(x => x.Tur.ToLower() == katturuadi.ToLower()).FirstOrDefault();

            if (katturu != null)
                return Json(new
                {
                    success = false,
                    message = $"Zaten {katturu.Tur} adında bir kayıt var"
                }, JsonRequestBehavior.AllowGet);

            try
            {
                new KatTurRepo().Insert(new Kattur
                {
                    Tur = katturuadi
                });
                return Json(new
                {
                    success = true,
                    message = $"{katturuadi} Kaydı Eklenmiştir"
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = $"{katturuadi} Kaydı Eklenemedi=> {ex.Message}"
                }, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult KatTuruGetir(int? id)
        {
            if (id == null)
                return Json(new
                {
                    success = false,
                    message = "Boş geçme"
                }, JsonRequestBehavior.AllowGet);
            var katturu = new KatTurRepo().GetByID(id.Value);
            return Json(new
            {
                success = true,
                message = katturu.Tur
            }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult KatturuGuncelle(int? katturid, string ad)
        {
            if (katturid == null || string.IsNullOrEmpty(ad.Trim()))
                return Json(new
                {
                    success = false,
                    message = "Boş Geçme"
                }, JsonRequestBehavior.AllowGet);
            try
            {
                var katturu = new KatTurRepo().GetByID(katturid.Value);
                katturu.Tur = ad;
                new KatTurRepo().Update();
                return Json(new
                {
                    success = true,
                    message = "Güncelleme Başarılı"
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = $"Güncelleme Başarısız:> {ex.Message}"
                }, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public JsonResult YeniIsitmaTuru(string isitmaturuadi)
        {
            if (string.IsNullOrEmpty(isitmaturuadi.Trim()))
                return Json(new
                {
                    success = false,
                    message = "Boş geçme"
                }, JsonRequestBehavior.AllowGet);

            var isitmaturu = new IsitmaSistemiRepo().GetAll().Where(x => x.Ad.ToLower() == isitmaturuadi.ToLower()).FirstOrDefault();

            if (isitmaturu != null)
                return Json(new
                {
                    success = false,
                    message = $"Zaten {isitmaturu.Ad} adında bir kayıt var"
                }, JsonRequestBehavior.AllowGet);

            try
            {
                new IsitmaSistemiRepo().Insert(new IsitmaSistemi
                {
                    Ad = isitmaturuadi
                });
                return Json(new
                {
                    success = true,
                    message = $"{isitmaturuadi} Kaydı Eklenmiştir"
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = $"{isitmaturuadi} Kaydı Eklenemedi=> {ex.Message}"
                }, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult IsitmaTuruGetir(int? id)
        {
            if (id == null)
                return Json(new
                {
                    success = false,
                    message = "Boş geçme"
                }, JsonRequestBehavior.AllowGet);

            var isitmaturu = new IsitmaSistemiRepo().GetByID(id.Value);

            return Json(new
            {
                success = true,
                message = isitmaturu.Ad
            }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult IsitmaTuruGuncelle(int? isitmaturid, string ad)
        {
            if (isitmaturid == null || string.IsNullOrEmpty(ad.Trim()))
                return Json(new
                {
                    success = false,
                    message = "Boş Geçme"
                }, JsonRequestBehavior.AllowGet);

            try
            {
                var isitmaturu = new IsitmaSistemiRepo().GetByID(isitmaturid.Value);
                isitmaturu.Ad = ad;
                new IsitmaSistemiRepo().Update();
                return Json(new
                {
                    success = true,
                    message = "Güncelleme Başarılı"
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = $"Güncelleme Başarısız:> {ex.Message}"
                }, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion
        #region PartialViews
        public PartialViewResult AdminMenu()
        {
            return PartialView("_adminMenuPartial");
        }
        #endregion
    }
}