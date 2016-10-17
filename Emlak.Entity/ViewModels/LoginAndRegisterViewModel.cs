using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Emlak.Entity.ViewModels
{
    public class LoginAndRegisterViewModel
    {
        public RegisterViewModel Register { get; set; } = new RegisterViewModel();
        public LoginViewModel Login { get; set; } = new LoginViewModel();
    }
}
