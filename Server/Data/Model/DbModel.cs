using System;
using System.ComponentModel.DataAnnotations;

namespace Data.Model
{
    public class DbModel
    {
        [Key]
        public virtual int Id { get; set; }

        public bool IsDeleted { get; set; }

        public virtual DateTime CreationTime { get; set; }

        public virtual DateTime LastUpdateTime { get; set; }

        public DbModel()
        {
            CreationTime = LastUpdateTime = DateTime.UtcNow;
            IsDeleted = false;
        }
    }
}
