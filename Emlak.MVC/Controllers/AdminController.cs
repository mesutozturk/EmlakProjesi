using Emlak.BLL.Repository;
using Emlak.BLL.Settings;
using Emlak.Entity.Entities;
using Emlak.Entity.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;

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
        public ActionResult IlanDetay(int? id)
        {
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

            if (id == null)
                return RedirectToAction("IlanYonetimi");
            var ilan = new KonutRepo().GetByID(id.Value);
            if (ilan == null)
                return RedirectToAction("IlanYonetimi");

            var model = new KonutViewModel()
            {
                Aciklama = ilan.Aciklama,
                Baslik = ilan.Baslik,
                EklenmeTarihi = ilan.EklenmeTarihi,
                Adres = ilan.Adres,
                BinaYasi = ilan.BinaYasi,
                Boylam = ilan.Boylam,
                FotografYollari = ilan.Fotograflar.Select(f => f.Yol).ToList(),
                Enlem = ilan.Enlem,
                Fiyat = ilan.Fiyat,
                IlanTuruID = ilan.IlanTuruID,
                IsitmaTuruID = ilan.IsitmaSistemiID,
                ID = ilan.ID,
                KatTuruID = ilan.KatturID,
                KullaniciID = ilan.KullaniciID,
                Metrekare = ilan.Metrekare,
                OdaSayisi = ilan.OdaSayisi,
                OnaylanmaTarihi = ilan.OnaylanmaTarihi,
                YayindaMi = ilan.YayindaMi,
                Bilgilendirmeler = new BilgilendirmeRepo().GetAll().Where(x => x.KonutID == ilan.ID).Select(b => new BilgilendirmeViewModel()
                {
                    ID = b.ID,
                    Aciklama = b.Aciklama,
                    AciklamaZamani = b.AciklamaZamani,
                    KonutID = b.KonutID,
                    OlumluMu = b.OlumluMu,
                    YoneticiID = b.YoneticiID
                }).ToList()
            };
            return View(model);
        }
        [HttpPost, ValidateInput(false)]
        public async Task<ActionResult> IlanDuzenle(KonutViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return RedirectToAction("IlanYonetimi");
            }

            var konut = new KonutRepo().GetByID(model.ID);
            IlanBilgilendirme bilgilendirme = new IlanBilgilendirme()
            {
                Aciklama = model.BilgilendirmeAciklamasi,
                KonutID = model.ID,
                OlumluMu = model.OlumluMu,
                YoneticiID = HttpContext.User.Identity.GetUserId()
            };
            bool aciklamaVarMi = false;
            if (!string.IsNullOrEmpty(model.BilgilendirmeAciklamasi))
            {
                konut.Bilgilendirmeler.Add(bilgilendirme);
                aciklamaVarMi = true;
            }
            
            #region Kullanıcı Bilgilendirme

            string SiteUrl = Request.Url.Scheme + System.Uri.SchemeDelimiter + Request.Url.Host +
(Request.Url.IsDefaultPort ? "" : ":" + Request.Url.Port);

            if (konut.YayindaMi == true && model.YayindaMi == false)
            {
                await SiteSettings.SendMail(new MailModel()
                {
                    Message = $"Merhaba {konut.Sahibi.Name}<br/><strong>'{konut.ID}'</strong> nolu ilanınız yayından kaldırılmıştır<br/><p>Sebep: <em>{model.BilgilendirmeAciklamasi}</em></p><a href='{SiteUrl}/Ilan/IlanDetay/{konut.ID}'>İlanınız görmek ve düzenlemek için tıklayınız</a>",
                    Subject = "İlanınız yayından kaldırıldı",
                    To = konut.Sahibi.Email
                });
            }
            else if (konut.YayindaMi == false && model.YayindaMi == true)
            {
                konut.OnaylanmaTarihi = DateTime.Now;
                await SiteSettings.SendMail(new MailModel()
                {
                    Message = $"Merhaba {konut.Sahibi.Name}<br/><strong>'{konut.ID}'</strong> nolu ilanınız yayına başlamıştır<br/><p><em>{model.BilgilendirmeAciklamasi}</em></p><a href='{SiteUrl}/Ilan/Detay/{konut.ID}'>İlanınız görmek için tıklayınız</a>",
                    Subject = "İlanınız Yayında!",
                    To = konut.Sahibi.Email
                });
            }
            else if (aciklamaVarMi)
            {
                await SiteSettings.SendMail(new MailModel()
                {
                    Message = $"Merhaba {konut.Sahibi.Name}<br/><strong>'{konut.ID}'</strong> nolu ilanınız için bir bildirim var<br/><p>Bildirim: <em>{model.BilgilendirmeAciklamasi}</em></p><a href='{SiteUrl}/Ilan/IlanDetay/{konut.ID}'>İlanınız görmek ve düzenlemek için tıklayınız</a>",
                    Subject = "İlanınız için yeni bir bildirim var",
                    To = konut.Sahibi.Email
                });
            }
            #endregion

            konut.Aciklama = model.Aciklama;
            konut.Adres = model.Adres;
            konut.Baslik = model.Baslik;
            konut.BinaYasi = model.BinaYasi;
            konut.Boylam = model.Boylam;
            konut.Enlem = model.Enlem;
            konut.Fiyat = model.Fiyat;
            konut.IlanTuruID = model.IlanTuruID;
            konut.IsitmaSistemiID = model.IsitmaTuruID;
            konut.KatturID = model.KatTuruID;
            konut.Metrekare = model.Metrekare;
            konut.OdaSayisi = model.OdaSayisi;
            konut.YayindaMi = model.YayindaMi;
            new KonutRepo().Update();

            return RedirectToAction("IlanDetay", new { id = konut.ID });
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
        [HttpPost]
        public JsonResult Resimsil(List<string> values)
        {
            try
            {
                values.ForEach(path =>
                    {
                        var yol = path.Substring(1);
                        var foto = new FotografRepo().GetAll().Where(x => x.Yol == yol).FirstOrDefault();
                        new FotografRepo().Delete(foto);
                        System.IO.File.Delete(Server.MapPath(path));
                    });
                return Json(new
                {
                    success = true,
                    message = "Seçili Resimler Silindi"
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = $"Resim Silme İşleminde Hata Var => {ex.Message}"
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