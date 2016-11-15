using Emlak.BLL.Account;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Emlak.WebApi.Authentication
{
    public class Saglayici: OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }
        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });
            if (context == null) return;

            var userManager = MembershipTools.NewUserManager();
            var user = userManager.Find(context.UserName, context.Password);
            if (user == null)
                context.SetError("Geçersiz istek", "Kullanıcı adı veya şifresi hatalı");
            else
            {
                ClaimsIdentity identity = await userManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ExternalBearer);
                context.Validated(identity);
            }
        }
    }
}
