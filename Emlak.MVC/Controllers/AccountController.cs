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
        public ActionResult Register(LoginAndRegisterViewModel model)
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
            var user = new ApplicationUser()
            {
                Name = model.Register.Name,
                Surname = model.Register.Surname,
                Email = model.Register.Email,
                UserName = model.Register.Username
            };
            var sonuc = userManager.Create(user, model.Register.Password);
            if (sonuc.Succeeded)
            {
                //userManager.AddToRole(user.Id, "Admin");
                userManager.AddToRole(user.Id, "User");
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
            user.Email = model.Email;
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
                    img.AddTextWatermark("Wissen", "RoyalBlue", opacity: 95,fontSize:25,fontFamily:"Verdana");
                    img.Resize(200, 200, false);
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
    }
}