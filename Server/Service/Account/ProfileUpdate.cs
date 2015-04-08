using System.ComponentModel.DataAnnotations;

namespace Service.Account
{
    public class ProfileUpdate
    {
        [Required]
        [RegularExpression("^[a-zA-Z]+[.]*[a-zA-Z ]*[a-zA-Z]+$")]
        public string FullName { get; set; }

        [Required]
        [RegularExpression(@"^(\+88)?(\d{4})[ .-]?(\d{3})[ .-]?(\d{4})$")]
        public string PhoneNumber { get; set; }

        public string Address { get; set; }
    }
}
