using NUnit.Framework;
using Service.Utility;

namespace ServiceTest.Utility
{
    [TestFixture]
    public class HashGeneratorTest
    {
        private HashGenerator _hashGenerator;
        [SetUp]
        public void SetUp()
        {
            _hashGenerator = new HashGenerator();
        }
        [Test]
        public void GenerateHash_KnownHashes()
        {
            var h123 = _hashGenerator.GenerateHash("123");
            Assert.AreEqual("202cb962ac59075b964b07152d234b70", h123);
        }
    }
}
