using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Model.Base
{
    public class DbNoIdModel : DbModel
    {
        [NotMapped]
        public override int Id { get; set; }
    }
}
