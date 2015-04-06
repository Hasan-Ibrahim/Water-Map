using System.Data.Entity;
using Data.Model;

namespace Data.Context
{
    public class DataDbContext : DbContext
    {
        public DataDbContext(string connectionName)
            : base(connectionName)
        {
        }
        static DataDbContext()
        {
            Database.SetInitializer<DataDbContext>(null);
        }
        public DbSet<DbUser> Users { get; set; }
    }
}
