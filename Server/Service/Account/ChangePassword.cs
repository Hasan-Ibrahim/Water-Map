using System.ComponentModel.DataAnnotations;

namespace Service.Account
{
    public class ChangePassword
    {
        [Required]
        public string OldPassword { get; set; }
        [Required]
        public string NewPassword { get; set; }

        [Required]
        [Compare("NewPassword")]
        public string RetypePassword { get; set; }
    }
}
