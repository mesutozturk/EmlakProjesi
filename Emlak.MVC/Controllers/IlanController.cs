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
        const int sayfadaGosterilecekIlanSayisi = 9;
        // GET: Ilan
        [AllowAnonymous]
        public ActionResult Index(int? sayfa)
        {
            
            var model = new KonutRepo().GetAllActive().Select(x => new IlanListeleViewModel()
            {
                Adres = x.Adres,
                Fiyat = x.Fiyat,
                IlanBaslik = x.Baslik,
                IlanFotoPath = x.Fotograflar.Count > 0 ? x.Fotograflar.FirstOrDefault().Yol : "img/nofoto.jpg",
                IlanDurum = x.IlanTuru.Ad,
                KonutId = x.ID,
                MetreKare = x.Metrekare,
                OdaSayisi = x.OdaSayisi
            }).ToList();
            int toplamKayit = model.Count;
            int sayfaSayisi = Convert.ToInt32(Math.Ceiling(Convert.ToDouble(toplamKayit) / sayfadaGosterilecekIlanSayisi));
            ViewBag.MaxSayfaSayisi = sayfaSayisi;
            ViewBag.BulunduguSayfa = 1;
            if (sayfa == null)
                return View(model.Take(sayfadaGosterilecekIlanSayisi).ToList());
            else
            {
                if (sayfa.Value > sayfaSayisi)
                {
                    ViewBag.BulunduguSayfa = sayfaSayisi;
                    return View(model.Skip((sayfaSayisi - 1) * sayfadaGosterilecekIlanSayisi).Take(sayfadaGosterilecekIlanSayisi).ToList());
                }
                ViewBag.BulunduguSayfa = sayfa.Value;
               return View(model.Skip((sayfa.Value - 1) * sayfadaGosterilecekIlanSayisi).Take(sayfadaGosterilecekIlanSayisi).ToList());
            }
        }
        [AllowAnonymous]
        public ActionResult Kullanici(string id)
        {
            if (string.IsNullOrEmpty(id))
                return RedirectToAction("Index");
            ViewBag.kullaniciAdi = MembershipTools.NewUserManager().FindById(id).UserName;
            var model = new KonutRepo().GetAllActive().Where(x=>x.KullaniciID==id).Select(x => new IlanListeleViewModel()
            {
                Adres = x.Adres,
                Fiyat = x.Fiyat,
                IlanBaslik = x.Baslik,
                IlanFotoPath = x.Fotograflar.Count > 0 ? x.Fotograflar.FirstOrDefault().Yol : "img/nofoto.jpg",
                IlanDurum = x.IlanTuru.Ad,
                KonutId = x.ID,
                MetreKare = x.Metrekare,
                OdaSayisi = x.OdaSayisi
            }).ToList();
            return View(model);
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
                        img.AddTextWatermark("Wissen", "RoyalBlue", opacity: 75, fontSize: 25, fontFamily: "Verdana",horizontalAlign:"Left");
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
            if (id == null)
                return RedirectToAction("IlanListele");

            var userManager = MembershipTools.NewUserManager();
            var user = userManager.FindById(HttpContext.User.Identity.GetUserId());
            bool userMi = userManager.IsInRole(user.Id, "User");
            bool adminMi = userManager.IsInRole(user.Id, "Admin");

            if (!(userMi || adminMi))
            {
                ModelState.AddModelError(string.Empty, "Sadece Aktif Kullanıcılar ilanlarını yönetebilirler");
                return RedirectToAction("Profile", "Account");
            }

            var ilan = new KonutRepo().GetByID(id.Value);
            if (ilan.KullaniciID != user.Id)
            {
                ModelState.AddModelError(string.Empty, "Herkes kendi ilanını düzenleyebilir.");
                return RedirectToAction("Profile", "Account");
            }

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
                return RedirectToAction("IlanDetay", new { id = model.ID });
            }

            var konut = new KonutRepo().GetByID(model.ID);
            konut.YayindaMi = false;
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
            new KonutRepo().Update();

            #region Admin Bilgilendirme

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
                    Subject = "İlan Güncellendi",
                    Message = $"Sayın Admin,<br/>Sitenizdeki bir ilan güncellendi, siz de bi zahmet onaylayın.<br/><a href='{SiteUrl}/Admin/IlanDetay/{model.ID}'>Haydi Onayla</a><p>İyi Çalışmalar<br/>Sitenin Nöbetçisi</p>",
                    To = mail
                });
            }

            #endregion
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
                        var klasoryolu = Server.MapPath("~/Upload/" + model.ID);
                        var dosyayolu = Server.MapPath("~/Upload/" + model.ID + "/") + fileName + extName;
                        if (!Directory.Exists(klasoryolu))
                            Directory.CreateDirectory(klasoryolu);
                        file.SaveAs(dosyayolu);
                        WebImage img = new WebImage(dosyayolu);
                        img.Resize(870, 480, false);
                        img.AddTextWatermark("Wissen", "RoyalBlue", opacity: 75, fontSize: 25, fontFamily: "Verdana");
                        img.Save(dosyayolu);
                        new FotografRepo().Insert(new Fotograf()
                        {
                            KonutID = model.ID,
                            Yol = @"Upload/" + model.ID + "/" + fileName + extName
                        });
                    }
                });
            }

            return RedirectToAction("IlanDetay", new { id = konut.ID });
        }

        [AllowAnonymous]
        [Route("~/{durum}-Daire/{baslik}/{id?}")]
        public ActionResult Detay(int? id, string baslik, string durum)
        {
            if (id == null)
                return RedirectToAction("index");

            Konut konut = new KonutRepo().GetByID(id.Value);
            if (konut == null || konut.YayindaMi == false)
                return RedirectToAction("index");
            KonutViewModel Konutmodel = new KonutViewModel()
            {
                ID = konut.ID,
                Aciklama = konut.Aciklama,
                Adres = konut.Adres,
                Baslik = konut.Baslik,
                BinaYasi = konut.BinaYasi,
                Boylam = konut.Boylam,
                EklenmeTarihi = konut.EklenmeTarihi,
                Enlem = konut.Enlem,
                Fiyat = konut.Fiyat,
                FotografYollari = konut.Fotograflar.Count > 0 ? konut.Fotograflar.Select(x => x.Yol).ToList() : new List<string>(),
                IlanTuruID = konut.IlanTuruID,
                IsitmaTuruID = konut.IsitmaSistemiID,
                KatTuruID = konut.KatturID,
                KullaniciID = konut.KullaniciID,
                Metrekare = konut.Metrekare,
                OdaSayisi = konut.OdaSayisi,
                OnaylanmaTarihi = konut.OnaylanmaTarihi,
                YayindaMi = konut.YayindaMi,
                Durum = konut.IlanTuru.Ad,
                Isitma = konut.IsitmaSistemi.Ad,
                Kat = konut.Katturu.Tur
            };
            ProfileViewModel profilModel = new ProfileViewModel()
            {
                Username = konut.Sahibi.UserName,
                AvatarPath = konut.Sahibi.AvatarPath,
                Email = konut.Sahibi.Email,
                Name = konut.Sahibi.Name,
                Surname = konut.Sahibi.Surname
            };
            DetayViewModel model = new DetayViewModel() { KonutModel = Konutmodel, ProfilModel = profilModel };
            return View(model);
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
    }
}