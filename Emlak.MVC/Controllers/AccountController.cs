using Emlak.BLL.Account;
using Emlak.Entity.IdentityModels;
using Emlak.Entity.ViewModels;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
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
        public ActionResult Register(RegisterViewModel model)
        {
            if (!ModelState.IsValid)
                return View(model);
            var userManager = MembershipTools.NewUserManager();
            var checkUser = userManager.FindByName(model.Name);
            if (checkUser != null)
            {
                ModelState.AddModelError(string.Empty, "Bu kullanıcı zaten kayıtlı!");
                return View(model);
            }
            var user = new ApplicationUser()
            {
                Name = model.Name,
                Surname = model.Surname,
                Email = model.Email,
                UserName = model.Username
            };
            var sonuc = userManager.Create(user, model.Password);
            if (sonuc.Succeeded)
            {
                userManager.AddToRole(user.Id, "Admin");
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
        public async Task<ActionResult> Login(LoginViewModel model)
        {
            if (!ModelState.IsValid)
                return View(model);
            var userManager = MembershipTools.NewUserManager();
            var user = await userManager.FindAsync(model.Username, model.Password);
            if (user == null)
            {
                ModelState.AddModelError(string.Empty, "Böyle bir kullanıcı bulunamadı");
                return View(model);
            }
            var authManager = HttpContext.GetOwinContext().Authentication;
            var userIdentity = await userManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie);
            authManager.SignIn(new AuthenticationProperties()
            {
                IsPersistent = model.RememberMe
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
    }
}