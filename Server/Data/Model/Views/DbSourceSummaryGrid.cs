using System;
using System.ComponentModel.DataAnnotations.Schema;
using Data.Model.Base;
using Newtonsoft.Json;

namespace Data.Model.Views
{
    [Table("SourceSummaryGrid")]
    public class DbSourceSummaryGrid : DbModel
    {
        public int Row { get; set; }
        public int Col { get; set; }
        public int SupplyInLitre { get; set; }
        public int NumberOfPeople { get; set; }

        [NotMapped]
        [JsonIgnore]
        public override DateTime CreationTime { get; set; }

        [NotMapped]
        [JsonIgnore]
        public override DateTime LastUpdateTime { get; set; }
    }
}
