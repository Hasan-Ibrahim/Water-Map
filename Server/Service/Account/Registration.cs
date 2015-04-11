using System.ComponentModel.DataAnnotations;

namespace Service.Account
{
    public class Registration
    {
        [Required]
        [RegularExpression("^[a-zA-Z]+[.]*[a-zA-Z ]*[a-zA-Z]+$")]
        public string FullName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression(@"^(\+88)?(\d{4})[ .-]?(\d{3})[ .-]?(\d{4})$")]
        public string PhoneNumber { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        [Compare("Password")]
        public string RetypePassword { get; set; }
    }
}
