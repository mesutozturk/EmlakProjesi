using Emlak.BLL.Account;
using Emlak.BLL.Settings;
using Emlak.Entity.IdentityModels;
using Emlak.Entity.ViewModels;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;

namespace Emlak.MVC.Controllers
{
    public class AccountController : Controller
    {

        // GET: Account
        public ActionResult Register()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Register(LoginAndRegisterViewModel model)
        {
            if (!ModelState.IsValid)
                return View(model);
            var userManager = MembershipTools.NewUserManager();
            var checkUser = userManager.FindByName(model.Register.Name);
            if (checkUser != null)
            {
                ModelState.AddModelError(string.Empty, "Bu kullanıcı zaten kayıtlı!");
                return View(model);
            }
            var aktivasyonKodu = Guid.NewGuid().ToString().Replace("-", "");
            var user = new ApplicationUser()
            {
                Name = model.Register.Name,
                Surname = model.Register.Surname,
                Email = model.Register.Email,
                UserName = model.Register.Username,
                ActivationCode = aktivasyonKodu
            };
            var sonuc = userManager.Create(user, model.Register.Password);
            if (sonuc.Succeeded)
            {
                if (userManager.Users.ToList().Count == 1)
                {
                    userManager.AddToRole(user.Id, "Admin");
                    await SiteSettings.SendMail(new MailModel()
                    {
                        Message = $"Merhaba {user.UserName}, </br> Sisteme Admin rolünde kayıt oldunuz. <br/><a href='http://localhost:28442/Account/Profile'>Profil Sayfanız</a>",
                        Subject = "Hoşgeldiniz",
                        To = user.Email
                    });
                }
                else
                {
                    //userManager.AddToRole(user.Id, "User");
                    userManager.AddToRole(user.Id, "Passive");
                    await SiteSettings.SendMail(new MailModel()
                    {
                        Message = $"Merhaba {user.UserName}, </br> Sisteme başarı ile kayıt oldunuz. <br/> Hesabınızı aktifleştirmek için <a href='http://localhost:28442/Account/Activation?code={aktivasyonKodu}'>Aktivasyon Kodu</a>",
                        Subject = "Hoşgeldiniz",
                        To = user.Email
                    });
                }
                

                return RedirectToAction("Index", "Home");
            }
            else
            {
                ModelState.AddModelError(string.Empty, "Kullanıcı kayıt işleminde hata oluştu!");
                return View(model);
            }
        }

        public ActionResult Login()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Login(LoginAndRegisterViewModel model)
        {
            if (!ModelState.IsValid)
                return View(model);
            var userManager = MembershipTools.NewUserManager();
            var user = await userManager.FindAsync(model.Login.Username, model.Login.Password);
            if (user == null)
            {
                ModelState.AddModelError(string.Empty, "Böyle bir kullanıcı bulunamadı");
                return View(model);
            }
            var authManager = HttpContext.GetOwinContext().Authentication;
            var userIdentity = await userManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie);
            authManager.SignIn(new AuthenticationProperties()
            {
                IsPersistent = model.Login.RememberMe
            }, userIdentity);
            return RedirectToAction("Index", "Home");
        }
        [Authorize]
        public ActionResult Logout()
        {
            var authManager = HttpContext.GetOwinContext().Authentication;
            authManager.SignOut();
            return RedirectToAction("Index", "Home");
        }

        [Authorize]
        public ActionResult Profile()
        {
            var userManager = MembershipTools.NewUserManager();
            var id = HttpContext.User.Identity.GetUserId();
            var user = userManager.FindById(id);

            ProfileViewModel model = new ProfileViewModel()
            {
                AvatarPath = user.AvatarPath,
                Email = user.Email,
                Name = user.Name,
                Surname = user.Surname,
                Username = user.UserName
            };

            return View(model);
        }

        [Authorize]
        [ValidateAntiForgeryToken]
        [HttpPost]
        public async Task<ActionResult> Profile(ProfileViewModel model)
        {
            if (!ModelState.IsValid)
                return View(model);
            var userStore = MembershipTools.NewUserStore();
            var userManager = new UserManager<ApplicationUser>(userStore);
            var user = userManager.FindById(HttpContext.User.Identity.GetUserId());
            if (user.Email != model.Email)
            {
                userManager.AddToRole(user.Id, "Passive");
                user.Email = model.Email;
                user.EmailConfirmed = false;
                if (HttpContext.User.IsInRole("User"))
                {
                    userManager.RemoveFromRole(user.Id, "User");
                    user.PreRole = "User";
                }

                else if (HttpContext.User.IsInRole("Admin"))
                {
                    userManager.RemoveFromRole(user.Id, "Admin");
                    user.PreRole = "Admin";
                }
                var aktvisyonKodu = Guid.NewGuid().ToString().Replace("-", "");
                user.ActivationCode = aktvisyonKodu;
                string SiteUrl = Request.Url.Scheme + System.Uri.SchemeDelimiter + Request.Url.Host +
(Request.Url.IsDefaultPort ? "" : ":" + Request.Url.Port);
                await SiteSettings.SendMail(new MailModel()
                {
                    Message = $"Merhaba {user.UserName}, </br> Sistemi Kullanabilmek için Hesabınız tekrar aktifleştirmeniz gerekiyor. <br/> Hesabınızı aktifleştirmek için <a href='{SiteUrl}/Account/Activation?code={aktvisyonKodu}'>Aktivasyon Kodu</a>",
                    Subject = "Hesabınızı Aktifleştirmeniz Gerekiyor",
                    To = user.Email
                });
                var authManager = HttpContext.GetOwinContext().Authentication;
                var userIdentity = await userManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie);
                authManager.SignIn(new AuthenticationProperties()
                {
                    IsPersistent = true
                }, userIdentity);
            }

            user.Name = model.Name;
            user.Surname = model.Surname;

            await userStore.UpdateAsync(user);
            await userStore.Context.SaveChangesAsync();

            return RedirectToAction("Profile");
        }
        [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ChangePassword(ProfileViewModel model)
        {
            if (!ModelState.IsValid)
                return RedirectToAction("Profile");
            var userStore = MembershipTools.NewUserStore();
            var userManager = new UserManager<ApplicationUser>(userStore);
            var user = userManager.FindById(HttpContext.User.Identity.GetUserId());

            var checkuser = userManager.Find(user.UserName, model.OldPassword);
            if (checkuser == null)
            {
                ModelState.AddModelError(string.Empty, "Mevcut şifreniz yanlış");
                return RedirectToAction("Profile");
            }
            await userStore.SetPasswordHashAsync(user, userManager.PasswordHasher.HashPassword(model.ConfirmPassword));
            await userStore.UpdateAsync(user);
            await userStore.Context.SaveChangesAsync();

            await SiteSettings.SendMail(new MailModel()
            {
                Message = $"Merhaba {user.UserName}, </br> Şifreniz Panelden değiştirilmiştir.",
                Subject = "Şifreniz Değişti!",
                To = user.Email
            });

            return RedirectToAction("Logout");
        }

        public ActionResult RecoverPassword()
        {
            return View();
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        public async Task<ActionResult> RecoverPassword(string recover)
        {
            var userStore = MembershipTools.NewUserStore();
            var userManager = new UserManager<ApplicationUser>(userStore);
            var user = userManager.FindByEmail(recover);
            var user2 = userManager.FindByName(recover);
            string newpass = Guid.NewGuid().ToString().Replace("-", "").Substring(0, 6);
            if (user == null && user2 == null)
            {
                ModelState.AddModelError(string.Empty, "Kullanıcı Bulunamadı");
                return View();
            }
            else if (user != null)
            {
                await userStore.SetPasswordHashAsync(user, userManager.PasswordHasher.HashPassword(newpass));
                await userStore.UpdateAsync(user);
                await userStore.Context.SaveChangesAsync();
                await SiteSettings.SendMail(new MailModel()
                {
                    To = user.Email,
                    Subject = "Yeni Parolanız",
                    Message = $"Merhaba {user.UserName} </br>Yeni Parolanız: <strong>{newpass}</strong></br>"
                });
                return RedirectToAction("Login", "Account");
            }
            else if (user2 != null)
            {
                await userStore.SetPasswordHashAsync(user2, userManager.PasswordHasher.HashPassword(newpass));
                await userStore.UpdateAsync(user2);
                await userStore.Context.SaveChangesAsync();
                await SiteSettings.SendMail(new MailModel()
                {
                    To = user2.Email,
                    Subject = "Yeni Parolanız",
                    Message = $"Merhaba {user2.UserName} </br>Yeni Parolanız: <strong>{newpass}</strong></br>"
                });
                return RedirectToAction("Login", "Account");
            }
            else
                return View();

        }
        [HttpPost]
        public async Task<JsonResult> UploadAvatar()
        {
            if (System.Web.HttpContext.Current.Request.Files.AllKeys.Any())
            {
                string dosyayolu = string.Empty;
                try
                {
                    var foto = System.Web.HttpContext.Current.Request.Files["myAvatar"];
                    string fileName = Path.GetFileNameWithoutExtension(foto.FileName);
                    string extName = Path.GetExtension(foto.FileName);
                    fileName += Guid.NewGuid().ToString().Replace("-", "");
                    fileName = SiteSettings.UrlFormatConverter(fileName);
                    dosyayolu = Server.MapPath("../Upload/Avatars/") + fileName + extName;
                    foto.SaveAs(dosyayolu);

                    WebImage img = new WebImage(dosyayolu);
                    img.Resize(200, 200, false);
                    img.AddTextWatermark("Wissen", "RoyalBlue", opacity: 95, fontSize: 25, fontFamily: "Verdana");
                    img.Save(dosyayolu);


                    var userStore = MembershipTools.NewUserStore();
                    var userManager = new UserManager<ApplicationUser>(userStore);
                    var user = userManager.FindById(HttpContext.User.Identity.GetUserId());

                    if (!string.IsNullOrEmpty(user.AvatarPath))
                    {
                        var silinecekResim = Server.MapPath(user.AvatarPath);
                        System.IO.File.Delete(silinecekResim);
                    }

                    user.AvatarPath = "../Upload/Avatars/" + fileName + extName;
                    await userStore.UpdateAsync(user);
                    await userStore.Context.SaveChangesAsync();
                    return Json(new
                    {
                        success = true,
                        path = user.AvatarPath
                    }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(new
                    {
                        success = false,
                        errmessage = ex.Message
                    }, JsonRequestBehavior.AllowGet);
                }
            }
            return Json(new
            {
                success = false,
                errmessage = "Hata Oluştu"
            }, JsonRequestBehavior.AllowGet);

        }

        public async Task<ActionResult> Activation(string code)
        {
            var userStore = MembershipTools.NewUserStore();
            var userManager = new UserManager<ApplicationUser>(userStore);
            var sonuc = userStore.Context.Set<ApplicationUser>().Where(x => x.ActivationCode == code).FirstOrDefault();
            if (sonuc == null)
            {
                ViewBag.sonuc = "Kod Aktivasyon Başarısız";
                return View();
            }
            sonuc.EmailConfirmed = true;
            await userStore.UpdateAsync(sonuc);
            await userStore.Context.SaveChangesAsync();

            userManager.RemoveFromRole(sonuc.Id, "Passive");
            if (string.IsNullOrEmpty(sonuc.PreRole))
                userManager.AddToRole(sonuc.Id, "User");
            else
                userManager.AddToRole(sonuc.Id, sonuc.PreRole);
            ViewBag.sonuc = $"Merhaba, {sonuc.UserName} Aktivasyon Başarılı.";
            await SiteSettings.SendMail(new MailModel()
            {
                Message = $"Merhaba, {sonuc.UserName} Aktivasyon Başarılı.",
                Subject = "Aktivasyon",
                To = sonuc.Email
            });
            HttpContext.GetOwinContext().Authentication.SignOut();
            return View();
        }
        [Authorize]
        public async Task<ActionResult> ResendActivation()
        {
            var userStore = MembershipTools.NewUserStore();
            var userManager = new UserManager<ApplicationUser>(userStore);
            var user = userManager.FindById(HttpContext.User.Identity.GetUserId());
            string SiteUrl = Request.Url.Scheme + System.Uri.SchemeDelimiter + Request.Url.Host +
(Request.Url.IsDefaultPort ? "" : ":" + Request.Url.Port);
            await SiteSettings.SendMail(new MailModel()
            {
                Message = $"Merhaba {user.UserName}, </br> Hesabınızı aktifleştirmek için <a href='{SiteUrl}/Account/Activation?code={user.ActivationCode}'>Aktivasyon Kodu</a>",
                Subject = "Aktivasyon Kodu",
                To = user.Email
            });
            return RedirectToAction("Profile");
        }
    }
}