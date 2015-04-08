using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Model
{
    public class DbNoIdModel : DbModel
    {
        [NotMapped]
        public override int Id { get; set; }
    }
}
