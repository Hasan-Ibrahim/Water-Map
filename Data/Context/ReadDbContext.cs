using System.Data.Entity;

namespace Data.Context
{
    public class ReadDbContext : DbContext
    {
        public ReadDbContext(string connectionName)
            : base(connectionName)
        {
            
        }
    }
}
