using Data.Model;
using Data.Model.Write;
using Data.Repositories.Abstraction;
using NUnit.Framework;
using System.Linq;

namespace DataTest.Repository
{
    [TestFixture]
    public class InMemoryUserRepositoryTest
    {
        private InMemoryRepository<DbUser> _inMemoryRepository;
        [SetUp]
        public void SetUp()
        {
            _inMemoryRepository = new InMemoryRepository<DbUser>();
            InMemoryRepository<DbUser>.Setup(10, 1, 5);
        }
        [Test]
        public void FindById_Valid_ReturnsObject()
        {
            var actualUser = _inMemoryRepository.Find(1).Result;
            var expectedUser = new DbUser
            {
                Id = 1,
                LoginId = "LoginId1@gmail.com",
                HashedPassword = "202cb962ac59075b964b07152d234b70",
                FullName = "FullName1",
                IsDeleted = false
            };
            Assert.AreEqual(expectedUser.Id, actualUser.Id);
            Assert.AreEqual(expectedUser.LoginId, actualUser.LoginId);
            Assert.AreEqual(expectedUser.HashedPassword, actualUser.HashedPassword);
            Assert.AreEqual(expectedUser.FullName, actualUser.FullName);
            Assert.AreEqual(expectedUser.IsDeleted, actualUser.IsDeleted);
        }
        [Test]
        public void FindById_IsDeleted_ReturnsNull()
        {
            var actualUser = _inMemoryRepository.Find(2).Result;
            Assert.AreEqual(null, actualUser);
        }
        [Test]
        public void FindById_IdNotExists_ReturnsNull()
        {
            var actualUser = _inMemoryRepository.Find(11).Result;
            Assert.AreEqual(null, actualUser);
        }
        [Test]
        public void FindById_InvalidId_ReturnsNull()
        {
            var actualUser = _inMemoryRepository.Find(0).Result;
            Assert.AreEqual(null, actualUser);
        }

        [Test]
        public void FindByQuery_ValidLoginId_ReturnsObject()
        {
            var actualUser = _inMemoryRepository.Find(u => u.LoginId == "LoginId1@gmail.com").Result;
            var expectedUser = new DbUser
            {
                Id = 1,
                LoginId = "LoginId1@gmail.com",
                HashedPassword = "202cb962ac59075b964b07152d234b70",
                FullName = "FullName1",
                IsDeleted = false
            };
            Assert.AreEqual(expectedUser.Id, actualUser.Id);
            Assert.AreEqual(expectedUser.LoginId, actualUser.LoginId);
            Assert.AreEqual(expectedUser.HashedPassword, actualUser.HashedPassword);
            Assert.AreEqual(expectedUser.FullName, actualUser.FullName);
            Assert.AreEqual(expectedUser.IsDeleted, actualUser.IsDeleted);
        }
        [Test]
        public void FindByQuery_ValidFullName_ReturnsObject()
        {
            var actualUser = _inMemoryRepository.Find(u => u.FullName == "FullName1").Result;
            var expectedUser = new DbUser
            {
                Id = 1,
                LoginId = "LoginId1@gmail.com",
                HashedPassword = "202cb962ac59075b964b07152d234b70",
                FullName = "FullName1",
                IsDeleted = false
            };
            Assert.AreEqual(expectedUser.Id, actualUser.Id);
            Assert.AreEqual(expectedUser.LoginId, actualUser.LoginId);
            Assert.AreEqual(expectedUser.HashedPassword, actualUser.HashedPassword);
            Assert.AreEqual(expectedUser.FullName, actualUser.FullName);
            Assert.AreEqual(expectedUser.IsDeleted, actualUser.IsDeleted);
        }

        [Test]
        public void FindByQuery_UserDeleted_ReturnsNull()
        {
            var actualUser = _inMemoryRepository.Find(u => u.LoginId == "LoginId2").Result;
            Assert.AreEqual(null, actualUser);
        }

        [Test]
        public void FindByQuery_IsDeleted_ReturnsNull()
        {
            var actualUser = _inMemoryRepository.Find(u => u.IsDeleted).Result;
            Assert.AreEqual(null, actualUser);
        }

        [Test]
        public void Exists_ValidId_ReturnsTrue()
        {
            var isExists = _inMemoryRepository.Exists(u => u.Id == 1).Result;
            Assert.IsTrue(isExists);
        }
        [Test]
        public void Exists_ValidLoginId_ReturnsTrue()
        {
            var isExists = _inMemoryRepository.Exists(u => u.LoginId == "LoginId1@gmail.com").Result;
            Assert.IsTrue(isExists);
        }
        [Test]
        public void Exists_ValidFullName_ReturnsTrue()
        {
            var isExists = _inMemoryRepository.Exists(u => u.FullName == "FullName1").Result;
            Assert.IsTrue(isExists);
        }
        [Test]
        public void Exists_UserDeleted_ReturnsFalse()
        {
            var isExists = _inMemoryRepository.Exists(u => u.Id == 2).Result;
            Assert.IsFalse(isExists);
        }
        [Test]
        public void Exists_IsDeleted_ReturnsFalse()
        {
            var isExists = _inMemoryRepository.Exists(u => u.IsDeleted).Result;
            Assert.IsFalse(isExists);
        }
        [Test]
        public void GetAll_Valid_ReturnsAll()
        {
            var allUsers = _inMemoryRepository.GetAll().Result;
            Assert.AreEqual(5, allUsers.Count());
        }
        [Test]
        public void Create_Valid_ReturnsObject()
        {
            var createdUser = _inMemoryRepository.Create(new DbUser
            {
                LoginId = "LoginId11@gmail.com",
                HashedPassword = "202cb962ac59075b964b07152d234b70",
                FullName = "FullName11",
                IsDeleted = false
            });
            Assert.AreEqual(100001, createdUser.Id);
            Assert.AreEqual("LoginId11@gmail.com", createdUser.LoginId);
            var allUsers = _inMemoryRepository.GetAll().Result;
            Assert.AreEqual(6, allUsers.Count());
        }

        [Test]
        public void Update_Valid_ReturnsTrue()
        {
            var isUpdated = _inMemoryRepository.Update(new DbUser
            {
                Id = 2,
                LoginId = "LoginId2@gmail.com",
                FullName = "FullName2",
                HashedPassword = "202cb962ac59075b964b07152d234b70",
                IsDeleted = false
            });
            Assert.IsTrue(isUpdated);
            var updatedUser = _inMemoryRepository.Find(2).Result;
            Assert.AreEqual(false, updatedUser.IsDeleted);
            var allUsers = _inMemoryRepository.GetAll().Result;
            Assert.AreEqual(6, allUsers.Count());
        }
        [Test]
        public void SoftDelete_Valid_ReturnsTrue()
        {
            var isDeleted = _inMemoryRepository.SoftDelete(1);
            Assert.IsTrue(isDeleted);
            var allUsers = _inMemoryRepository.GetAll().Result;
            Assert.AreEqual(4, allUsers.Count());
        }
        [Test]
        public void SoftDelete_InvalidId_ReturnsFalse()
        {
            var isDeleted = _inMemoryRepository.SoftDelete(11);
            Assert.IsFalse(isDeleted);
            var allUsers = _inMemoryRepository.GetAll().Result;
            Assert.AreEqual(5, allUsers.Count());
        }
    }
}
