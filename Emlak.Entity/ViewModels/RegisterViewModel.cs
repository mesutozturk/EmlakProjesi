using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Emlak.Entity.ViewModels
{
    public class RegisterViewModel
    {
        [Required]
        [Display(Name = "Ad")]
        [StringLength(25)]
        public string Name { get; set; }
        [StringLength(35)]
        [Required]
        [Display(Name="Soyad")]
        public string Surname { get; set; }
        [Required]
        [Display(Name = "Kullanıcı Adı")]
        public string Username { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [StringLength(100, MinimumLength = 5, ErrorMessage = "Şifreniz en az 5 karakter olmalıdır!")]
        [Display(Name = "Şifre")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Şifre Tekrar")]
        [Compare("Password", ErrorMessage = "Şifreler uyuşmuyor")]
        public string ConfirmPassword { get; set; }
    }
}
