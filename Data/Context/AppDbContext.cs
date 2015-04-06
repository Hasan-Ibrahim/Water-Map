using System.Data.Entity;
using Data.Model;

namespace Data.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(string nameOrConnectionString): base(nameOrConnectionString)
        {
            
        }
        
        public DbSet<DbUser> Users { get; set; }
        public DbSet<DbUserToken> UserTokens { get; set; }
        public DbSet<DbWaterSource> WaterSources { get; set; }
    }
}
