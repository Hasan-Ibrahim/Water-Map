using System.Data.Entity;
using Data.Model.Auth;

namespace Data.Context
{
    public class AuthTokenDbContext : DbContext
    {
        public AuthTokenDbContext(string connectionName)
            : base(connectionName)
        {
        }

        static AuthTokenDbContext()
        {
            Database.SetInitializer<DataDbContext>(null);
        }

        public DbSet<DbUserToken> DbTokenUsers { get; set; }
    }
}
