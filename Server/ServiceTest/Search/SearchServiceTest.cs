//using Data.Model.Read;
//using Data.Repositories;
//using Data.Repositories.Abstraction;
//using NUnit.Framework;
//using Service.Search;
//using System.Configuration;
//using System.Linq;

//namespace ServiceTest.Search
//{
//    [TestFixture]
//    public class SearchServiceTest
//    {
//        private SearchService _searchService;

//        [SetUp]
//        public void SetUp()
//        {
//            _searchService = new SearchService(new SearchRepository(ConfigurationManager.AppSettings["SearchIndexDirectory"]), new ProductReadRepository(new InMemoryRepository<DbProductRead>()), new KeywordRepository(ConfigurationManager.AppSettings["KeywordIndexDirectory"]));
//            _searchService.CreateIndex();
//        }

//        /*[Test]
//        public void SearchByFilter_Valid()
//        {
//            var products = _searchService.SearchByFilter(new SearchQuery{CategoryId=2, Query = "Name1 N1", PageSize=100, RequestedPageNumber=1}).Products;
//            Assert.AreEqual(10, products.Count());
//        }*/

//        [Test]
//        public void SearchProduct_ValidQueryValidCategory_CountReturnsOne()
//        {
//            var products = _searchService.SearchProduct(new SearchQuery { CategoryId = 2, Query = "Name1 N1" }, 0).Products;
//            Assert.AreEqual(0, products.Count());
//        }

//        [Test]
//        public void SearchProduct_ValidQueryAllCategory_CountReturnsOne()
//        {
//            var products = _searchService.SearchProduct(new SearchQuery { CategoryId = 0, Query = "Name1" }, 0).Products;
//            Assert.AreEqual(1, products.Count());
//        }

//        [Test]
//        public void SearchProduct_TermNotExists_CountReturnsZero()
//        {
//            var products = _searchService.SearchProduct(new SearchQuery { CategoryId = 0, Query = "Name0" }, 0).Products;
//            Assert.AreEqual(0, products.Count());
//        }

//        [Test]
//        public void DeleteProductFromIndex_Valid_CountReturnsZero()
//        {
//            _searchService.DeleteProductFromIndex(1);
//            var products = _searchService.SearchProduct(new SearchQuery { CategoryId = 1, Query = "Name1" }, 0).Products;
//            Assert.AreEqual(0, products.Count());
//        }

//        [Test]
//        public void AddProductInIndex_Valid_CountReturnsOne()
//        {
//            _searchService.AddProductInIndex(new DbProductRead
//            {
//                Id = 111,
//                Description = "Description111",
//                IsDeleted = false,
//                Name = "Name111",
//                Images = "",
//                RaterCount = 0,
//                Rating = 2,
//                UnitPrice = 111,
//                Category = "111 1"
//            });
//            var products = _searchService.SearchProduct(new SearchQuery { CategoryId = 1, Query = "Name111" }, 0).Products;
//            Assert.AreEqual(1, products.Count());
//        }
//    }
//}
