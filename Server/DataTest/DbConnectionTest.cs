using Data.Context;
using Data.Model;
using Data.Repositories.Abstraction;
using NUnit.Framework;

namespace DataTest
{
    [TestFixture]
    public class DbConnectionTest
    {
        readonly string _connectionString = "Server=localhost;Port=5432;Database=Jantrik.CodeWarrior15.Data;User Id=postgres;Password=postgres";

        [Test]
        public void ConnectingToPostgres()
        {
            var pgsqlRepo = new DbContextRepository<DbWaterSource>(new AppDbContext(_connectionString));
            var data = pgsqlRepo.GetAll();
        }
    }
}
