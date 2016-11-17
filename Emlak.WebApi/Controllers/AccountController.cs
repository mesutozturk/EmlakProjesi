using Emlak.BLL.Account;
using Emlak.BLL.Settings;
using Emlak.Entity.ApiModels;
using Emlak.Entity.IdentityModels;
using Emlak.Entity.ViewModels;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Emlak.WebApi.Controllers
{
    [Authorize]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AccountController : ApiController
    {
        [AllowAnonymous]
        [HttpPost]
        public async Task<JsonMessageViewModel> Register([FromBody]LoginAndRegisterViewModel model)
        {
            if (model == null)
                return new JsonMessageViewModel
                {
                    success = false,
                    message = "Model error"
                };
            try
            {
                var userManager = MembershipTools.NewUserManager();
                var checkUser = userManager.FindByName(model.Register.Username);
                if (checkUser != null)
                {
                    return new JsonMessageViewModel()
                    {
                        success = false,
                        message = "Bu kullanıcı adı zaten sisteme kayıtlı"
                    };
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
                    return new JsonMessageViewModel()
                    {
                        success = true,
                        message = $"{user.UserName} sisteme başarıyla kayıt oldu"
                    };
                }
                else
                {
                    return new JsonMessageViewModel()
                    {
                        success = false,
                        message = $"{user.UserName} kayıt işleminde hata oluştu!"
                    };
                }
            }
            catch (Exception ex)
            {
                return new JsonMessageViewModel
                {
                    success = false,
                    message = $"kayıt işleminde hata oluştu!=> {ex.Message}"
                };
            }
        }

        public JsonMessageViewModel GetLoginData()
        {
            return null;
            //test
        }
        [Authorize(Roles ="Admin")]
        [HttpGet]
        public object Admin()
        {
            return null;
            //test
        }
    }
}
