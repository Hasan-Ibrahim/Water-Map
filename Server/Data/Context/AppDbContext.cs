using System.Data.Entity;
using Data.Model;

namespace Data.Context
{
    public class AppDbContext : DbContext
    {
        static AppDbContext()
        {
            Database.SetInitializer<AppDbContext>(null);
        }

        public AppDbContext(string nameOrConnectionString): base(nameOrConnectionString)
        {
            
        }
        
        public DbSet<DbUser> Users { get; set; }
        public DbSet<DbUserToken> UserTokens { get; set; }
        public DbSet<DbWaterSource> WaterSources { get; set; }
        public DbSet<DbDailyAverageSupply> DailyAverageSupplies { get; set; }
        public DbSet<DbDailyAverageSupplySummary> DailyAverageSupplySummaries { get; set; }
    }
}
