using Data.TokenStorages;
using NUnit.Framework;

namespace DataTest
{
    [TestFixture]
    public class InMemoryTokenStorageTest
    {
        private InMemoryTokenStorage _inMemoryTokenStorage;
        [SetUp]
        public void SetUp()
        {
            _inMemoryTokenStorage = new InMemoryTokenStorage();
        }
        [Test]
        public void TokenExists_Valid_ReturnsTrue()
        {
            var token = _inMemoryTokenStorage.CreateToken(1);
            var isExists = _inMemoryTokenStorage.TokenExists(token).Result;
            Assert.IsTrue(isExists);
        }
        [Test]
        public void TokenExists_tokenNotExists_ReturnsFalse()
        {
            var token = _inMemoryTokenStorage.CreateToken(1);
            var isExists = _inMemoryTokenStorage.TokenExists(token + "1").Result;
            Assert.IsFalse(isExists);
        }
        [Test]
        public void TokenExists_tokenIsNull_ReturnsFalse()
        {
            var isExists = _inMemoryTokenStorage.TokenExists(null).Result;
            Assert.IsFalse(isExists);
        }
        [Test]
        public void GetUserId_Valid_ReturnsId()
        {
            var token = _inMemoryTokenStorage.CreateToken(1);
            var userId = _inMemoryTokenStorage.GetUserId(token);
            Assert.AreEqual(1, userId);
        }
        [Test]
        public void GetUserId_tokenNotExists_ReturnsZero()
        {
            var token = _inMemoryTokenStorage.CreateToken(1);
            var userId = _inMemoryTokenStorage.GetUserId(token+"1");
            Assert.AreEqual(0, userId);
        }
        [Test]
        public void GetUserId_tokenIsNull_ReturnsZero()
        {
            var userId = _inMemoryTokenStorage.GetUserId(null);
            Assert.AreEqual(0, userId);
        }
        [Test]
        public void DeleteToken_Valid_ReturnsTrue()
        {
            var token = _inMemoryTokenStorage.CreateToken(1);
            var isDeleted = _inMemoryTokenStorage.DeleteToken(token);
            Assert.IsTrue(isDeleted);
        }
        [Test]
        public void DeleteToken_tokenNotExists_ReturnsFalse()
        {
            var token = _inMemoryTokenStorage.CreateToken(1);
            var isDeleted = _inMemoryTokenStorage.DeleteToken(token + "1");
            Assert.IsFalse(isDeleted);
        }
        [Test]
        public void DeleteToken_tokenIsNull_ReturnsFalse()
        {
            var isDeleted = _inMemoryTokenStorage.DeleteToken(null);
            Assert.IsFalse(isDeleted);
        }
        [Test]
        public void RenewToken_Valid_ReturnsToken()
        {
            var token = _inMemoryTokenStorage.CreateToken(1);
            var newToken = _inMemoryTokenStorage.RenewToken(token);
            Assert.AreNotEqual(token, newToken);
        }
        [Test]
        public void RenewToken_tokenNotExists_ReturnsNull()
        {
            var token = _inMemoryTokenStorage.CreateToken(1);
            var newToken = _inMemoryTokenStorage.RenewToken(token + "1");
            Assert.AreEqual(null, newToken);
        }
        [Test]
        public void RenewToken_tokenIsNull_ReturnsNull()
        {
            var newToken = _inMemoryTokenStorage.RenewToken(null);
            Assert.AreEqual(null, newToken);
        }
    }
}
